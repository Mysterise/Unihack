import { loadavg } from "os";

const fs = require("fs");
const readline = require("readline");
const { google } = require("googleapis");

// If modifying these scopes, delete credentials.json.
const SCOPES = ["https://www.googleapis.com/auth/calendar.readonly"];
const TOKEN_PATH = "./tokenskae.json";

interface IEvent {
    title: string;
    start: string;
    end: string;
    location: string;
}

export  class CalendarAPI {
    public status: string;
    public nextEvent: IEvent;

    constructor() {
        this.status = "";
        this.nextEvent = null;
    }

    getCalendarEvent(callback) {
        // Load client secrets from a local file.
        fs.readFile("./credentials.json", (err, content) => {
            if (err) return console.log("Error loading client secret file:", err);
            // Authorize a client with credentials, then call the Google Calendar API.
            this.authorize(JSON.parse(content), (token) => {
                this.listEvents(token, callback)
            });
        });
    }

    /**
     * Create an OAuth2 client with the given credentials, and then execute the
     * given callback function.
     * @param {Object} credentials The authorization client credentials.
     * @param {function} callback The callback to call with the authorized client.
     */
    authorize (credentials, callback) {
        const { client_secret, client_id, redirect_uris } = credentials.installed;
        const oAuth2Client = new google.auth.OAuth2(
            client_id,
            client_secret,
            redirect_uris[0]
        );

        // Check if we have previously stored a token.
        fs.readFile(TOKEN_PATH, (err, token) => {
            if (err) return this.getAccessToken(oAuth2Client, callback);
            oAuth2Client.setCredentials(JSON.parse(token));
            callback(oAuth2Client);
        });
    }

    /**
     * Get and store new token after prompting for user authorization, and then
     * execute the given callback with the authorized OAuth2 client.
     * @param {google.auth.OAuth2} oAuth2Client The OAuth2 client to get token for.
     * @param {getEventsCallback} callback The callback for the authorized client.
     */
    getAccessToken (oAuth2Client, callback)  {
        const authUrl = oAuth2Client.generateAuthUrl({
            access_type: "offline",
            scope: SCOPES
        });
        console.log("Authorize this app by visiting this url:", authUrl);
        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });
        rl.question("Enter the code from that page here: ", code => {
            rl.close();
            oAuth2Client.getToken(code, (err, token) => {
                if (err) return callback(err);
                oAuth2Client.setCredentials(token);
                // Store the token to disk for later program executions
                fs.writeFile(TOKEN_PATH, JSON.stringify(token), err => {
                    if (err) console.error(err);
                    console.log("Token stored to", TOKEN_PATH);
                });
                callback(oAuth2Client);
            });
        });
    }

    listCalendars (auth)  {
        const calendar = google.calendar({ version: "v3", auth });
        calendar.calendarList.list({
            },
            (err, res) => {
                if (err) return console.log("The API returned an error: " + err);
                return res.data;
            });
    }

    /**
     * Lists the next 10 events on the user's primary calendar.
     * @param {google.auth.OAuth2} auth An authorized OAuth2 client.
     */
    listEvents (auth, callback)  {
        const calendar = google.calendar({ version: "v3", auth });
        let ctx = this;
        calendar.events.list(
            {
                calendarId: "primary",
                timeMin: new Date().toISOString(),
                maxResults: 10,
                singleEvents: true,
                orderBy: "startTime"
            },
            (err, res) => {
                if (err) {
                    this.status = ("The API returned an error: " + err);
                    return;
                }
                console.log('calendar list events');
                const events = res.data.items;
                if (events.length > 0) {
                    console.log("Upcoming 10 events:");
                    // let eventsSummary = "";
                    // events.map((event, i) => {
                    //   const start = event.start.dateTime || event.start.date;
                    //   eventsSummary += `${start} - ${event.summary}\n`;
                    // });
                    console.log(events.length);
                    // console.log(events);
                    // this.status = eventsSummary;
                    this.nextEvent = {
                        title: events[0].summary,
                        start: events[0].start.dateTime,
                        end: events[0].end.dateTime,
                        location: events[0].location
                    };
                    callback(this.nextEvent);
                } else {
                    this.status = "No upcoming events found.";
                }
            }
        );
    }
}