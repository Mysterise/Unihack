import axios from 'axios';

export enum TravelTypes {
	bicycling = 'bicycling',
	driving = 'driving',
	transit = 'transit',
	walking = 'walking'
}

export async function getDirectionProperty(origin: string, destination: string, mode: string): Promise<object> {

    console.log('Getting Distance');
    const res = await axios.get('https://maps.googleapis.com/maps/api/directions/json', {
		params: {
			origin,
			destination,
			mode,
			key: 'AIzaSyBHHQTbMzr6lE-HzgZeRzzWo96A4XSps2Q'
		}
	});

    console.log('test');
    console.log(res.request);
	return res.data.routes[0].legs[0].duration.value;
}

/*
export function minsToNum(mins: string) {
	return parseInt(mins.split(" ")[0]);
}
*/