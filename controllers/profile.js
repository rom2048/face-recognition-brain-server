const handleProfileGet = (request, response, db) => {
  const { id } = request.params;
  db.select('*').from('users').where({
    id: id
  })
    .then(user => {
      if (user.length) {
        response.json(user[0]);
      } else {
        response.status(400).json('Not Found')
      }
    })
    .catch(err => console.log('error'))
}

module.exports = {
  handleProfileGet: handleProfileGet
};