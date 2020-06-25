const express = require("express");
const app = express();
const connectDB = require("./config/db.js");

//connecting database
connectDB();

//Middlewares to read body data of request
app.use(express.urlencoded({ extended: false }));
app.use(express.json({ extended: false }));

//Defining routes
app.use("/api/user", require("./routes/users.js"));

//Port defined
const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server is up & running on ${port}`);
});
