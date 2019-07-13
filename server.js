var express = require("express");
var path = require("path");

var app = express();
var PORT = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

var reservedTables = [];
var waitListTables = [];

function Table(id, name, email, phone, party){
    this.id = id;
    this.name = name;
    this.email = email;
    this.phone = phone;
    this.party = party;
};

app.get("/", function(req, res){
    res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/api/tables", function(req, res) {
    res.json(reservedTables);
  });

app.get("/reserve", function(req, res) {
    res.sendFile(path.join(__dirname, "reserve.html"));
  });

app.get("/api/wait", function(req, res) {
    res.json(waitListTables);
  });

app.post("/table", function(req, res) {
    var newTable = new Table(req.body.id, req.body.name, req.body.email, req.body.phone);
    console.log(newTable);
    if(reservedTables.length < 5){
        reservedTables.push(newTable);
        alert("Your table has been reserved!");
    } else {
        waitListTables.push(newTable);
        alert("No more reservations! Enjoy the wait list!");
    }
});

app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
});