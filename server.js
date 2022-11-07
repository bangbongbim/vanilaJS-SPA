const express = require("express");
const path = require("path");

const app = express();

app.use(
  "/static",
  express.static(path.resolve(__dirname, "frontend", "static"))
);

// Single page이기 때문에
// 모든 경로에서 index.html을 불러와야함
app.get("/*", (req, res) => {
  res.sendFile(path.resolve("frontend", "index.html"));
});

app.listen(process.env.PORT || 5000, () => {
  console.log("PORT 5000 Server running...");
});
