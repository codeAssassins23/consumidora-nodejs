const bcrypt = require("bcrypt");
const axios = require("axios");
const nodemailer = require('nodemailer');


const getCredenciales = (req, res) => {
  res.render("credencialesDocumentation.ejs", {cliente_id:"", llave_secreta:"",message:""})
}

const postCredenciales = async (req, res) => {
  const { nombres, apellidos, correo } = req.body;
  console.log(nombres, apellidos, correo);

  try {
    const data={
      nombres: nombres,
      apellidos: apellidos,
      email: correo,
      estado: 1,
      cliente_id: "",
      llave_secreta:"",
    }
    const response = await axios.post("http://fast.spring.informaticapp.com:9060/token/registros", data);

    const credenciales = response.data;
    const cliente_id = credenciales.cliente_id;
    const llave_secreta = credenciales.llave_secreta;

    res.render("credencialesDocumentation", { cliente_id, llave_secreta });
  } catch(error) {
    res.render("credencialesDocumentation", { message:error.data });
  }
}

const getRegister = (req, res) => {
  console.log(req.isAuthenticated());
  res.render("pages-register.ejs", { message: "" });
};

const getDocumentation = (req, res) => {
  console.log(req.isAuthenticated());
  res.render("index.ejs")
}

const getEmailSend = (req, res) => {
  console.log(req.isAuthenticated());
  res.render("emailSend",{correo:""});
}

const getLogin = (req, res) => {
  console.log(req.isAuthenticated());
  res.render("pages-login.ejs", { message: req.flash("error")[0] || "" });
};


const getCarrito = (req, res) => {
  console.log(req.user.codperfil.codperfil,"holu");
  if (req.user.codperfil.codperfil !== 5) {
    const user = req.user;
    req.session.user = user;
    res.redirect("/admin");
  }
  else if (req.user.codperfil.codperfil ===5) {
    const user = req.user;
    req.session.user = user;
    res.render("carrito");
  } else {
    res.redirect("/");
  }
};
//////Administrador

const getAdminUser = async (req, res) => {
  const responseUser = await axios.get("http://fast.spring.informaticapp.com:9060/admin/user");
  const UserResponse = responseUser.data;
  const user = req.user.codperfil.codperfil;
  const sucursal = req.user.codsucursal.codsucursal;

  const arrayUserAdministrador = [];
  for (let i = 0; i < UserResponse.length; i++) { 
    //console.log(ventas[i].codventa);
    if (UserResponse[i].usuario.codperfil.codperfil !== 5 && UserResponse[i].usuario.codperfil.codperfil !== 6) {
      arrayUserAdministrador.push(UserResponse[i]);
    }
  }
  const arrayUserSucursal = [];
  for (let i = 0; i < arrayUserAdministrador.length; i++) { 
    //console.log(ventas[i].codventa);
    if (arrayUserAdministrador[i].usuario.codsucursal.codsucursal === sucursal) {
      arrayUserSucursal.push(arrayUserAdministrador[i]);
    }
  }
  console.log(arrayUserSucursal, "users");

  res.render("usuario.ejs",{ nombre: req.user.nombres,perfil:req.user.codperfil.nombres, usuarios:arrayUserSucursal });
};

const getAdmin = (req, res) => {
  const nombres = req.user.nombres;
  const sucursal = req.user.codsucursal.nombres;
  console.log(nombres);
  res.render("homeAdmin.ejs",{ nombre: nombres,perfil:req.user.codperfil.nombres,sucursal:sucursal });
}

const getReportes = async (req, res) => { 
  const responseVentas = await axios.get("http://fast.spring.informaticapp.com:9060/admin/ventas");
  const responseDetalleVentas = await axios.get("http://fast.spring.informaticapp.com:9060/admin/detalle_ventas");
  const detalle_venta = responseDetalleVentas.data;
  //console.log(detalle_venta);
  const ventas = responseVentas.data;
  const sucursal = req.user.codsucursal.nombres;
  //console.log(sucursal,"sucursal user");
  const arrayVentasSucursal = [];
  const arrayDetalleVentasSucursal = [];
  for (let i = 0; i < ventas.length; i++) { 
    //console.log(ventas[i].codventa);
    if (ventas[i].nombreEmpresa === sucursal) {
      arrayVentasSucursal.push(ventas[i]);
      for (let j = 0; j < detalle_venta.length; j++) { 
        if (detalle_venta[j].codventa.codventa === ventas[i].codventa) {
          arrayDetalleVentasSucursal.push(detalle_venta[j]);
        }
      }
    }
  }
  let empresa = arrayDetalleVentasSucursal[0].codplatillo.codsucursal.codempresa.nombres;
  console.log(empresa, "empresas");
  //console.log(arrayVentasSucursal, "ventas ordenadas");
  //console.log(arrayDetalleVentasSucursal,"detalle ventas ordenadas");
  res.render("reportes.ejs",{detalle_venta:arrayDetalleVentasSucursal, nombre: req.user.nombres,perfil:req.user.codperfil.nombres,sucursalUser:req.user.codsucursal.nombres,empresa:empresa,codusuario:req.user.codusuario });
}

const getVentasDelivery = async (req, res) => { 
  const responseVentas = await axios.get("http://fast.spring.informaticapp.com:9060/admin/ventas");
  const responseDetalleVentas = await axios.get("http://fast.spring.informaticapp.com:9060/admin/detalle_ventas");
  const detalle_venta = responseDetalleVentas.data;
  //console.log(detalle_venta);
  const ventas = responseVentas.data;
  const sucursal = req.user.codsucursal.nombres;
  //console.log(sucursal,"sucursal user");
  const arrayVentasSucursal = [];
  const arrayDetalleVentasSucursal = [];
  for (let i = 0; i < ventas.length; i++) { 
    //console.log(ventas[i].codventa);
    if (ventas[i].nombreEmpresa === sucursal) {
      arrayVentasSucursal.push(ventas[i]);
      for (let j = 0; j < detalle_venta.length; j++) { 
        if (detalle_venta[j].codventa.codventa === ventas[i].codventa) {
          arrayDetalleVentasSucursal.push(detalle_venta[j]);
        }
      }
    }
  }
  let empresa = arrayDetalleVentasSucursal[0].codplatillo.codsucursal.codempresa.nombres;
  console.log(empresa, "empresas");
  //console.log(arrayVentasSucursal, "ventas ordenadas");
  console.log(arrayDetalleVentasSucursal,"detalle ventas ordenadas");
  res.render("ventasDelivery.ejs",{detalle_venta:arrayDetalleVentasSucursal, nombre: req.user.nombres,perfil:req.user.codperfil.nombres,sucursalUser:req.user.codsucursal.nombres,empresa:empresa,codusuario:req.user.codusuario });
}

//ventas administrador
const detalleventasordenadas = async (req, res) => {
  try {
    const sucursal = req.user.codsucursal.nombres;
    console.log(sucursal)
    const responsedetalle = await axios.get("http://fast.spring.informaticapp.com:9060/admin/detalle_ventas");
    const responseventas = await axios.get("http://fast.spring.informaticapp.com:9060/admin/ventas");
    const ventas = responseventas.data;
    const detalle_venta = responsedetalle.data;
    const arrayVentasSucursal = [];
    const detalleMenus = [];
    for (let i = 0; i < ventas.length; i++) { 
      if (ventas[i].nombreEmpresa === sucursal) {
        arrayVentasSucursal.push(ventas[i]);
        for (let j = 0; j < detalle_venta.length; j++) { 
          if (detalle_venta[j].codventa.codventa === ventas[i].codventa) {
            detalleMenus.push(detalle_venta[j]);
          }
        }
      }
    }
    
    res.json(detalleMenus);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Ha ocurrido un error en el servidor." });  }
}
/////fin de administrador

const getRecuperar = (req, res) => {
  console.log(req.isAuthenticated());
  res.render("recover.ejs", { message: "" });
}

const postRecuperar = async (req, res) => {
  const { correo } = req.body;

  var transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
      user: 'teamfivefastfood@gmail.com',
      pass: 'lhvgvuytdakoshqd'
      }
  })

  var message = {
    from: "teamfivefastfood@gmail.com",
    to: correo,
    subject: "Restablecimiento de contraseña",
    html: `<p>Haga clic en el siguiente enlace para restablecer su contraseña: <a href="https://superfast-teamfive.onrender.com/newPassword/${correo}">Restablecer contraseña</a></p>`,
  }

  try {
    const dataUser = {
      correo: correo,
    };
    console.log(dataUser);
    const response = await axios.post(
      "http://fast.spring.informaticapp.com:9060/admin/login",
      dataUser
    );
    const user = response.data;
    if (user) {
      
      transporter.sendMail(message, (error, info) => {
          if (error) {
              console.log("Error enviando email")
              console.log(error.message)
          } else {
            console.log("Email enviado");
            res.render("emailSend",{correo})
          }
      })
    }
  }
  catch(err){
    const user = err.response;
    console.log(user.data);
    const menssageError = user.data;
    res.render("recover.ejs", {
      message: menssageError,
    });
  }
}

const getNewPassword = (req, res) => {
  const { correo } = req.params;
  res.render("newPassword.ejs", { correo, message:"" });
}

const postNewPassword = async (req, res) => {
  const { correo, password, confirm_password } = req.body;
  console.log(correo, password, confirm_password);
  var data = {
    correo:correo,
  }
  try {

    if (password !== confirm_password) {
      return res.render("newPassword.ejs", {correo,
        message: "Contraseñas no son iguales",
      });
    } else if (password.length < 6) {
      return res.render("newPassword.ejs", {correo,
        message: "Tiene que tener más de 6 caracteres",
      });
    }

    const response = await axios.post("http://fast.spring.informaticapp.com:9060/admin/login", data);

    const user = response.data;
    const hashedPassword = await bcrypt.hash(password, 8);
    
    const dataSend = {
      codusuario:user.codusuario,
      nombres: user.nombres,
      apellidos: user.apellidos,
      correo:user.correo,
      dni: user.dni,
      numcelular: user.numcelular,
      direccion: user.direccion,
      codperfil: {
        codperfil:user.codperfil.codperfil
      },
      estado: 1,
      codsucursal: {
        codsucursal:user.codsucursal.codsucursal
      },
      contraseña:hashedPassword,
    }

    const responseSend = await axios.put("http://fast.spring.informaticapp.com:9060/admin/user", dataSend);
    console.log(responseSend.data);
    
    res.render("pages-login",{message:"Contraseña actualizada, Por favor inicie sesión"})
  }
  catch (error) {
    const response = error.response;
    const menssageError = response.data;
    console.log(menssageError, "uwu");
    // Manejar el error apropiadamente
    res.render("newPassword.ejs", {correo,
      message: menssageError,
    });
    
  }
}

const postRegister = async (req, res) => {
  const {
    direccion,
    dni,
    nombres,
    apellidos,
    telefono,
    email,
    password,
    password_confirm,
  } = req.body;
  try {
    console.log("contraseña 1:", password, "contraseña 2:", password_confirm);

    // Verificar si las contraseñas coinciden
    if (password !== password_confirm) {
      return res.render("pages-register.ejs", {
        message: "Contraseñas no son iguales",
      });
    } else if (password.length < 6) {
      return res.render("pages-register.ejs", {
        message: "Tiene que tener más de 6 caracteres",
      });
    }
    const hashedPassword = await bcrypt.hash(password, 8);
    const data = {
      nombres: nombres,
      apellidos: apellidos,
      correo: email,
      dni: dni,
      numcelular: telefono,
      direccion: direccion,
      contraseña: hashedPassword,
      estado: 1,
      codperfil: {
        codperfil: 5,
      },
    };
    console.log(data);
    const response1 = await axios.post(
      "http://fast.spring.informaticapp.com:9060/admin/user",
      data
    );
    res.render("pages-login.ejs", { message: "Usuario Registrado" });
  } catch (error) {
    const response = error.response;
    const menssageError = response.data;
    console.log(menssageError, "uwu");
    // Manejar el error apropiadamente
    res.render("pages-register.ejs", {
      message: menssageError,
    });
  }
};

//Empieza la venta
let dataCarritoJSON = null;

const postReceiveCarrito = async (req, res,next) => {
  try {
    dataCarritoJSON = req.body;
    next();
  } catch (error) {
    console.log(error);
  }
}

const postCheckout = async (req, res) => {
  const codusuario = req.body.codusuario;
  const tipoVenta = req.body.tipoVenta;
  const tipoPago = req.body.tipoPago;

  let responseVenta = null;
  let total = 0;
  const datosAgrupados = {};

  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const procesarElementos = async () => {
    for (const item of dataCarritoJSON) {
      const sucursal = item.sucursal;

      if (!datosAgrupados.hasOwnProperty(sucursal)) {
        datosAgrupados[sucursal] = [];
      }

      datosAgrupados[sucursal].push(item);
    }

    for (const sucursal of Object.keys(datosAgrupados)) {
      const elementos = datosAgrupados[sucursal];
      total = 0;
      elementos.forEach((element) => {
        total += element.cantidad * element.precio;
      });

      const currentDate = new Date();
      const formattedDate = formatDate(currentDate);

      const dataVenta = {
        codusuario: {
          codusuario: codusuario,
        },
        tipoVenta: tipoVenta,
        fechaHora: formattedDate,
        codcaja: {
          codcaja: 4,
        },
        tipoComprobante: "Boleta",
        total: total,
        nombreEmpresa: sucursal,
        estado: 1,
      };
      try {
        responseVenta = await axios.post("http://fast.spring.informaticapp.com:9060/admin/ventas", dataVenta);
        const venta = responseVenta.data;
        const codventa = venta.codventa;
        console.log(total, "Enviado", codventa, "cod venta ");

        const promises = [];
        elementos.forEach((element) => {
          const cantidad = element.cantidad;
          const precio = element.precio;
          const codplatillo = element.codplatillo;

          const dataPedido = {
            cantidad: cantidad,
            codplatillo: {
              codplatillo: codplatillo,
            },
            codventa: {
              codventa: codventa,
            },
            precio: precio,
            estado: 1,
            codmesa: {
              codmesa: 7,
            },
          };
          const promise = axios.post("http://fast.spring.informaticapp.com:9060/admin/detalle_ventas", dataPedido);
          console.log('Pedido enviado:', dataPedido);
          promises.push(promise);
        });

        await Promise.all(promises);
      } catch (error) {
        console.log('Error al realizar la solicitud POST:', error);
      }
    }
  };

  await procesarElementos();
  res.redirect("/");
};


const getCheckout = async (req, res) => {
  const user = req.user;
  res.render("checkout.ejs",{user: user});
}

//////

const getLogout = (req, res) => {
  req.logout(() => {
    res.redirect("/");
  })
}

const checkAuthenticated = function checkAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return res.redirect("/carrito");
  }
  next();
};

const checkNotAuthenticated = function checkNotAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  } else {
    res.redirect("/login");
  }
};

module.exports = {
  detalleventasordenadas,
  getCredenciales,
  getNewPassword,
  getEmailSend,getLogout,
  getDocumentation,
  getAdminUser,
  getCheckout,
  getLogin,
  getVentasDelivery,
  getReportes,
  getRegister,
  postNewPassword,
  postCheckout,
  postCredenciales,
  postRecuperar,
  postRegister,
  postReceiveCarrito,
  getCarrito,
  getRecuperar,
  getAdmin,
  checkAuthenticated,
  checkNotAuthenticated,
};
