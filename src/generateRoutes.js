#!/usr/bin/env node

const cwd = process.cwd();

const fs = require('fs');
const path = require('path');
// Directory where Vue components are located

const sourceDirectory = process.argv[2] ? path.join(cwd, process.argv[2]) : path.join(cwd, '/src/pages');

// Generate routes
const routes = generateRoutes(sourceDirectory);

// Path to the generated file
const outputPath = path.join(__dirname, '../dist/routes.js');

const routesFileContent = `const { RouteRecordRaw } = require('vue-router');\n
const routes = ${JSON.stringify(routes, null, 2)
		.replace(/"path"|"name"|"component"|"children"/g, (match) => match.replace(/"/g, ''))
		.replace(/("\()/g, '(')
		.replace(/(\),")/g, '),')
		.replace(/(\)",)/g, '),')
	};\n\nmodule.exports = routes;`;

fs.writeFileSync(outputPath, routesFileContent);

/**
 * Extracts the component name from a given Vue file.
 *
 * This function reads the content of a Vue file, tries to find the script tag, and extracts
 * the component name either from the inline script or from an external script file.
 *
 * @author Simon Marcel Linden
 * @version 1.0.0
 * @since 1.0.0
 *
 * @param {string} filePath - The path of the Vue file to extract the component name from.
 * @returns {string} The extracted component name or 'DefaultAppName' if not found.
 */
function extractComponentName(filePath) {
	const content = fs.readFileSync(filePath, 'utf-8');

	// Versucht, den <script>-Tag zu finden
	const scriptTagMatch = content.match(/<script([^>]*)>([\s\S]*?)<\/script>/i);

	if (scriptTagMatch) {
		if (scriptTagMatch[1].includes('src')) {
			// Wenn ein src-Attribut vorhanden ist, lädt es die externe Skriptdatei
			const srcMatch = scriptTagMatch[1].match(/src\s*=\s*['"]([^'"]+)['"]/);
			if (srcMatch) {
				const scriptFilePath = path.join(path.dirname(filePath), srcMatch[1]);
				return extractNameFromExternalScript(scriptFilePath);
			}
		} else if (scriptTagMatch[2]) {
			// Sucht nach der 'name'-Eigenschaft im Skript-Teil
			return extractNameFromScriptContent(scriptTagMatch[2]);
		}
	}

	return 'DefaultAppName';
}

/**
 * Extracts the component name from the script content.
 *
 * This function searches for the 'name' property within a given script content string.
 *
 * @author Simon Marcel Linden
 * @version 1.0.0
 * @since 1.0.0
 *
 * @param {string} scriptContent - The script content to search for the component name.
 * @returns {string} The extracted component name or 'DefaultAppName' if not found.
 */
function extractNameFromScriptContent(scriptContent) {
	const nameMatch = scriptContent.match(/name\s*:\s*['"`]([^'"`]+)['"`]/);
	return nameMatch ? nameMatch[1] : 'DefaultAppName';
}

/**
 * Extracts the component name from an external script file.
 *
 * This function reads the content of an external script file and uses `extractNameFromScriptContent`
 * to find the component name.
 *
 * @author Simon Marcel Linden
 * @version 1.0.0
 * @since 1.0.0
 *
 * @param {string} scriptFilePath - The path of the external script file.
 * @returns {string} The extracted component name or 'DefaultAppName' if not found or file doesn't exist.
 */
function extractNameFromExternalScript(scriptFilePath) {
	if (fs.existsSync(scriptFilePath)) {
		const scriptContent = fs.readFileSync(scriptFilePath, 'utf-8');
		return extractNameFromScriptContent(scriptContent);
	}
	return 'DefaultAppName';
}

/**
 * Generates Vue router routes by recursively scanning a directory for Vue components.
 *
 * This function creates a route for each Vue component found in the given directory and its subdirectories.
 * It handles index.page.vue files, dynamic route parameters (files starting with '_'), and nested routes.
 *
 * @author Simon Marcel Linden
 * @version 1.0.0
 * @since 1.0.0
 *
 * @param {string} directory - The directory to start scanning for Vue components.
 * @param {string} [parentPath=''] - The parent path used to construct the route paths.
 * @returns {Array<Object>} An array of objects representing Vue router routes.
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
				component: `() => import('@/pages/404.eror.js'),`,
			}
		);
		console.error(`An error occurred while reading the directory: ${error.message}`);
		console.error(`Directory: ${directory}\n`);
	}

	return routes;
}