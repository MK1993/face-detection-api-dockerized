const express = require('express'),
cors = require('cors'),
bcrypt = require('bcrypt'),
handlemain = require('./controllers/handlemain'),
handlesignin = require('./controllers/handlesignin'),
handleprofile = require('./controllers/handleprofile'),
handleimage = require('./controllers/handleimage'),
handleregister = require('./controllers/handleregister'),
morgan = require('morgan'),
auth = require('./controllers/authorization');

const knex = require('knex'),
db=knex({
  client: 'pg',
  connection: {
    connectionString: process.env.POSTGRES_URL,
    ssl: {
      rejectUnauthorized: false
    }
  }
});

const app = express();

const whitelist = ['http://localhost:3001']
const corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}

app.use(morgan('combined'))
app.use(cors(corsOptions))
app.use(express.json())

app.get('/', (req,res) => handlemain.main(req,res,db))
app.post('/signin', (req,res) => handlesignin.signinAuthentication(req,res,bcrypt,db))
app.post('/register', (req, res) => handleregister.register(req,res,bcrypt,db))
app.get('/profile/:id', auth.requireAuth, (req,res)=>handleprofile.profileGet(req,res,db))
app.post('/profile/:id', auth.requireAuth, (req, res) => handleprofile.profileUpdate(req,res,db))
app.put('/image', auth.requireAuth, (req,res)=>handleimage.image(req,res,db))
app.post('/imageurl', auth.requireAuth, (req,res)=>handleimage.imageurl(req,res))

const port= process.env.PORT || 3000
app.listen(port,()=>{
  console.log(`Server started at port ${port}`)
})