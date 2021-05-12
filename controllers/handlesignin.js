const signin = (req,res,bcrypt,db) => {
    const {email,password} = req.body
    if(email.length === 0 || password.length === 0 ){
        res.status(400).json("Wrong inputs criteria")
    }
    db.select('hash', 'email').from('login').where('email', '=', email)
    .then(data=>{
        const isValid= bcrypt.compareSync(password, data[0].hash);
        if(isValid){
            db.select('*').from('users').where('email', '=', email)
            .then(user=>{
                res.json(user[0])
            })
            .catch(err=>res.status(400).json('Unable to get a user!'))
        } else {
            res.status(400).json('Wrong credentials!')
        }
    })
    .catch(err=>{
        res.status(400).json('Wrong credentials!')
    })
}

module.exports = {signin}