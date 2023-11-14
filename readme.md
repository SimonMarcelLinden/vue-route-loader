# Vue Route Loader
![vue-route-loader version](https://img.shields.io/npm/v/vue-route-loader.svg)
![Vue version](https://img.shields.io/badge/vue-3.3.8-green.svg)
  
![package quality](http://packagequality.com/shield/vue-route-loader.svg)
![npm downloads](https://img.shields.io/npm/dt/vue-route-loader.svg)
![npm monthly downloads](https://img.shields.io/npm/dm/vue-route-loader.svg)
![npm weekly downloads](https://img.shields.io/npm/dw/vue-route-loader.svg)

![build status](https://img.shields.io/travis/com/[username]/vue-route-loader/master.svg)
![license](https://img.shields.io/npm/l/vue-route-loader.svg)


`vue-route-loader` is a dynamic route generation module for Vue.js applications, which automatically creates Vue router routes based on the Vue components' file structure.

## Features

- **Dynamic Route Generation**: Scans a specified directory for Vue components and generates routes automatically.
- **Nested Route Support**: Handles nested routes and special cases like index and parameterized paths.
- **Error Handling**: Includes error handling for directory reading and a fallback route for 404 errors.
- **Easy Integration**: Seamlessly integrates generated routes with the Vue application setup.

## Installation

Install `vue-route-loader` via npm:

```bash
npm install vue-route-loader
```

## Usage

1. **vue.config.js**: Configure the VueRouteLoaderPlugin in your Vue application's webpack configuration:

```javascript
const { defineConfig } = require('@vue/cli-service')
const VueRouteLoaderPlugin = require('vue-route-loader/VueRouteLoaderPlugin');

module.exports = defineConfig({
	transpileDependencies: true,
	configureWebpack: {
		plugins: [
			new VueRouteLoaderPlugin({ path: './src/pages' })
		]
	}
})
```

2. **main.ts**: Integrate the route loader with your main Vue application file:

```javascript
import App from './App.vue'
import { createApp } from 'vue-route-loader';

createApp(App).mount('#app')
```

## Customization
- 

## Contributing
Contributions to improve vue-route-loader are welcome. Please follow the standard Git workflow:

1. Fork the repository.
2. Create a feature branch.
3. Commit your changes.
4. Push to the branch and open a pull request.

## License
This project is licensed under the MIT License.

## Author
* Simon Marcel Linden
* [Contact](https://github.com/SimonMarcelLinden/)

Copyright (c) SimonMarcelLinden.