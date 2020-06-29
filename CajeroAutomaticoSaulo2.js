//Hecho por Saulo Fernandes.

//Molde de billetes.
class Billete {
  constructor(valor, cantidad, index) {
    this.index = index; //Posicion en el array
    this.valor = valor; //Valor del billete.
    this.cantidad = cantidad; //Cantidad del billete.
    this.imagen = new Image(); // Imagen del billete.
    this.imagen.src = `${valor}dolares.jpg`; // URL Imagen del billete.
  }
}

//Objeto Cajero Automatico.
var cajeroAutomatico = {
  dineroDisponible: 0,
  caja: [],

  //Cuenta la cantidad de billetes individual que hay en la caja y el total en el cajero.
  contador() {
    console.log("[contador()] Activado!");
    this.dineroDisponible = 0;
    for (const billete in cajeroAutomatico.caja) {
      this.dineroDisponible +=
        cajeroAutomatico.caja[billete].valor *
        cajeroAutomatico.caja[billete].cantidad;
    }
    console.log(
      "[contador()] Dinero disponible en el cajero: " + this.dineroDisponible
    );
    console.log(
      "[contador()] Cantidad billetes de 50$ en el cajero: " +
        cajeroAutomatico.caja[0].cantidad
    );
    console.log(
      "[contador()] Cantidad billetes de 20$ en el cajero: " +
        cajeroAutomatico.caja[1].cantidad
    );
    console.log(
      "[contador()] Cantidad billetes de 10$ en el cajero: " +
        cajeroAutomatico.caja[2].cantidad
    );
  },

  //Funcion para entregar los billetes al usuario y descontar la cantidad de billetes en la caja.
  retiroDinero() {
    //Variable que almacena el dinero Solicitado por el usuario en el input.
    dineroSolicitado = numerosRetiro.value;
    //Restante de dinero por entregar al usuario.
    restanteSolicitado = dineroSolicitado;
    //Cantidad de billetes que se le entregaran al usuario.
    billetesEntregados = [0, 0, 0];

    //Comprueba si hay suficiente dinero en el cajero.
    if (cajeroAutomatico.dineroDisponible >= dineroSolicitado) {
      //Comprueba si el monto solicitado se puede dar con los billetes disponibles.
      if (
        dineroSolicitado % 50 == 0 ||
        dineroSolicitado % 20 == 0 ||
        dineroSolicitado % 10 == 0
      ) {
        //Ciclo que recorre los billetes para ejecutar la formula.
        for (const billete of cajeroAutomatico.caja) {
          //Comprueba si el restante por entregar al cliente es 0, en otras palabras, si ya el cliente recibio todo el dinero solicitado.Si es asi rompe el ciclo for.
          if (restanteSolicitado == 0) {
            break;

            //Si falta dinero por entregar entra al siguiente else.
          } else {
            //Formula para saber cuantos billetes se deben entregar.
            cantidadBilletesEntregar = Math.floor(
              restanteSolicitado / billete.valor
            );
            //Ciclo while que mantiene viva la comprobacion.
            while (true) {
              //Si hay suficientes billetes en el cajero para la cantidad que retorno la formula, entra en el if.
              if (
                billete.cantidad >= cantidadBilletesEntregar &&
                billete.cantidad > 0
              ) {
                //Le restamos la cantidad de billetes entregada, a la cantidad que tenemos en la caja.
                billete.cantidad -= cantidadBilletesEntregar;
                //Al restante de dinero por entregar le restamos el monto entregado al cliente.
                restanteSolicitado -= cantidadBilletesEntregar * billete.valor;
                //Guardo en un array la cantidad de billetes entregados al usuario, segun su index.
                billetesEntregados[billete.index] = cantidadBilletesEntregar;
                console.log(
                  "Restante de dinero por entregar = ",
                  restanteSolicitado
                );
                //Si el restante por entregar es 0, entramos en el siguiente if. Activamos la funcion entregarDinero() y rompemos el ciclo while.
                if (restanteSolicitado == 0) {
                  cajeroAutomatico.entregarDinero();
                  break;
                  //Si la cantidad no es 0, entramos al else, rompemos el ciclo while para que el ciclo for pase al siguiente billete.
                } else {
                  break;
                }

                //Si no hay suficientes billetes en el cajero para la cantidad que retorno la formula, entra en el else.
              } else {
                //Comprobamossi la cantidad de billetes a entregar es 0, y si es asi rompemos el ciclo while.
                if (cantidadBilletesEntregar == 0) {
                  break;

                  //Si la cantidad no es 0, le restamos 1 a la cantidad de billetes a entregar, y vuelve a empezar el ciclo while con todas las comprobaciones.
                } else {
                  cantidadBilletesEntregar -= 1;
                }
              }
            }
          }
        } //Si no se puede dar el monto con los valores de billetes disponibles, entra en el siguiente else y da el siguiente mensaje.
      } else {
        alert(
          "Los billetes disponibles no te pueden dar esa cantidad, redondealo a multiplos de 10"
        );
      }
      //Si la cantidad disponible en el cajero es menor a la solicitada por el usuario, entramos en el else y le avisamos que no hay suficiente dinero.
    } else {
      alert("No hay suficiente dinero disponible.");
    }
  },

  entregarDinero() {
    console.log("[entregarDinero()] Activado!");
    for (const billete of cajeroAutomatico.caja) {
      cajeroAutomatico.dineroDisponible -=
        billetesEntregados[billete.index] * billete.valor;
      console.log(
        `[entregarDinero()] Fueron entregados ${
          billetesEntregados[billete.index]
        } billetes de ${billete.valor}$ `
      );
      for (let i = 0; i < billetesEntregados[billete.index]; i++) {
        imagen = new Image();
        imagen.src = billete.imagen.src;
        imprimirBilletes.appendChild(imagen);
      }
    }
    console.log(
      "Dinero disponible en el cajero, despues de la transaccion: ",
      cajeroAutomatico.dineroDisponible
    );
  },
};

//Variables Globales.
var dineroSolicitado, restanteSolicitado;
var billetesEntregados = [];
var botonRetiro = document.getElementById("button_retiro");
var numerosRetiro = document.getElementById("number_retiro");
var imprimirBilletes = document.getElementById("imprimir_billetes");
//Ingresando billetes en el cajero (caja).
cajeroAutomatico.caja.push(new Billete(50, 10, 0)); //Billetes de 50.
console.log(
  "Se ha ingresado en el cajero: " +
    cajeroAutomatico.caja[cajeroAutomatico.caja.length - 1].cantidad +
    " billetes de 50."
);
cajeroAutomatico.caja.push(new Billete(20, 10, 1)); //Billetes de 20.
console.log(
  "Se ha ingresado en el cajero: " +
    cajeroAutomatico.caja[cajeroAutomatico.caja.length - 1].cantidad +
    " billetes de 20."
);
cajeroAutomatico.caja.push(new Billete(10, 10, 2)); //Billetes de 10.
console.log(
  "Se ha ingresado en el cajero: " +
    cajeroAutomatico.caja[cajeroAutomatico.caja.length - 1].cantidad +
    " billetes de 10."
);

//Activando la funcion contador()
cajeroAutomatico.contador();

//Boton que activa la funcion retiroDinero.
botonRetiro.addEventListener("click", cajeroAutomatico.retiroDinero);
