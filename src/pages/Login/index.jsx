import './login.css'
import {Logo} from '../../components/Logo'
import { useState } from 'react'
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../services/firebaseConnection';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify'
import Input from '../../components/Input';



export default function Login (){
   const [email, setEmail] = useState('');
   const [password, setPassword] = useState('');

   const navigate = useNavigate();

   function handleSubmit(e){
    e.preventDefault();
    
    if(email=== '' || password === ''){
        toast.warn('Completa el formulario con tus datos!');
        return;
    }

    signInWithEmailAndPassword(auth,email,password)
    .then(()=>{
        navigate('/admin', {replace:true})
    })
    .catch(()=>{
        toast.error('Error al hacer Login')
    })
   }

    return(
        <div className='login-container'>

            <Logo />

            <form className='form' onSubmit={handleSubmit}>

                <Input
                type='email'
                placeholder='Escribe tu email...'
                value={email}
                onChange={(e)=>setEmail(e.target.value)}
                />
                
                <Input 
                type='password'
                placeholder='*******'
                autoComplete='on'
                value={password}
                onChange={(e)=>setPassword(e.target.value)}
                />


                <button type='submit'>Acceder</button>

            </form>
        </div>
    )
}