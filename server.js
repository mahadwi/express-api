import express from "express";
import cors from "cors";
import os from "os";
import fs from "fs";
import chalk from "chalk";
import morgan from 'morgan';
import createError from "http-errors";
import db from "./app/models/index.js";
import routes from "./app/routes/index.js";
import bodyParser from "body-parser";
import 'dotenv/config';

const app = express();

const corsOptions = {
  origin: "*"
};

app.use(cors(corsOptions));
app.use(morgan('dev'));

app.use(express.json());


app.use(bodyParser.json()); 
app.use(routes);

app.get('/', (req, res, next) => {
  try {
    res.send({messages: "Welcome"});
  } catch (error) {
    res.status(error.status || 500).send({
      error: {
        status: error.status || 500,
        message: error.message || "internal Server Error",
      },
    });
  }
});

app.use(function (req, res, next) {
  next(createError(404));
});

app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  res.status(err.status || 500);
  res.json({
    message: err.message,
    error: err
  });
});

// konek ke database
db.mongoose.connect(db.url)
  .then(() => console.log("Database Connected"))
  .catch(err => {
    console.log(`Gagal Konek ${err.message}`);
    process.exit();
  });


const PORT = process.env.PORT || 3000;
app.listen(PORT, function () {
  const osPlatform = os.platform();
  console.log(
    `${chalk.green("✓")} ${chalk.blue("Platform running on :")} ${chalk.blue(
      osPlatform
    )}`
  );
  console.log(
    `${chalk.green("✓")} ${chalk.blue(
      "server listening on port :"
    )} ${chalk.blue(PORT)}`
  );
});
