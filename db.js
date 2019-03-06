#!/usr/bin/env node

'use strict'

const express = require('express')
const bodyParser = require('body-parser');

const app = express()
const port = 3000

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, Content-Type, Accept, Authorization");
  res.header("Access-Control-Allow-Methods", "GET, OPTIONS, POST, PUT, PATCH, DELETE");
  next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

function renderEntries(counter, offset) {
  if (!offset) offset = 0;
  let entries = [];
  for (let i = 1; i <= counter; i++) {
    entries.push(
      {
        "added": "1545496807",
        "author": "Author",
        "genre": "1",
        "id": i + parseInt(offset),
        "price": "1",
        "stocked": "1",
        "title": "Title"
      }
    );
  }

  return entries;
}

app.get(/\/v1\/book\/(\d)/, (req, res) => {
  return res.json(
    {
      "added": "1545496807",
      "author": "Author",
      "genre": "1",
      "id": "1",
      "price": "1",
      "stocked": "1",
      "title": "Title"
    }
  );
})

app.get('/v1/book/find', (req, res) => {
  return res.json(
    renderEntries(20, req.query.offset)
  );
})

app.post('/v1/create', (req, res) => {
  return res.json(
    {
      "added": "1545496807",
      "author": "Author",
      "genre": "1",
      "id": "1",
      "price": "1",
      "stocked": "1",
      "title": "Title"
    }
  );
})

app.put(/\/v1\/book\/(\d)/, (req, res) => {
  return res.json(
    {
      "added": "1545496807",
      "author": "Author",
      "genre": "1",
      "id": "1",
      "price": "1",
      "stocked": "1",
      "title": "Title"
    }
  );
})

app.get('/v1/genre/', (req, res) => {
  return res.json(
    [
      {
        "id": "1",
        "name": "Crime"
      },
      {
        "id": "2",
        "name": "Novel"
      },
      {
        "id": "3",
        "name": "History"
      },
      {
        "id": "4",
        "name": "Politics"
      },
      {
        "id": "5",
        "name": "Languages"
      },
      {
        "id": "6",
        "name": "Foreign Language Books"
      },
      {
        "id": "7",
        "name": "Landscape"
      }
    ]
  );
})

app.listen(port, () => console.log('App listening on http://localhost:' + port))
