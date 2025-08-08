import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPaw } from '@fortawesome/free-solid-svg-icons'


const AdoptionForm = () => {
    const InitialAdoptionF = {
        Edad: "",
        Celular: "",
        Domicilio: "",
        TipoVivienda: "",
        PermiteMascotas: "",
        NombreDeLaMascota: "",
        Deseo: "",
        Convivencia: "",
        aceptoLey: false,
        compromiso: false,
        informacionVeridica: false,
    };

    const [current, setCurrent] = useState(0);
    const [formData, setFormData] = useState(InitialAdoptionF);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value,
        });
    };

    const SubmitAdoption = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem("token");
        if (!token) {
            alert("Debes iniciar sesión antes de enviar el formulario");
            return;
        }

        const {
            Edad, Celular, Domicilio, TipoVivienda, PermiteMascotas,
            NombreDeLaMascota, Deseo, Convivencia, aceptoLey,
            compromiso, informacionVeridica
        } = formData;

        if (!Edad || !Celular || !Domicilio || !TipoVivienda || !PermiteMascotas ||
            !NombreDeLaMascota || !Deseo || !Convivencia || !aceptoLey ||
            !compromiso || !informacionVeridica) {
            alert("Todos los campos son obligatorios");
            return;
        }

        try {
            const response = await fetch("http://localhost:5000/request", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                },
                body: JSON.stringify({
                    age: parseInt(Edad),
                    phone: Celular,
                    address: Domicilio,
                    housing_type: TipoVivienda,
                    allows_pets: PermiteMascotas === "Sí",
                    pet_name: NombreDeLaMascota,
                    reason: Deseo,
                    household: Convivencia
                })
            });

            const data = await response.json();

            if (response.ok) {
                alert("Formulario enviado con éxito");
                setFormData(InitialAdoptionF);
            } else {
                alert(data.message || "Error al enviar el formulario");
            }

        } catch (error) {
            console.error("Error al enviar el formulario:", error);
            alert("Error al enviar el formulario");
        }
    };






    return (
        <>
            <main className='adoption-main'>


                <div className="informationAdoption">
                    <h1>Cómo funciona nuestro proceso de adopción</h1>
                    <div className="knowledge">
                        <div className="Infor">
                            <div className="circle">1</div>
                            <h2>Encuentra a tu futuro compañero</h2>
                            <h5>
                                Explora nuestra página de Animales en Adopción. La actualizamos todos
                                los días para que puedas encontrar una mascota que se adapte a tu
                                estilo de vida. Si ves uno que te enamora, ¡vamos al siguiente paso!
                            </h5>
                        </div>
                        <div className="Infor">
                            <div className="circle">2</div>
                            <h2>Completa tu solicitud (¡solo una!)</h2>
                            <h5>
                                Puedes llenar la Solicitud de Adopción en línea o directamente en el
                                refugio. No es una reserva, pero sí el primer paso para conocerte mejor.
                            </h5>
                        </div>
                        <div className="Infor">
                            <div className="circle">3</div>
                            <h2>Visítanos y conoce a tu nuevo amigo</h2>
                            <h5>
                                Nuestros asesores te recibirán por orden de llegada, te contarán todo
                                sobre la mascota y verán contigo si es una buena combinación. Ven en
                                nuestro horario de atención para que podamos ayudarte con calma.
                            </h5>
                        </div>
                        <div className="Infor">
                            <div className="circle">4</div>
                            <h2>Adopta con confianza</h2>
                            <h5>
                                Si vives en departamento o condominio, recuerda traer tu contrato o
                                reglamento. Eso nos permite asegurarnos de que tu nuevo amigo esté
                                permitido en tu hogar. ¿Todo listo? ¡Ya casi es parte de tu familia!
                            </h5>
                        </div>
                    </div>
                </div>

                <section className="adoption-form-section">
                    <h2 className='sub'>
                        <FontAwesomeIcon icon={faPaw} size='sm' />Formulario de adopción</h2>
                    <div className="carousel-container">
                        <div
                            className="slides-wrapper"
                            style={{ transform: `translateX(-${current * 100}%)` }}
                        >

                            <div className="slideAdoption">
                                <h3>Datos personales</h3>
                                <form className="form-grid" onSubmit={SubmitAdoption}>
                                    <input
                                        name="Edad"
                                        placeholder="Edad"
                                        type="number"
                                        value={formData.Edad}
                                        onChange={handleChange}
                                    />

                                    <input
                                        name="Celular"
                                        placeholder="Celular"
                                        value={formData.Celular}
                                        onChange={handleChange}
                                        maxLength="12"
                                    />
                                    <input
                                        name="Domicilio"
                                        placeholder="Dirección"
                                        value={formData.Domicilio}
                                        onChange={handleChange}
                                    />
                                    <select
                                        name="TipoVivienda"
                                        value={formData.TipoVivienda}
                                        onChange={handleChange}
                                    >
                                        <option value="">Tipo de vivienda</option>
                                        <option value="Casa">Casa</option>
                                        <option value="Departamento">Departamento</option>
                                        <option value="Otro">Otro</option>
                                    </select>
                                    <select
                                        name="PermiteMascotas"
                                        value={formData.PermiteMascotas}
                                        onChange={handleChange}
                                    >
                                        <option value="">¿Permite mascotas?</option>
                                        <option value="Sí">Sí</option>
                                        <option value="No">No</option>
                                    </select>
                                </form>
                            </div>


                            <div className="slideAdoption">
                                <h3>Datos de la mascota</h3>
                                <form className="form-grid">
                                    <input
                                        name="NombreDeLaMascota"
                                        placeholder="Nombre de la mascota"
                                        value={formData.NombreDeLaMascota}
                                        onChange={handleChange}
                                    />
                                    <select
                                        name="Deseo"
                                        value={formData.Deseo}
                                        onChange={handleChange}
                                    >
                                        <option value="">¿Por qué desea adoptar?</option>
                                        <option value="Deseo">Terapia</option>
                                        <option value="Terapia">Motivos emocionales</option>
                                        <option value="Tiempo">Tengo tiempo y espacio</option>
                                    </select>
                                    <select
                                        name="Convivencia"
                                        value={formData.Convivencia}
                                        onChange={handleChange}
                                    >
                                        <option value="">¿Con quién vives?</option>
                                        <option value="Solo">Solo</option>
                                        <option value="Padres">Padres</option>
                                        <option value="Familia">Familia</option>
                                        <option value="Rommie">Rommie</option>
                                    </select>
                                </form>
                            </div>


                            <div className="slideAdoption ">
                                <h3>Compromisos y seguimiento</h3>
                                <form onSubmit={SubmitAdoption} className="submit-form">
                                    <label>
                                        <input
                                            type="checkbox"
                                            name="aceptoLey"
                                            checked={formData.aceptoLey}
                                            onChange={handleChange}
                                        />
                                        Acepto acciones legales si maltrato a la mascota.
                                    </label>
                                    <label>
                                        <input
                                            type="checkbox"
                                            name="compromiso"
                                            checked={formData.compromiso}
                                            onChange={handleChange}
                                        />
                                        Me comprometo a cuidar responsablemente.
                                    </label>
                                    <label>
                                        <input
                                            type="checkbox"
                                            name="informacionVeridica"
                                            checked={formData.informacionVeridica}
                                            onChange={handleChange}
                                        />
                                        Declaro que la información es verídica.
                                    </label>



                                    <button type="submit" className="melon-button">
                                        Enviar solicitud
                                    </button>

                                </form>
                            </div>
                        </div>

                        <div className="carousel-dots">
                            {[0, 1, 2].map((index) => (
                                <button
                                    key={index}
                                    className={`dot ${current === index ? 'active' : ''}`}
                                    onClick={() => setCurrent(index)}
                                />
                            ))}
                        </div>
                    </div>
                </section>

            </main>
        </>
    );
};

export default AdoptionForm;
