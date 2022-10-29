# Changelog

## [Unreleased]

## [0.0.1] - 10-29-2022
### Added
- [dotenv](https://www.npmjs.com/package/dotenv) (a zero-dependency module that loads environment variables from a `.env` file into `process.env`).
- `api/v1` route for version 1 of API (versioning by URI)
- Middlewares in `server/src/middlewares.js`
- Sample `.env`

### Updated
- Folder structure: 
```
📂server
 ┣ 📂src
 ┃ ┣ 📂api
 ┃ ┃ ┣ 📂orders
 ┃ ┃ ┗ index.js
 ┃ ┣ app.js
 ┃ ┣ index.js
 ┃ ┗ middlewares.js
 ┣ 📑 .env.sample
 ┣ 📦 package-lock.json
 ┗ 📦 package.json
 ```
- Started using nodemon as a dev dependency for development.
- added app.js (HTTPserver) in `server/src`
- Updated Error handler in `server/src/middlewares.js` to check `process.env.NODE_ENV` before displaying error stack
- Updated README.md