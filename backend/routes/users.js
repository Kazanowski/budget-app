const express = require('express');
const low = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");
const path = require('path');
const bodyParser = require("body-parser");
const bycript = require("bcrypt");
const { v4: uuidv4 } = require('uuid');

const adapter = new FileSync(path.join(__dirname.replace('routes', 'database'), 'users.json'));
const db = low(adapter);

const jsonParser = bodyParser.json();

const router = express.Router();

router.post('/register', jsonParser, async (req, res) => {
    try{
        const user = await db
            .get('users')
            .find({email: req.body.email})
            .value();
        if(user){
            return res.status(400).send(JSON.stringify({
                message: 'User with this email already exist!'
            }));
        }else{
            const hashPassword = await bycript.hash(req.body.password, 10);
            await db
                .get('users')
                .push({
                    id: uuidv4(),
                    ...req.body,
                    password: hashPassword
                })
                .write();
            
            return res.status(200).send(JSON.stringify({
                message: 'New user was created!'
            }));
        }
    }catch{
        return res.status(500).send(JSON.stringify({
            message: 'Something went wrong!'
        }));
    }
})

router.post('/login', jsonParser, async (req, res) => {
    try{
        const user = await db
            .get('users')
            .find({email: req.body.email})
            .value();
        
        if(user){
            if(await bycript.compare(req.body.password, user.password)){
                return res.status(200).send(JSON.stringify({
                    id: user.id
                }));
            }
        }
        return res.status(400).send(JSON.stringify({
            message: 'Incorect e-mail or password!'
        }));
    }catch{
        return res.status(500).send(JSON.stringify({
            message: 'Something went wrong!'
        }));
    }
})

router.get("/", async (req, res) => {
    try{
        const users = await db.get('users').value();
        return res.send(users);
    }catch{
        return res.status(500).send(JSON.stringify({
            message: 'Something went wrong!'
        }));
    }
})

module.exports = router;