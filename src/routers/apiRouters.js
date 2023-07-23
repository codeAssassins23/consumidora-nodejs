const express = require("express");
const router = express.Router();
const app = express();
const flash = require("express-flash");
app.use(flash());

const {
  getDepartamentos,
  getCompras,
  getProveedores,
  getDetalleCompras,
  getUsuarios,
  getPerfiles,
  getProvincias,
  getEmpresas,
  getDistritos,
  getSucursales,
  getCajas,
  getMenus,
  getMesas,
  getPedidos,
  getVentas,
  getProductos,
  getCategorias,
  getMarcas,
  getAlmacenes,
  getDetalleAlmacenes,

} = require("../controllers/Api/api");
 
router.get("/departamentos", getDepartamentos);
router.get("/provincias", getProvincias);
router.get("/distritos", getDistritos);
router.get("/empresas", getEmpresas);
router.get("/sucursales", getSucursales);
router.get("/usuarios", getUsuarios);
router.get("/perfiles", getPerfiles);
router.get("/proveedores", getProveedores);
router.get("/compras", getCompras);
router.get("/detallecompras", getDetalleCompras);
router.get("/cajas", getCajas);
router.get("/menus", getMenus);
router.get("/mesas", getMesas);
router.get("/pedidos", getPedidos);
router.get("/ventas", getVentas);
router.get("/almacenes", getAlmacenes);
router.get("/categorias", getCategorias);
router.get("/detallealmacenes", getDetalleAlmacenes);
router.get("/marcas", getMarcas);
router.get("/productos", getProductos);

app.use("/", router);

module.exports = app;