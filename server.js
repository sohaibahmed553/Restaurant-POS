const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const cors = require("cors");

const connectDB = require("./config/db");

const app = express();

//Connect Database
connectDB();

app.use(bodyParser.json());
app.use(cors());

//Define Routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/users", require("./routes/users"));
app.use("/api/categories", require("./routes/categories"));
app.use("/api/items", require("./routes/items"));
app.use("/api/orders", require("./routes/orders"));
app.use("/api/customers", require("./routes/customers"));

// Serve static files from the React frontend app
app.use(express.static(path.join(__dirname, "client/build")));
// Anything that doesn't match the above, send back index.html
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname + "/client/build/index.html"));
});

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => console.log(`server started on port ${PORT}`));
