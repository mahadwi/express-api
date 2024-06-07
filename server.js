import express from "express";
import cors from "cors";
import os from "os";
import fs from "fs";
import chalk from "chalk";
import createError from "http-errors";
import db from "./app/models/index.js";
import mahasiswaRoutes from "./app/routes/mahasiswa.routes.js";

const app = express();

const corsOptions = {
  origin: "*"
};

app.use(cors(corsOptions));

app.use(express.json());
app.use('/', mahasiswaRoutes);

// membuat routes
// app.get("/", (req, res, next) => {
//   try {
//     res.send({message: "Welcome"});
//   } catch (error) {
//     res.status(error.status || 500).send({
//       error: {
//         status: error.status || 500,
//         message: error.message || "Internal Server Error",
//       },
//     });
//   }
// });

app.use(function (req, res, next) {
  next(createError(404));
});

// konek ke database
db.mongoose.connect(db.url)
  .then(() => console.log("Database Connected"))
  .catch(err => {
    console.log(`Gagal Konek ${err.message}`);
    process.exit();
  });


const PORT = process.env.PORT || 8000;
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
