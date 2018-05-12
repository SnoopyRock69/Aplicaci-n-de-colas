//Comando para establecer la conexión
var socket = io();

//Creamos referencia a las zonas en pantalla que mostrarán los tickets que están siendo atentidos.
var lblTicket1 = $('#lblTicket1'); //el # es para buscar por id en el html.
var lblTicket2 = $('#lblTicket2');
var lblTicket3 = $('#lblTicket3');
var lblTicket4 = $('#lblTicket4');

var lblEscritorio1 = $('#lblEscritorio1');
var lblEscritorio2 = $('#lblEscritorio2');
var lblEscritorio3 = $('#lblEscritorio3');
var lblEscritorio4 = $('#lblEscritorio4');

//Creamos dos arreglos

var lblTickets = [lblTicket1, lblTicket2, lblTicket3, lblTicket4];
var lblEscritorios = [lblEscritorio1, lblEscritorio2, lblEscritorio3, lblEscritorio4];

socket.on('estadoActual', function(data) {
    // console.log(data);
    actualizaHTML(data.ultimos4);
})

socket.on('ultimos4', function(data) {
    // console.log(data);
    //Reproducir el audio para indiciar siguiente ticket.
    var audio = new Audio('audio/new-ticket.mp3');
    audio.play();

    actualizaHTML(data.ultimos4);
})



//Función para actualizar el html porque será llamado varias veces

function actualizaHTML(ultimos4) {
    for (var i = 0; i <= ultimos4.length - 1; i++) {
        lblTickets[i].text('Ticket ' + ultimos4[i].numero);
        lblEscritorios[i].text('Escritorio ' + ultimos4[i].escritorio);
    }
}