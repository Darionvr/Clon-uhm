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


  
  const [datosModificados, setDatosModificados] = useState({})
  const [editMode, setEditMode] = useState({
    first_name: false,
    last_name: false,
    email: false,
    button: false
  });

  const [tempValues, setTempValues] = useState({});
  const camposEditables = ["first_name", "last_name", "email"];
  const hayEdicionActiva = Object.values(editMode).some((estado) => estado === true);
  const hayCambiosPendientes = Object.keys(datosModificados).length > 0;



  const handleEditClick = (field) => {
    setEditMode(prev => ({ ...prev, [field]: true }));
    setTempValues(prev => ({ ...prev, [field]: currentUser[field] }));
  };

  const handleInputChange = (field, value) => {
    setTempValues(prev => ({ ...prev, [field]: value }));
    setDatosModificados(prev => ({ ...prev, [field]: value }));
  };

  const handleConfirmEdit = (field) => {
    setEditMode(prev => ({ ...prev, [field]: false }));
  };

  const handleCancelEdit = (field) => {
    setEditMode(prev => ({ ...prev, [field]: false }));
    setTempValues(prev => {
      const updated = { ...prev };
      delete updated[field];
      return updated;
    });
    setDatosModificados(prev => {
      const updated = { ...prev };
      delete updated[field];
      return updated;
    });
  };


  const handleSubmit = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/users/me`, {
        method: "PATCH",
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(datosModificados),
      });

      const result = await response.json();
      if (!response.ok) {
        console.error("Error al actualizar:", result.message);
        return;
      }
      setCurrentUser(result.user);
      setEditMode({ first_name: false, last_name: false, email: false });
      setTempValues({});
      setDatosModificados({});
    } catch (error) {
      console.error("Error al actualizar datos:", error);
    }
  };

  return (
    <>

      <main className='profile-main'>

        <div className="MyProfile">
          <h1> Mi perfil</h1>

          <div className="ProfileSection">
            <div className="ProfilePicture">
              <img src={`${import.meta.env.VITE_BACKEND_URL}/uploads/${currentUser.photo}`}
                className="ProfileImage" />

            </div>

            <div className="ProfileInfo">
              {camposEditables.map((field) => (
                <div className="Info" key={field}>
                  {editMode[field] ? (
                    <>
                      <input
                        type="text"
                        defaultValue={tempValues[field] || ""}
                        onChange={(e) => handleInputChange(field, e.target.value)}
                      />
                      <button className='edit-button' onClick={() => handleConfirmEdit(field)}><FontAwesomeIcon icon={faCheck} /> OK</button>
                      <button className='edit-button' onClick={() => handleCancelEdit(field)}> <FontAwesomeIcon icon={faXmark} />Cancelar</button>
                    </>
                  ) : (
                    <>
                      <span>{tempValues[field] ?? currentUser[field]}</span>
                      <button className='edit-button' onClick={() => handleEditClick(field)}> <FontAwesomeIcon icon={faPencil} /> editar</button>
                    </>
                  )}
                </div>
              ))}

              <div className="Info">
                <span>{currentUser.rut}</span>
              </div>
              {hayCambiosPendientes && (
                <button className='melon-button' onClick={handleSubmit}>Guardar cambios</button>)}
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