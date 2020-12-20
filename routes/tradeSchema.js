const JOI = require('joi');

module.exports ={
    tradeInfo:JOI.object().keys({
        sym:JOI.string().required(),
        P:JOI.number().required(),
        Q:JOI.number().required(),
    })
}

