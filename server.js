const express = require('express'),
cors = require('cors'),
bcrypt = require('bcrypt'),
handlemain = require('./controllers/handlemain'),
handlesignin = require('./controllers/handlesignin'),
handleprofile = require('./controllers/handleprofile'),
handleimage = require('./controllers/handleimage'),
handleregister = require('./controllers/handleregister')

const knex = require('knex'),
db=knex({
  client: 'pg',
  connection: {
    connectionString: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false
    }
  }
});

const app = express();
app.use(express.json())
app.use(cors())

app.get('/', (req,res) => handlemain.main(req,res,db))
app.post('/signin', (req,res) => handlesignin.signin(req,res,bcrypt,db))
app.post('/register', (req, res) => handleregister.register(req,res,bcrypt,db))
app.get('/profile/:id', (req,res)=>handleprofile.profile(req,res,db))
app.put('/image',(req,res)=>handleimage.image(req,res,db))
app.post('/imageurl',(req,res)=>handleimage.imageurl(req,res))

const port= process.env.PORT || 3000
app.listen(port,()=>{
  console.log(`Server started at port ${port}`)
})
