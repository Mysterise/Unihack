import * as Koa from 'koa';
import * as Router from 'koa-router';
const cors = require('@koa/cors');

import chalk from 'chalk';
import * as bodyParser from 'koa-bodyparser';

import * as constants from './constants';

const app = new Koa();
const router = new Router();

import { Index } from './routes/index';

router.use('', Index.routes);
app.use(cors());
app.use(bodyParser());

app.use(async (ctx, next) => {
	try {
		await next();

		if (ctx.status === 404) {
			ctx.throw(404);
		}
	} catch (err) {
		ctx.status = err.status || 500;

		ctx.body = {
			error: true,
			status_code: ctx.status,
			message: err.message
		};
	}
});

app
	.use(router.routes())
	.use(router.allowedMethods());

app.listen(constants.port, () => {
	console.log(`\nRunning server on localhost:${chalk.red(constants.port.toString())}`);
});
