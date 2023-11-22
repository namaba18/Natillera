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
    LlenarComboTipoActividad();
    LlenarComboEncargado();
    LlenarTablaActividades();
});

async function LlenarComboTipoActividad() {
    let Rpta = await LlenarComboXServicios("https://localhost:44342/api/TipoActividad")
    $("#cboTipoActividad").empty().append('<option value="0">Seleccione una opcion...</option>');
    for (i = 0; i < Rpta.length; i++) {
        $("#cboTipoActividad").append('<option value=' + Rpta[i].TipoActividadId + '>' + Rpta[i].Descripcion + '</option>');
    }
}

async function LlenarComboEncargado() {
    let Rpta = await LlenarComboXServicios("https://localhost:44342/api/Usuario")
    $("#cboEncargado").empty().append('<option value="0">Seleccione una opcion...</option>');
    for (i = 0; i < Rpta.length; i++) {
        $("#cboEncargado").append('<option value=' + Rpta[i].Id + '>' + Rpta[i].Nombre + " " + Rpta[i].Apellido + '</option>');
    }
}

async function EjecutarComandos(Comando) {
    event.preventDefault();
    let Nombre = $("#txtNombre").val();
    let Encargado = $("#cboEncargado").val();
    let TipoActividadId = $("#cboTipoActividad").val();
    let Costo = $("#txtCosto").val();
    let Ganancia = $("#txtGanancia").val();
    let Descripcion = $("#txtDescripcion").val();

    DatosCredito = {
        Nombre: Nombre,
        Encargado: Encargado,
        TipoActividadId: TipoActividadId,
        Costo: Costo,
        Ganancia: Ganancia,
        Descripcion: Descripcion
    }
    try {
        const Respuesta = await fetch("https://localhost:44342/api/Actividades",
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
        LlenarTablaActividades();
    }
    catch (error) {
        $("#dvMensaje").html(error);
    }
}

async function LlenarTablaActividades() {
    LlenarTablaXServicios("https://localhost:44342/api/Actividades", "#tblActividades")
}
