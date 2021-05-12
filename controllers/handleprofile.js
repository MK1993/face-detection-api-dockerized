const profile = (req,res,db) => {
    const {id}=req.params
    db.select('*').from('users').where({id})
    .then(user=>{
        if(user.length !== 0){
            return res.json(user)
        } res.status(400).json('not found!')
    })
    .catch(err=>res.status(400).json('error getting user!'))
}

module.exports= {profile}