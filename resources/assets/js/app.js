
require('./bootstrap');

window.Vue = require('vue');

import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

let pageHeader 	= require('./components/pageHeader.vue');
let pageFooter	= require('./components/pageFooter.vue');

let home 		= require('./components/home.vue');
let about 		= require('./components/about.vue');

const routes = [
  { path: '/home', component: home },
  { path: '/about', component: about }
]

const router = new VueRouter({
	//mode: "history",
	routes
})

const app = new Vue({
    el: '#app',
    router,
    components: {
    	pageHeader,
    	pageFooter
    }
}).$mount('#app')
