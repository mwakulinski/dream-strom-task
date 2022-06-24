## Installation

```bash
$ npm install
```

## .env

Before running the app you have to:

1. create .env file in a root folder;
2. sample document is provided as ".env_sample" (it contains SECRET, which normally would be hidden);
3. sign in to https://openweathermap.org/ -> you will get your own private key;
4. pass your private kye as APPID.

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Database

To make things easier I used sqlite3, database file is in root folder and is called 'db'
