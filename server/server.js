const express = require('express');
const dao = require('./dao.js');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

function queryDAO(operation, req, res) {
    dao.call(operation, req.params, (result) => {
        if (result.body && result.status != 404) {
            console.log(result.body);
            res.send(result.body);
        } else {
            res.sendStatus(404);
            res.end;
        };
    }); 
}

app.get("/:collection/:id/:attr", (req, res) => {
    queryDAO('get_attr', req, res);
});

app.get("/:collection/:id", (req, res) => {
    queryDAO('get_one', req, res);
});

app.get("/:collection", (req, res) => {
    queryDAO('get_all', req, res); 
});

const port = 3000;
console.log('server starting on port ' + port);
app.listen(port);