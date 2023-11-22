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



