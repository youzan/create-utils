This project was bootstrapped with [create-utils](https://github.com/youzan/create-utils).

## Available Scripts

In the project directory, you can run:

### `npm dev`

Runs the app in the development mode.<br>
Open [http://localhost:3001](http://localhost:3001) to view it in the browser.

The page will reload if you make edits.

### `npm test`

Launches the test runner in the interactive watch mode.

### `npm run build`

Builds the project for production to the `dist` folder.

- ESModules: `target=es npm run build`
- CommonJs: `target=cjs npm run build`

Copy dist directory to the publish/es or publish/cjs branch, you need publish package to npm by yourself.

### `npm run doc`

Automatically generate documents by ESDoc, and Copy docs directory to the gh-pages barnch.

