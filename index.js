// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

app.get("/api/", (req,res) => {
  res.json({unix: new Date().getTime(), utc: new Date().toUTCString()})
})

// console.log(new Date("01 Feb 2013").toUTCString())
// console.log(new Date(1451001600000))
// console.log(new Date("2015-12-255").toString())

app.get("/api/:date", (req,res) => {
  let date,unix;
  if(new Date(req.params.date).toString() === "Invalid Date"){
    date = new Date(Number(req.params.date)).toUTCString();
    unix = Number(req.params.date);

  } else {
    date = new Date(req.params.date).toUTCString()
    unix = new Date(req.params.date).getTime();
  }
  if(date === "Invalid Date") res.json({error: "Invalid Date"});
  res.json({unix: unix, utc: date})
})



// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
