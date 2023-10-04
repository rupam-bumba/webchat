const usersDB = require("../../model/users");
const { default: axios } = require("axios");

exports.post = async (req, res, next) => {
  let users_found = await usersDB
    .find({
      users_name: req.body.users_name,
    })
    .exec();

  if (users_found.length > 0) {
    let err = new Error(
      "user name taken please tet a deferent one, be creative"
    );
    err.status = 403;
    return next(err);
  }

  const users = new usersDB({
    _id: mongoose.Types.ObjectId(),
    users_name: req.body.users_name,
    password: req.body.password,
  });

  await users
    .save()
    .then(async (result) => {
      let accessinfo = await axios.post(
        `http://localhost:${process.env.PORT}/api/users/log-in`,
        {
          users_name: req.body.users_name,
          password: req.body.password,
        }
      );

      res.status(201).json(accessinfo.data);
    })
    .catch((err) => {
      res.status(201).json(err);
    });
};
