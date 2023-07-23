const LocalStrategy = require("passport-local").Strategy;
const axios = require("axios");
const bcrypt = require("bcrypt");

let userId = null;

function initialize(passport) {
  console.log("Initialized");

  const authenticateUser = async (correo, contraseña, done) => {
    try {
      const dataUser = {
        correo: correo,
      };

      const response = await axios.post(
        "http://fast.spring.informaticapp.com:9060/admin/login",
        dataUser
      );

      const user = response.data;
      console.log(user.contraseña, contraseña, "1");
      if (user) {
        bcrypt.compare(contraseña, user.contraseña, (err, isMatch) => {
          if (err) {
            console.log(err);
          }
          if (isMatch) {
            console.log("contraseña conrrecta");
            return done(null, user);
          } else {
            console.log("contraseña incorrecta");

            return done(null, false, { message: "Contraseña incorrecta" });
          }
        });
      }
    } catch (err) {
      const user = err.response;
      console.log(user.data);

      return done(null, false, {
        message: user.data,
      });
    }
  };

  passport.use(
    new LocalStrategy(
      { usernameField: "correo", passwordField: "contraseña" },
      authenticateUser
    )
  );

  passport.serializeUser((user, done) => done(null, user.codusuario));

  passport.deserializeUser(async (codusuario, done) => {
    try {
      const response = await axios.get(
        `http://fast.spring.informaticapp.com:9060/admin/user/${codusuario}`
      );

      const user = response.data;
      userId = user.codusuario;
      console.log(userId);
      console.log(`ID is ${user.codusuario}`);
      return done(null, user);
    } catch (err) {
      console.log(err);
      return done(err);
    }
  });
}

module.exports = initialize;
