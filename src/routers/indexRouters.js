const { Router } = require("express");
const router = Router();
const axios = require("axios");

router.get("/", async (req, res) => {
  const valorlegueado = req.isAuthenticated();
  try {
    const responseEmpresas = await axios.get("http://fast.spring.informaticapp.com:9060/admin/empresas");
    const empresasTodas = responseEmpresas.data;
 
    const responseSucursales = await axios.get("http://fast.spring.informaticapp.com:9060/admin/sucursales");

    const sucursalesTodas = responseSucursales.data;

    const sucursales = [];
    const empresas = [];
    for (let index = 0; index < sucursalesTodas.length; index++) {
      if (sucursalesTodas[index].codempresa.codempresa === 1) {
      } else {
        sucursales.push(sucursalesTodas[index]);
      }
    }

    for (let i = 0; i < empresasTodas.length; i++) {
      if (empresasTodas[i].codempresa === 1) {
      } else {
        empresas.push(empresasTodas[i]);
      }
    }
    res.render("home.ejs", { empresas: empresas, usuarioEstaLogueado: valorlegueado, sucursales: sucursales });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
