import axios from 'axios';

export enum TravelTypes {
	bicycling = 'BICYCLING',
	driving = 'DRIVING',
	transit = 'TRANSIT',
	walking = 'WALKING'
}

export async function getDirectionProperty(origin: string, destination: string, travelMode: TravelTypes): Promise<object> {
    console.log('req');

    const res = await axios.get('https://maps.googleapis.com/maps/api/directions/json', {
		data: {
			origin,
			destination,
			travelMode,
			key: 'AIzaSyBHHQTbMzr6lE-HzgZeRzzWo96A4XSps2Q'
		}
	});

	console.log('req', res.request);

	return res.data.routes[0].legs[0].duration.value;
}

/*
export function minsToNum(mins: string) {
	return parseInt(mins.split(" ")[0]);
}
*/