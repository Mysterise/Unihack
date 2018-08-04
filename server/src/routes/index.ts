import * as Router from 'koa-router';

import * as MapsController from '../controllers/maps';

import * as fs from 'fs';

const router = new Router();

router.get('/', (ctx, next) => {
	ctx.body = {
		success: true
	};
});

router.get('calendar_events', (ctx, next) => {
	// getCalendarEvents();
	ctx.body = {
		success: true
	}
});

router.get('/maps-props', async (ctx, next) => {
	const directionData: any = await MapsController.getDirectionProperty(
		'UNSW Sydney',
		'Melbourne VIC',
		MapsController.TravelTypes.transit
	);

	fs.writeFileSync('lol.json', JSON.stringify(directionData));

	ctx.body = directionData.routes[0].legs[0].duration.value;//.duration.text; //[0].bounds
});

export namespace Index {
	export const routes = router.routes();
}
