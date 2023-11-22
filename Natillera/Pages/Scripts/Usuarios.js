var oTabla = $("#tblUsuarios").DataTable();
var oTablaTel = $("#tblTelefonos").DataTable();

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

    $('#tblUsuarios tbody').on('click', 'tr', function () {
        if ($(this).hasClass('selected')) {
            $(this).removeClass('selected');
            OcultarBotones();
        } else { 
            $('.selected').removeClass('selected');
            $(this).addClass('selected');
            EditarFila($(this).closest('tr'));
            MostrarBotones();
        }
    });
    $('#tblTelefonos tbody').on('click', 'tr', function () {
        if ($(this).hasClass('selected')) {
            $(this).removeClass('selected');
            LimpiarTel();
        } else {
            $('.selected').removeClass('selected');
            $(this).addClass('selected');
            EditarFilaTel($(this).closest('tr'));
        }
    });
    $('#bntInsertarTel').on("click", function () {
        EjecutarComandosTelefono("POST");
    });
    $('#btnActualizarTel').on("click", function () {
        EjecutarComandosTelefono("PUT");
    });
    $('#btnEliminarTel').on("click", function () {
        EjecutarComandosTelefono("DELETE");
    });

    $('#btnEditarTelefonos').on("click", function () {
        LlenarGridTelefonos();
    });

    LlenarComboTipoUsuario();
    LlenarComboTipoDocumento();
    LlenarComboPais();
    LlenarTablaUsuarios();
    LlenarComboTipoTelefono();
    LlenarComboUsuarios();
    OcultarBotones();
});

async function MostrarBotones() {
    $("#btnInsertar").addClass("d-none");
    $("#btnActualizar").removeClass("d-none");
    $("#btnEliminar").removeClass("d-none");
    $("#btnEditarTelefonos").removeClass("d-none");
}

async function OcultarBotones() {
    $("#btnInsertar").removeClass("d-none");
    $("#btnActualizar").addClass("d-none");
    $("#btnEliminar").addClass("d-none");
    $("#btnEditarTelefonos").addClass("d-none");
    Limpiar();
}

async function LlenarComboTipoUsuario() {
    let Rpta = await LlenarComboXServicios("https://localhost:44342/api/TipoUsuario");
    $("#cboTipoUsuario").empty().append('<option value="0">Seleccione una opcion...</option>');
    for (i = 0; i < Rpta.length; i++) {
        $("#cboTipoUsuario").append('<option value=' + Rpta[i].TipoUsuarioId + '>' + Rpta[i].Descripcion + '</option>');
    }
}

async function LlenarComboTipoDocumento() {
    let Rpta = await LlenarComboXServicios("https://localhost:44342/api/TipoDocumento");
    $("#cboTipoDoc").empty().append('<option value="0">Seleccione una opcion...</option>');
    for (i = 0; i < Rpta.length; i++) {
        $("#cboTipoDoc").append('<option value=' + Rpta[i].TipoDocumentoId + '>' + Rpta[i].Descripcion + '</option>');
    }
}

async function LlenarComboPais() {
    $("#cboPais").empty().append('<option value="0">Seleccione una opcion...</option>');
    let Rpta = await LlenarComboXServicios("https://localhost:44342/api/Pais")
    for (i = 0; i < Rpta.length; i++) {
        $("#cboPais").append('<option value=' + Rpta[i].PaisId + '>' + Rpta[i].Nombre + '</option>');
    }
}

async function LlenarComboDepartamento(pais) {
    $("#cboDepartamento").empty().append('<option value="0">Seleccione una opcion...</option>');
    let Rpta = await LlenarComboXServicios("https://localhost:44342/api/Departamento?pais=" + pais);
    for (i = 0; i < Rpta.length; i++) {
        $("#cboDepartamento").append('<option value=' + Rpta[i].DepartamentoId + '>' + Rpta[i].Nombre + '</option>');
    }
}
async function LlenarComboCiudad(departamento) {
    $("#cboCiudad").empty().append('<option value="0">Seleccione una opcion...</option>');
    let Rpta = await LlenarComboXServicios("https://localhost:44342/api/Ciudad?departamento=" + departamento)
    for (i = 0; i < Rpta.length; i++) {
        $("#cboCiudad").append('<option value=' + Rpta[i].CiudadId + '>' + Rpta[i].Nombre + '</option>');
    }
}
async function LlenarComboBarrio(ciudad) {
    $("#cboBarrio").empty().append('<option value="0">Seleccione una opcion...</option>');
    let Rpta = await LlenarComboXServicios("https://localhost:44342/api/Barrio?ciudad=" + ciudad)
    for (i = 0; i < Rpta.length; i++) {
        $("#cboBarrio").append('<option value=' + Rpta[i].BarrioId + '>' + Rpta[i].Nombre + '</option>');
    }
}

async function LlenarComboTipoTelefono() {
    let Rpta = await LlenarComboXServicios("https://localhost:44342/api/TipoTel")
    for (i = 0; i < Rpta.length; i++) {
        $("#cboTipoTel").append('<option value=' + Rpta[i].TipoTelId + '>' + Rpta[i].Decripcion + '</option>');
    }    
}

async function LlenarComboUsuarios() {
    let Rpta = await LlenarComboXServicios("https://localhost:44342/api/Usuario")
    for (i = 0; i < Rpta.length; i++) {
        $("#cboUsuario").append('<option value=' + Rpta[i].Id + '>' + Rpta[i].Nombre + " " + Rpta[i].Apellido + '</option>');
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
        $("#cboPais").val(Rpta.Barrio.Ciudad.Departamento.PaisId);
        await LlenarComboDepartamento(Rpta.Barrio.Ciudad.Departamento.PaisId);
        $("#cboDepartamento").val(Rpta.Barrio.Ciudad.DepartamentoId);
        await LlenarComboCiudad(Rpta.Barrio.Ciudad.DepartamentoId);
        $("#cboCiudad").val(Rpta.Barrio.CiudadId);
        await LlenarComboBarrio(Rpta.Barrio.CiudadId);
        $("#cboBarrio").val(Rpta.BarrioId);
        $("#txtDireccion").val(Rpta.Direccion);
    }
    catch (error) {
        $("#dvMensaje").html(error);
    }
}

function EditarFila(DatosFila) {    
    $("#txtDocumento").val(DatosFila.find('td:eq(4)').text());
    Consultar();
}

function Limpiar() {
    $("#txtNombre").val("");
    $("#txtApellido").val("");
    $("#txtDocumento").val("");
    $("#cboTipoDoc").val("0");
    $("#cboTipoUsuario").val("0");
    $("#cbActivo").prop("checked", false);
    $("#cboPais").val("0");
    $("#cboDepartamento").val("0");
    $("#cboCiudad").val("0");
    $("#cboBarrio").val("0");
    $("#txtDireccion").val("");
}

function LimpiarTel() {
    $("#txtTelefonoId").val("");
    $("#txtNumero").val("");
    $("#cboTipoTel").val("0");
}

function LlenarGridTelefonos() {
    let Documento = $("#txtDocumento").val();
    let Nombre = $("#txtNombre").val();
    let PrimerApellido = $("#txtApellido").val();
    $("#cboUsuario option:contains(" + Nombre + " " + PrimerApellido + ")").attr('selected', true);

    LlenarTablaXServicios("https://localhost:44342/api/Telefonos?Documento=" + Documento, "#tblTelefonos");
}

async function EjecutarComandosTelefono(Comando) {
    event.preventDefault();
    let UsuarioId = $("#cboUsuario").val();
    let TelefonoId = $("#txtTelefonoId").val();
    if (Comando == "POST") { TelefonoId = 0; }
    let Numero = $("#txtNumero").val();
    let TipoTel = $("#cboTipoTel").val();
    let DatosTelefono = {
        TelefonoId : TelefonoId,
        Numero: Numero,
        UsuarioId: UsuarioId,
        TipoTelId: TipoTel
    }
    try {
        const Respuesta = await fetch("https://localhost:44342/api/Telefonos",
            {
                method: Comando,
                mode: "cors",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(DatosTelefono)
            });
        const Rpta = await Respuesta.json();
        LlenarGridTelefonos();
        //Se presenta la respuesta en el div mensaje
        $("#dvMensaje").html(Rpta);
    }
    catch (error) {
        //Se presenta la respuesta en el div mensaje
        $("#dvMensaje").html(error);
    }
}

function EditarFilaTel(DatosFila) {
    $("#txtTelefonoId").val(DatosFila.find('td:eq(0)').text());
    $("#txtNumero").val(DatosFila.find('td:eq(2)').text());
    $("#cboTipoTel option:contains(" +DatosFila.find('td:eq(1)').text() + ")").attr('selected', true);
}