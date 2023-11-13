const fs = require('fs');
const path = require('path');
// Directory where Vue components are located

const sourceDirectory = path.join(__dirname, '../src/pages');

// Generate routes
const routes = generateRoutes(sourceDirectory);

// Path to the generated file
const outputPath = path.join(__dirname, '../src/generatedRoutes.ts');

const routesFileContent = `import { RouteRecordRaw } from 'vue-router';\n
const routes: Array<RouteRecordRaw> = ${JSON.stringify(routes, null, 2)
		.replace(/"path"|"name"|"component"|"children"/g, (match) => match.replace(/"/g, ''))
		.replace(/("\()|(\)",)/g, (match) => match.replace(/"/g, ''))
		.replace(/("\()/g, '(')
		.replace(/(\),")/g, '),')
		.replace(/(\)",)/g, '),')
	};\n\nexport default routes;`;

fs.writeFileSync(outputPath, routesFileContent);

console.log('Routes successfully generated and saved to generatedRoutes.ts.');

/**
 * This script generates Vue router routes by recursively scanning the folder structure for Vue components.
 *
 * @author Simon Marcel Linden
 * @version 1.0.0
 * @since 1.0.0
 *
 * @param {string} directory - The directory to start scanning for Vue components.
 * @param {string} parentPath - The parent path used to construct the route paths.
 *
 * @returns {Array} An array of Vue router routes.
 */
function generateRoutes(directory, parentPath = '') {

	const routes = [];
	const indexFileName = 'index.page.vue';

	try {
		const files = fs.readdirSync(directory);

		files.forEach((file) => {
			const filePath = path.join(directory, file);
			const stat = fs.statSync(filePath);

			if (stat.isDirectory()) {
				const subRoutes = generateRoutes(filePath, `${parentPath}/${file}`);
				if (subRoutes.length > 0) {
					routes.push({
						path: `${parentPath}/${file}`,
						name: file,
						children: subRoutes,
					});
				}
			} else if (file.endsWith('.page.vue')) {
				let componentName = extractComponentName(filePath) || file.replace('.page.vue', '');

				const isIndexFile = file === indexFileName;
				const isSameNameAsFolder = path.basename(filePath).replace('.page.vue', '') === path.basename(directory);

				let routePath;
				if (isIndexFile) {
					// If the file is named index.page.vue, the path points to the parent directory
					routePath = parentPath || '/';
				} else if (isSameNameAsFolder) {
					routePath = '';
				} else if (file.startsWith('_')) {
					routePath = path.basename(filePath).replace('.page.vue', '').replace(/(_)/g, ':')
				} else {
					routePath = `${parentPath}/${file.replace('.page.vue', '')}`;
				}

				routes.push({
					path: routePath,
					name: componentName,
					component: `() => import('@/pages${parentPath}/${file}'),`,
				});
			}
		});

	} catch (error) {
		routes.push(
			{
				path: '/:pathMatch(.*)*',
				name: 'Error404Page',
				component: `() => import('@/pages/404.eror.vue'),`,
			}
		);
		console.error(`An error occurred while reading the directory: ${error.message}`);
	}

	return routes;
}