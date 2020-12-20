const express = require('express');
const bodyParser = require('body-parser')
const config = require('./config.json');
const mongoose = require('mongoose');
const trade = require('./routes/trade');
const app = express();
try {
    mongoose.connect(config.connectionString,{ useNewUrlParser: true,useUnifiedTopology: true   },function(err){
        if(err){
            console.log(err);
        } 
    });
    
} catch (err) {

}
process.on('unhandledRejection', error => {
    console.log('unhandledRejection', error.message);
});

app.use(bodyParser.json());
app.use('/trade', trade);
module.exports = app;
