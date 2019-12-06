'use strict';
const express = require('express');
const app = express();
const port = 3000;
const bodyParser = require('body-parser');
const router = require('./routes');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: true
}));


app.use(router);


app.get('/', async (req, res) => res.send('Hello World!'));


app.listen(port, () => console.log(`Example app listening on port ${port}!`));


