#!/usr/bin/env node

'use strict'

const sqlite3 = require('sqlite3');
const express = require('express')
const app = express()
const port = 3000
const database = './db'
const bodyParser = require('body-parser');

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, Content-Type, Accept");
  next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/book', (req, res) => {
  let db = new sqlite3.Database(database, (err) => {
    if (err) {
      return console.error(err.message);
    }
  });

  db.serialize(() => {
    db.all('SELECT * FROM book WHERE id=$id', { $id: req.query.id }, (err, rows) => {
      if (err) {
        console.error(err.message);
      }

      res.json(rows[0])
    });
  });

  db.close((err) => {
    if (err) {
      return console.error(err.message);
    }
  });
})

app.get('/find', (req, res) => {
  let db = new sqlite3.Database(database, (err) => {
    if (err) {
      return console.error(err.message);
    }
  });

  db.serialize(() => {
    db.all('SELECT * FROM book WHERE author LIKE $term OR title LIKE $term LIMIT 20 OFFSET $offset', {
      $term: '%' + req.query.term + '%',
      $offset: req.query.offset
    }, (err, rows) => {
      if (err) {
        console.error(err.message);
      }

      res.json(rows)
    });
  });

  db.close((err) => {
    if (err) {
      return console.error(err.message);
    }
  });
})

app.post('/create', (req, res) => {
  let db = new sqlite3.Database(database, (err) => {
    if (err) {
      return console.error(err.message);
    }
  });

  db.serialize(() => {
    let date = Math.round(new Date().getTime() / 1000);
    db.all('INSERT INTO book(title, author, price, genre, added) VALUES($title, $author, $price, $genre, $added)', {
      $title: req.body.title,
      $author: req.body.author,
      $price: req.body.price,
      $genre: req.body.genre,
      $added: date
    }, (err, rows) => {
      if (err) {
        console.error(err.message);
      }

      res.json(rows)
    });
  });

  db.close((err) => {
    if (err) {
      return console.error(err.message);
    }
  });
})

app.post('/update', (req, res) => {
  let db = new sqlite3.Database(database, (err) => {
    if (err) {
      return console.error(err.message);
    }
  });

  db.serialize(() => {
    db.all('UPDATE book SET title=$title, author=$author, genre=$genre, price=$price, stocked=$stocked WHERE id=$id', {
      $id: req.body.id,
      $title: req.body.title,
      $author: req.body.author,
      $genre: req.body.genre,
      $price: req.body.price,
      $stocked: req.body.stocked
    }, (err, rows) => {
      if (err) {
        console.error(err.message);
      }

      res.json(rows)
    });
  });

  db.close((err) => {
    if (err) {
      return console.error(err.message);
    }
  });
})

app.get('/genres', (req, res) => {
  let db = new sqlite3.Database(database, (err) => {
    if (err) {
      return console.error(err.message);
    }
  });

  db.serialize(() => {
    db.all('SELECT * FROM genre', (err, rows) => {
      if (err) {
        console.error(err.message);
      }

      res.json(rows)
    });
  });

  db.close((err) => {
    if (err) {
      return console.error(err.message);
    }
  });
})

app.listen(port, () => console.log('App listening on http://localhost:' + port))
