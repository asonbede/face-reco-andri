// const handleImageCount = (req, res, db) => {
//   const { id } = req.body;

//   db("users")
//     .where("id", "=", id)
//     .increment("entries", 1)
//     .returning("entries")
//     .then((entries) => {
//       res.json(entries[0]);
//     })
//     .catch((err) => res.status(400).json("unable to get entries"));
// };

// const update = (id,baseUrl, notObject) => {
//   const request = axios.put(`${baseUrl}/${id}`, notObject);
//   return request.then((response) => response.data);
// };

// notesRouter.put("/:id", (request, response, next) => {
//   const body = request.body;

//   const note = {
//     content: body.content,
//     important: body.important,
//   };

//   Note.findByIdAndUpdate(request.params.id, note, { new: true })
//     .then((updatedNote) => {
//       response.json(updatedNote);
//     })
//     .catch((error) => next(error));
// });

const handleImageCount = async (request, response, userTable) => {
  const { _id } = request.body;

  // let user = await userTable.findOne({ _id: id });

  // user = { ...user._doc, entries: user.entries + 1 };
  // console.log({ user });
  const updatedUser = await userTable.findByIdAndUpdate(_id, request.body, {
    new: true,
  });
  console.log({ updatedUser });
  response.json(updatedUser.entries);
};

module.exports = {
  handleImageCount,
};
