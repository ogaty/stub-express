'use strict';
const moment = require('moment')

const getExportsRoutes = (app, db) => {
    // project list
    app.get('/exports/', (req, res) => {
        db.all('select id, name from exports', [], (err, rows) => {
            res.status(200)
            res.json(rows)
        })
    })

    // create project
    app.post('/exports/', (req, res) => {
        const date = Date.now()
        db.run('insert into exports (status, requested_at) values ("pending", "' +  moment(date).format('YYYY-MM-DD HH:mm:ss')  + '")');
        let results = []
        db.all('select id, status, requested_at from exports', [], (err, rows) => {
            res.status(200)
            res.json(rows)
        })
    })
};

module.exports = getExportsRoutes;
