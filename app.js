
var express = require("express")
var path = require('path');
var exphbs = require("express-handlebars")



var app = express()

var port = process.env.PORT || 3000;

app.engine("handlebars", exphbs({defaultLayout: "main"}))
app.set("view engine", "handlebars")


app.get('/', function (req, res) {
    res.status(200).render("home", {
    })
    
});

app.use(express.static('public'));


app.get('/composite', function (req, res) {
    res.status(200).render("composite", {
    })
    
});

app.get('/guns', function (req, res) {
    res.status(200).render("guns", {
    })
    
});

app.get('/home', function (req, res) {
    res.status(200).render("home", {
    })
    
});

app.get('/orders', function (req, res) {
    res.status(200).render("orders", {
    })
    
});

app.get('/players', function (req, res) {
    res.status(200).render("players", {
    })
    
});

app.get('/skins', function (req, res) {
    res.status(200).render("skins", {
    })
    
});
app.get('/skindetails', function (req, res) {
    res.status(200).render("skindetails", {
    })
    
});

app.get('/stickerdetails', function (req, res) {
    res.status(200).render("stickerdetails", {
    })
    
});

app.get('/stickers', function (req, res) {
    res.status(200).render("stickers", {
    })
    
});

app.get('*', function (req, res) {
    res.status(404).render("404", {page: req.url})
  });

app.listen(port, function () {
    console.log("== Server is listening on port", port);
});