[![Build Status](https://travis-ci.com/hmilkovi/confi.svg?branch=master)](https://travis-ci.com/hmilkovi/confi)

# Confi

Some notes:
- Take care to setup ` SENDGRID ` environment variable inside ` docker-compose.yml ` and
` ./test/ingreation/test.js `
- Before running test lift up database:
```
$ docker-compose up -d db
```
- Application it self makes sure database is migrated
- Running tests:
```
$ npm run test-integration
$ npm run test-unit
```
