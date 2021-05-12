const main = (req, res , db) => {
    db.select('*').from('users').then(user=>{
        res.json(user)
    })
    .catch(err=>{
        res.status(400).json('No available users!')
    })
}

module.exports = {main}