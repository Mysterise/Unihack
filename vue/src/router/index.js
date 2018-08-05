import Vue from 'vue'
import Router from 'vue-router'

import Index from '@/components/Index';
import Calendar from '@/components/Calendar';

Vue.use(Router)

export default new Router({
	routes: [
		{
			path: '/',
			name: 'index',
			component: Index
		},
    {
      path: '/calendar',
      name: 'calendar',
      component: Calendar
    }
	]
});
