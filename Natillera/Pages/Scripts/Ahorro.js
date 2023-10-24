jQuery(function () {
    $("#dvMenu").load("../Pages/Menu.html")
    LlenarComboUsuarios();
});

async function LlenarComboUsuarios() {
    let Rpta = await LlenarComboXServicios("https://localhost:44342/api/Usuario")
    for (i = 0; i < Rpta.length; i++) {
        $("#cboUsuarios").append('<option value=' + Rpta[i].Id + '>' + Rpta[i].Nombre + " " + Rpta[i].Apellido + '</option>');
    }
}