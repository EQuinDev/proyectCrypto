import { useEffect, useState } from 'react'
import styled from '@emotion/styled'
import Error from './Error'
import useSelectMonedas from '../hooks/useSelectMonedas'
import { monedas } from '../data/monedas'

const InputSubmit = styled.input`
    background-color: #9497FF;
    border: none;
    width: 100%;
    padding: 10px;
    color: #FFF;
    font-weight: 700;
    text-transform: uppercase;
    font-size: 20px;
    border-radius: 5px;
    // Cuando se pone el mouse por encima del botón se cargue el color con una animación
    transition: background-color .3s ease;
    margin-top: 30px;

    // Cambiar el color cuando el mouse se ponga encima del botón
    &:hover{
        background-color: #7A7DFE;
        cursor: pointer;
    }
`

const Formulario = () => {

    const [criptos, setCriptos] = useState([])

    // Constante para controlar errores, se inica en false por defecto 
    const [error, setError] = useState(false)

    const [ moneda, SelectMonedas ] = useSelectMonedas("Elige tu moneda", monedas)

    const [ criptomoneda, SelectCriptomoneda ] = useSelectMonedas("Elige tu criptomoneda", criptos)
    
    // Llamada a la API para obtener el precio de las criptos 
    useEffect(() => {
        const consultarAPI = async () => {
            const url = "https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD"

            // Para que la api no tenga errores al momento de cargar tantos datos 
            const respuesta = await fetch(url)
            const resultado = await respuesta.json()
        
            // Se crea un nuevo arreglo con la función map
            const arrayCriptos = resultado.Data.map( cripto => {

                // Se crea el objeto con los valores que necesitamos de las criptos, en este caso el nombre y el nombre completo
                const objeto = {
                    id: cripto.CoinInfo.Name,
                    nombre: cripto.CoinInfo.FullName
                }

               return objeto
            })
            setCriptos(arrayCriptos)

        }

        consultarAPI();

    }, [])


    const handleSubmit = e => {
        e.preventDefault()

        // Crear mensaje de alerta en caso de que se consulten datos vacíos
        if([moneda, criptomoneda].includes("")){
            
            setError(true)

            return
        }

        // En caso de que se complete bien el formulario no se lanza el mensaje de error
        setError(false)

    }

  return (
    
    <>

        {/* En caso de que haya un error salta un mensaje de error  */}

        {error && <Error>Todos los campos son obligatorios</Error>} 

        <form
            onSubmit={handleSubmit}
        >

            <SelectMonedas />
            <SelectCriptomoneda />
            
            <InputSubmit 
                type='submit' 
                value='Cotizar'
            />
        </form>

    </>
  )
}

export default Formulario