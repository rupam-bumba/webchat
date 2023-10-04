const express = require("express");
const app = express();


require('dotenv').config({ path: '.env' })


app.use(express.urlencoded({ extended: false }));
app.use(express.json());

 




mongoose = require("mongoose");
mongoose.pluralize(null);
mongoose
  .connect(process.env.MONGO_DB_CONNECTION ,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((result)=>{
    console.log("mongodb\t::\tconnected");
  })
  .catch((errors) => {
    console.log(errors);
  });

  


  
var cors = require("cors");
app.use(cors());







app.use("/api", require("./api/route/sample") )
app.use("/api/users", require("./api/route/users"))





app.get("/", (req, res) => {
 res.send("server...")
});




app.use((req, res, next) => {
  let error = new Error("Path Not Found");
  error.status = 404;
  next(error);
});



app.use((error, req, res, next) => {
  res.status(error.status || 500).json({massage: error.message});
});





module.exports = app;