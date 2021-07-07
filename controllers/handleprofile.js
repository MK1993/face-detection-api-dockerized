const profileGet=(e,s,t)=>{const{id:o}=e.params;t.select("*").from("users").where({id:o}).then(e=>{if(0!==e.length)return s.json(e);s.status(400).json("not found!")}).catch(e=>s.status(400).json("error getting user!"))};
const profileUpdate = (req, res, db) => {
  const { id } = req.params
  const { name, age, pet } = req.body.formInput
  db('users')
  .where({ id })
  .update({ name: name })
  .then(resp => {
    if (resp) {
      res.json("success")
    } else {
      res.status(400).json('Not found')
    }
  })
  .catch(err => res.status(400).json('error updating user'))
}
module.exports={profileGet:profileGet,profileUpdate:profileUpdate};
