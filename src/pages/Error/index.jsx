import { Logo } from '../../components/Logo'
import './error.css'
import { NavLink } from 'react-router-dom'

export default function Error(){
    return(
        <div className="error">
            <Logo />
            <h1>Página no encontrada</h1>
            <p>La página que estás buscando no existe.</p>

            <NavLink to='/' className='link'>
                Volver al inicio 
            </NavLink>
            
        </div>
    )
}