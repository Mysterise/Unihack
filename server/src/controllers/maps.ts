import axios from 'axios';

export enum TravelTypes {
	bicycling = 'BICYCLING',
	driving = 'DRIVING',
	transit = 'TRANSIT',
	walking = 'WALKING'
}

export async function getDirectionProperty(origin: string, destination: string, travelMode: TravelTypes): Promise<object> {
	const res = await axios.get('https://maps.googleapis.com/maps/api/directions/json', {
		params: {
			origin,
			destination,
			travelMode,
			key: 'AIzaSyBHHQTbMzr6lE-HzgZeRzzWo96A4XSps2Q'
		}
	});

	return res.data;
}