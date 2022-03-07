const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
var bodyParser = require("body-parser");
const app = express();
const port = 3000;

app.use(cors());
app.options("*", cors());
// parse application/json
app.use(bodyParser.json());

const userSchema = new mongoose.Schema(
  {
    name: String,
    surname: String,
  },
  {
    timestamps: { createdAt: "dt_add", updatedAt: "dt_upd" },
  }
);

const User = mongoose.model("users", userSchema);

app.post("/create-user", async (req, res) => {
  const { name, surname } = req.body;
  if (!name || !surname) {
    return res.json({ message: "Invalid values" });
  }
  const user = new User({ name, surname });
  await user.save();

  return res.json({ user });
});

app.get("/users", async (req, res) => {
  const users = await User.find().sort({ dt_add: -1 }).exec();
  var userMap = {};

  users.forEach(function (user) {
    userMap[user._id] = user;
  });

  res.send(userMap);
  /* User.find({}, function (err, users) {
    var userMap = {};

    users.forEach(function (user) {
      userMap[user._id] = user;
    });

    res.send(userMap);
  }); */
  // return res.json({ users });
});

app.post("/delete-user", async (req, res) => {
  let id = req.body.userId;

  await User.findOneAndRemove({ _id: id });

  return res.json({ r: 1 });
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/test", (req, res) => {
  res.send("test geldi ekrana");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

main().catch((err) => console.log(err));

// REPLACE <USER_NAME> , <PASSWORD> and <TABLE_NAME>
async function main() {
  await mongoose.connect(
    "mongodb+srv://<USER_NAME>:<PASSWORD>@mesn.l02wx.mongodb.net/<TABLE_NAME>?retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true }
  );
}
