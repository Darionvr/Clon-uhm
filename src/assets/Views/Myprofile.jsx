import { useContext, useState } from 'react';
import { UserContext } from '../Context/UserContext';
import TableSuperUser from '../Components/TableSuperUser';
import Mypost from '../Components/MyPost';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faXmark, faPencil } from '@fortawesome/free-solid-svg-icons';
import { jwtDecode } from 'jwt-decode';


const Myprofile = () => {
  const { currentUser, setCurrentUser, token } = useContext(UserContext);
  const decoded = jwtDecode(token);

  const [misDatos, setMisDatos] = useState({
    first_name: currentUser.first_name || '',
    last_name: currentUser.last_name || '',
    email: currentUser.email || '',
    rut: currentUser.rut || '',
  });


  const [editandoCampo, setEditandoCampo] = useState(null);
  const [valorTemporal, setValorTemporal] = useState('');


  const iniciarEdicion = (campo) => {
    setEditandoCampo(campo);
    setValorTemporal(misDatos[campo]);
  };

  const cancelarEdicion = () => {
    setEditandoCampo(null);
    setValorTemporal('');
  };



  const handleSubmit = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/users/me`, {
        method: "PATCH",
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(misDatos),
      });

      const result = await response.json();
      if (!response.ok) {
        console.error("Error al actualizar:", result.message);
        return;
      }

    } catch (error) {
      console.error("Error al actualizar datos:", error);
    }
  };


  const confirmarEdicion = () => {
    setMisDatos((prev) => ({ ...prev, [editandoCampo]: valorTemporal }));
    handleSubmit();
    setEditandoCampo(null);
  };

  const renderCampo = (label, campo) => (
    <div>
      <label>{label}:</label>
      {editandoCampo === campo ? (
        <>
          <input
            type="text"
            value={valorTemporal}
            onChange={(e) => setValorTemporal(e.target.value)}
          />
          <div>
          <button className='edit-button' onClick={confirmarEdicion}>OK</button>
          <button className='edit-button' onClick={cancelarEdicion}>Cancelar</button>
        </div>
        </>
      ) : (
        <>
          <p>{misDatos[campo]}</p>
          <button className='edit-button' onClick={() => iniciarEdicion(campo)}>Editar</button>
        </>
      )}
    </div>
  );

  return (
    <>

      <main className='profile-main'>
        <div className="MyProfile">
          <h1> Mi perfil</h1>
          <div className="profileSection">
            <div className="profilePicture">
              <img src={currentUser.photo}
                className="profileImage" />
            </div>
            <div className="profile-info">
              {renderCampo('Nombre', 'first_name')}
              {renderCampo('Apellido', 'last_name')}
              {renderCampo('Email', 'email')}
              <div>
                <label>Rut</label>
                <p>{currentUser.rut}</p>
              </div>
            </div>
          </div>
        </div>
        {decoded.role === 'administrador' && <TableSuperUser />}
        <Mypost />
      </main>
    </>
  );
};

export default Myprofile