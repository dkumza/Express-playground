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
   fs.writeFileSync("./messages.json", JSON.stringify(allData));

   res.json({ status: "OK" });
});

app.get("/history", (req, res) => {
   const html = fs.readFileSync("./html/history.html", "utf8");

   const allData = JSON.parse(fs.readFileSync("./messages.json", "utf8"));

   const mappedData = allData
      .map(
         (msg) =>
            `<div class="border border-sky-100 rounded p-4 w-96 shadow bg-sky-100 text-sky-500 flex flex-col">
                <h2 class="font-semibold text-xl text-center">${msg.name}</h2>
                <p>${msg.message}</p>
             </div>`
      )
      .join("");

   const finalHtml = html.replace("[[[data]]]", mappedData);

   res.send(finalHtml);
});

app.listen(port, () => {
   console.log(`${address}${port}`);
});
