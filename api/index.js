const express = require("express");
const app = express();
const PORT = process.env.PORT || 8080;

const rec = require("./records");

app.use("/api", rec);

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});
