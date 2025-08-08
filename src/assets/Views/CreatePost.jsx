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

  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !form.nombre || !form.especie || !form.foto || !form.peso ||
      !form.edadAprox || !form.chip || !form.sexo || !form.description
    ) {
      alert("Todos los campos son obligatorios");
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
      <div className="create-post-form-container">
        <h1>Crea una nueva publicación</h1>
        <form onSubmit={handleSubmit} id='createPost'>
          <div className="information1">
            <input name="nombre" placeholder="Ingresa el nombre" value={form.nombre} onChange={handleChange} />
            <select name="especie" value={form.especie} onChange={handleChange}>
              <option value="">Especie</option>
              <option value="Perro">Perro</option>
              <option value="Gato">Gato</option>
              <option value="Conejo">Conejo</option>
            </select>
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
          </div>

          <div className="information2">

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
            <select name="sexo" value={form.sexo} onChange={handleChange}>
              <option value="">Sexo de la mascota</option>
              <option value="Macho">Macho</option>
              <option value="Hembra">Hembra</option>
            </select>
            <select name="chip" value={form.chip} onChange={handleChange}>
              <option value="">¿Tiene chip?</option>
              <option value="Sí">Sí</option>
              <option value="No">No</option>
            </select>
          </div>

          <div className="photo" onClick={() => inputphoto.current?.click()}>
            <input
              type="file"
              name="foto"
              ref={inputphoto}
              onChange={handleChange}
              style={{ display: "none" }}
            />
            <FontAwesomeIcon icon={faUpload} />
            {form.foto ? (
              <span className="file-name">{form.foto.name}</span>
            ) : (
              <span>Selecciona tu foto de perfil</span>
            )}
          </div>

          <div className="description">
            <label>Descripción</label>
            <textarea
              className="textareaCp"
              placeholder="Por favor detalle el comportamiento del animal..."
              value={form.description}
              name="description"
              onChange={handleChange}
            ></textarea>
          </div>

          <button type="submit" className='melon-button'>
            <FontAwesomeIcon icon={faUpload} /> Publicar mascota
          </button>
        </form>
      </div>
      <div className="create-post-photo">
        <img src="imgs/create-post-frame.png" alt="" />
      </div>
    </main>
  );
};

export default CreatePost;
