# Node.js Setup for Typescript

## Install Typescript and create the tsconfig.json

``` bash
yarn add typescript -D
yarn tsc --init
````

## Install express and @types/express modules
```
yarn add express 
yarn add @types/express -D
```

### Create a new file src/server.ts
``` javascript
import express from 'express';

const app = express()

app.get('/', (req, res) => {
  return res.json({
    message: "Uhuuu! It's Working..."
  })
});

app.listen(3333);
```
## Install ts-node-dev module 
This module is responsible to transpile your typescript code to javascript, run it and also it watch your files for modifications. Once they are modified they are transfiled again and your application is restarted.
```
yarn add ts-node-dev -D
```

### Creating a script to execute start you application in development mode

1. Open the file package.json
2. Add a new script:

``` json
"scripts": {
  "dev": "ts-node-dev --respawn --transpileOnly --ignore-watch node_modules --no-notify src/server.ts"
}
```

## Configuring paths

1. Install tsconfig-paths module
``` bash
yarn add tsconfig-paths -D
```

2. Edit the file tsconfig.json and add the following configurations:

``` json
"baseUrl": ".",
"paths": {
  "@controllers/*": [
    "./src/controllers/*"
  ],
  "@models/*": [
    "./src/models/*"
  ],
  "@views/*": [
    "./src/views/*"
  ],
  "@middlewares/*": [
    "./src/middlewares/*"
  ],
  "@config/*": [
    "./src/config/*"
  ],
}
```
3. Edit the package.json file and change the "dev" script adding the option **-r tsconfig-paths/register**:

``` json
"scripts": {
  "dev": "ts-node-dev -r tsconfig-paths/register --respawn --transpileOnly --ignore-watch node_modules --no-notify src/server.ts"
},
```