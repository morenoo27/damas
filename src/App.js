import React, { Component } from 'react';
import Botonera from "./components/Botonera";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {

      colores: Array(8).fill(null).map(pos => Array(4).fill(null)),

      pulsado: { x: null, y: null },
      resaltado: [{ x: null, y: null }, { x: null, y: null }, { x: null, y: null }, { x: null, y: null }]
    };

    //ANTES DE CONSTRUIRSE
    let newColores = this.state.colores

    //POSICIONAMUIENTO DE COLORES EN LA MATRIZ
    for (let i = 0; i < newColores.length; i++) {

      if (i >= 5) {
        for (let j = 0; j < newColores[i].length; j++) {

          newColores[i][j] = "success"
        }
      } else {
        for (let j = 0; j < newColores[i].length; j++) {

          newColores[i][j] = "secondary"
        }
      }
    }

    this.setState({ colores: newColores })
  }

  /**
   * Metodo que interpreta que accion es la que se va a realizar una vez el usuario
   * ha pulsado un boton, ya sea un intento de movimiento, cambio de ficha para jugar
   * o un movimiento de una ficha
   * 
   * @param {Number} x coordenada x apuntando al mapa de los colores del estado de la aplicacion
   * @param {Numer} y coordenada y apuntando al mapa de los colores del estado de la aplicacion
   * @param {string} fila parametro que define en que fila se encuentra el boton pulsado
   */
  mover(x, y, fila) {

    //copia pulsado
    let copiaPulsado = this.state.pulsado

    //variable para el filtrado de ficha en danger
    let otroBotonParaJugar = false;

    if (copiaPulsado.x != null) {

      //mirar si se ha pulsado el mismo de nuevo(para deseleccionar)
      if (copiaPulsado.x == x && copiaPulsado.y == y) {

        //copia colores
        let copiaColores = this.state.colores

        //copia botones resaltados
        let copiaResaltados = this.state.resaltado

        //reestablecemos el color del boton pulsado + su estado
        copiaColores[x][y] = copiaColores[copiaPulsado.x][copiaPulsado.y]

        copiaPulsado.x = null
        copiaPulsado.y = null

        //REESTABLECEMOS BOTONES RESALTADOS + ESTADO

        //miramos pos 0 (arriba)
        if (copiaResaltados[0].x != null) {

          //ponemos el boton al estado anterior
          copiaColores[copiaResaltados[0].x][copiaResaltados[0].y] = "secondary"

          //ponemos a null el estado
          copiaResaltados[0].x = null
          copiaResaltados[0].y = null
        }

        //miramos pos 1 (arriba derecha|izquierda)
        if (copiaResaltados[1].x != null) {

          //ponemos el boton al estado anterior
          copiaColores[copiaResaltados[1].x][copiaResaltados[1].y] = "secondary"

          //ponemos a null el estado
          copiaResaltados[1].x = null
          copiaResaltados[1].y = null
        }

        if (copiaResaltados[2].x != null) {

          //ponemos el boton al estado anterior
          copiaColores[copiaResaltados[2].x][copiaResaltados[2].y] = "secondary"

          //ponemos a null el estado
          copiaResaltados[2].x = null
          copiaResaltados[2].y = null
        }

        if (copiaResaltados[3].x != null) {

          //ponemos el boton al estado anterior
          copiaColores[copiaResaltados[3].x][copiaResaltados[3].y] = "secondary"

          //ponemos a null el estado
          copiaResaltados[3].x = null
          copiaResaltados[3].y = null
        }

        this.setState({
          pulsado: copiaPulsado,
          colores: copiaColores,
          resaltado: copiaResaltados
        })

      } else {

        //mirar si el pulsado estaba en "danger"
        if (this.wasBtnDanger()) {

          //copia colores
          let copiaColores = this.state.colores

          //anotamos que vamos a jugar con otro boton
          otroBotonParaJugar = true;

          //cambiamos el color del anterior danger, para seleccionar el proximos boton
          copiaColores[copiaPulsado.x][copiaPulsado.y] = "success"

          //guardamos estado
          this.setState({ colores: copiaColores })
        }

        //comprobamos que relamente queremos mover ficha
        if (!otroBotonParaJugar) {

          //movemos ficha
          this.movimientoFicha(x, y)
        } else {

          this.seleccionar(x, y, fila)
        }
      }
    } else {

      this.seleccionar(x, y, fila)
    }
  }

  /**
   * Metodo que mueve una ficha del tablero, comprobando que el movimiento
   * de la ficha coincida con una de las casillas resaltadas en el tablero.
   * 
   * Si no se pulsa ninguna de estas dos posiciones, se cancela el movimiento
   * 
   * @param {Number} x coordenada fila de la matriz colores
   * @param {Number} y coordenada columna de la matriz colores
   */
  movimientoFicha(x, y) {

    //COPIAS
    let copiaPulsado = this.state.pulsado
    let copiaColores = this.state.colores
    let copiaResaltados = this.state.resaltado

    //COMPROBAMOS QUE EL SALTO ES VALIDO
    let coincideArriba = x == copiaResaltados[0].x || x == copiaResaltados[1].x
    let coincideArribaDI = y == copiaResaltados[0].y || y == copiaResaltados[1].y

    let coincideAbajo = x == copiaResaltados[2].x || x == copiaResaltados[3].x
    let coincideabajoDI = y == copiaResaltados[2].y || y == copiaResaltados[3].y

    let coincideResaltado = (coincideArriba && coincideArribaDI) || (coincideAbajo && coincideabajoDI)

    //ACTUALIZAMOS ESTADO (independientemente del boton pulsado)
    if (coincideResaltado) {

      //intercambiamos colores
      //primero todos a secondary
      if (copiaResaltados[0].x != null) {
        copiaColores[copiaResaltados[0].x][copiaResaltados[0].y] = "secondary"
      }

      if (copiaResaltados[1].x != null) {
        copiaColores[copiaResaltados[1].x][copiaResaltados[1].y] = "secondary"
      }

      if (copiaResaltados[2].x != null) {
        copiaColores[copiaResaltados[2].x][copiaResaltados[2].y] = "secondary"
      }

      if (copiaResaltados[3].x != null) {
        copiaColores[copiaResaltados[3].x][copiaResaltados[3].y] = "secondary"
      }

      if (x == 0) {
        copiaColores[x][y] = "warning"//si llega a la fiila 0, se convierte en reina
      } else {
        copiaColores[x][y] = copiaColores[copiaPulsado.x][copiaPulsado.y]//luego sobreescribo el que sea al color del pulsado
      }

      copiaColores[copiaPulsado.x][copiaPulsado.y] = "secondary"

      //QUITAMOS ESTADOS TOTALES
      this.quitarEstados()

      //actualizamos estado
      this.setState({
        colores: copiaColores
      })
    } else {

      //no ha pulsado un salto valido, devolvemos los colores
      if (copiaResaltados[0].x != null) {
        copiaColores[copiaResaltados[0].x][copiaResaltados[0].y] = "secondary"
      }

      if (copiaResaltados[1].x != null) {
        copiaColores[copiaResaltados[1].x][copiaResaltados[1].y] = "secondary"
      }

      if (copiaResaltados[2].x != null) {
        copiaColores[copiaResaltados[2].x][copiaResaltados[2].y] = "secondary"
      }

      if (copiaResaltados[3].x != null) {
        copiaColores[copiaResaltados[3].x][copiaResaltados[3].y] = "secondary"
      }

      //QUITAMOS ESTADOS TOTALES
      this.quitarEstados()

      //actualizamos estado
      this.setState({
        colores: copiaColores
      })
    }
  }

  /**
   * Funcion que elimina todos los estados en referencia 
   * al boton pulsado y sus resalatados
   */
  quitarEstados() {

    //COPIAS
    let copiaPulsado = this.state.pulsado
    let copiaResaltados = this.state.resaltado

    //pulsado
    copiaPulsado.x = null
    copiaPulsado.y = null

    //resaltados
    copiaResaltados[0].x = null
    copiaResaltados[0].y = null
    copiaResaltados[1].x = null
    copiaResaltados[1].y = null
    copiaResaltados[2].x = null
    copiaResaltados[2].y = null
    copiaResaltados[3].x = null
    copiaResaltados[3].y = null

    //actualizamos estado
    this.setState({
      pulsado: copiaPulsado,
      resaltado: copiaResaltados
    })
  }

  /**
   * Metodo que mira si el anterior boton/ficha pulsad@ estaba en estado danger
   * 
   * @returns true = 'era danger' | false = 'no era danger'
   */
  wasBtnDanger() {

    //copia colores
    let copiaColores = this.state.colores

    //copia pulsado
    let copiaPulsado = this.state.pulsado

    return copiaColores[copiaPulsado.x][copiaPulsado.y] == "danger"
  }

  /**
   * Funcion que selecciona y elije que color tendra el boton/ficha elegida por el usuario
   * 
   * @param {Number} coordX x representativa de la  matriz de colores
   * @param {Number} coordY y representativa de la matriz de colores
   * @param {string} fila texto que indica el tipo de fila que es
   */
  seleccionar(coordX, coordY, fila) {

    //copia colores
    let copiaColores = this.state.colores

    switch (copiaColores[coordX][coordY]) {

      //CASO FICHA NORMAL
      case "success":

        this.actualizarPulsado(coordX, coordY);

        //resalto botones
        copiaColores[coordX][coordY] = this.colorResalto(coordX, coordY, fila)

        this.setState({
          colores: copiaColores
        })

        break;

      //CASO DAMA
      case "warning":

        this.actualizarPulsado(coordX, coordY);

        this.resaltarReina(coordX, coordY, fila);

        break;
      default:
        break;
    }
  }

  resaltarReina(x, y, fila) {

    //copia colores
    let copiaColores = this.state.colores

    //1º MIRAMOS ARRIBA
    if (x - 1 >= 0) {

      if (fila == "par") {
        this.resaltarArribaPar(x, y)
      } else {
        this.resaltarArribaImpar(x, y)
      }
    }

    //2º MIRAMOS ABAJO
    if (x + 1 <= copiaColores.length - 1) {

      if (fila == "par") {
        this.resaltarAbajoPar(x, y)
      } else {
        this.resaltarAbajoImpar(x, y)
      }
    }
  }

  resaltarAbajoPar(x, y) {

    //copia colores
    let copiaColores = this.state.colores

    //copia botones resaltados
    let copiaResaltados = this.state.resaltado

    //miramos si no hay una pieza en esa posicion
    if (copiaColores[x + 1][y] == "secondary") {

      copiaColores[x + 1][y] = "info"

      copiaResaltados[2].x = x + 1
      copiaResaltados[2].y = y
    }

    //miramos arriba derecha(tanto en mapa como en el visual)
    if (y + 1 < copiaColores[x].length) {

      if (copiaColores[x + 1][y + 1] == "secondary") {

        copiaColores[x + 1][y + 1] = "info"

        copiaResaltados[3].x = x + 1
        copiaResaltados[3].y = y + 1
      }
    }

    this.setState({
      colores: copiaColores,
      resaltado: copiaResaltados
    })
  }

  resaltarAbajoImpar(x, y) {

    //copia colores
    let copiaColores = this.state.colores

    //copia botones resaltados
    let copiaResaltados = this.state.resaltado

    //miramos si no hay una pieza en esa posicion
    if (copiaColores[x + 1][y] == "secondary") {

      copiaColores[x + 1][y] = "info"

      copiaResaltados[2].x = x + 1
      copiaResaltados[2].y = y
    }

    //miramos arriba derecha(tanto en mapa como en el visual)
    if (y + 1 <= copiaColores[x].length) {

      if (copiaColores[x + 1][y - 1] == "secondary") {

        copiaColores[x + 1][y - 1] = "info"

        copiaResaltados[3].x = x + 1
        copiaResaltados[3].y = y - 1
      }
    }

    this.setState({
      colores: copiaColores,
      resaltado: copiaResaltados
    })
  }

  resaltarArribaPar(x, y) {

    //copia colores
    let copiaColores = this.state.colores

    //copia botones resaltados
    let copiaResaltados = this.state.resaltado

    //miramos si no hay una pieza en esa posicion
    if (copiaColores[x - 1][y] == "secondary") {

      copiaColores[x - 1][y] = "info"

      copiaResaltados[0].x = x - 1
      copiaResaltados[0].y = y
    }

    //miramos arriba derecha(tanto en mapa como en el visual)
    if (y + 1 < copiaColores[x].length) {

      if (copiaColores[x - 1][y + 1] == "secondary") {

        copiaColores[x - 1][y + 1] = "info"

        copiaResaltados[1].x = x - 1
        copiaResaltados[1].y = y + 1
      }
    }

    this.setState({
      colores: copiaColores,
      resaltado: copiaResaltados
    })
  }

  resaltarArribaImpar(x, y) {

    //copia colores
    let copiaColores = this.state.colores

    //copia botones resaltados
    let copiaResaltados = this.state.resaltado

    //miramos si no hay una pieza en esa posicion
    if (copiaColores[x - 1][y] == "secondary") {

      copiaColores[x - 1][y] = "info"

      copiaResaltados[0].x = x - 1
      copiaResaltados[0].y = y
    }

    //miramos arriba derecha(tanto en mapa como en el visual)
    if (y + 1 <= copiaColores[x].length) {

      if (copiaColores[x - 1][y - 1] == "secondary") {

        copiaColores[x - 1][y - 1] = "info"

        copiaResaltados[1].x = x - 1
        copiaResaltados[1].y = y - 1
      }
    }

    this.setState({
      colores: copiaColores,
      resaltado: copiaResaltados
    })
  }

  /**
   * Este metodo actualiza el estado de la prop pulsado
   * 
   * @param {Number} x coordenada x del boton pulsado
   * @param {Number} y coordenada x del boton pulsado
   */
  actualizarPulsado(x, y) {

    //copia pulsado
    let posicion = this.state.pulsado

    //actualizacion de valores
    posicion.x = x
    posicion.y = y

    //actualizacion de estado
    this.setState({ pulsado: posicion })

  }

  /**
   * Funcion que, desde el boton pulsado,  comprueba (y si es posible señala) si los saltos que puede hacer una
   * pieza se pueden realizar
   * 
   * @param {Number} x coordenada representativa de la posicion x de la matriz de colores
   * @param {Number} y coordenada representativa de la posicion y de la matriz de colores
   * @param {string} fila variable que define en que tipo de fila se trabaja
   * @returns primary | danger
   */
  colorResalto(x, y, fila) {

    //copia colores
    let copiaColores = this.state.colores

    //dentro de matriz
    if (x - 1 >= 0) {

      //filtrado de fila par|impar
      if (fila == "par") {

        //miramos si hay posibilidad de salto (y se resalta)
        if (this.posibleSaltoArribaPar(x, y)) {

          return copiaColores[x][y]
        }
      } else {

        if (this.posibleSaltoArribaImpar(x, y)) {

          return copiaColores[x][y]
        }
      }
    }

    return "danger"
  }

  /**
   * Este metodo resalta las posibilidades de salto que tiene una pieza.
   * Al ser la fila impar los movimientos serian arriba(arriba izquierda) y
   * arriba derecha
   * 
   * @param {Number} x coordenada x que tomamos como punto de vista del boton
   * @param {Number} y coordenada y que tomamos como punto de vista del boton
   */
  posibleSaltoArribaPar(x, y) {

    //copia del estado de los colores
    let copiaColores = this.state.colores

    //copia botones resaltados
    let copiaResaltados = this.state.resaltado

    //variable para saber si hay salto o no
    let haySalto = false;

    //miramos si no hay una pieza en esa posicion
    if (copiaColores[x - 1][y] == "secondary") {

      copiaColores[x - 1][y] = "info"

      copiaResaltados[0].x = x - 1
      copiaResaltados[0].y = y

      haySalto = true;
    }

    //miramos arriba derecha(tanto en mapa como en el visual)
    if (y + 1 < copiaColores[x].length) {

      if (copiaColores[x - 1][y + 1] == "secondary") {

        copiaColores[x - 1][y + 1] = "info"

        copiaResaltados[1].x = x - 1
        copiaResaltados[1].y = y + 1

        haySalto = true;
      }
    }

    this.setState({
      colores: copiaColores,
      resaltado: copiaResaltados
    })

    return haySalto;

  }

  /**
   * Este metodo resalta las posibilidades de salto que tiene una pieza.
   * Al ser la fila impar los movimientos serian arriba(arriba derecha) y
   * arriba izqueirda
   * 
   * @param {Number} x coordenada x que tomamos como punto de vista del boton
   * @param {Number} y coordenada y que tomamos como punto de vista del boton
   */
  posibleSaltoArribaImpar(x, y) {

    //copia del estado de los colores
    let copiaColores = this.state.colores

    //copia botones resaltados
    let copiaResaltados = this.state.resaltado

    //variable para saber si hay salto o no
    let haySalto = false;

    //miramos si no hay una pieza en esa posicion
    if (copiaColores[x - 1][y] != "success") {

      copiaColores[x - 1][y] = "info"

      copiaResaltados[0].x = x - 1
      copiaResaltados[0].y = y

      haySalto = true;
    }

    //miramos arriba derecha(tanto en mapa como en el visual)
    if (y - 1 >= 0) {

      if (copiaColores[x - 1][y - 1] != "success") {

        copiaColores[x - 1][y - 1] = "info"

        copiaResaltados[1].x = x - 1
        copiaResaltados[1].y = y - 1

        haySalto = true;
      }
    }

    this.setState({
      colores: copiaColores,
      resaltado: copiaResaltados
    })

    return haySalto;
  }

  render() {
    return (
      <React.Fragment>

        <Botonera mapa={this.state.colores} moverF={(x, y, fila) => this.mover(x, y, fila)}></Botonera>

      </React.Fragment>
    );
  }
}

export default App;