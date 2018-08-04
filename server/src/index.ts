import * as Koa from 'koa';
import * as Router from 'koa-router';

import * as bodyParser from 'koa-bodyparser';

const app = new Koa();
const router = new Router();

import { Index } from '@/routes/index';

router.use('/', Index.routes);

app.use(async (ctx, next) => {
	try {
		await next();

		if (ctx.status == 404) {
			ctx.throw(404);
		}
	} catch (err) {
		ctx.status = err.status;
		ctx.body = {
			message: err.message
		};
	}
});

app
	.use(router.routes())
	.use(router.allowedMethods());
