# inventory

incwadi is a book database to manage your books.

![incwadi](screenshot.png)

## Requirements

- NodeJS 12LTS
- Yarn
- VueJS Binary

## Getting Started

Download the files from the repository.

```shell
git clone https://github.com/incwadi-warehouse/inventory
```

Create the file `.env.local` and overwrite env vars from `.env`, if needed.

Start the build process.

```shell
yarn build
```

The files in `dest/` should be located in your web root.

## Apache

Configure your webserver to redirect all requests to the `index.html` file.

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
yarn install --frozen-lockfile
yarn build
```
