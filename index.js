const express = require('express');
const fetch = require('r2');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.post('/', (req, res, next) => {

  const body = JSON.stringify({
    payload: {
      channel: process.env.SLACK_CHANNEL || '#general',
      text: `App: ${req.body.app} was deployed to ${req.body.url}`
    }
  });

  const headers = {
    'Content-type': 'application/x-www-form-urlencoded'
  };

  fetch.post(process.env.SLACK_URL, { body, headers }).text
  .then(text => {
    res.send('ok');
  })
  .catch(next);

});

app.listen(process.env.PORT || 3001);
