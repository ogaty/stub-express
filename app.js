'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const config = require('./config/config');
const app = new express();

// register JSON parser middlewear
//app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
const sqlite3 = require("sqlite3");
const db = new sqlite3.Database("./test.db", (err) => {
  if (err) {
    console.error("database error: " + err.message);
  } else {
    db.serialize(() => {
      //都度table削除（あれば）
      // db.run("drop table if exists testdata");
      //table生成（無ければ）
      db.run("create table if not exists testdata( \
                id integer primary key autoincrement, \
                cnt integer \
            )", (err) => {
        if (err) {
          console.error("insert error: " + err.message);
        } else {
          //初期データinsert
          db.run("insert into testdata(cnt) values(?)", 1);
        }
      });

      db.run("create table if not exists projects( \
                id integer primary key autoincrement, \
                name string \
            )", (err) => {
        if (err) {
          console.error("insert error: " + err.message);
        }
      });

      db.run("create table if not exists exports( \
                id integer primary key autoincrement, \
                status string, \
                requested_at datetime \
            )", (err) => {
        if (err) {
          console.error("insert error: " + err.message);
        }
      });
    });
  }
});
require('./config/cors')(app);
require('./routes/loginRoutes')(app);
require('./routes/personRoutes')(app);
require('./routes/versionRoutes')(app, config);
require('./routes/testRoutes')(app, db);

require('./routes/projectRoutes')(app, db);
require('./routes/exportRoutes')(app, db);

app.listen(3000, () => {
  /* eslint-disable */
  console.log('Server is up!');
  console.log('http://localhost:3000');
});
