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

// let amk = new Date()
// console.log(amk.toUTCString())

// console.log(new Date("2015-12-25").toUTCString())
// console.log(new Date("1451001600000").toUTCString())
console.log(new Date("1451001600000").toUTCString())
console.log(new Date("2015-12-25").toUTCString())

app.get("/api/", (req,res) => {
  res.json({unix: new Date().getTime(), utc: new Date().toUTCString()})
})

app.get("/api/:date", (req,res) => {
  let date,unix;
  if(req.params.date.length > 10){
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
