const swaggerUi = require("swagger-ui-express")

const apiJson = require("../swagger-API-doc.json")

const options = {
    customSiteTitle: "Task Management API",
    title: "Task Management API",
    description: "Welcome to the Task Management API Assignment Documentation! This Assignment is built using Node.js and Express. This Documentation provides an overview of the API routes available in the application",

};

const swaggerUI = swaggerUi.setup(apiJson, options)
const swaggerServe = swaggerUi.serve

module.exports = { swaggerUI, swaggerServe }