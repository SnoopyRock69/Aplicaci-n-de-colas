// comando para establecer la comunicación
var socket = io();

//Obtener parámetros por Url
var searchParams = new URLSearchParams(window.location.search);
/* .has() es para preguntar si existe el escritorio */
if (!searchParams.has('escritorio')) {
    // salimos de la pantalla
    window.location = 'index.html';
    throw new Error('Es necesario especificar el escritorio');
}

var escritorio = searchParams.get('escritorio');
var label = $('small');

console.log(escritorio);

//Escribimos en pantalla en qué escritorio se atenderá determinado ticket.
$('h1').text('Escritorio ' + escritorio);

//Para llamar el soket creamos el listener
$('button').on('click', function() {
    socket.emit('atenderTicket', { escritorio: escritorio }, function(resp) {
        if (resp === 'No hay tickets') {
            label.text(resp);
            alert(resp);
            return;
        }
        label.text('Ticket ' + resp.numero);
    })
})