# Url shortener built with Express


### how I set the project up using yarn
#### trial 1
- installed yarn by running `npm install --global yarn`
- a `package.json` file already exists which contains details including the dependencies of the project
- run `yarn install` to install the dependencies from the `package.json` file generated previously by `npm`
- dependencies were installed in the `node_modules` folder
- a `yarn.lock` file was created after the installation of the dependencies. the `yarn.lock` file contains all the dependencies, and all the packages that they depend on, with their exact versions
- the `package-lock.json` generated previously by `npm` was deleted because a warning was displayed in the terminal after running `yarn install`
- `yarn start` was run to start the server with `nodemon` which was previously installed
- yarn was able to install the dependencies from the `package.json` file created by npm