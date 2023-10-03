const express = require('express');
const dao = require('./dao.js');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

function queryDAO(operation, req, res) {
    dao.call(operation, req.params, (result) => {
        if (result.body !== undefined) {
            console.log(result.body);
            res.send(result.body);
        } else {
            res.statusCode = 404;
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

/*
app.get("/films", (req, res) => {
    return getAll('films', req);
});

app.get("/films/:id", (req, res) => {
    dao.call('film', req, (result) => {
        console.log('result: ' + result.status);
    });
});

app.get("/films/:id/chracters", (req, res) => {
    dao.call('film', req, (result) => {
        console.log('result: ' + result.status);
    });
});

app.get("/films/:id/planets", (req, res) => {
    dao.call('film', req, (result) => {
        console.log('result: ' + result.status);
    });
});

app.get("/planets", (req, res) => {
    return getAll('planets',)
});

app.get("/planets/:id", (req, res) => {
    dao.call('planet', req, (result) => {
        console.log('result: ' + result.status);
    });
});

app.get("/planets/:id/films", (req, res) => {
    dao.call('planet_films', req, (result) => {
        console.log('result: ' + result.status);
    });
});

app.get("/planets/:id/chracters", (req, res) => {
    dao.call('planet_characters', req, (result) => {
        console.log('result: ' + result.status);
    });
});
*/

const port = 3000;
console.log('server starting on port ' + port);
app.listen(port);