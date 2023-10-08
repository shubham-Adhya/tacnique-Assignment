# tacnique-Assignment

Welcome to the Task Management API Assignment Documentation! This Assignment is built using Node.js and Express. This Documentation provides an overview of the API routes available in the application 

**All the task routes are rate limited**

**`Each IP is limited to 50 requests per window (here, per 5 minutes)`**

For Swagger Docs , Please visit

            https://determined-lime-peplum.cyclic.cloud/docs/
            
To start the project locally 

1> *Clone this repo* 

            git clone https://github.com/shubham-Adhya/tacnique-Assignment tacnique
            
2> *Add .env file and add the following fields,*
    Sample:

            mongoURL=mongodb+srv://<username>:<password>@cluster0.nobqy8a.mongodb.net/<database-name>?retryWrites=true&w=majority

            PORT=8080
            JWT_SECRET=tacnique_JWT
            SaltRounds=5
            
3> Run command

            cd tacnique
            npm install
            npm run start
            
**Base URL:** `http://localhost:8080`

**Deploy URL:** `https://determined-lime-peplum.cyclic.cloud/`
