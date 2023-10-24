var oTabla = $("#tblProductos").DataTable();
jQuery(function () {
    $("#dvMenu").load("../Pages/Menu.html")
    LlenarComboTipoUsuario();
    LlenarComboTipoDocumento();
    LlenarComboPais();
    LlenarComboDepartamento();
    LlenarComboCiudad();
    LlenarComboBarrio();
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

async function LlenarComboDepartamento() {
    let Rpta = await LlenarComboXServicios("https://localhost:44342/api/Departamento")
    for (i = 0; i < Rpta.length; i++) {
        $("#cboDepartamento").append('<option value=' + Rpta[i].DepartamentoId + '>' + Rpta[i].Nombre + '</option>');
    }
}
async function LlenarComboCiudad() {
    let Rpta = await LlenarComboXServicios("https://localhost:44342/api/Ciudad")
    for (i = 0; i < Rpta.length; i++) {
        $("#cboCiudad").append('<option value=' + Rpta[i].CiudadId + '>' + Rpta[i].Nombre + '</option>');
    }
}
async function LlenarComboBarrio() {
    let Rpta = await LlenarComboXServicios("https://localhost:44342/api/Barrio")
    for (i = 0; i < Rpta.length; i++) {
        $("#cboBarrio").append('<option value=' + Rpta[i].BarrioId + '>' + Rpta[i].Nombre + '</option>');
    }
}

async function LlenarTablaUsuarios() {
    LlenarTablaXServicios("https://localhost:44342/api/Usuario", "#tblUsuarios")
}