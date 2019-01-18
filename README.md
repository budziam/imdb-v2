IMDb v2 [![CircleCI](https://circleci.com/gh/budziam/imdb-v2.svg?style=svg)](https://circleci.com/gh/budziam/imdb-v2)
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
