# Market Profiteer

This project was generated with yarn.

yarn init -y
yard add -D typescript
yarn tsc --init --rootDir src --outDir dist
yarn add express
yarn add -D @types/node @types/express nodemon ts-node

## Development server

Run `yarn dev` for a dev server. Navigate to `http://localhost:8000/`.

## Prod server

yarn build (from Dev environment)
Copy over dist folder to Prod server and open command prompt there
npm install -g node-windows
npm link node-windows
node install.js
Sample service install script: set PORT=80 && set HOST=api.marketprofiteer.com && node C:\\MarketProfiteer\\Api\\index.js
