# DevLink

DevLink es una aplicación personal para crear y administrar tus enlaces personalizados y redes sociales desde un panel privado, y mostrarlos en una página pública estilo "Linktree".

## ¿Para qué sirve?

- Permite tener todos tus links importantes organizados y accesibles desde una sola página.
- Ideal para creadores de contenido, freelancers, o marcas personales.
- Solo el dueño del proyecto (administrador) puede acceder al panel para agregar, editar o eliminar links y redes sociales mediante login.

## Funcionalidades

- Autenticación con Firebase (login para administrador).
- Crear links personalizados con colores y URL.
- Mostrar links en una página pública.
- Gestionar redes sociales (Facebook, Instagram, YouTube).
- Panel admin protegido donde se pueden modificar los links.

## Tecnologías usadas

- React
- Vite
- Firebase (Auth y Firestore)
- React Router
- React Toastify

## Cómo usarlo

1. Clonar el repositorio.
2. Instalar dependencias: `npm install`
3. Configurar Firebase con tus credenciales.
4. Ejecutar en modo desarrollo: `npm run dev`
5. Hacer build para producción: `npm run build`
6. Desplegar en Vercel, Netlify u otro hosting estático.

## Acceso administrador

- Solo se puede acceder con una cuenta creada manualmente en Firebase Authentication.
- La cuenta es necesaria para gestionar los links y redes sociales.

## Demo

- URL pública con la lista de links y redes sociales.
