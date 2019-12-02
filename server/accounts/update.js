const bodyParser = require("body-parser");
const account = require("../models/accounts");
const express = require("express");
const app = express();

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);

const update = (req, res) => {
  let test = async function() {
    var data = {
      firstname: req.body.newfirstname,
      lastname: req.body.newlastname,
      middlename: req.body.newmiddlename,
      email: req.body.newemail,
      username: req.body.newusername,
      password: req.body.newpassword
    };
    let accounts = await account.updateAccount(data);
    console.log("accounts : ", accounts);
    res.status(200).send("event updated!");
  };
  test();
};

module.exports = { update };
