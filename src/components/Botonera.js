import { Button } from 'reactstrap';

//COMPONENTE QUE RENDERIZA EL TABLERO DEL JUEGO
function Botonera(props) {

    let matriz = []

    for (let i = 0; i < props.mapa.length; i++) {

        if (i % 2 == 0) {

            for (let j = 0; j < props.mapa[i].length; j++) {

                matriz.push(<Button outline>   </Button>)

                matriz.push(<Button color={props.mapa[i][j]} onClick={() => props.moverF(i, j, "par")}></Button>)
            }
        } else {

            for (let j = 0; j < props.mapa[i].length; j++) {

                matriz.push(<Button color={props.mapa[i][j]} onClick={() => props.moverF(i, j, "impar")}></Button>)

                matriz.push(<Button outline>   </Button>)
            }
        }
        matriz.push(<br />)
    }

    return (

        <p>
            {matriz}
        </p>
    )

}

export default Botonera;