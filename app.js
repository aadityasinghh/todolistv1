const express = require("express");
const bodyParser = require("body-parser");
const http = require("http");

const port = process.env.PORT || 3000;

const app = express();
var items = []; //so that we can have items pushed in and not overwite the single item this willl be cleared by understanding scope of the variable its needs to defined outside by everytime wellmake a post reqest at home route the list item will get overwritten hence we need this array
var workItems = [];
app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", function (req, res) {
  var today = new Date();

  var options = {
    weekday: "long",
    day: "numeric",
    month: "long",
  };
  var day = today.toLocaleDateString("hi-IN", options);

  res.render("list", { listTitle: day, newListItems: items }); //we'll pass over the enitre array
});

app.post("/", function (req, res) {
  var item = req.body.newItem;
  if (req.body.list === "Work") {
    workItems.push(item);
    res.redirect("/work");
  } else {
    items.push(item);
    res.redirect("/"); //redirect makes a get request at the specified route
  }
});

app.get("/work", function (req, res) {
  res.render("list", { listTitle: "Work List", newListItems: workItems });
});

app.listen(port, function () {
  console.log("Server started at port 3000");
});
