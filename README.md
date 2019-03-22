# incwadi

incwadi is a book database to manage a lot of books.

![incwadi](screenshot.png)

## How it was made

An article can be found here https://medium.com/@A.Baldeweg/i-was-trying-new-things-accf33792e86

## Future

The first goal is to make a minimum viable product (MVP). It delivers only the features actually needed to be usable. As soon as this is done version 1.0.0 will be released. After that I will start developing new features. The development will follow the principles of lean development. Building small features, try it and decide wether it makes sense to invest more time into it.

## Requirements

- NodeJS 10LTS
- Yarn

## Getting Started

Download the files from the repository.

```shell
git clone https://gitlab.com/a.baldeweg/incwadi_staff
```

The .env files specify vars. You must define them for production by creating a .env.production file.

```shell
touch .env.production
```

The file looks like:

```shell
API=URL
CURRENCY=EUR
STEPS=0.5
BRAND_COLOR=#000000
LOGO=src/assets/logo.png
```

Please change the values to your needs. For more informations, refer to the section Options.

Start the build process.

```shell
yarn build
```

The files in dest/ should be located in your web root.

Configure your webserver to redirect all requests to the index.html file.

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

If you still have the cloned repository and the .env files, you can pull for updates and start the build process.

```shell
git pull
yarn build
```

## Options

These options are used in the .env files.

- API - Defines the URL to your API.
- CURRENCY - The currency shown in the app.
- STEPS - In which steps the price will be increased and decreased.
- BRAND_COLOR - The hex code of your desired color.
- LOGO - Path to your custom logo.

## CLI

- yarn watch - Starts the development environment.
- yarn test - Runs the unit tests.
- yarn build - Builds the app.
