import * as Router from 'koa-router';

const router = new Router();

router.get('/', (ctx, next) => {
	ctx.body = {
		success: true
	};
});

router.get('calendar_events', (ctx, next) => {
	getCalendarEvents();
	ctx.body = {
		success: true
	}
})

export namespace Index {
	export const routes = router.routes();
}
