# newcycle-challenge
Tech challenge for Newcycle interview (by Sushrut)

# Requirements
Postgres, Metabase, Node.js

# Steps to Run
1. Install packages
 ``` npm install ```

2. Run metabase jar from its directory
``` java -jar metabase.jar ```

3. Create and seed database
``` npm run seed ```

4. Run server
``` npm start ```

# Notes (important)
1. Database must be named itemtracker
2. Do not create tables. Seed file will do that for you
3. Start metabase before node server to avoid analytic errors
