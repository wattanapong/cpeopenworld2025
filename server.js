const express = require('express');
const { route } = require('./softskill');

const router = express.Router()

router.post('/open', async (req, res) => {
    id = req.body?.id;
    let index = -1
    
    if (secret.includes(id)) {
        index = secret.indexOf(id)
    }
    res.render('cpe/open', {
        index: index
    })
})

router.get('/', (req, res) => {
    
    if (req.query.id){
        if (!req.session.cpeopenids) {
            req.session.cpeopenids = [];
        }

        if (req.session.cpeopenids.includes(req.query.id)) {
            res.send('Error')
            return
        }else{
            req.session.cpeopenids.push(req.query.id);
        }

    }
    
    const ids = req.session.cpeopenids || [];
    res.render('cpe/open', {
        ids: ids
    })
    
})

router.get('/', (req, res) => {
    res.redirect('cpe/open')
})

module.exports = router