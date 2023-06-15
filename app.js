const express = require('express')
const cookieParser = require('cookie-parser')
const ejs = require('ejs')
const ejsLayout = require('express-ejs-layouts')
const app = express()


// View Engine Setup
app.set("views", __dirname + "/views");
app.set("view engine", "ejs");
//layouts setup
app.use(ejsLayout)
app.use(express.static('public'))
//coookie parser
app.use(cookieParser())

let isLoggedIn = 0
const { correctUsername, correctPassowrd } = {
    correctUsername: "Arya",
    correctPassowrd: 1111
}

let errorMessage = ''

app.get("/", (req, res) => {
    errorMessage = ''
    let message = "to see the private content please login"
    const cookies = req.cookies
    if (typeof cookies !== 'undefined' && cookies) {
        isLoggedIn = cookies.isLoggedIn
    }

    if (isLoggedIn)
        message = "you are logged in click on the link to the the private content"

    res.render("index.ejs", {
        message: message,
        isLoggedIn: isLoggedIn,
        errorMessage: errorMessage
    })
})

app.get("/login", (req, res) => {

    const userName = req.query.username
    const password = req.query.password
    if (userName && password) {
        if (userName == correctUsername && password == correctPassowrd) {
            errorMessage = ""
            res.cookie("isLoggedIn", "1")
            res.redirect("/")
        } else {
            errorMessage = 'password is not correct try again'
            res.render("login", {
                message: "Please login",
                isLoggedIn: isLoggedIn,
                errorMessage: errorMessage
            })
        }
    } else {

        res.render("login", {
            message: "Please login",
            isLoggedIn: isLoggedIn,
            errorMessage: errorMessage
        })
    }
})



app.get("/privateContent", (req, res) => {
    const cookies = req.cookies
    const isLoggedIn = cookies.isLoggedIn
    if (isLoggedIn) {
        errorMessage = ''
        res.render("private", {
            message: "Please login",
            isLoggedIn: isLoggedIn,
            errorMessage: errorMessage
        })
    } else {
        errorMessage = "you cannot see private content. Please login first"
        res.redirect('/login')
    }
})


app.get("/logout", (req, res) => {

    res.clearCookie("isLoggedIn")
    res.redirect("/")
})



app.listen(4000, (err) => {
    if (err) {

    } else {
        console.log("server is listening on the address : localhost:4000");
    }
})