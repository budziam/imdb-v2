IMDb v2 [![CircleCI](https://circleci.com/gh/budziam/imdb-v2.svg?style=svg)](https://circleci.com/gh/budziam/imdb-v2) [![Coverage Status](https://coveralls.io/repos/github/budziam/imdb-v2/badge.svg?branch=coverage)](https://coveralls.io/github/budziam/imdb-v2?branch=coverage)
=======
Simple application storing movies and comments.

## Setup
Copy `.env.example` to `.env` and adjust variables values.

## How to run
```bash
$ docker-compose up --build -d
```

## How to test
```bash
$ docker-compose exec app bash
$ yarn test
```
