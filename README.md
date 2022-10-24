# Url shortener built with Express


### how I set the project up using npm
- run `npm init` and followed the prompt
- a `package.json` file was created containing details of the project
- run `npm install express body-parser pug --save` to install the dependencies. the `save` flag was added to save the dependencies to be able to keep track of them
- dependencies were installed in the `node_modules` folder
- a `package-lock.json` file was created after the npm. the `package-lock.json` file contains all the dependencies, and all the packages that they depend on, with their exact versions
- to prevent manually restarting the server everytime changes were made, the command `npm install nodemon --global` was run to install `nodemon` as a global package. `nodemon` looks like a package i'll need often and i don't want to install it locally for every project hence the global install
- an entry was added in the `scripts` section of the `package.json` to start the server with `nodemon` everytime `npm start` is run


NPM took about 15s to install the packages whilst yarn took about 11s