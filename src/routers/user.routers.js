const express = require("express");
const router = express.Router();
const app = express();
const passport = require("passport");
const flash = require("express-flash");
app.use(flash());

const {
  getCarrito,
  getLogin,
  getLogout,
  getRegister,
  getDocumentation,
  getCheckout,
  postRegister,
  postCheckout,
  postRecuperar,
  postCredenciales,
  getCredenciales,
  postNewPassword,
  postReceiveCarrito,
  getRecuperar,
  getEmailSend,
  getNewPassword,
  checkAuthenticated,
  checkNotAuthenticated,
} = require("../controllers/Users/user");

//Todo en lo que respecta a la página y vista del usuario
router.get("/carrito",checkNotAuthenticated, getCarrito);
router.get("/register",checkAuthenticated, getRegister);
router.post("/register", postRegister);
router.get("/documentation", getDocumentation);
router.get("/recuperar", checkAuthenticated, getRecuperar);
router.post("/recuperar", checkAuthenticated, postRecuperar);
router.get("/emailSend", checkAuthenticated, getEmailSend);
router.get("/newPassword/:correo", checkAuthenticated, getNewPassword);
router.post("/newPassword", checkAuthenticated, postNewPassword);
router.post("/credenciales", checkAuthenticated, postCredenciales);
router.get("/credenciales", checkAuthenticated, getCredenciales);

//LOGIN Y LOGOUT
router.get("/login",checkAuthenticated, getLogin);
router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/carrito",
    failureRedirect: "/login",
    failureFlash: true,
  })
);
router.get("/logout", checkNotAuthenticated, getLogout);

//Rutas de las ventas
router.post("/carrito", postReceiveCarrito);
router.post("/checkout", postCheckout);
router.get("/checkout", getCheckout);
app.use("/", router);

module.exports = app;
