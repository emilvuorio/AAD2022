// index.js
// This is the main entry point of our application

// Alustetaan vakioita ja muuttujia
const { ApolloServer } = require('apollo-server-express');
const express = require('express');
const port = 4000;
require('dotenv').config();
const db = require('./db');
const DB_HOST = process.env.DB_HOST;
const models = require('./models');
const typeDefs = require ('./schema');
const resolvers = require('./resolvers');
const jwt = require('jsonwebtoken');


// call connection

db.connect(DB_HOST);



//schema


const app = express();

const getUser = token => {
    if (token){
        try {
            return jwt.verify(token, process.env.JWT_SECRET);
        } catch (err) {
            throw new Error('Session invalid');
        }
    }
};

// Apollo Server Setup

async function startApolloServer(typeDefs, resolvers) {
    
    const server = new ApolloServer({ 
    typeDefs, 
    resolvers,
    context: ({ req }) => {
        const token = req.headers.authorization;

        const user = getUser(token);

        console.log(user);

        //Add the db models to the context
        return { models , user };
    }});

    await server.start();
    server.applyMiddleware({app, path:'/api'});
    return server
}

startApolloServer(typeDefs, resolvers);

// Aletaan kuunella asiakkaiden pyyntöjä portista joka on annettu muuttujassa


app.listen({port},() =>
    console.log(
        `GraphQL Server runnning at http://localhost:${port}`
    )
);



