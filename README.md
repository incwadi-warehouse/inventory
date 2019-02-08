# incwadi

incwadi is a book database to manage a lot of books.

![incwadi](screenshot.png)

# How it was made

An article can be found here https://medium.com/@A.Baldeweg/i-was-trying-new-things-accf33792e86

## Install

Put the following code into your HTML.

```html
<div id="app"></div>
```

Also add the following scripts.

```html
<script>
  window.config = window.config || {};
  config = {
    path: '/',
    api: "http://localhost:3000",
    currency: "EUR"
  }
</script>
<script src="/dist/main.js"></script>
```

Change the path and the options to fit you needs.

## Options

- api - The url to your api.
- path - The path to your app.
- currency - The default currency used in the app.

## Dev

Run `yarn run watch` to start the development environment.

## Build

Run `yarn run build` to start a new build process.
