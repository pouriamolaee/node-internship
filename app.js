const express = require("express");
const bodyParser = require("body-parser");
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const sequelize = require("./utils/database");
const coinRoutes = require("./routes/coin");
const adminRoutes = require("./routes/admin");

const app = express();

app.use(bodyParser.json());

const swaggerOptions = {
  swaggerDefinition: {
    info: {
      title: "Node Internship",
      description: "First touches of backend development",
      contact: {
        name: "Pouria",
      },
      servers: ["http://localhost:8080"],
    },
  },
  apis: ["./routes/*.js"],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use(coinRoutes);
app.use("/admin", adminRoutes);

sequelize
  .sync()
  .then(() => app.listen("8080"))
  .catch(console.log);
