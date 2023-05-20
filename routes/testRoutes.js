'use strict';

const Router = require('express');

const getLoginRoutes = (app, db) => {
//  const router = new Router();

    app.post('/test', (req, res) => {
        db.get('select cnt from testdata limit 1', [], (err, row) => {
            if (err) {
                throw err;
            }
            const newcnt = row.cnt + 1;
            db.run('update testdata set cnt = ' +  newcnt + ' where id = 1', err => {
                if (err) {
                    return console.error(err.message);
                }
                res.status(200)
                res.send('test 200 ' + row.cnt);
            });
        })
        /*
        db.run('insert into testdata (cnt) values (1)');
        db.all('select cnt from testdata', [], (err, rows) => {
            if (rows.length % 3 == 0) {
                res.status(500)
                res.send('test 500 ' + rows.length);
            } else {
                res.status(200)
                res.send('test 200 ' + rows.length);
            }
        });
         */
    })
};

module.exports = getLoginRoutes;
