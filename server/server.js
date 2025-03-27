const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const app = express();
const {FormRouter} = require("./routes.js")

app.use(cors())
app.use(express.json())
app.use("/evently", FormRouter);


app.listen(3001, async () => {
    try {
      await mongoose.connect(
        "mongodb+srv://vinnugollakoti:vinnu1244@cluster0.cwivpr4.mongodb.net/Evently",
      );
      console.log("Server is running");
    } catch (error) {
      console.error("Error connecting to MongoDB:", error);
    }
});