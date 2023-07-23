const express = require("express");
const router = express.Router();
const app = express();
const passport = require("passport");
const flash = require("express-flash");
app.use(flash());
const {
  getAdminUser,
  checkAuthenticated,
  checkNotAuthenticated,
  getReportes,
  getAdmin,
  getVentasDelivery,

}= require("../controllers/Users/user");

//Todo en lo que respecta a la página y vista del admin|
router.get("/reportes", checkNotAuthenticated, getReportes);
router.get("/", checkNotAuthenticated, getAdmin);
router.get("/user", checkNotAuthenticated, getAdminUser);
router.get("/ventasWeb", checkNotAuthenticated, getVentasDelivery);
app.use("/", router);
module.exports = app;