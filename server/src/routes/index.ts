import * as Router from 'koa-router';
import {CalendarAPI} from './calendar';


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

export namespace Index {
	export const routes = router.routes();
}
