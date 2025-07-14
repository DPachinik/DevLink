import './social.css'

export default function Social ({children,url}){
    return(
        <a className='social' target='_blank' rel='noopener noreferrer' href={url}>
            {children}
        </a>
    )
}