# incwadi

incwadi is a book database to manage a lot of books.

![incwadi](screenshot.png)

## How it was made

An article can be found here https://medium.com/@A.Baldeweg/i-was-trying-new-things-accf33792e86

## Future

The first goal is to make a minimum viable product (mvp). It delivers only the features actually needed to be usable. As soon as this is done version 1.0.0 will be released. After that I will start developing new features. The development will follow the principles of lean development. Building small features, try it and decide weather it makes sense to invest time more into it.

I hope people will help in testing out the app as users oder getting involved into development. Since the languages (PHP, JavaScript) and the used tools are widespread, it should be easy to getting onboard.

## Getting Started

- Download the files from https://gitlab.com/a.baldeweg/incwadi_staff
- The files in dest/ should be located in your web root.
- Change the options in index.html, so they fit your needs
- Configure your webserver to redirect all requests to the index.html

Example for Apache

```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>
```

## Update

- Download the files like you would install the app and overwrite the existing ones.
- Make sure you have a backup of the previous index.html, especially your options.

## Options

- api - The url to your api.
- path - The path to your app.
- currency - The default currency used in the app.
- steps - Steps in which the prices can be raised and lowered.

## Dev

Run `yarn run watch` to start the development environment.

## Build

Run `yarn run build` to start a new build process.
