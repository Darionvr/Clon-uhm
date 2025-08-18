import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpload } from '@fortawesome/free-solid-svg-icons';
import { useRef, useState } from 'react';
import { useContext } from 'react';
import { UserContext } from '../Context/UserContext'
import { useNavigate } from 'react-router-dom'


const CreatePost = () => {
  const inputphoto = useRef(null);
  const fileInputRef = useRef(null);
  const { token } = useContext(UserContext);
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [form, setForm] = useState({
    nombre: "",
    especie: "",
    edadAprox: "",
    peso: "",
    sexo: "",
    chip: "",
    foto: null,
    description: "",
  });

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;

    setForm({
      ...form,
      [name]: type === "file" ? files[0] : value
    });

    setErrors({
      ...errors,
      [e.target.name]: "",
    });

  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let newErrors = {};

    if (!form.nombre) newErrors.nombre = "El nombre es obligatorio";
    if (!form.especie) newErrors.especie = "La especie es obligatoria";
    if (!form.foto) newErrors.foto = "La foto es obligatoria";
    if (!form.peso) newErrors.peso = "El peso es obligatorio";
    if (!form.edadAprox) newErrors.edadAprox = "La edad aproximada es obligatoria";
    if (!form.chip) newErrors.chip = "El chip es obligatorio";
    if (!form.sexo) newErrors.sexo = "El sexo es obligatorio";
    if (!form.description) newErrors.description = "La descripción es obligatoria";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const formData = new FormData();
    formData.append("name", form.nombre);
    formData.append("specie", form.especie);
    formData.append("age", form.edadAprox);
    formData.append("weight", form.peso);
    formData.append("gender", form.sexo.toLowerCase());
    formData.append("chip", form.chip === "Sí");
    formData.append("photo", form.foto);
    formData.append("description", form.description);

    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/pets`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData

      });

      const data = await response.json();

      if (response.ok) {
        alert("Mascota publicada con éxito");
        console.log(data)
        navigate(`/petProfile/${data.id}`)
      } else {
        alert(`Error: ${data.message}`);
      }
    } catch (error) {
      console.error("Error al enviar datos:", error);
      alert("Ocurrió un error al enviar la publicación.");
    }
  };

  return (

    <main className="create-post-main">
      <div className="form-container">
        <h1>Crea una nueva publicación</h1>
        <form onSubmit={handleSubmit} id='createPost' className='register-form'>
          <div className="input-group">
            <input name="nombre" placeholder="Ingresa el nombre" value={form.nombre} onChange={handleChange} />
            {errors.nombre && (
              <p className="form-error">
                <img src="imgs/alert-icon.svg" alt="ícono alerta" /> {errors.nombre}
              </p>
            )}
          </div>
          <div className="input-group">
            <select name="especie" value={form.especie} onChange={handleChange}>
              <option value="">Especie</option>
              <option value="Perro">Perro</option>
              <option value="Gato">Gato</option>
              <option value="Conejo">Conejo</option>
            </select>
            {errors.especie && (
          <p className="form-error">
            <img src="imgs/alert-icon.svg" alt="ícono alerta" /> {errors.especie}
          </p>
        )}
          </div>
          <div className="input-group">
            <select name="edadAprox" value={form.edadAprox} onChange={handleChange}>
              <option value="">Ingresa edad aprox</option>
              <option value="0.25">3 meses</option>
              <option value="0.33">4 meses</option>
              <option value="0.41">5 meses</option>
              <option value="0.5">6 meses</option>
              <option value="0.58">7 meses</option>
              <option value="0.67">8 meses</option>
              <option value="0.75">9 meses</option>
              <option value="0.83">10 meses</option>
              <option value="0.91">11 meses</option>
              <option value="1">1 año</option>
              <option value="2">2 años</option>
              <option value="3">3 años</option>
              <option value="4">4 años</option>
              <option value="5">5 años</option>
              <option value="6">6 años</option>
              <option value="7">7 años</option>
              <option value="8">8 años</option>
              <option value="9">9 años</option>
              <option value="10">Más de 10 años</option>
            </select>
            {errors.edadAprox && (
          <p className="form-error">
            <img src="imgs/alert-icon.svg" alt="ícono alerta" /> {errors.edadAprox}
          </p>
        )}
          </div>


          <div className="input-group" >
            <select name="peso" placeholder="Ingresa el peso" value={form.peso} onChange={handleChange}>
              <option value="">Ingresa peso aprox</option>
              <option value="0.8">800 gr</option>
              <option value="0.9">900 gr</option>
              <option value="1">1 kg</option>
              <option value="2">2 kg</option>
              <option value="3">3 kg</option>
              <option value="4">4 kg</option>
              <option value="5">5 kg</option>
              <option value="6">6 kg</option>
              <option value="7">7 kg</option>
              <option value="8">8 kg</option>
              <option value="9">9 kg</option>
              <option value="10">Más de 10 kg</option>
            </select>
            {errors.peso && (
          <p className="form-error">
            <img src="imgs/alert-icon.svg" alt="ícono alerta" /> {errors.peso}
          </p>
        )}
          </div>
          <div className="input-group" >
            <select name="sexo" value={form.sexo} onChange={handleChange}>
              <option value="">Sexo de la mascota</option>
              <option value="Macho">Macho</option>
              <option value="Hembra">Hembra</option>
            </select>
            {errors.sexo && (
          <p className="form-error">
            <img src="imgs/alert-icon.svg" alt="ícono alerta" /> {errors.sexo}
          </p>
        )}
          </div>
          <div className="input-group">
            <select name="chip" value={form.chip} onChange={handleChange}>
              <option value="">¿Tiene chip?</option>
              <option value="Sí">Sí</option>
              <option value="No">No</option>
            </select>
            {errors.chip && (
          <p className="form-error">
            <img src="imgs/alert-icon.svg" alt="ícono alerta" /> {errors.chip}
          </p>
        )}
          </div>

          <div className="input-group-photo" onClick={() => inputphoto.current?.click()}>
            <FontAwesomeIcon icon={faUpload} />
            <input
              type="file"
              name="foto"
              ref={inputphoto}
              onChange={handleChange}
              style={{ display: "none" }}
            />
            {form.foto ? (
              <span className="file-name">{form.foto.name}</span>
            ) : (
              <span>Selecciona tu foto de perfil</span>
            )}
            {errors.foto && (
          <p className="form-error">
            <img src="imgs/alert-icon.svg" alt="ícono alerta" /> {errors.foto}
          </p>
        )}
          </div>

          <div className="input-group">
            <textarea
              placeholder="Por favor detalle el comportamiento del animal..."
              value={form.description}
              name="description"
              onChange={handleChange}
            ></textarea>
            {errors.description && (
          <p className="form-error">
            <img src="imgs/alert-icon.svg" alt="ícono alerta" /> {errors.description}
          </p>
        )}
          </div>

          <button type="submit" className='melon-button'>
            <FontAwesomeIcon icon={faUpload} /> Publicar mascota
          </button>
        </form>
      </div >
      <div className="create-post-photo">
        <img src="imgs/create-post-frame.png" alt="" />
      </div>
    </main >
  );
};

export default CreatePost;
