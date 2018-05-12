const { io } = require('../server');
const { TicketControl } = require('../classes/ticket-control');

//Crear instancia de ticketControl

const ticketControl = new TicketControl();


io.on('connection', (client) => {

    client.on('siguienteTicket', (data, callback) => {
        let siguiente = ticketControl.siguienteTicket();
        console.log('Siguiente: ', siguiente);
        callback(siguiente);
    })

    //Emitir un evento
    client.emit('estadoActual', {
        actual: ticketControl.getUltimoTicket(),
        ultimos4: ticketControl.getUltimos4()
    });

    client.on('atenderTicket', (data, callback) => {
        if (!data.escritorio) {
            return callback({
                err: true,
                mensaje: 'Es necesario especificar el escritorio'
            });
        }

        //identificar el ticket a atender en un respectivo escritorio.
        let atenderTicket = ticketControl.atenderTicket(data.escritorio);

        //Retornar el ticket a atender
        callback(atenderTicket);

        //Actualizar/Notificar cambios en los ultimos4.

        client.broadcast.emit('ultimos4', {
            ultimos4: ticketControl.getUltimos4()
        });
        //Emitir ultimos4


    })

});