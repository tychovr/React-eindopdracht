// import React from 'react';
import { Route, Routes } from 'react-router';
import Home from './views/Home/Home';
import './App.css';
import Layout from 'views/Layout/Layout';
import SignIn from 'views/Login/SignIn/SignIn';
import SignUp from 'views/Login/SignUp/SignUp';
import ResetPassword from 'views/Login/ResetPassword/ResetPassword';
import CarRegister from 'views/CarRegister/CarRegister';
import CarConfirmed from 'views/CarConfirmed/CarConfirmed'

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Layout/>}>
          <Route index element={<Home/>}/>
          <Route element={<SignIn/>} path="signin"/>
          <Route element={<SignUp/>} path="signup"/>
          <Route element={<ResetPassword/>} path="resetpassword"/>
          <Route element={<CarRegister/>} path="carregister"/>
          <Route element={<CarConfirmed/>} path="carconfirmed"/>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
