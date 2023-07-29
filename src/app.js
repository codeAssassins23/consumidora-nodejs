const express = require("express");
const app = express();
const path = require("path");
const session = require("express-session");
const initializePassport = require("./controllers/passport/passportConfig");
const passport = require("passport");
const flash = require("express-flash");
const cacheTime = 86400000; // 1 día en milisegundos
//Configuracion de php
// Use php-cgi to render PHP views
app.use("/assets", express.static("public",{ maxAge: cacheTime }));
app.set("views", path.join(__dirname, "../views"));
app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
initializePassport(passport);
//////

const index = require("./routers/indexRouters");
app.use(index);

const user = require("./routers/user.routers");
app.use(user);

// Enrutador para rutas de administrador
const adminRouter = require("./routers/admin.routers");
app.use("/admin", adminRouter);

const api = require("./routers/apiRouters");
app.use(api);

app.listen(5000, () => {
  console.log("server started on port 5000");
});
