# Node.js Setup for Typescript

## Install Typescript and create the tsconfig.json

``` bash
yarn add typescript -D
yarn tsc --init
```

## Install express and @types/express modules
``` bash
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

2. Edit the file tsconfig.json and configure it as following:

``` json
{
  "compilerOptions": {
    "allowJs": true,
    "baseUrl": ".",
    "emitDecoratorMetadata": true,
    "esModuleInterop": true,
    "experimentalDecorators": true,
    "forceConsistentCasingInFileNames": true,
    "lib": [
      "es6"
    ],
    "module": "commonjs",
    "outDir": "./dist",
    "paths": {
      "@config/*": [
        "./src/config/*"
      ],
      "@controllers/*": [
        "./src/controllers/*"
      ],
      "@middlewares/*": [
        "./src/middlewares/*"
      ],
      "@models/*": [
        "./src/models/*"
      ],
      "@views/*": [
        "./src/views/*"
      ]
    },
    "removeComments": true,
    "resolveJsonModule": true,
    "rootDir": "./src",
    "skipLibCheck": true,
    "target": "es2017",
    "typeRoots": [
      "./node_modules/@types",
      "./src/@types"
    ]
  },
  "include": [
    "src/**/*"
  ]
}
```

3. Edit the package.json file and change the "dev" script adding the option **-r tsconfig-paths/register**:

``` json
"scripts": {
  "dev": "ts-node-dev -r tsconfig-paths/register --respawn --transpileOnly --ignore-watch node_modules --no-notify src/server.ts"
},
```

## Configurin ESLint

1. Install eslint module

``` bash
yarn add eslint -D
```
2. Configure eslint rules
``` bash
yarn eslint --init
```
Select the options:

- How would you like to use ESLint?
  - To check syntax, find problems, and enforce code style

- What type of module does your project use?
  - JavaScript modules (import/export)

- Which framework your project use?
  - Node of these

- Does your project use TypeScript?
  - Yes

- Where does your code run?
  - node

- How would you like to define a style for your project?
  - Use a pouplar style guide

- Which style guide do you want to follow?
  - Airbnb

- What format do you want your config file to be in?
  - JSON

## Install and configure Jest

1. Install jest and @types/jest modules:
``` bash
yarn add jest -D
yarn add @types/jest -D  
```

2. Configure Jest:
``` bash
yarn jest --init
```

Select the options:

- Would you like to use Jest when running "test" script in "package.json"?
  - Yes

- Choose the test environment that will be used for testing:
  - node

- Do you want Jest to add coverage reports?
  - No (we configure later)

- Automatically clear mock calss and instances between every test?
  - Yes

3. Install ts-jest to work with TypeScript:

``` bash
yarn add ts-jest -D
```

4. Edit jest.config.js and following configurations:

``` javascript
const { compilerOptions } = require('./tsconfig.json');
const { pathsToModuleNameMapper } = require('ts-jest/utils');

module.exports = {
  // other options
  preset: 'ts-jest',
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {
    prefix: '<rootDir>',
  }),
  // other options
}
```
