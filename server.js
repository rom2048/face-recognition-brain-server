const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const knex = require('knex');

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

const db = knex({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    user : 'postgres',
    password : 'vxa23u36',
    database : '\'face-recognition\''
  }
});

app.use(cors());
app.use(bodyParser.json()); 

app.get('/', (request, response) => {
  response.send(db.users);
})
app.get('/profile/:id', (request, response) => {profile.handleProfileGet(request, response, db)})
app.post('/signin', signin.handleSignin(db, bcrypt))
app.post('/register', (request, response) => {register.handleRegister(request, response, db, bcrypt)} )
app.put('/image', (request, response) => {image.handleImage(request, response, db )})
app.post('/imageurl', (request, response) => {image.handleApiCall(request, response)})
app.listen(3000, () => {
  console.log('app is running on port 3000');
})
