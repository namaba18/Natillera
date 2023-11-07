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
    LlenarComboUsuarios();
    LlenarTablaCreditos();
});

async function LlenarComboUsuarios() {
    let Rpta = await LlenarComboXServicios("https://localhost:44342/api/Usuario")
    for (i = 0; i < Rpta.length; i++) {
        $("#cboUsuarios").append('<option value=' + Rpta[i].Id + '>' + Rpta[i].Nombre + " " + Rpta[i].Apellido + '</option>');
    }
}

async function EjecutarComandos(Comando) {
    event.preventDefault();
    let Fecha = $("#dtFecha").val();
    let Monto = $("#txtMonto").val();
    let Cuotas = $("#txtCuotas").val();
    let Interes = $("#txtInteres").val();
    let UsuarioId = $("#cboUsuarios").val();

    DatosCredito = {
        Fecha: Fecha,
        Monto: Monto,
        Cuotas: Cuotas,
        Interes: Interes,
        UsuarioId: UsuarioId
    }
    try {
        const Respuesta = await fetch("https://localhost:44342/api/Creditos",
            {
                method: Comando,
                mode: "cors",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(DatosCredito)
            });
        const Rpta = await Respuesta.json();
        $("#dvMensaje").html(Rpta);
        LlenarTablaCreditos();
    }
    catch (error) {
        $("#dvMensaje").html(error);
    }
}

async function LlenarTablaCreditos() {
    LlenarTablaXServicios("https://localhost:44342/api/Creditos", "#tblCreditos")
}