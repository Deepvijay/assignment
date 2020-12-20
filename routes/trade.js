const express = require('express');
const router = express();
const Validators = require('../helper/validator');
const tradeSchema = require('./tradeSchema');
const validateMethod = Validators.validators;
const { addTrade, getTrade } = require('../models/trade');
router.post('/trade', validateMethod(tradeSchema.tradeInfo), async (req, res) => {
    const trade = await addTrade(req.body)
    res.status(200).json({ success: true, message: 'Trade Capture Successfully..!' })
})
router.get('/trade', async (req, res) => {
    const todayTrades = await getTrade()
    var today = new Date();
    today.setHours(9, 30)
    today = today.valueOf()
    var currentTime = new Date().valueOf()
    var totalIntervalTime = Math.abs((currentTime - today) / 1000);
    var result = []
    for (i = 15, j = 0; i <= totalIntervalTime; i += 15, j++) {
        var tempResult = []
        todayTrades.forEach(element => {
            if (Math.abs((element.TS - today) / 1000) >= i - 15 && Math.abs((element.TS - today) / 1000) <= i) {
                tempResult.push({ bar_number: j, sys: element.sym, P: element.P, Q: element.P })
            }
        });
        if (tempResult.length == 0)
            tempResult.push({ bar_number: j })
        result.push(tempResult)

    }
    res.status(200).json({ success: true, data: result });
})

module.exports = router;