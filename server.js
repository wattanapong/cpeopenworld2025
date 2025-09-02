const express = require('express');
const { route } = require('./softskill');
const {getLocalDateTime} = require('@middleware/datetime_utils')
const router = express.Router()

let globalIds = [];
let globalData = {};

router.post('/open', async (req, res) => {
    const clientIp = req.headers['x-forwarded-for'] || req.ip; // Handle proxy and direct connections
    const logMessage = `${getLocalDateTime()} - IP: ${clientIp} - URL: ${req.url}\n`;

    console.log(logMessage)

    id = req.body?.id;
    if (id){
        const decoded = Buffer.from(id, "base64").toString("utf8");
        // if (globalIds.includes(decoded)) {
        //     return
        // }else{

            if (globalData[decoded]) {

                if (!globalData[decoded].some(x => x.ip === req.body?.ip)) {

                    globalData[decoded].push(
                        {
                            ip: req.body?.ip,
                            time: req.body?.time
                        }
                    )
                }
                
            }else {

                globalIds.push(decoded);
                
                globalData[decoded] = [{
                    ip: req.body?.ip,
                    time: req.body?.time
                }]
            }
            
        // }
    }
})

router.get('/clear', async (req, res) => {
    globalIds = [];
    globalData = {};
    res.send("Done")
})

router.get('/open', (req, res) => {  

    const ids = globalIds || [];
    const data = globalData || {};

    res.render('cpe/open', {
        ids: ids,
        data: data
    })
    
})

router.get('/', (req, res) => {
    res.redirect('/cpe/open')
})

module.exports = router