var express = require("express")
var path = require('path');
const { engine } = require('express-handlebars');
var exphbs = require("express-handlebars")

var db = require('./database/dbcon')

var app = express()
app.use(express.json())
app.use(express.urlencoded({extended: true}))

var port = process.env.PORT || 13303;
app.engine("handlebars", engine({defaultLayout: "main"}))
app.set("view engine", "handlebars")


app.get('/', function (req, res) {
    res.status(200).render("home", {
    }) 
    
});

app.use(express.static('public'));

app.get('/home', function (req, res) {
    res.status(200).render("home", {
    })
    
});


app.get('/players', function(req, res)
{
    // Declare Query 1
    let query1;

    // If there is no query string, we just perform a basic SELECT
    if (req.query.first_name === undefined)
    {
        query1 = "SELECT * FROM players;";
    }

    // If there is a query string, we assume this is a search, and return desired results
    else
    {
        query1 = `SELECT * FROM players WHERE first_name LIKE "${req.query.first_name}%"`
    }

    // Run the 1st query
    db.pool.query(query1, function(error, rows, fields){
        
        // Save the people
        let players = rows;
            return res.render('players', {data: players});
        })
});

app.get('/skins', function(req, res)
{
    // Declare Query 1
    let query1;

    // If there is no query string, we just perform a basic SELECT
    if (req.query.skin_name === undefined)
    {
        query1 = "SELECT * FROM skins;";
    }

    // If there is a query string, we assume this is a search, and return desired results
    else
    {
        query1 = `SELECT * FROM skins WHERE skin_name LIKE "${req.query.skin_name}%"`
    }

    // Run the 1st query
    db.pool.query(query1, function(error, rows, fields){
        
        // Save the people
        let skins = rows;
            return res.render('skins', {data: skins});
        })
});

app.get('/orders', function(req, res)
{
    // Declare Query 1
    let query1;

    // If there is no query string, we just perform a basic SELECT
    if (req.query.playerid === undefined)
    {
        query1 = "SELECT * FROM orders;";
    }

    // If there is a query string, we assume this is a search, and return desired results
    else
    {
        query1 = `SELECT * FROM orders WHERE player_id LIKE "${req.query.playerid}%"`
    }

    // Run the 1st query
    db.pool.query(query1, function(error, rows, fields){
        
        // Save the people
        let orders = rows;
            return res.render('orders', {data: orders});
        })
});

app.get('/stickers', function(req, res)
{
    // Declare Query 1
    let query1;

    // If there is no query string, we just perform a basic SELECT
    if (req.query.sticker_name === undefined)
    {
        query1 = "SELECT * FROM stickers;";
    }

    // If there is a query string, we assume this is a search, and return desired results
    else
    {
        query1 = `SELECT * FROM stickers WHERE sticker_name LIKE "${req.query.sticker_name}%"`
    }

    // Run the 1st query
    db.pool.query(query1, function(error, rows, fields){
        
        // Save the people
        let stickers = rows;
            return res.render('stickers', {data: stickers});
        })
});
    
app.get('/guns', function(req, res)
{
    // Declare Query 1
    let query1;

    // If there is no query string, we just perform a basic SELECT
    if (req.query.gun_name === undefined)
    {
        query1 = "SELECT * FROM guns;";
    }

    // If there is a query string, we assume this is a search, and return desired results
    else
    {
        query1 = `SELECT * FROM guns WHERE gun_name LIKE "${req.query.gun_name}%"`
    }

    // Run the 1st query
    db.pool.query(query1, function(error, rows, fields){
        
        // Save the people
        let guns = rows;
            return res.render('guns', {data: guns});
        })
});


app.get('/composite', function(req, res)
{
    // Declare Query 1
    let query1;

    // If there is no query string, we just perform a basic SELECT
    if (req.query.gun_id === undefined)
    {
        query1 = "SELECT * FROM skinguns;";
    }

    // If there is a query string, we assume this is a search, and return desired results
    else
    {
        query1 = `SELECT * FROM skinguns WHERE gun_id LIKE "${req.query.gun_id}%"`
    }

    // Run the 1st query
    db.pool.query(query1, function(error, rows, fields){
        
        // Save the people
        let composite = rows;
            return res.render('composite', {data: composite});
        })
});

app.get('/skindetails', function(req, res)
{
    // Declare Query 1
    let query1;

    // If there is no query string, we just perform a basic SELECT
    if (req.query.skindetail_name === undefined)
    {
        query1 = "SELECT * FROM skindetails;";
    }

    // If there is a query string, we assume this is a search, and return desired results
    else
    {
        query1 = `SELECT * FROM skindetails WHERE skin_name LIKE "${req.query.skindetail_name}%"`
    }

    // Run the 1st query
    db.pool.query(query1, function(error, rows, fields){
        
        // Save the people
        let skindetails = rows;
            return res.render('skindetails', {data: skindetails});
        })
});

app.get('/stickerdetails', function(req, res)
{
    // Declare Query 1
    let query1;

    // If there is no query string, we just perform a basic SELECT
    if (req.query.stickerdetail_name === undefined)
    {
        query1 = "SELECT * FROM stickerdetails;";
    }

    // If there is a query string, we assume this is a search, and return desired results
    else
    {
        query1 = `SELECT * FROM stickerdetails WHERE sticker_name LIKE "${req.query.stickerdetail_name}%"`
    }

    // Run the 1st query
    db.pool.query(query1, function(error, rows, fields){
        
        // Save the people
        let stickerdetails = rows;
            return res.render('stickerdetails', {data: stickerdetails});
        })
});

app.get('*', function (req, res) {
    res.status(404).render("404", {page: req.url})
  });

app.listen(port, function () {
    console.log("== Server is listening on port", port, 'press Ctrl-C to terminate.');
});

app.post('/add-skin-ajax', function(req, res) 
{
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;

    // Capture NULL values
    let skin_name = parseInt(data.skin_name);
    if (isNaN(skin_name))
    {
        skin_name = 'NULL'
    }

    let gun_id = parseInt(data.gun_id);
    if (isNaN(gun_id))
    {
        gun_id = 'NULL'
    }

    // Create the query and run it on the database
    query1 = `INSERT INTO skins (skin_name, gun_id) VALUES ('${data.skin_name}', ${data.gun_id})`;
    db.pool.query(query1, function(error, rows, fields){

        // Check to see if there was an error
        if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error)
            res.sendStatus(400);
        }
        else
        {
            // If there was no error, perform a SELECT * on bsg_people
            query2 = `SELECT * FROM skins;`;
            db.pool.query(query2, function(error, rows, fields){

                // If there was an error on the second query, send a 400
                if (error) {
                    
                    // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
                    console.log(error);
                    res.sendStatus(400);
                }
                // If all went well, send the results of the query back.
                else
                {
                    res.send(rows);
                }
            })
        }
    })
});

app.post('/add-player-ajax', function(req, res) 
{
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;

    // Capture NULL values
    let player_id = parseInt(data.player_id);
    if (isNaN(player_id))
    {
        player_id = 'NULL'
    }

    let username = parseInt(data.username);
    if (isNaN(username))
    {
        username = 'NULL'
    }

    let first_name = parseInt(data.first_name);
    if (isNaN(first_name))
    {
        first_name = 'NULL'
    }

    let last_name = parseInt(data.last_name);
    if (isNaN(last_name))
    {
        last_name = 'NULL'
    }

    let email = parseInt(data.email);
    if (isNaN(email))
    {
        email = 'NULL'
    }


    // Create the query and run it on the database
    query1 = `INSERT INTO players (username, first_name, last_name, email) VALUES ('${data.username}', '${data.first_name}', '${data.last_name}', '${data.email}')`;
    db.pool.query(query1, function(error, rows, fields){

        // Check to see if there was an error
        if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error)
            res.sendStatus(400);
        }
        else
        {
            // If there was no error, perform a SELECT * on bsg_people
            query2 = `SELECT * FROM players;`;
            db.pool.query(query2, function(error, rows, fields){

                // If there was an error on the second query, send a 400
                if (error) {
                    
                    // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
                    console.log(error);
                    res.sendStatus(400);
                }
                // If all went well, send the results of the query back.
                else
                {
                    res.send(rows);
                }
            })
        }
    })
});

app.post('/add-order-ajax', function(req, res) 
{
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;

    // Capture NULL values
    let player_id = parseInt(data.player_id);
    if (isNaN(player_id))
    {
        player_id = 'NULL'
    }

    let skin_id = parseInt(data.skin_id);
    if (isNaN(skin_id))
    {
        skin_id = 'NULL'
    }

    let sticker_id = parseInt(data.sticker_id);
    if (isNaN(sticker_id))
    {
        sticker_id = 'NULL'
    }

    let order_date = parseInt(data.order_date);
    if (isNaN(order_date))
    {
        order_date = 'NULL'
    }

    let total_price = parseInt(data.total_price);
    if (isNaN(total_price))
    {
        total_price = 'NULL'
    }


    // Create the query and run it on the database
    query1 = `INSERT INTO orders (player_id, skin_id, sticker_id, order_date, total_price) VALUES (${data.player_id}, ${data.skin_id}, ${data.sticker_id}, '${data.order_date}', ${data.total_price})`;
    db.pool.query(query1, function(error, rows, fields){

        // Check to see if there was an error
        if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error)
            res.sendStatus(400);
        }
        else
        {
            // If there was no error, perform a SELECT * on bsg_people
            query2 = `SELECT * FROM orders;`;
            db.pool.query(query2, function(error, rows, fields){

                // If there was an error on the second query, send a 400
                if (error) {
                    
                    // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
                    console.log(error);
                    res.sendStatus(400);
                }
                // If all went well, send the results of the query back.
                else
                {
                    res.send(rows);
                }
            })
        }
    })
});

app.post('/add-sticker-ajax', function(req, res) 
{
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;

    // Capture NULL values
    let sticker_name = parseInt(data.sticker_name);
    if (isNaN(sticker_name))
    {
        sticker_name = 'NULL'
    }

    // Create the query and run it on the database
    query1 = `INSERT INTO stickers (sticker_name) VALUES ('${data.sticker_name}')`;
    db.pool.query(query1, function(error, rows, fields){

        // Check to see if there was an error
        if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error)
            res.sendStatus(400);
        }
        else
        {
            // If there was no error, perform a SELECT * on bsg_people
            query2 = `SELECT * FROM stickers;`;
            db.pool.query(query2, function(error, rows, fields){

                // If there was an error on the second query, send a 400
                if (error) {
                    
                    // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
                    console.log(error);
                    res.sendStatus(400);
                }
                // If all went well, send the results of the query back.
                else
                {
                    res.send(rows);
                }
            })
        }
    })
});

app.post('/add-skindetail-ajax', function(req, res) 
{
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;

    // Capture NULL values
    let skin_name = parseInt(data.skin_name);
    if (isNaN(skin_name))
    {
        skin_name = 'NULL'
    }

    let skin_price = parseInt(data.skin_price);
    if (isNaN(skin_price))
    {
        skin_price = 'NULL'
    }

    // Create the query and run it on the database
    query1 = `INSERT INTO skindetails (skin_name, skin_price) VALUES ('${data.skin_name}', ${data.skin_price})`;
    db.pool.query(query1, function(error, rows, fields){

        // Check to see if there was an error
        if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error)
            res.sendStatus(400);
        }
        else
        {
            // If there was no error, perform a SELECT * on bsg_people
            query2 = `SELECT * FROM skindetails;`;
            db.pool.query(query2, function(error, rows, fields){

                // If there was an error on the second query, send a 400
                if (error) {
                    
                    // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
                    console.log(error);
                    res.sendStatus(400);
                }
                // If all went well, send the results of the query back.
                else
                {
                    res.send(rows);
                }
            })
        }
    })
});

app.post('/add-stickerdetail-ajax', function(req, res) 
{
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;

    // Capture NULL values
    let sticker_name = parseInt(data.sticker_name);
    if (isNaN(sticker_name))
    {
        sticker_name = 'NULL'
    }
    let sticker_price = parseInt(data.sticker_price);
    if (isNaN(sticker_price))
    {
        sticker_price = 'NULL'
    }

    // Create the query and run it on the database
    query1 = `INSERT INTO stickerdetails (sticker_name, sticker_price) VALUES ('${data.sticker_name}', ${data.sticker_price})`;
    db.pool.query(query1, function(error, rows, fields){

        // Check to see if there was an error
        if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error)
            res.sendStatus(400);
        }
        else
        {
            // If there was no error, perform a SELECT * on bsg_people
            query2 = `SELECT * FROM stickerdetails;`;
            db.pool.query(query2, function(error, rows, fields){

                // If there was an error on the second query, send a 400
                if (error) {
                    
                    // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
                    console.log(error);
                    res.sendStatus(400);
                }
                // If all went well, send the results of the query back.
                else
                {
                    res.send(rows);
                }
            })
        }
    })
});