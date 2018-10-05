# Review Questions

## What is Node.js?
Node.js is a run-time environment which runs JS outside the browser.
## What is Express?
Express is a framework for Node.js used to build web and mobile applications.
## Mention two parts of Express that you learned about this week.
Middleware, Router
## What is Middleware?
Middleware is software that is between the database and applications and performs a function on the code before it reaches its destination.
## What is a Resource?
Data provided by the server to the client.
## What can the API return to help clients know if a request was successful?
The API can return HTTP status codes to give information on the request issued by the client.
## How can we partition our application into sub-applications?
Create a directory with split folders of each element of the application to be in its own relevant section, all connected via Express Router to keep code clean.
## What is express.json() and why do we need it?
express.json() is middleware built into Express that parses requests issued by the client into JSON objects.