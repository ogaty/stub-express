'use strict';

const Router = require('express');

const getLoginRoutes = app => {
//  const router = new Router();

    app.post('/login', (req, res) => {
      const name = req.body.name;
      const password = req.body.password;
      let result = {'result': 'ng'}
      if (name == 'demo' && password == 'demo') {
        result = {'result': 'ok'};
      }

      res.send(result);
    })
};

module.exports = getLoginRoutes;
