jQuery(function () {
    $("#dvMenu").load("../Pages/Menu.html")
});

async function LlenarTablaAbonos() {
    LlenarTablaXServicios("https://localhost:44342/api/Abonos", "#tblAbonos")
}

