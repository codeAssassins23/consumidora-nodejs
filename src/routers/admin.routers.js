const express = require("express");
const router = express.Router();
const app = express();
const flash = require("express-flash");
app.use(flash());
const {
  getAdminUser,
  checkAuthenticated,
  checkNotAuthenticated,
  getReportes,
  getAdmin,
  getVentasDelivery,
  detalleventasordenadas,

}= require("../controllers/Users/user");

//Todo en lo que respecta a la página y vista del admin|
router.get("/reportes", checkNotAuthenticated, getReportes);
router.get("/", checkNotAuthenticated, getAdmin);
router.get("/user", checkNotAuthenticated, getAdminUser);
router.get("/ventasWeb", checkNotAuthenticated, getVentasDelivery);

//ventas en admin:
router.get("/detalle", detalleventasordenadas);

app.use("/", router);
module.exports = app;