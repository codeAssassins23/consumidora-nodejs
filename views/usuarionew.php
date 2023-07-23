<?php
    if ($_SERVER["REQUEST_METHOD"] == "POST") { 
        $curl = curl_init();

        // Obtener los valores del formulario y escapar las comillas para evitar problemas de formato JSON
        $contraseña = $_POST["contraseña"];
        $nombre = $_POST["nombre"];
        $apellido = $_POST["apellido"];
        $correo_usuario = $_POST["correo_usuario"];
        $dni = $_POST["dni"];
        $telefono_usuario = $_POST["telefono_usuario"];
        $direccion = $_POST["direccion_usuario"];
        $codperfil = $_POST["idperfil_usuario"];

        // Construir la cadena JSON con los valores correctamente concatenados y con comillas
        $json_data = '{
            "contraseña": "'.$contraseña.'",
            "nombres": "'.$nombre.'",
            "apellidos": "'.$apellido.'",
            "correo": "'.$correo_usuario.'",
            "dni": "'.$dni.'",
            "numcelular": "'.$telefono_usuario.'",
            "direccion": "'.$direccion.'",
            "codperfil": {
                "codperfil": "'.$codperfil.'"
            },
            "estado": 1
        }';

        curl_setopt_array($curl, array(
            CURLOPT_URL => 'http://fast.spring.informaticapp.com:9090/admin/user',
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_ENCODING => '',
            CURLOPT_MAXREDIRS => 10,
            CURLOPT_TIMEOUT => 0,
            CURLOPT_FOLLOWLOCATION => true,
            CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
            CURLOPT_CUSTOMREQUEST => 'POST',
            CURLOPT_POSTFIELDS => $json_data,
            CURLOPT_HTTPHEADER => array(
                'Content-Type: application/json'
            ),
        ));

        $response = curl_exec($curl);
        curl_close($curl);

        $data = json_decode($response, true);
        header("Location: usuario.php");
    }

    
    $curl = curl_init();

    curl_setopt_array($curl, array(
    CURLOPT_URL => 'http://fast.spring.informaticapp.com:9090/admin/perfiles',
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_ENCODING => '',
    CURLOPT_MAXREDIRS => 10,
    CURLOPT_TIMEOUT => 0,
    CURLOPT_FOLLOWLOCATION => true,
    CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
    CURLOPT_CUSTOMREQUEST => 'GET',
    ));

    $response = curl_exec($curl);

    curl_close($curl);
    $Perfiles = json_decode($response, true);
?>
<?php include_once "./includes/head.php"; ?>
<?php include_once "./includes/menu.php"; ?>

<div class="container-fluid">
    <div class="row">
        <div class="col-12 box-margin mt-2">
            <div class="card">
                <div class="card-body">
                    <div class="d-flex justify-content-between align-items-center mb-2">
                        <h4 class="card-title mb-2 text-uppercase">Usuarios</h4>
                    </div>

                    <form class="form cmxform" id="form_usuario" method="post" >
                            <div class="row">
                            <div class="col-lg-6">
                                <div class="col-lg-6">
                                    <div class="form-group">
                                        <label for="fordni">DNI <span class="text-danger">*</span></label>
                                        <div class="input-group">
                                            <input type="text" name="dni" class="form-control" id="fordni" placeholder="Documento Nacional de Identidad">
                                        </div>
                                    </div>
                                </div>
                                <div class="col-lg-6">
                                    <div class="form-group">
                                        <label for="fornombre">Nombres <span class="text-danger">*</span></label>
                                        <input type="text" name="nombre" class="form-control" id="fornombre" placeholder="Nombres Completos">
                                    </div>
                                </div>
                                <div class="col-lg-6">
                                    <div class="form-group">
                                        <label for="forape">Apellidos <span class="text-danger">*</span></label>
                                        <input type="text" name="apellido" class="form-control" id="forape" placeholder="Apellidos Completos">
                                    </div>
                                </div>
                                <div class="col-lg-6">
                                    <div class="form-group">
                                        <label for="forape">Contaseña</label>
                                        <input type="password" name="contraseña" class="form-control" id="forape" placeholder="Contaseña">
                                    </div>
                                </div>
                                <div class="col-lg-6">
                                    <div class="form-group">
                                        <label for="forape">Celular</label>
                                        <input type="number" name="telefono_usuario" class="form-control" id="forape" placeholder="Celular">
                                    </div>
                                </div>
                                <div class="col-lg-6">
                                    <div class="form-group">
                                        <label for="forape">Correo</label>
                                        <input type="email" name="correo_usuario" class="form-control" id="forape" placeholder="Correo">
                                    </div>
                                </div>
                                <div class="col-lg-6">
                                    <div class="form-group">
                                        <label for="forape">Direccion</label>
                                        <input type="direccion" name="direccion_usuario" class="form-control" id="forape" placeholder="Direccion">
                                    </div>
                                </div>
                                <div class="col-lg-6">
                                    <div class="form-group">
                                        <label>Perfil <span class="text-danger">*</span></label>
                                        <select class="form-control" name="idperfil_usuario">
                                            <option selected disabled>Seleccionar...</option>
                                            <?php 
                                            foreach ($Perfiles as $item) {
                                                echo '<option value="'.$item['codperfil'].'">'.$item['nombres'].'</option>';
                                            }
                                            ?>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        <div class="card-footer d-flex justify-content-between">
                            <button type="submit" class="btn btn-primary">Guardar</button>
                            <a href="./usuario.php" class="btn btn-secondary">Cancelar</a>
                        </div>
                    </form>

                </div> <!-- end card body-->
            </div> <!-- end card -->
        </div><!-- end col-->

    </div>                      
</div>

<?php include_once "./includes/foot.php"; ?>