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
    LlenarComboUsuarios();
    LlenarTablaAhorros();
});

async function LlenarComboUsuarios() {
    let Rpta = await LlenarComboXServicios("https://localhost:44342/api/Usuario")
    for (i = 0; i < Rpta.length; i++) {
        $("#cboUsuarios").append('<option value=' + Rpta[i].Id + '>' + Rpta[i].Nombre + " " + Rpta[i].Apellido + '</option>');
    }
}

async function LlenarTablaAhorros() {
    LlenarTablaXServicios("https://localhost:44342/api/Ahorros", "#tblAhorros")
}

async function EjecutarComandos(Comando) {
    event.preventDefault();
    let Id = $("#txtId").val();
    let Ahorro = $("#txtMonto").val();
    let FechaPago = $("#dtFechaPago").val();
    let FechaEstimada = $("#dtFechaEstimada").val();
    let UsuarioId = $("#cboUsuarios").val();

    DatosAhorro = {
        AhorroId: Id,
        Ahorro1: Ahorro,
        FechaPago: FechaPago,
        FechaEstimada: FechaEstimada,
        UsuarioId: UsuarioId
    }
    try {
        const Respuesta = await fetch("https://localhost:44342/api/Ahorros",
            {
                method: Comando,
                mode: "cors",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(DatosAhorro)
            });
        const Rpta = await Respuesta.json();
        $("#dvMensaje").html(Rpta);
    }
    catch (error) {
        $("#dvMensaje").html(error);
    }
}

async function Consultar() {
    event.preventDefault();
    let Id = $("#txtId").val();

    try {
        const Respuesta = await fetch("https://localhost:44342/api/Ahorros?Id=" + Id,
            {
                method: "GET",
                mode: "cors",
                headers: {
                    "Content-Type": "application/json"
                }
            });
        const Rpta = await Respuesta.json();

        $("#txtMonto").val(Rpta.Ahorro1);
        $("#dtFechaPago").val(Rpta.FechaPago.split("T")[0]);
        $("#dtFechaEstimada").val(Rpta.FechaEstimada.split("T")[0]);
        $("#cboUsuarios").val(Rpta.UsuarioId);
    }
    catch (error) {
        $("#dvMensaje").html(error);
    }
}