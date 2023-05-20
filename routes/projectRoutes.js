'use strict';

const getProjectsRoutes = (app, db) => {
    // project list
    app.get('/projects/', (req, res) => {
        db.all('select id, name from projects', [], (err, rows) => {
            res.status(200)
            res.json(rows)
        })
    })

    // create project
    app.post('/projects/', (req, res) => {
        console.log(req.body)
        if (req.body.name) {
            db.run('insert into projects (name) values ("' + req.body.name + '")');
            let results = []
            db.all('select id, name from projects', [], (err, rows) => {
                res.status(200)
                res.json(rows)
            })
        } else {
            res.status(400)
            res.json({'error': 'name required'});
        }
    })

    // load project
    // fileは後回し
    app.post('/projects/:id/', (req, res) => {
        console.log(req.params.id)
        if (req.params.id) {
            db.all('select id, name from projects where id=:id', [req.params.id], (err, rows) => {
                res.status(200)
                res.json(rows)
            })
        } else {
            res.status(400)
            res.json({'error': 'id required'});
        }
    })
};

module.exports = getProjectsRoutes;
