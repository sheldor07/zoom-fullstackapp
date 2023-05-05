const express = require("express");

const app = express();

app.use(express.json());

const PORT = 3000;

app.use((err, req, res, next) => {
  console.log(err);
  const defaultErr = {
    log: "Express error handler caught unknown middleware error",
    status: 500,
    message: { err: "An error occurred" },
  };
  const errorobj = Object.assign(defaultErr, err);
  return res.status(errorobj.status).json(errorobj.message);
});
app.use(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
module.exports = app;
