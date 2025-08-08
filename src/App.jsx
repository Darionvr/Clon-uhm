import { Navigate, Route, Routes } from 'react-router-dom';
import './App.css'
import Home from './assets/Views/Home';
import Staff from './assets/Views/Staff';
import Register from './assets/Views/Register';
import Myprofile from './assets/Views/Myprofile';
import AdoptList from './assets/Views/AdoptList';
import AdoptionForm from './assets/Views/AdoptionForm';
import Voluntary from './assets/Views/Voluntary';
import CreatePost from './assets/Views/CreatePost';
import Navbar from './assets/Components/Navbar';
import Footer from './assets/Components/Footer';
import PetProfile from './assets/Views/PetProfile';
import { useContext } from 'react';
import { UserContext } from '../src/assets/Context/UserContext'
import NotFound from './assets/Views/NotFound';

function App() {

  const { token, loading } = useContext(UserContext)

if (loading) return <p>Cargando...</p>;


  return (
    <>

      <Navbar />
      <Routes>
        <Route
          path="/"
          element={<Home />}
        />
        <Route
          path="/staff"
          element={<Staff />}
        />
        <Route
          path="/register"
          element={<Register />}
        />
        <Route
          path="/myprofile"
          element={token ? <Myprofile /> : <Navigate to="/" />}
        />
        <Route
          path="/adoptList"
          element={<AdoptList />}
        />
        <Route
          path="/adoptionForm"
          element={<AdoptionForm />}
        />
        <Route
          path="/voluntary"
          element={<Voluntary />}
        />
        <Route
          path="/createPost"
          element={token ? <CreatePost /> : <Navigate to="/" />}
        />
        <Route
          path="/petProfile/:id"
          element={<PetProfile />}
        />
        <Route
          path="*"
          element={<NotFound/>}
        />
      </Routes>
      <Footer />

    </>
  )
}

export default App;
