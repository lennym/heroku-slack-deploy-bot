const express = require('express');
const fetch = require('r2');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.post('/', (req, res, next) => {

  console.log('Received incoming deploy hook');
  console.log(req.body);

  const text = `App: ${req.body.app} was deployed to ${req.body.url}`;

  const body = JSON.stringify({
    payload: {
      channel: process.env.SLACK_CHANNEL || '#general',
      text
    }
  });

  const headers = {
    'Content-type': 'application/x-www-form-urlencoded'
  };

  console.log('Sending payload to slack');
  console.log(body);

  fetch.post(process.env.SLACK_URL, { body, headers }).text
  .then(text => {
    console.log('Sent successfully');
    res.send('ok');
  })
  .catch(next);

});

app.listen(process.env.PORT || 3001);
