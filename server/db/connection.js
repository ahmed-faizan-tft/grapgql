"use strict";

const mongoose = require('mongoose');

const DB_OPTIONS = {
    dbName: "graphql"
}

const connectdb = () => {
    try {
        mongoose.connect("mongodb://localhost:27017", DB_OPTIONS);
        console.log("DB connection established");
        return;
    } catch (error) {
        console.log(error, "error connecting");
    }
}

module.exports = connectdb;