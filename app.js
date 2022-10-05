const express = require("express");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const coinTasks = require("./tasks/coin");
const isAuth = require("./middlewares/isAuth");
const coinRoutes = require("./routes/coin");
const authRoutes = require("./routes/auth");
const adminRoutes = require("./routes/admin");
const sequelize = require("./utils/database");

const app = express();

app.use(cookieParser());
app.use(bodyParser.json());

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Node Internship",
      description: "First touches of backend development",
      contact: {
        name: "Pouria",
      },
      servers: ["http://localhost:8080"],
      securityDefinitions: {
        bearerAuth: {
          type: "apiKey",
          name: "Authorization",
          scheme: "bearer",
          in: "header",
        },
      },
    },
  },
  apis: ["./routes/*.js"],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerDocs, { explorer: true })
);

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "OPTIONS, GET, POST, PUT, PATCH,DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

  next();
});

coinTasks.updateCoinsPrice();

app.use(coinRoutes);
app.use("/auth", authRoutes);
app.use("/admin", isAuth, adminRoutes);

sequelize
  .sync()
  .then(() => app.listen("8080"))
  .catch(console.log);
