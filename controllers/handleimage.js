const Clarifai = require("clarifai"),

image = (req,res,db) => {
    const {id}=req.body
    db('users')
    .where('id', '=', id)
    .increment('entries', 1)
    .returning('entries')
    .then(entries=>{
        res.json(entries[0])
    })
    .catch(err=>{
        res.status(400).json('unable to update!')
    })
},
imageurl = (req,res) => {
    const {input} = req.body
    const app = new Clarifai.App({
        apiKey: "c7435de452a04dc3963eca2661c382f0",
    })
    app.models.predict(Clarifai.FACE_DETECT_MODEL,input)
    .then(data=>res.json(data))
    .catch(err=>res.status(400).json('Unable to fetch Api!'))
}

module.exports= {image,imageurl}