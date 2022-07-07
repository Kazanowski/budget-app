const express = require('express');
const cors = require('cors');
const app = express();

const PORT = process.env.PORT || 3000;

const userRouter = require('./routes/users');
const transacionRouter = require('./routes/transactions');


app.use(cors('*'));
app.get('/', (req, res) => {
    res.send("Hello!");
})

app.use("/users", userRouter);
app.use("/transactions", transacionRouter);

app.listen(PORT);