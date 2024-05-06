const express = require('express')
const cors = require('cors')
const mysql = require('mysql2')
require('dotenv').config()
const app = express()

app.use(cors())
app.use(express.json())

const connection = mysql.createConnection(process.env.DATABASE_URL)

app.get('/', (req, res) => {
    res.send('Hello world!!')
})

//get
//cakeview
app.get('/cakeview', (req, res) => {
    connection.query(
        'SELECT * FROM CakeView',
        function (err, results, fields) {
            res.send(results)
        }
    )
})

//cakepopular
app.get('/cakepopular', (req, res) => {
    connection.query(
        'SELECT * FROM CakePopular',
        function (err, results, fields) {
            res.send(results)
        }
    )
})
app.get('/cakepopular/:id', (req, res) => {
    const id = req.params.id;
    connection.query(
        'SELECT * FROM CakePopular WHERE id = ?', [id],
        function (err, results, fields) {
            res.send(results)
        }
    )
})

//menu
app.get('/menucake', (req, res) => {
    connection.query(
        'SELECT * FROM MenuCake',
        function (err, results, fields) {
            res.send(results)
        }
    )
})
app.get('/menucake/:id', (req, res) => {
    const id = req.params.id;
    connection.query(
        'SELECT * FROM MenuCake WHERE id = ?', [id],
        function (err, results, fields) {
            res.send(results)
        }
    )
})

//event
app.get('/event', (req, res) => {
    connection.query(
        'SELECT * FROM Event',
        function (err, results, fields) {
            res.send(results)
        }
    )
})
app.get('/event/:id', (req, res) => {
    const id = req.params.id;
    connection.query(
        'SELECT * FROM Event WHERE id = ?', [id],
        function (err, results, fields) {
            res.send(results)
        }
    )
})

//register user
app.get('/register', (req, res) => {
    connection.query(
        'SELECT * FROM Register',
        function (err, results, fields) {
            res.send(results)
        }
    )
})
app.get('/register/:id', (req, res) => {
    const id = req.params.id;
    connection.query(
        'SELECT * FROM Register WHERE id = ?', [id],
        function (err, results, fields) {
            res.status(200).send(results)
        }
    )
})

//favourite cake
app.get('/favourite', (req, res) => {
    connection.query(
        'SELECT * FROM Favourite',
        function (err, results, fields) {
            res.send(results)
        }
    )
})

app.get('/login/:id', (req, res) => {
    const id = req.params.id;
    connection.execute(
        'SELECT  avatar FROM Register WHERE id = ?',[id],
        [req.body.email,req.body.password],
        function(err, results, fields) {
            if (err) {
                console.error('Error in POST /register:', err);
                res.status(500).send('Error');
            } else {
                res.status(200).send(results);
            }
        }
    );
});
//login
app.post('/login', (req, res) => {
    connection.execute(
        'SELECT * FROM Register WHERE email=? AND pass=?',
        [req.body.email,req.body.password],
        function(err, results, fields) {
            if (err) {
                console.error('Error in POST /register:', err);
                res.status(500).send('Error Login');
            } else {
                res.status(200).send(results);
            }
        }
    );
});



//create
//regis
app.post('/register', (req, res) => {
    connection.query(
        'INSERT INTO `Register` (`fname`, `lname`, `username`,`email`,`phonenumber`, `pass`, `avatar`) VALUES (?, ?, ?, ?, ?, ?, ?)',
        [req.body.fname, req.body.lname, req.body.username, req.body.email, req.body.phonenumber, req.body.password, req.body.avatar],
         function (err, results, fields) {
            if (err) {
                console.error('Error in POST /register:', err);
                res.status(500).send('Error adding register');
            } else {
                res.status(201).send(results);
            }
        }
    )
})
//favourite cake
app.post('/favourite', (req, res) => {
    connection.query(
        'INSERT INTO `Favourite` (`name`, `detail`, `price`, `avatar`) VALUES (?, ?, ?, ?)',
        [req.body.name, req.body.detail, req.body.price,  req.body.avatar],
         function (err, results, fields) {
            if (err) {
                console.error('Error in POST /favourite:', err);
                res.status(500).send('Error adding user');
            } else {
                res.status(201).send(results);
            }
        }
    )
})

//update
app.put('/register', (req, res) => {
    connection.query(
        'UPDATE `Register` SET `fname`=?, `lname`=?, `username`=?, `email`=?,`phonenumber`=?,`password`=?, `avatar`=? WHERE id =?',
        [req.body.fname, req.body.lname, req.body.username, req.body.email, req.body.phonenumber, req.body.password, req.body.avatar, req.body.id],
         function (err, results, fields) {
            if(err){
                console.error('Error in Put /register: ', err);
                res.status(500).send('Error update user')
            }else{
                res.status(201).send(results)
            }
            
        }
    )
})

//forget password
app.put('/login' , (req,res) => {
    connection.query(
        'UPDATE Register SET  `pass` = ?  WHERE id = ?',
        [req.body.password,req.body.id],
        function (err, results, fields){
            if(err){
                console.error('Error in Put /register: ', err);
                res.status(500).send('Error update password')
            }else{
                res.status(201).send(results)
            }
        }
    )
})
//delete
app.delete('/favourite', (req, res) => {
    connection.query(
        'DELETE FROM `Favourite` WHERE id =?',
        [req.body.id],
         function (err, results, fields) {
            res.send(results)
        }
    )
})

app.listen(process.env.PORT || 3001, () => {
    console.log('CORS-enabled web server listening on port 3001')
})
