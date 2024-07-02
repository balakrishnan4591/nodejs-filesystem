//Import express package - helps create an express server
const express = require("express");

//Import cors package - middleware that can help enable CORS with various options
const cors = require("cors");

//Import fs package - helps perform file system operations(create, read or write files)
const fs = require("fs");

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 8000;

//Middleware
app.use(
  cors({
    origin: "http://localhost:8000",
  })
);

// Step 1 : Create an API endpoint to create a new folder
app.post("/create-folder", async (req, res) => {
  try {
    fs.mkdir("./FileSystem", function (err) {
      if (err) {
        res.status(500).json({ error: err });
      }
    });
    res.status(200).json({
      message: "A folder named FileSystem has been created successfully",
    });
  } catch (error) {
    console.log(error);
  }
});

// Step 2 : Create an API endpoint which will create a new file with file name as current date-time with .txt format and with file content as current timestamp
app.post("/create-file", (req, res) => {
  const Get_Date = new Date();
  const Current_Date = Get_Date.getDate();

  const Month = Get_Date.getMonth() + 1;
  const Year = Get_Date.getFullYear();
  const Time = Get_Date.getTime();

  const FileName = `${Current_Date}-${Month}-${Year}-${Time}`;

  const TimeStamp = new Date().toISOString();

  fs.writeFile(`./FileSystem/${FileName}.txt`, TimeStamp, (err) => {
    if (err) {
      return res.status(500).json({ error: "Failed to create text file" });
    }
    return res
      .status(200)
      .json({ message: "A new Text file has been created successfully" });
  });
});

// Step 3: Create an API endpoint to read the files under existing directory
app.get("/read-file", (req, res) => {
  fs.readdir("./FileSystem", (err, data) => {
    if (err) {
      res.status(404).send(err);
    } else {
      res.status(200).send(data);
    }
  });
});

app.listen(PORT, () =>
  console.log("Server is connected and listening on port : ", PORT)
);
