import { useEffect } from 'react'
import styled from '@emotion/styled'
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

    

    const [ moneda, SelectMonedas ] = useSelectMonedas("Elige tu moneda", monedas)
    
    // Llamada a la API para obtener el precio de las criptos 
    useEffect(() => {
        const consultarAPI = async () => {
            const url = "https://min-api.cryptocompare.com/data/top/mktcapfull?limit=20&tsym=USD"

            // Para que la api no tenga errores al momento de cargar tantos datos 
            const respuesta = await fetch(url)
            const resultado = await respuesta.json()
            console.log(resultado.Data)
        }
        consultarAPI();
    }, [])

  return (
    <form>

        <SelectMonedas />
        
        

        <InputSubmit 
            type='submit' 
            value='Cotizar'
        />
    </form>
  )
}

export default Formulario