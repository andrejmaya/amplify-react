## Prerequisites
* npm
* node
* yarn

## Getting started

```
yarn create react-app amplify-react
npm install -g @aws-amplify/cli
npm i --save @aws-amplify/ui
amplify init
amplify add auth
amplify push
yarn add aws-amplify aws-amplify-react aws-amplify-react-native
npm start
```

## Docker
```
#build
docker build -t amplify-react .
#run
docker run -v ${PWD}:/app -v /app/node_modules -p 8080:80 amplify-react
```