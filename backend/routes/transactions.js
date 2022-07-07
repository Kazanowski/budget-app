const express = require('express');
const low = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");
const path = require('path');
const bodyParser = require("body-parser");
const { v4: uuidv4 } = require('uuid');

const adapter = new FileSync(path.join(__dirname.replace('routes', 'database'), 'transactions.json'));
const db = low(adapter);

const jsonParser = bodyParser.json();

const router = express.Router();


router.post('/', jsonParser, async (req, res) => {
    try{
        const id = uuidv4();
        await db
        .get('transactions')
        .push({
            id: id,
            ...req.body
        })
        .write();

        return res.status(200).send(JSON.stringify({
            id: id,
            message: 'New transactions was created!'
        }));

    }catch{
        return res.status(500);
    }
})

router.get("/", async (req, res) => {
    try{
        const transacions = await db.get('transactions').value();
        return res.send(transacions);
    }catch{
        return res.status(500).send(JSON.stringify({
            message: 'Something went wrong!'
        }));
    }
})

router.get('/:userID', async (req, res) => {
    try{
        const transactions = await db
            .get('transactions')
            .filter({userID: req.params.userID})
            .value();
        
        return res.status(200).send(JSON.stringify(transactions));
    }catch{
        return res.status(500).send(JSON.stringify({
            message: 'Something went wrong!'
        }));
    }
})

router.put('/:id', jsonParser, async (req, res)=> {
    console.log('Edit');
    try{
        await db
            .get('transactions')
            .find({id: req.params.id})
            .assign(req.body)
            .write();

        return res.status(200).send(JSON.stringify({
            message: 'The transaction has been edited!'
        }));
    }catch{
        return res.status(500).send(JSON.stringify({
            message: 'Something went wrong!'
        }));
    }
})
router.delete('/:id', async (req, res)=> {
    console.log('Delete')
    try{
        await db
            .get('transactions')
            .remove({id: req.params.id})
            .write();

        return res.status(200).send(JSON.stringify({
            message: 'The transaction has been deleted!'
        }))
    }catch{
        return res.status(500).send(JSON.stringify({
            message: 'Something went wrong!'
        }));
    }
})

module.exports = router;