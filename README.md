# Stock Marathoner

This project allows stock traders to log their stock trades (purchases and sales) over time and get a summary of their profit/loss.

## Server

Read the README.md file in the `server` folder for more information on getting set up with the Node.js api.

## Web

Read the README.md file in the `web` folder for more information on getting set up with the Angular web application.

## TODO's

- Trade History > Support paging as user scrolls
- Stock Positions > Auto-refresh current prices on interval (Monday through Friday 9:30am to 4:00pm EST)
- Summary > Add additional metrics (e.g. profit/loss today / this month / this year?)

To make this into a product...
- Create logo
- Place limitations on free account (e.g. can only add 30 trades?)
- To use additional features, require them to pay?
- Store users and trades in MongoDB instead of JSON files?
- Add google analytics
- Perform SEO
- Run google ads
- Allow auto-imports from TD Ameritrade, TRowe Price, etc... using Puppeteer