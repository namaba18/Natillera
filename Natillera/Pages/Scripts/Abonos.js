var oTabla = $("#tblAbonos").DataTable();
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
    $("#cboUsuario").on("change", function () {
        let usuarioId = document.getElementById("cboUsuario");
        LlenarComboPrestamos(usuarioId.value);
    });
    $('#tblAbonos tbody').on('click', 'tr', function () {
        if ($(this).hasClass('selected')) {
            $(this).removeClass('selected');
        } else {
            oTabla.$('tr.selected').removeClass('selected');
            $(this).addClass('selected');
            EditarFila($(this).closest('tr'));
        }
    });

    LlenarTablaAbonos();
    LlenarComboUsuarios();
});

async function LlenarComboUsuarios() {
    $("#cboUsuario").empty().append('<option value="0">Seleccione una opcion...</option>');
    let Rpta = await LlenarComboXServicios("https://localhost:44342/api/Usuario")
    for (i = 0; i < Rpta.length; i++) {
        $("#cboUsuario").append('<option value=' + Rpta[i].Id + '>' + Rpta[i].Nombre + " " + Rpta[i].Apellido + '</option>');
    }
}
async function LlenarComboPrestamos(usuarioId) {
    $("#cboPrestamo").empty().append('<option value="0">Seleccione una opcion...</option>');
    let Rpta = await LlenarComboXServicios("https://localhost:44342/api/Creditos?usuarioId=" + usuarioId)
    for (i = 0; i < Rpta.length; i++) {
        $("#cboPrestamo").append('<option value=' + Rpta[i].Id + '>' + Rpta[i].Fecha + "-" + Rpta[i].Monto + '</option>');
    }
}

async function LlenarTablaAbonos() {
    LlenarTablaXServicios("https://localhost:44342/api/Abonos", "#tblAbonos")
}

async function EjecutarComandos(Comando) {
    event.preventDefault();
    let Fecha = $("#txtFecha").val();
    let Monto = $("#txtMonto").val();
    let UsuarioId = $("#cboUsuario").val();
    let PrestamoId = $("#cboPrestamo").val();

    DatosAbono = {
        Fecha: Fecha,
        Monto: Monto,
        UsuarioId: UsuarioId,
        PrestamoId: PrestamoId        
    }
    try {
        const Respuesta = await fetch("https://localhost:44342/api/Abonos",
            {
                method: Comando,
                mode: "cors",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(DatosAbono)
            });
        const Rpta = await Respuesta.json();
        $("#dvMensaje").html(Rpta);
        LlenarTablaAbonos();
    }
    catch (error) {
        $("#dvMensaje").html(error);
    }
}

async function Consultar() {
    event.preventDefault();
    let Prestamo = $("#cboPrestamo").val();

    try {
        const Respuesta = await fetch("https://localhost:44342/api/Abonos?PrestamoId=" + Prestamo,
            {
                method: "GET",
                mode: "cors",
                headers: {
                    "Content-Type": "application/json"
                }
            });
        const Rpta = await Respuesta.json();

        var Columnas = [];
        NombreColumnas = Object.keys(Rpta[0]);
        for (var i in NombreColumnas) {
            Columnas.push({
                data: NombreColumnas[i],
                title: NombreColumnas[i]
            });
        }
        $("#tblAbonos").DataTable({
            data: Rpta,
            columns: Columnas,
            destroy: true
        });      
    }
    catch (error) {
        $("#dvMensaje").html(error);
    }
}

function EditarFila(DatosFila) {
    $("#txtDocumento").val(DatosFila.find('td:eq(2)').text());
    $("#txtNombre").val(DatosFila.find('td:eq(3)').text());
    $("#txtPrimerApellido").val(DatosFila.find('td:eq(4)').text());
    $("#txtSegundoApellido").val(DatosFila.find('td:eq(5)').text());
    $("#txtDireccion").val(DatosFila.find('td:eq(6)').text());
    $("#txtEmail").val(DatosFila.find('td:eq(7)').text());
    var Fecha = DatosFila.find('td:eq(8)').text();
    $("#txtFechaNacimiento").val(Fecha.split('T')[0]);
}

