import * as Router from 'koa-router';

import * as MapsController from '../controllers/maps';

import { IMapsBody } from '../interfaces';

const router = new Router();

router.get('/', (ctx, next) => {
	ctx.body = {
		success: true
	};
});

router.get('calendar_events', (ctx, next) => {
	// getCalendarEvents()

	ctx.body = {
		success: true
	}
});

router.post('/maps-props', async (ctx, next) => {
	const data: IMapsBody = ctx.body;
	const directionData: any = await MapsController.getDirectionProperty(
		data.origin,
		data.destination,
		MapsController.TravelTypes[data.travelMode]
	);

	ctx.body = directionData.routes[0].legs[0].duration.value;//.duration.text; //[0].bounds
});

export namespace Index {
	export const routes = router.routes();
}
