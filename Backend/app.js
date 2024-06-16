// app.js or index.js
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

// Connect to MongoDB
mongoose
  .connect("mongodb://localhost:27017/schoolData", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("connected"))
  .catch(() => console.log("unable to connect"));

// Import and use routes
const subjectRoutes = require("./routes/subjectRoutes");
const classRoutes = require("./routes/classroutes");
const mappingRoutes = require("./routes/mappingRoutes");
const studentRoutes = require("./routes/studentroutes");
const examCreationRoutes = require("./routes/examCreationRoutes");
const scoreRoutes = require("./routes/scoreRouter"); 
const authRoutes = require('./routes/authRoutes');

app.use("/api/subjects", subjectRoutes);
app.use("/api/classes", classRoutes);
app.use("/api/mapping", mappingRoutes);
app.use("/api/students", studentRoutes);
app.use("/api/examCreation", examCreationRoutes);
app.use("/api/scores", scoreRoutes); 
app.use('/api/auth', authRoutes);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
