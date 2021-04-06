const express = require('express')
const app = express()
const cookieParser = require("cookie-parser")
const { v4: uuidv4 } = require('uuid')
const { Account } = require('./db.js')
const matchCredentials = require('./utils.js')

app.set('view engine', 'ejs')
app.use(cookieParser())
app.use(express.urlencoded({ extended: false }))

app.get('/', function (req, res) {
    res.render('pages/home')
})
app.get('/loginPage', function (req, res) {
    res.render('pages/login');
})

// create account
app.post('/create', async function (req, res) {
    let body = req.body;
    let id = uuidv4();

    const user = await Account.create({
        username: body.username,
        password: body.password,
        sessions: id
    });

    res.cookie('SID', id, {
        expires: new Date(Date.now() + 900000),
        httpOnly: true
    })
    console.log(user.toJSON())
    res.redirect('/')
})

// login
app.post('/login', function (req, res) {
    if (matchCredentials(req.body)) {
        res.render('pages/members')
    }
    else {
        res.redirect('/error')
    }
})

// logout
app.post('/logout', function (req, res) {
    let logout = res.cookie = "username=SID; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    if (logout) {
        res.redirect('/logout')
    }
})

app.get('/logout', function (req, res) {
    res.render('pages/logout')
})
app.get('/error', function (req, res) {
    res.render('pages/error')
})
app.all('*', function (req, res) {
    res.render('pages/error')
})

let PORT = process.env.PORT || 1612;
app.listen(PORT, console.log(`Listening at port ${PORT}`));