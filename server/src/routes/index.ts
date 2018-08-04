import * as Router from 'koa-router';
import {CalendarAPI} from './calendar';


const router = new Router();

router.get('/', (ctx, next) => {
	ctx.body = {
		success: true
	};
});

router.get('/calendar_events', (ctx, next) => {
	let cal = new CalendarAPI().getCalendarEvent();
	ctx.body = {
		success: true,
		data: cal.nextEvent
	}
})

export namespace Index {
	export const routes = router.routes();
}
