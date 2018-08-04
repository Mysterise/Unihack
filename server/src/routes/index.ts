import * as Router from 'koa-router';

import * as MapsController from '../controllers/maps';

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
		'Universal studios hollywood',
		'empire state building',
		MapsController.TravelTypes.driving
	);

	ctx.body = directionData.routes[0].bounds;
});

export namespace Index {
	export const routes = router.routes();
}
