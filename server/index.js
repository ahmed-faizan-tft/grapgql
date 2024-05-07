const express = require('express');
const {expressMiddleware} = require('@apollo/server/express4')
const bodyParser = require('body-parser')
const cors = require('cors');
const axios = require('axios');
const connectdb = require('./db/connection');
const apolloServer = require('./apolloServer');
const context = require('./context/context');


async function startServer(){
    const app = express();
    const server = apolloServer

    app.use(bodyParser.json());
    app.use(cors());
    connectdb()

    await server.start();

    app.use('/graphql', expressMiddleware(server,{
        context: context
    }));
    app.listen(8000,()=>{console.log('listen at 8000');})
}

startServer();