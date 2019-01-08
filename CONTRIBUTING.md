There are two packages here in the packages directory.
- create-utils(initialize project template)
- utils-scripts(contains the scripts for setting up the development server, buildiing production builds,etc)

### Set Up
```
yarn add lerna -g
yarn install

cd package/utils-scripts
npm run dev
```

### Test
```
cd package/utils-scripts
yarn link
cd <dir>
yarn link 'utils-scripts'
```

### Publish
```
npm run build
npm run publish
```