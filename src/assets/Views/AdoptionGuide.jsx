
const AdoptionGuide = () => {

    const guia = [{
        numero: '1',
        titulo: 'Encuentra a tu futuro compañero',
        accion: 'Explora nuestra página de Animales en Adopción. La actualizamos todos los días para que puedas encontrar una mascota que se adapte a tu estilo de vida. Si ves uno que te enamora, ¡vamos al siguiente paso!'
    },{
        numero: '2',
        titulo: 'Completa tu solicitud (¡solo una!)',
        accion: 'Puedes llenar la Solicitud de Adopción en línea o directamente en el refugio. No es una reserva, pero sí el primer paso para conocerte mejor.'
    },{
        numero: '3',
        titulo: 'Visítanos y conoce a tu nuevo amigo',
        accion: 'Nuestros asesores te recibirán por orden de llegada, te contarán todo sobre la mascota y verán contigo si es una buena combinación. Ven en nuestro horario de atención para que podamos ayudarte con calma.'
    },{
        numero: '4',
        titulo: 'Adopta con confianza',
        accion: 'Si vives en departamento o condominio, recuerda traer tu contrato o reglamento. Eso nos permite asegurarnos de que tu nuevo amigo esté permitido en tu hogar. ¿Todo listo? ¡Ya casi es parte de tu familia!'
    }]

    return (
        <>
            <main className='adoption-main'>
                <div className="informationAdoption">
                    <h1>Cómo funciona nuestro proceso de adopción</h1>
                    <div className="knowledge">
                        {guia.map((g, i) => (
                           <div className="Infor" key={i}>
                            <div className="circle">{g.numero}</div>
                            <h2>{g.titulo}</h2>
                            <h5>
                               {g.accion}
                            </h5>
                        </div> 
                        ))}                              
                    </div>
                </div>
            </main>
        </>
    );
};

export default AdoptionGuide;
