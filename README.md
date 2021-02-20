# incwadi/inventory

incwadi is a book database to manage your books.

![incwadi](screenshot.png)

## How it was made

An article can be found here https://medium.com/@A.Baldeweg/i-was-trying-new-things-accf33792e86

## Requirements

- NodeJS 12LTS
- Yarn

## Getting Started

Download the files from the repository.

```shell
git clone https://github.com/abaldeweg/incwadi_inventory.git
```

Create the files `.env` and `.env.production` with the following content. Please fit it to your needs.

```shell
API=URL
LOCALE=en
BRAND_COLOR=#000000
LOGO=src/assets/logo.png # set to false for default logo
```

Start the build process.

```shell
yarn build
```

The files in `dest/` should be located in your web root.

Configure your webserver to redirect all requests to the `index.html` file.

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

Remove the old files and download the new ones like you would install the app.

```shell
bin/update
```

## CLI

- yarn build - Builds the app.
- yarn watch - Starts the development environment.
- yarn test - Runs the unit tests.
