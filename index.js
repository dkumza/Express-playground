const express = require("express");
const fs = require("fs");
const bodyParser = require("body-parser");
const app = express();
const port = 3000;
const address = "localhost:";

app.use(bodyParser.json());

app.use(express.static("./html/"));

app.get("/", (req, res) => {
   const html = fs.readFileSync("./html/msg.html", "utf8");
   res.send(html);
});

app.post("/", (req, res) => {
   const allData = JSON.parse(fs.readFileSync("./messages.json", "utf8"));
   allData.push(req.body);
   console.log(allData);
   fs.writeFileSync("./messages.json", JSON.stringify(allData));

   res.json({ status: "OK" });
});

app.listen(port, () => {
   console.log(`${address}${port}`);
});
