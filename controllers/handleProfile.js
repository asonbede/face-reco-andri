const handleProfileGet = (req, res) => {
  const { id } = req.id.params;
  db.select("*")
    .from("users")
    .where({
      id: id,
    })
    .then((user) => {
      console.log(user[0]);
      if (user.length) {
        // res.json(user[0])
      } else {
        res.status(400).json("Not found");
      }
    })
    .catch((err) => res.status(400).json("error geting user"));
};
module.exports = {
  handleProfileGet,
};
