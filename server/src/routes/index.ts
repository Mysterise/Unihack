import * as Router from 'koa-router';

import * as MapsController from '../controllers/maps';

import { IMapsBody } from '../interfaces';
import { CalendarAPI } from "./calendar";

const router = new Router();

router.get('/', (ctx, next) => {
	ctx.body = {
		success: true
	};
});

router.get('/calendar_events', async (ctx, next) => {
    const api = new CalendarAPI();

    const nextEvent = await new Promise((resolve) => {
        api.getCalendarEvent((nextEvent) => {
            resolve(nextEvent);
        });
    });

    ctx.body = {
        nextEvent
    }

});

router.post('/maps-props', async (ctx, next) => {
	console.log('map props');
	const data: IMapsBody = ctx.request.body;
	console.log(ctx.request.body);
	const directionData: any = await MapsController.getDirectionProperty(
		data.origin,
		data.destination,
		data.mode,
	);

	ctx.body = {
		seconds: directionData,
	};
});

export namespace Index {
	export const routes = router.routes();
}
