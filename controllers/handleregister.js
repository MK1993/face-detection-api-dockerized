const register = (req,res,bcrypt,db) => {
    const {name,email,password} = req.body,
    saltRounds = 10,
    hash = bcrypt.hashSync(password, saltRounds);
    if(name.length === 0||email.length === 0||password.length === 0 ){
      res.status(400).json("Wrong inputs criteria")
    }
    db.transaction((trx) => {      
        db('login').returning('email')
          .insert({hash:hash, email:email})
          .transacting(trx)
          .then((loginEmail)=>{
            db('users').returning('*').insert({name:name,email:loginEmail[0],joined:new Date()})
            .then(user=>res.json(user[0]))
          })
        .then(trx.commit)
        .catch(trx.rollback);
    })
    .catch(err=>res.status(400).json('unable to register!'))
}

module.exports= {register}