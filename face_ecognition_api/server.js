import express from 'express'
import bcrypt from 'bcrypt-nodejs'
import cors from 'cors'
import knex from 'knex'
import register from './controllers/register.js'
import signin from './controllers/signin.js'

import profile from './controllers/profile.js'
import image from './controllers/image.js'
import setUpInfo from './controllers/setUpInfo.js'
 

const db = knex({
    client: 'pg',
    connection: {
      host: '127.0.0.1',
      port: 5432,
      user: 'oluwalonmuseya',
      password: '1Temito',
      database: 'smart_brain',
    },
  });



const app = express()
app.use(express.json())
app.use(cors())




app.get('/profile/:id', (req, res)=>{profile(req, res, db)})
 


app.post('/signin', (req, res) => {signin(req, res, bcrypt, db)});
  


app.post('/register', (req, res) => {register(req, res, bcrypt, db)});

app.put('/image', (req, res) => {image(req, res, db)});

app.post('/setUpInfo', (req, res) => {setUpInfo(req, res)})


app.listen(4500, (err) => {
    console.log(err)
})


// its not working when i add the profile and the image to it something must be wrong with them 