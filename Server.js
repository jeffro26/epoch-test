const promMid = require("express-prometheus-middleware");
const express = require("express");
const createError = require("http-errors");

const app = express();

// const timesRouter = require("./serverNodes/timesRouter");
// const metricsRouter = require("./serverNodes/metricsRouter");


//error handler for unauthorised
app.use((req, res, next) => {
  console.log(req.headers.authorization)
  if (req.headers.authorization !== "mysecrettoken") {
    next(createError(403, "Unauthorised access"))
  } 
  next()
});

//EpochTime

app.get("/time", (req, res, next) => {
  const epochseconds = Math.floor(Date.now() / 1000);

  const responseObject = {
    epoch: {
      properties: {
        description:
          "The current server time, in epoch seconds, at the time of processing request.",
        type: "number",
        epochseconds
      }
    },
    required: ["epoch"],
    type: "object"
  };
  res.status(200).json({ data: responseObject });
  next();
});

//metrics
app.use(
  promMid({
    metricsPath: "/metrics",
    collectDefaultMetrics: true,
    requestDurationBuckets: [0.1, 0.5, 1, 1.5]
  })
);

app.use((err, req, res, next) => {
  if (err.expose === undefined) {
    const httpErr = createError(500, "Unknown Node layer Error");
    res.status(httpErr.status).json({ error: httpErr.message });
  } else {
    res.status(err.status).json({ error: err.message });
  }
});

let server;
const port = 3006;

const setUp = async () => {
  server = app.listen(port);
  console.log(`Api listening on port:${port}`);
};

// Server initialisation
setUp();

module.export = { app, server };
