import { RouteRecordRaw } from 'vue-router';

declare module 'generatedRoutes' {
	const routes: RouteRecordRaw[];
	export default routes;
}
