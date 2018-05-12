//Comando para establecer la coneción

var socket = io();

//Referencia directa a documento html usando JQuery
var label = $('#lblNuevoTicket');

socket.on('connect', function() {
    console.log('Conectado al servidor');
});

socket.on('disconnect', function() {
    console.log('Desconectado del servidor');
});

//Escucuhamos el evento estadoActual
socket.on('estadoActual', function(resp) {
    console.log(resp);
    label.text(resp.actual);
})

//Establecer un listener para el botón

$('button').on('click', function() {
    socket.emit('siguienteTicket', null, function(siguienteTicket) {
        label.text(siguienteTicket);
    })
});