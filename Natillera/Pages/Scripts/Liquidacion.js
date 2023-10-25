jQuery(function () {
    $("#dvMenu").load("../Pages/Menu.html")
    $("#btnConsultar").on("click", function () {
        Consultar();
    });
});

async function Consultar() {
    event.preventDefault();
    let Documento = $("#txtDocumento").val();

    try {
        const Respuesta = await fetch("https://localhost:44342/api/Liquidacion?Documento=" + Documento,
            {
                method: "GET",
                mode: "cors",
                headers: {
                    "Content-Type": "application/json"
                }
            });
        const Rpta = await Respuesta.json();

        $("#txtMonto").val(Rpta.Monto);
        $("#txtNombre").val(Rpta.Nombre);
        $("#txtApellido").val(Rpta.Apellido);
    }
    catch (error) {
        $("#dvMensaje").html(error);
    }
}