const express = require("express");

const app = express();
const middleware = require("../middleware");
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
//post request with jwt token

app.post("/generate-signature", middleware.generateToken, (req, res) => {
  const { signature } = res.locals.signature; 
  return res.status(200).json({ signature });
});

app.use(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
module.exports = app;
