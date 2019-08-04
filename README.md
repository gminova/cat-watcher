# [Search for gifs](https://search-gifs.herokuapp.com/) :mag:
[![Build Status](https://travis-ci.org/gminova/search-gifs.svg?branch=master)](https://travis-ci.org/gminova/search-gifs)
[![codecov](https://codecov.io/gh/gminova/search-gifs/branch/master/graph/badge.svg)](https://codecov.io/gh/gminova/search-gifs)
![Heroku](https://heroku-badge.herokuapp.com/?app=search-gifs)

## Installation 
```
npm install
```

## To run app locally
1. Go to [GIPHY](https://developers.giphy.com/) and get an API key
2. Create a .env file in the root directory
3. Paste the following in your .env file
```
GIPHY_KEY=PASTE-YOUR-KEY-HERE
```
4. To start app on http://localhost:3000

```
npm start
```

## Testing
```
npm test
```
Testing was done using supertest, nock and nyc for coverage
```
npm run coverage
```
![](https://i.imgur.com/ybjEY7n.png)
```
 npm run report-coverage
```

## Screenshots

![](https://i.imgur.com/4lLOI3d.jpg)
![](https://i.imgur.com/3LRB6uV.jpg)

## Tech stack
HTML, CSS, JavaScript, Node.js, Git & GitHub, Travis CI, npm, supertest, tape, tap-spec, nock, nyc, eslint and Heroku
