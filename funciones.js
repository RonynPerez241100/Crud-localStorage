
var dbEmpleados = localStorage.getItem("dbEmpleados"); //Obtener datos de localStorage
var operacion = "A"; //"A"=agregar; "E"=edtidar; "W"= esperar
dbEmpleados = JSON.parse(dbEmpleados); // Covertir a objeto
if (dbEmpleados === null) // Si no existe, creamos un array vacio.
    dbEmpleados = [];


function Mensaje(t){
        switch (t) {
            case 1: //
                $(".mensaje-alerta").append(
                    "<div class='alert alert-success' role='alert'>Se agrego el registro correctamente</div>"
                );
                break;
            case 2: //
                $(".mensaje-alerta").append(
                    "<div class='alert alert-danger' role='alert'>Se eliminio el registro correctamente</div>"
                );
                break;
            default:

        }
    }


function AgregarEmp () {

    operacion = "A";
    // Seleccionamos los datos de los inputs de formulario
    var datos_cliente = JSON.stringify({
        fullName : $("#fullName").val(),
        codEmp : $("#codEmp").val(),
        salary : $("#salary").val(),
        city : $("#city").val(),
    });

    dbEmpleados.push(datos_cliente); // Guardar datos en el array definido globalmente
    localStorage.setItem("dbEmpleados", JSON.stringify(dbEmpleados));



    ListarEmp();


    return Mensaje(1);
}



function ListarEmp (){
    $("#dbEmpleados-list").html(
            "<thead>" +
                "<tr>" +
                    "<th> ID </th>" +

                    "<th> Nombre completo: </th>" +
                    "<th> Codigo de empleado: </th>" +
                    "<th> salario: </th>" +
                    "<th> Ciudad: </th>" +
                    "<th> </th>" +
                    "<th>  </th>" +
                "</tr>" +
            "</thead>" +
            "<tbody>" +
            "</tbody>"
    );

    for (var i in dbEmpleados) {
        var d = JSON.parse(dbEmpleados[i]);
        $("#dbEmpleados-list").append(
                        "<tr>" +
                            "<td>" + i + "</td>" +
                            "<td>" + d.fullName + "</td>" +
                            "<td>" + d.codEmp + "</td>" +
                            "<td>" + d.salary + "</td>" +
                            "<td>" + d.city + "</td>" +
                            "<td> <a id='"+ i +"' class='btnEditar' href='#'> <span class='glyphicon glyphicon-pencil'> </span>  </a> </td>" +
                            "<td> <a id='" + i + "' class='btnEliminar' href='#'> <span class='glyphicon glyphicon-trash'> </span> </a> </td>" +
                        "</tr>"
                           );
    }

}


if (dbEmpleados.length !== 0) {
    ListarEmp();
} else {
    $("#dbEmpleados-list").append("<h2> No tienes registros </h2>");
}

function contarEmp(){
    var empleados = dbEmpleados;
    nEmp = empleados.length;

    $("#numeroEmpleados").append(
        "<a>Tienes actualmente" + "<br>" + "<span class='badge'>" + nEmp + "</span></a> registros"
    );
    return nEmp;
}

function Eliminar(e){
    dbEmpleados.splice(e, 1); // Args (posición en el array, numero de items a eliminar)
    localStorage.setItem("dbEmpleados", JSON.stringify(dbEmpleados));
    return Mensaje(2);
}

function Editar() {
    dbEmpleados[indice_selecionado] = JSON.stringify({
        fullName : $("#fullName").val(),
        codEmp : $("#codEmp").val(),
        salary : $("#salary").val(),
        city : $("#city").val(),
    });
    localStorage.setItem(dbEmpleados[indice_selecionado], JSON.stringify(dbEmpleados[indice_selecionado])); //Asignas el indice en el primero, y el valor en el segundo
    operacion = "W" // Es necesario un tercer estado para evitar duplicaciones.
    ListarEmp();
    return true;

}

$(".btnEliminar").bind("click", function(){
    alert("¿Deseas eliminar el siguiente registro ?");
    indice_selecionado = $(this).attr("id"); // "this" contiene el elemento clikeado en el contexto actual
    console.log(indice_selecionado);
    console.log(this);
    Eliminar(indice_selecionado); // Eliminamos el elemento llamando la funcion de eliminar
    ListarEmp();
});

$(".btnEditar").bind("click", function() {
    alert("¿ quieres editar el siguiente campo ?");
    // Cambiamos el modo
    $(".modo").html("<span class='glyphicon glyphicon-pencil'> </span> Modo edición");
    operacion = "E";
    indice_selecionado = $(this).attr("id");
    console.log(indice_selecionado);
    console.log(this);
    // Llemanos el formulario con los datos actuales del emplado a editar
    var empItem = JSON.parse(dbEmpleados[indice_selecionado]);
    $("#fullName").val(empItem.fullName);
    $("#codEmp").val(empItem.codEmp);
    $("#salary").val(empItem.salary);
    $("#city").val(empItem.city);
    $("#fullName").focus();
});


contarEmp();
// Esperar el evento de envio del formulario !!
$("#empleados-form").bind("submit", function() {
    debugger;
    if (operacion == "A")
        return AgregarEmp();
    else if (operacion == "E") {
        return Editar();
    }
});
