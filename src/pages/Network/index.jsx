import { useEffect, useState } from "react";
import Header from "../../components/Header";
import Input from "../../components/Input";
import './network.css'
import { MdAddLink } from "react-icons/md";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../../services/firebaseConnection";
import { toast } from "react-toastify";



export default function Network(){

    const [facebook, setFacebook]=useState('');
    const [instagram, setInstagram]=useState('');
    const [youtube, setYoutube]=useState('');

    useEffect(()=>{

        function loadLinks(){
            const docRef = doc(db,'redes','enlaces')
            getDoc(docRef)
            .then((snapshot)=>{
                
                if(snapshot.data !== undefined){
                    setFacebook(snapshot.data().facebook)
                    setInstagram(snapshot.data().instagram)
                    setYoutube(snapshot.data().youtube)
                }
            })
            .catch(()=>{
                console.log('error al cargar los datos')
        })
        } 
        
        loadLinks();
    },[])

    function handleSave(e){
        e.preventDefault();
        
        setDoc(doc(db,'redes','enlaces'),{
            facebook:facebook,
            youtube:youtube,
            instagram:instagram,
        })
        .then(()=>{
            toast.success('Enlaces guardados!')
        })
        .catch(()=>{
            toast.error('Error al registrar')
        })
    }

    return(
        <div className="admin-container">
            <Header />
            <h1 className="titulo">Tus redes sociales</h1>

            <form className="form" onSubmit={handleSave} >

                <label className="label">Link Facebook</label>
                <Input 
                placeholder='Url de tu facebook'
                type='url'
                value={facebook}
                onChange={(e)=>setFacebook(e.target.value)}
                />

                <label className="label">Link Instagram</label>
                <Input 
                placeholder='Url de tu facebook'
                type='url'
                value={instagram}
                onChange={(e)=>setInstagram(e.target.value)}
                />

                <label className="label">Link Youtube</label>
                <Input 
                placeholder='Url de tu facebook'
                type='url'
                value={youtube}
                onChange={(e)=>setYoutube(e.target.value)}
                />

                <button type="submit" className="btn-register">Agregar links <MdAddLink size={24} color="#FFF" /></button>

            </form>

        </div>
    )
}