import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LoginForm from './Pages/LoginForm';
import RegisterForm from './Pages/RegisterForm';
import UserPage from './Pages/UserPage';
import AdminPage from './Pages/AdminPage';
import EditUser from './Pages/EditUser';
import LocationsPage from './Pages/LocationsPage';
import UserAppointments from './Pages/UserAppointments'
import DoctorEdit from './Pages/DoctorEdit';

function App() {
  return (
    <BrowserRouter>
      <div>
        <Routes>
          <Route path="/" element={<LoginForm />} />
          <Route path="/register" element={<RegisterForm />}/>
          <Route path="/user" element={<UserPage />}/>
          <Route path="/admin" element={<AdminPage />}/>
          <Route path="/edit" element={<EditUser />}/>
          <Route path="/locations" element={<LocationsPage/>}/>
          <Route path="/appointments" element={<UserAppointments/>}/>
          <Route path="/doctorEdit/:id" element={<DoctorEdit/>}/>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
