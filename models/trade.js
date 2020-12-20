const mongoose = require('mongoose');

const tradeScema = new mongoose.Schema({
    sym: {
        type: String,
        required: true
    },
    P: {
        type: Number,
        required: true
    },
    Q: {
        type: Number,
        required: true
    },
    TS: {
        type: Number,
        required: true
    }
}, { versionKey: false })

const Trade = mongoose.model('trades', tradeScema);

async function addTrade(Obj) {
    Obj['TS'] = new Date().valueOf()
    return await Trade.create(Obj)
}

async function getTrade(){
    const today = new Date();
    today.setHours(9,30)
    return await Trade.find({TS:{$gte:today.valueOf()}});    
}//end getTrade
module.exports={
    addTrade,
    getTrade
}