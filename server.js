#!/usr/bin/env nodemon

const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const session = require('express-session');

let idCounter = 3;
let users = [{
        id: 1,
        name: 'Sam',
        email: 'sam@test.com',
        age: 29
    },
    {
        id: 2,
        name: 'Kim',
        email: 'kim@test.com',
        age: 26
    }
];

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(session({secret: 'keyboard cat'}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extend: true }));
app.use(express.static('views'));

app.get('/', (req, res) => {
    res.render('index', {
        title: 'This is a title!'
    });
});

app.get('/form', (req, res) => {

    res.render('form', {
        user: {}
    });

});

app.get('/form/:id', (req, res) => {

    getUser(req.params.id).then((user)=>{
        removeUser(req.params.id);
        res.render('form', {
            user: user
        })
    });
});

app.get('/users', (req, res) => {
    res.render('users', {
        users: users
    });
});

app.get('/delete/:id', (req, res) => {
    console.log('Deleting user id: ' + req.params.id);
    removeUser(req.params.id);
    res.redirect('/users');
});

app.post('/form', (req, res) => {

    let userObject = {
        id: idCounter,
        name: req.body.name,
        email: req.body.email,
        age: req.body.age
    };

    users.push(userObject);
    idCounter++;

    res.redirect('/users');
});


app.listen(3000, () => {
    console.log('Example app listening on port 3000!');
});

function removeUser(id) {
    users.forEach((user, index)=>{
        if (id == user.id) {
            users.splice(index, 1);
        }
    })
}

function getUser(id) {
    return new Promise(executor);
    function executor(resolve, reject) {
        users.forEach((user)=>{
            if (id == user.id) {
                resolve(user);
            }
        });
        reject({message: 'no user found'})
    }

}