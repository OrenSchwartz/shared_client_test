# React Client

This folder contains several react applications. It's designed to be `per feature`, each
feature is going to be independent react app, with all necessary folders and files. There
is an example off one `app`, plz follow this rule in order to be consistent.

```
client
├── README.md
├── components
│   ├── SubmitButton
│   │   └── index.js
│   └── index.js
├── features
│   ├── PasswordPolicy
│   │   ├── RollOut
│   │   │   ├── actions.js
│   │   │   ├── components
│   │   │   │   ├── Form
│   │   │   │   │   ├── index.js
│   │   │   │   │   └── style.css
│   │   │   │   ├── Header
│   │   │   │   │   ├── index.js
│   │   │   │   │   └── style.css
│   │   │   │   └── index.js
│   │   │   ├── index.js
│   │   │   ├── reducers
│   │   │   │   └── index.js
│   │   │   ├── store.js
│   │   │   └── style.css
│   │   └── index.js
│   └── index.js
├── index.html
├── index.js
└── sharedComponents
    ├── SubmitButton
    │   ├── index.js
    │   └── style.css
    └── index.js
```

All stateless components what can be extracted from the particular feature and reused in
other features should go to shared `components` folder

## Instalation

```sh
$ npm i
```

## Development

```sh
$ npm start
```

In development mode we relay on `webpack-dev-server` it is going to build all `React` apps
and serve it for as. Wen you run `npm start` it will run server and bind it on `http://localhost:4000`

If you want to run it somewhere else plz take a look at `package.json` file.

## Build

In order to build apps for `scrum` env you have to run following compony:

```sh
npm run build
```

For `production` env you have to run following:

```sh
npm run build-production
```

### Foreman

If you run you app with `foreman start` you do not need to do any extra work (do not run `npm start`), it will
handle everything for you.

# Usage

## Shared Components

All shared components can be imported at any level of the app with following `import`

```javascript
 import { SubmitButton } from 'sharedComponents'
 ```

# Testing

We use `karma` as test runner, with `jasmine` for test env, we collect coverage data as
well.

Compare to `RubyOnRails` spec folder structure that's mirrors app folder, in `client`
folder we write tests per component. Component tends to be independent as much as it
possible, test should go with it and be as close as possible.

Here is example component with test. You just need to copy this structure and change it to
fit for your component. `Karma` is going to look at file with `*-test.js` pattern and run
it with jasmine.

```
client
├── sharedComponents
│   ├── CalcTestExample
│   │   ├── Calculator.js
│   │   └── __tests__
│   │       └── Calculator-test.js
│   ├── SubmitButton
│   │   ├── __tests__
│   │   │   └── SubmitButton-test.js
│   │   ├── index.js
│   │   └── style.scss
```

### How to Write tests

We are using `enzyme` library to wrap `React components` and test it, you can use plain
react `test-utils` if you wish.


* [jasmine docs](http://jasmine.github.io/edge/introduction.html)
* [enzyme docs](https://github.com/airbnb/enzyme/tree/master/docs)
* [react-test-utils docs](https://facebook.github.io/react/docs/test-utils.html)


### How to Run Test

```sh
$ npm run test
```

## Test Coverage

We use `istanbul` as code coverage tool, after you run tests with `npm run test` you will
be able to see current state of application here `coverage/html/index.html`

## Code Style

There is `.eslintrc` with predefined rules based on `airbnb` code style. If you use `Atom`
editor with `atom-linter` and `eslint` linter it will help you to write clean code and
show some errors on the fly.

## Dependencies

* react
* react-dom
* lodash
* redux
* redux-actions
* redux-thunk
* react-redux

## Development Dependencies

* babel
* eslint
* webpack
* react-hot-loader
* karma
* jasmine
* istanbul
