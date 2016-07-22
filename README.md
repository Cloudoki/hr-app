# angular2-webpack
Angular2 starter with webpack

## Features
- Webpack;
- Oauth2 authentication flow;

## Requirements
- [nodejs](https://nodejs.org/)
- [npm](https://www.npmjs.com/)

## Install
Install the dependencies with `npm install` or `sudo npm install`.

## Configuration
The auth configurations are located in the src/app/common/config-example.ts file. Since configurations may vary from local setup to production setup, to enable these you must do a cp src/app/common/config_example.ts config.ts first. The generated file will be your configuration file, and should never be commited back to the repo.

## Adding packages
The package is setup so you can easily add external packages to your project, while making it easier to manage dependencies. Doing
`npm install <package-name>` will add the package to the **node_modules** folder. You can browse for available packages through [npm search page](https://www.npmjs.com/), and general documentation on bower in [npmjs.com](https://docs.npmjs.com/).


## npm scripts
- **npm run start** will run webpack-dev-server and serve your contents `from memory only` on `http://127.0.0.1:8080`. You are ready to start developing
- **npm run clean** will clean the dist folder
- **npm run build**

## NOTE:
If you are having errors try deleting the **node_modules** folder and run `npm install` again.

### Bunble your application and run it in the browser

  * Production / Staging
    * **npm run build** to bundle all your files to the /dist folder.

  * Development
    * Run `npm install -g http-server` or add it to your dependencies if you want it local.
    * **npm run static** and open your browser at `http://127.0.0.1:8090/`.
