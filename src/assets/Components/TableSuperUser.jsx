import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../Context/UserContext';


const TableSuperUser = () => {
    const [requests, setRequests] = useState([]);

     const { token } = useContext(UserContext);
     
    

    useEffect(() => {
        const fetchRequests = async () => {
            try {
                const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/request`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    },
                });

                const data = await res.json();
                if (res.ok) {
                    setRequests(data.results);
                } else {
                    console.error(data.message);
                }
            } catch (error) {
                console.error('Error al obtener solicitudes:', error);
            }
        };

        fetchRequests();
    }, [])

    const handleAccept = async (id) => {
        try {
            const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/request/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
                body: JSON.stringify({ status: "aceptada" }),
            });

            if (res.ok) {
                setRequests(prev => prev.map(r => r.id === id ? { ...r, status: "aceptada" } : r));
            } else {
                console.error("Error al aceptar solicitud");
            }
        } catch (error) {
            console.error("Error al aceptar:", error);
        }
    };

    const handleDelete = async (id) => {
        try {
            const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/request/${id}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });

            if (res.ok) {
                setRequests(prev => prev.filter(r => r.id !== id));
            } else {
                console.error("Error al eliminar solicitud");
            }
        } catch (error) {
            console.error("Error al eliminar:", error);
        }
    };

    const renderCard = (r, showButtons = true) => (
        <div className="card-request" key={r.id}>
            <div className="card-title">
                 <p> {r.user_nombre} {r.user_apellido}</p>
       
            </div>
            <div className="card-info">
                    <p>Correo: <span>{r.user_correo} </span></p>
                    <p>Edad: <span> {r.age} años</span></p>
                    <p>Celular: <span>{r.phone}</span></p>
                    <p>Domicilio: <span>{r.address} </span></p>
                    <p>Tipo de Vivienda: <span> {r.housing_type}</span></p>
                    <p>Permite Mascotas: <span>{r.allows_pets ? 'Sí' : 'No'} </span></p>
                    <p>Nombre de la Mascota: <span> {r.pet_name}</span> </p>
                    <p>Por qué desea adoptar: <span> {r.reason}</span></p>
                    <p>Convivencia: <span> {r.household}</span></p>
            </div>

            {showButtons && (
                <div className="card-actions">
                    <button className="btn-confirm" onClick={() => handleAccept(r.id)}>✅</button>
                    <button className="btn-reject" onClick={() => handleDelete(r.id)}>❌</button>
                </div>
            )}
        </div>

    );

    return (
        <>
            <h2>Solicitudes de Adopción</h2>
           
                <div className="cards-wrapper">
                    {requests.filter(r => r.status === "pendiente").map(r => renderCard(r))}
                </div>
            
        </>
    );
};


export default TableSuperUser;