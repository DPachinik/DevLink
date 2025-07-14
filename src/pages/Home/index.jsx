import { FaFacebook, FaInstagram, FaYoutube } from 'react-icons/fa'
import Social from '../../components/Social'
import './home.css'
import { collection, doc, getDoc, getDocs, orderBy, query } from 'firebase/firestore'
import { db } from '../../services/firebaseConnection'
import { useEffect, useState } from 'react'

export default function Home (){

    const[links,setLinks] = useState([]);
    const[socialLinks,setSocialLinks] =useState({})

    useEffect(()=>{

        function loadLinks(){

            const linksRef = collection(db,'links')
            const queryRef = query(linksRef, orderBy('created','asc'))

            getDocs(queryRef)
            .then((snapshot)=>{
                let lista =[];

                snapshot.forEach((doc)=>{
                    lista.push({
                        id:doc.id,
                        name:doc.data().name,
                        url:doc.data().url,
                        bg:doc.data().bg,
                        color:doc.data().color
                    })
                })

                setLinks(lista);

            })
        }
        loadLinks();

    },[])


    useEffect(()=>{

        function loadSocialLinks(){
            const socialRef = doc(db,'redes','enlaces')

            getDoc(socialRef)
            .then((snapshot)=>{
                
                if(snapshot.data() !== undefined){
                    setSocialLinks({
                        facebook:snapshot.data().facebook,
                        instagram:snapshot.data().instagram,
                        youtube:snapshot.data().youtube
                    })
                }
            })
        }

        loadSocialLinks();
    },[])

    return(
        <div className='home-container'>
            <h1>David Pachinik</h1>
            <span>Aquí mis Links 👇</span>

            <main className='links'>

                {links.map((item, index)=>(
                    <section  key={index} className='link-area' style={{backgroundColor:item.bg}}>
                        <a href={item.url} target='blank'>
                            <p className='link-text' style={{color:item.color}}>{item.name}</p>
                        </a>
                    </section>
                ))}               

                    { links.length !==0 && Object.keys(socialLinks).length> 0 && (
                    <footer>
                        <Social url={socialLinks?.facebook}>
                            <FaFacebook  size={32}  color='#FFF'/>
                        </Social>

                        <Social url={socialLinks?.youtube}>
                            <FaYoutube  size={32}  color='#FFF'/>
                        </Social>

                        <Social url={socialLinks?.instagram}>
                            <FaInstagram size={32}  color='#FFF'/>
                        </Social>
                    </footer>

                    )}


            </main>

        </div>
        
    )
    
}