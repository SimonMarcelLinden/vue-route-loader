const { exec } = require('child_process');
const chokidar = require('chokidar');

class VueRouteLoaderPlugin {
	constructor(options) {
		this.path = options.path;
		// First execute to genereate routes
		this.executeGenerateRoutes();
	}

	executeGenerateRoutes() {
		exec(`npx generate-routes ${this.path}`, (err, stdout, stderr) => {
			if (err) {
				console.error(`exec error: ${err}`);
				return;
			}
			if (stderr) console.error(`stderr: ${stderr}`);
		});
	}

	apply(compiler) {
		compiler.hooks.done.tap('VueRouteLoaderPlugin', () => {
			console.log(`  - Routes are automatically generated from ${this.path}.\n  - Changes are monitored`);

			const watcher = chokidar.watch(this.path, {
				ignored: /(^|[\/\\])\../,
				persistent: true
			});

			watcher.on('change', () => {
				exec(`npx generate-routes ${this.path}`, (err, stdout, stderr) => {
					if (err) {
						console.error(`exec error: ${err}`);
						return;
					}
				});
			});
		});
	}
}

module.exports = VueRouteLoaderPlugin;
