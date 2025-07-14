import { BiLogOut } from 'react-icons/bi'
import './header.css'
import { Link } from 'react-router-dom'
import { auth } from '../../services/firebaseConnection'
import { signOut } from 'firebase/auth'



export default function Header(){

    async function heandleLogout() {
        await signOut(auth)
        
    }

    return(
        <header className='admin-header'>

            <nav className='nav-header'>
                <button onClick={heandleLogout}>
                    <BiLogOut size={28} color='#DB2629' />
                </button>

                <Link to='/admin'>
                    Links
                </Link >

                <Link to ='/admin/social'>
                    Redes Sociales
                </Link>
            </nav>
        </header>
    )
}