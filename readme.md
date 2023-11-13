# Vue Route Loader
![npm version](https://img.shields.io/npm/v/vue-route-loader.svg)
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
1. Import the Module:
Import **vue-route-loader** in your project where you need to generate routes.

2. Configure Source Directory:
Specify the directory of your Vue components to generate routes. For example:

```javascript
const sourceDirectory = path.join(__dirname, '../src/pages');
```
3. Generate Routes:
Use **vue-route-loader** to generate routes, which will create a **generatedRoutes.ts** file in your specified output path.

4. Integrate with Vue Application:
Integrate the generated routes with your Vue application's router setup.

## Customization
- **Route Patterns**: Adjust the route generation logic in the generateRoutes function to match your directory structure and routing preferences.
- **Error Handling**: Customize the error handling within the script for various read errors.

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
* Contact: [Your Contact Information]


Just replace `[Your Contact Information]` with your actual contact details. This `README.md` is structured to provide a clear overview of the project, including installation, usage, customization, contributing guidelines, license, and author information.

Copyright (c) SimonMarcelLinden.