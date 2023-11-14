/**
 * This module provides functions to create and configure a Vue.js application with a Vue Router.
 * It also includes a function to add default routes to the router.
 *
 * @author Simon Marcel Linden
 * @version 1.0.0
 * @since 1.0.0
 */

import type { Component } from 'vue';
const { createApp: baseCreateApp, App } = require('vue');
const { createRouter, createWebHistory } = require('vue-router');

const generatedRoutes = require('./routes');

const NotFoundPage = require('./pages/404.error.js').default;
module.exports.NotFoundPage = NotFoundPage;

/**
 * Creates a Vue.js application with optional configuration options.
 *
 * @param options - Optional configuration options for the Vue.js application.
 * @returns The configured Vue.js application instance.
 *
 * @author Simon Marcel Linden
 * @since 1.0.0
 * @version 1.0.0
 */
function createApp(rootComponent: Component) {
	// Call the original createApp function
	const app = baseCreateApp(rootComponent);

	const routes = generatedRoutes;

	const router = createRouter({
		history: createWebHistory(),
		routes: routes,
	});

	// Use the router with the Vue application
	app.use(router)

	return app;
}

module.exports.createApp = createApp;