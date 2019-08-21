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
        "author": {
          "firstname": "Firstname",
          "surname": "Surname"
        },
        "genre": {
          "id": 1,
          "name": "name"
        },
        "id": i + parseInt(offset),
        "price": "1",
        "sold": "0",
        "title": "Title",
        "releaseYear": 2019,
        "type": "paperback",
        "premium": false,
        "lendTo": 1,
        "lendOn": 1557168763
      }
    );
  }

  return entries;
}

app.get(/\/v1\/book\/(\d)/, (req, res) => {
  return res.json(
    {
      "added": "1545496807",
      "author": {
        "firstname": "Firstname",
        "surname": "Surname"
      },
      "genre": {
        "id": 1,
        "name": "name"
      },
      "id": "1",
      "price": "1",
      "sold": "0",
      "title": "Title",
      "releaseYear": 2019,
      "type": "paperback",
      "premium": false,
      "lendTo": 1,
      "lendOn": 1557168763
    }
  );
})

app.get('/v1/book/find', (req, res) => {
  return res.json(
    {
      "counter": 40,
      "books": renderEntries(20, req.query.offset)
    }
  );
})

app.post('/v1/book/new', (req, res) => {
  return res.json(
    {
      "added": "1545496807",
      "author": {
          "firstname": "Firstname",
          "surname": "Surname"
        },
      "genre": {
        "id": 1,
        "name": "name"
      },
      "id": "1",
      "price": "1",
      "sold": "0",
      "title": "Title",
      "releaseYear": 2019,
      "type": "paperback",
      "premium": false,
      "lendTo": 1,
      "lendOn": 1557168763
    }
  );
})

app.put(/\/v1\/book\/(\d)/, (req, res) => {
  return res.json(
    {
      "added": "1545496807",
      "author": {
        "firstname": "Firstname",
        "surname": "Surname"
      },
      "genre": {
        "id": 1,
        "name": "name"
      },
      "id": "1",
      "price": "1",
      "sold": "0",
      "title": "Title",
      "releaseYear": 2019,
      "type": "paperback",
      "premium": false,
      "lendTo": 1,
      "lendOn": 1557168763
    }
  );
})

app.get('/v1/genre/', (req, res) => {
  return res.json(
    {
      "genres": [
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
    }
  );
})

app.post('/v1/genre/new', (req, res) => {
  return res.json(
    {
      "id": "1",
      "name": "Crime"
    }
  );
})

app.get('/v1/branch/', (req, res) => {
  return res.json(
    {
      "branches": [
        {
          "id": 1,
          "name": "Branch 1"
        },
        {
          "id": 2,
          "name": "Branch 2"
        },
        {
          "id": 3,
          "name": "Branch 3"
        }
      ]
    }
  );
})

app.get('/v1/customer/', (req, res) => {
  return res.json(
    {
      "customers": [
        {
          "id": 1,
          "name": "name",
          "notes": "notes",
          "books": [],
          "branch": {
            "id": 1,
            "name": "Branch 1"
          }
        },
        {
          "id": 2,
          "name": "name",
          "notes": "notes",
          "books": [],
          "branch": {
            "id": 1,
            "name": "Branch 1"
          }
        }
      ]
    }
  );
})

app.post('/v1/customer/new/', (req, res) => {
  return res.json(
    {
      "id": 1,
      "name": "name",
      "notes": "notes",
      "books": [],
      "branch": {
        "id": 1,
        "name": "Branch 1"
      }
    }
  );
})

app.post('/api/login_check/', (req, res) => {
  return res.json(
    {
      "token": "token"
    }
  );
})

app.get('/v1/me', (req, res) => {
  return res.json(
    {
      "id": 1,
      "username": "admin",
      "roles": [
        "ROLE_ADMIN",
        "ROLE_USER"
      ],
      "branch": {
        "id": 1,
        "name": "test"
      }
    }
  );
})

app.put('/v1/password/', (req, res) => {
  return res.json(
    {
      "msg": "Password changed successfully!"
    }
  );
})

app.listen(port, () => console.log('App listening on http://localhost:' + port))
