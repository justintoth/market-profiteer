# Market Profiteer

This project allows stock traders to log their stock trades (purchases and sales) over time and get a summary of their profit/loss.

## Server

Read the README.md file in the `server` folder for more information on getting set up with the Node.js api.

## Web

Read the README.md file in the `web` folder for more information on getting set up with the Angular web application.

## TODO's

- Handle expired auth tokens
- Fix 0 trades bug
- Summary > Add additional metrics (e.g. profit/loss today / this month / this year?)
- Trade History > Support paging as user scrolls

To make this into a product...
- Store users and trades in MongoDB instead of JSON files
- Place limitations on free account (e.g. can only add 30 trades?)
- To use additional features, require them to pay?
- Allow auto-imports from TD Ameritrade, TRowe Price, etc... using Puppeteer
- Create logo
- Add google analytics
- Perform SEO
- Run google ads