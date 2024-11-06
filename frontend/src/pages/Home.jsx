// import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { MainLayout } from '../layouts/MainLayout';

export const Home = () => {
  return (
    <MainLayout>
      <div className="container-fluid vh-100 d-flex flex-column justify-content-center align-items-center">
        <h1 className="text-center">Bienvenido a Home</h1>
      </div>
    </MainLayout>
  );
};

export default Home;