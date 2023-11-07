var oTabla = $("#tblProductos").DataTable();
jQuery(function () {
    $("#dvMenu").load("../Pages/Menu.html")
    $("#btnInsertar").on("click", function () {
        EjecutarComandos("POST");
    });
    $("#btnActualizar").on("click", function () {
        EjecutarComandos("PUT");
    });
    $("#btnEliminar").on("click", function () {
        EjecutarComandos("DELETE");
    });
    $("#btnConsultar").on("click", function () {
        Consultar();
    });
    $("#cboPais").on("change", function () {
        let pais = document.getElementById("cboPais");
        LlenarComboDepartamento(pais.value);
    });
    $("#cboDepartamento").on("change", function () {
        let departamento = document.getElementById("cboDepartamento");
        LlenarComboCiudad(departamento.value);
    });
    $("#cboCiudad").on("change", function () {
        let ciudad = document.getElementById("cboCiudad");
        LlenarComboBarrio(ciudad.value);
    });
    LlenarComboTipoUsuario();
    LlenarComboTipoDocumento();
    LlenarComboPais();
    LlenarTablaUsuarios();
});
//TODO: Filtrar los combos

async function LlenarComboTipoUsuario() {
    let Rpta = await LlenarComboXServicios("https://localhost:44342/api/TipoUsuario")
    for (i = 0; i < Rpta.length; i++) {
        $("#cboTipoUsuario").append('<option value=' + Rpta[i].TipoUsuarioId + '>' + Rpta[i].Descripcion + '</option>');
    }
}

async function LlenarComboTipoDocumento() {
    let Rpta = await LlenarComboXServicios("https://localhost:44342/api/TipoDocumento")
    for (i = 0; i < Rpta.length; i++) {
        $("#cboTipoDoc").append('<option value=' + Rpta[i].TipoDocumentoId + '>' + Rpta[i].Descripcion + '</option>');
    }
}

async function LlenarComboPais() {
    let Rpta = await LlenarComboXServicios("https://localhost:44342/api/Pais")
    for (i = 0; i < Rpta.length; i++) {
        $("#cboPais").append('<option value=' + Rpta[i].PaisId + '>' + Rpta[i].Nombre + '</option>');
    }
}

async function LlenarComboDepartamento(pais) {
    let Rpta = await LlenarComboXServicios("https://localhost:44342/api/Departamento?pais=" + pais);
    for (i = 0; i < Rpta.length; i++) {
        $("#cboDepartamento").append('<option value=' + Rpta[i].DepartamentoId + '>' + Rpta[i].Nombre + '</option>');
    }
}
async function LlenarComboCiudad(departamento) {
    let Rpta = await LlenarComboXServicios("https://localhost:44342/api/Ciudad?departamento=" + departamento)
    for (i = 0; i < Rpta.length; i++) {
        $("#cboCiudad").append('<option value=' + Rpta[i].CiudadId + '>' + Rpta[i].Nombre + '</option>');
    }
}
async function LlenarComboBarrio(ciudad) {
    let Rpta = await LlenarComboXServicios("https://localhost:44342/api/Barrio?ciudad=" + ciudad)
    for (i = 0; i < Rpta.length; i++) {
        $("#cboBarrio").append('<option value=' + Rpta[i].BarrioId + '>' + Rpta[i].Nombre + '</option>');
    }
}

async function LlenarTablaUsuarios() {
    LlenarTablaXServicios("https://localhost:44342/api/Usuario", "#tblUsuarios")
}

async function EjecutarComandos(Comando) {
    event.preventDefault();
    let Nombre = $("#txtNombre").val();
    let Apellido = $("#txtApellido").val();
    let Documento = $("#txtDocumento").val();
    let TipoDocumentoId = $("#cboTipoDoc").val();
    let TipoUsuarioId = $("#cboTipoUsuario").val();
    let Activo = $("#cbActivo").val();
    let Barrio = $("#cboBarrio").val();
    let Direccion = $("#txtDireccion").val();
      

    DatosUsuario = {
        Nombre: Nombre,
        Apellido: Apellido,
        Documento: Documento,
        TipoDocumentoId: TipoDocumentoId,
        TipoUsuarioId: TipoUsuarioId,
        Activo: Activo,
        BarrioId: Barrio,
        Direccion: Direccion,
    }
    try {
        const Respuesta = await fetch("https://localhost:44342/api/Usuario",
            {
                method: Comando,
                mode: "cors",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(DatosUsuario)
            });
        const Rpta = await Respuesta.json();
        $("#dvMensaje").html(Rpta);
        LlenarTablaUsuarios();
    }
    catch (error) {
        $("#dvMensaje").html(error);
    }
}

async function Consultar() {
    event.preventDefault();
    let Documento = $("#txtDocumento").val();

    try {
        const Respuesta = await fetch("https://localhost:44342/api/Usuario?Documento=" + Documento,
            {
                method: "GET",
                mode: "cors",
                headers: {
                    "Content-Type": "application/json"
                }
            });
        const Rpta = await Respuesta.json();

        $("#txtNombre").val(Rpta.Nombre);
        $("#txtApellido").val(Rpta.Apellido);
        $("#txtDocumento").val(Rpta.Documento);
        $("#cboTipoDoc").val(Rpta.TipoDocumentoId);
        $("#cboTipoUsuario").val(Rpta.TipoUsuarioId);
        if (Rpta.Activo == true) {
            $("#cbActivo").prop("checked", true);
        }
        $("#cboBarrio").val(Rpta.BarrioId);
        $("#txtDireccion").val(Rpta.Direccion);
    }
    catch (error) {
        $("#dvMensaje").html(error);
    }
}