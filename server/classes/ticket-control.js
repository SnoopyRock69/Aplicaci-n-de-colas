//Trabajaremos con clases de ES6
const fs = require('fs');

class Ticket {
    constructor(numero, escritorio) {
        this.numero = numero;
        this.escritorio = escritorio;
    }
}

class TicketControl {
    constructor() {
        this.ultimo = 0;
        this.hoy = new Date().getDate();
        this.tickets = []; //manejar tickets pendientes.
        this.ultimos4 = []; //manejar los últimos 4 tickets que están siendo atendidos.

        let data = require('../data/data.json');
        if (data.hoy === this.hoy) {
            this.ultimo = data.ultimo;
            this.tickets = data.tickets;
            this.ultimos4 = data.ultimos4;
        } else {
            this.reiniciarConteo();
        }
    }


    //Pasar al siguiente ticket
    siguienteTicket() {
        this.ultimo += 1;
        let ticket = new Ticket(this.ultimo, null);
        this.tickets.push(ticket);
        this.grabarArchivo();

        return `Ticket ${this.ultimo}`
    }

    getUltimoTicket() {
        return `Ticket ${this.ultimo}`
    }

    getUltimos4() {
        return this.ultimos4;
    }
    atenderTicket(escritorio) {
            //Si no hay tickets
            if (this.tickets.length === 0) {
                return 'No hay tickets';
            }
            //Extraigo el número.
            let numeroTicket = this.tickets[0].numero;
            //Elimina el primer elemento
            this.tickets.shift();
            //creamos instancia de nuevo ticket que es el que quiero atender
            let atenderTicket = new Ticket(numeroTicket, escritorio);
            //Agregar ticket al inicio del arreglo
            this.ultimos4.unshift(atenderTicket);
            //Si llega al punto en el que hay más de 4 en el arreglo
            if (this.ultimos4.length > 4) {
                //Borramos el último elemento
                this.ultimos4.splice(-1, 1);
            }
            console.log('Ultimos 4');
            console.log(this.ultimos4);

            //Grabamos la información en el archivo.
            this.grabarArchivo();
            //Retornamos el ticket a anteder.
            return atenderTicket;
        }
        //Información a grabar para reiniciar conteo.
    reiniciarConteo() {
        this.ultimo = 0;
        this.tickets = [];
        this.ultimos4 = [];

        console.log('Se ha inicializado el sistema');
        this.grabarArchivo();
    }

    grabarArchivo() {
        let jsonData = {
            ultimo: this.ultimo,
            hoy: this.hoy,
            tickets: this.tickets,
            ultimos4: this.ultimos4
        };

        //Convertir a formato json
        let jsonDataString = JSON.stringify(jsonData);
        //Grabar en el archivo data.json
        fs.writeFileSync('./server/data/data.json', jsonDataString);
    }
}

module.exports = {
    TicketControl
}