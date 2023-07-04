import { useState, useEffect } from 'react'
import styled from '@emotion/styled'
import Formulario from './components/Formulario'

import ImagenCripto from "./img/imagen-criptos.png"

// Constante para el contenedor 
const Contenedor = styled.div`
    max-width: 900px;
    margin: 0 auto;
    width: 90%;
    // Para que en pantallas grandes la web esté dividida en dos columnas
    @media (min-width: 992px) {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        column-gap: 2rem;
    }
`

// Constante para la imagen de la ventana principal
const Imagen = styled.img`
    max-width: 400px;
    width: 80%;
    margin: 100px auto 0 auto ;
    display: block;
`

// Se crea la constante para el Heading al cual se agrega una fuente y un color para el h1
const Heading = styled.h1 `
    font-family: "Lato", sans-serif;
    color: #FFF;
    text-align: center;
    font-weight: 700;
    margin-top: 80px;
    margin-bottom: 50px;
    font-size: 34px;

    // Crea la línea de adorno debajo del texto de cotizar criptos al instante
    &::after{
        content: "";
        width: 100px;
        height: 6px;
        background-color: #66A2FE;
        display: block;
        margin: 10px auto 0 auto;
    }
`

function App() {

    const [monedas, setMonedas] = useState({})
    const [resultado, setResultado] = useState({})

    useEffect(() => {
       if(Object.keys(monedas).length > 0) {
            const cotizarCripto = async () => {
                const {moneda, criptomoneda} = monedas
                const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${criptomoneda}&tsyms=${moneda}`

                const respuesta = await fetch(url)
                const resultado = await respuesta.json()

                // Busca las propiedades en el objeto que tenga el nombre de la criptomoneda y la moneda de forma dinámica
                setResultado(resultado.DISPLAY[criptomoneda][moneda])
            }
            cotizarCripto()
       }
    }, [monedas])

    return (
        <Contenedor>
          
            <Imagen 
                src={ImagenCripto}
                alt='imagenes criptomonedas'
            />
            <div>
                <Heading>Cotiza criptomonedas al instante</Heading>

                <Formulario 
                    setMonedas={setMonedas}
                />
            </div>
            
        </Contenedor>
    )
}

export default App
