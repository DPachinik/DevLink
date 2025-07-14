import Header from "../../components/Header";
import './admin.css'
import { Logo } from '../../components/Logo'
import  Input  from '../../components/Input'
import { MdAddLink } from "react-icons/md";
import { FiTrash2 } from "react-icons/fi";
import { useEffect, useState } from "react";
import { addDoc, collection, deleteDoc, doc, onSnapshot, orderBy, query } from "firebase/firestore";
import { db } from "../../services/firebaseConnection";
import { toast } from "react-toastify";

export default function Admin(){

    const [nameInput, setNameInput] = useState('');
    const [urlInput, setUrlInput] = useState('');
    const [backgroundColorInput, setBackgroundColorInput] = useState('#0000');
    const [colorInput, setColorInput] = useState('#ffff');

    const [links,setLinks] = useState([]);

    useEffect(()=>{
        const linksRef = collection(db, 'links');
        const queryRef = query(linksRef,orderBy('created','asc'));

        const unsub = onSnapshot(queryRef,(snapshot)=>{
            let lista =[];
            snapshot.forEach((doc)=>{
                lista.push({
                    id:doc.id,
                    name:doc.data().name,
                    url:doc.data().url,
                    bg:doc.data().bg,
                    color:doc.data().color,
                });
            });
            setLinks(lista);
        })

        return()=>unsub();
    },[])

    async function handleRegister(e){
        e.preventDefault();

        if(nameInput === '' || urlInput === ''){
            toast.warn('Completa todos los campos!')
            return;
        }

        addDoc(collection(db,'links'),{
            name:nameInput,
            url:urlInput,
            bg: backgroundColorInput,
            color:colorInput,
            created: new Date(),
        })
        
        .then(()=>{
            setNameInput('')
            setUrlInput('')
            toast.success('Link creado con éxito!')
        })
        .catch((error)=>{
            console.log('Error al registrar' + error);
            toast.error('Error al registrar el link')
        })
    }


    async function handleDeleteLink(id){
        const docRef = doc(db,'links',id);
        await deleteDoc(docRef);
    }
    
    return(
        <div className="admin-container">

            <Header />

            <Logo />

            <form className="form" onSubmit={handleRegister}>

                <label className="label">Nombre del Link</label>
                <Input 
                placeholder ='Nombre del link'
                value={nameInput}
                onChange={(e)=>setNameInput(e.target.value)}
                />

                <label className="label">Url del Link</label>
                <Input 
                type ='url'
                placeholder ='Url del link'
                value={urlInput}
                onChange={(e)=>setUrlInput(e.target.value)}
                /> 

            
                <section className="container-colors">

                    <div>

                        <label className="label rigth">Fondo del link</label>
                        <input 
                        type='color'
                        value={backgroundColorInput}
                        onChange={(e)=>setBackgroundColorInput(e.target.value)}
                        />
                    </div>

                    <div>

                        <label className="label rigth">Color del link</label>
                        <input 
                        type='color'
                        value={colorInput}
                        onChange={(e)=>setColorInput(e.target.value)}
                        />
                    </div>

                </section>

                <button className="btn-register" type="submit">
                    Registrar   <MdAddLink size={24} color="#FFF" />      
                </button>

                { nameInput !=='' && (
                <div className="preview">
                    <label className="label"> Así se ve tu Link 👇</label>
                    <article 
                    className="list"
                    style={{margin:8, backgroundColor: backgroundColorInput}}
                    >
                        <p style={{color:colorInput}}>{nameInput}</p>
                    </article>
                </div>
                )

                }

            </form>

            <h2 className="title">Mis Links</h2>

            {links.map((link, index)=>(
            <article 
            key={index}
            className="list animate-pop"
            style={{ backgroundColor:link.bg, color:link.color }}
            >
                <p>{link.name}</p>
                <div>
                    <button className="btn-delete" onClick={()=>handleDeleteLink(link.id)}>
                        <FiTrash2 size={18} color='#FFF' />
                    </button>
                </div>
            </article>
            ))}

        </div>
    )
}