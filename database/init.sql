-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 11, 2024 at 02:51 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `nutriapp`
--
CREATE DATABASE IF NOT EXISTS `nutriapp` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `nutriapp`;

-- --------------------------------------------------------

--
-- Table structure for table `actividad_fisica`
--
-- Crear la tabla Nutriologo
CREATE TABLE nutriologo (
    id_nutriologo INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    apellido_pat VARCHAR(100) NOT NULL,
	apellido_mat VARCHAR(100) NOT NULL,
    telefono VARCHAR(15) NOT NULL, 
    ciudad_residencia VARCHAR(50) NOT NULL, 
    codigo_postal VARCHAR(10) NOT NULL,
    cedula_profesional VARCHAR(20) UNIQUE NOT NULL 
);

-- Crear tabla para las credenciales
CREATE TABLE nutriologo_sesion (
  id_nutriologo_sesion INT AUTO_INCREMENT PRIMARY KEY, 
	id_nutriologo int NOT NULL,
	correo_electronico VARCHAR(100) NOT NULL,
	contrasena VARCHAR(255) NOT NULL,
	FOREIGN KEY (id_nutriologo) REFERENCES nutriologo(id_nutriologo)
);

-- tabla tokens_nutriologos
CREATE TABLE tokens_nutriologos (
    id_token INT AUTO_INCREMENT PRIMARY KEY,
    id_sesion_nutriologo INT NOT NULL,
    token VARCHAR(255) NOT NULL,
    FOREIGN KEY (id_sesion_nutriologo) REFERENCES nutriologo_sesion(id_nutriologo_sesion)
);

CREATE TABLE paciente (
    id_paciente INT AUTO_INCREMENT PRIMARY KEY,
    nombres VARCHAR(50) NOT NULL,
    apellido_pat VARCHAR(50) NOT NULL,
    apellido_mat VARCHAR(50) NOT NULL,
    fecha_nacimiento DATE NOT NULL,
    genero CHAR(1) CHECK (genero IN ('M', 'F', 'O')),
    peso FLOAT(5,2) NOT NULL,
    altura FLOAT(4,2) NOT NULL,
    telefono VARCHAR(10) NOT NULL
);

CREATE TABLE paciente_sesion (
    id_paciente_sesion INT AUTO_INCREMENT PRIMARY KEY,
    id_paciente INT NOT NULL,
    correo_electronico VARCHAR(50) NOT NULL UNIQUE,
    contrasena VARCHAR(8) NOT NULL,
    FOREIGN KEY (id_paciente) REFERENCES paciente(id_paciente) ON DELETE CASCADE
);

-- tabla tokens_paciente
CREATE TABLE tokens_paciente (
    id_token INT AUTO_INCREMENT PRIMARY KEY,
    id_sesion_paciente INT NOT NULL,
    token VARCHAR(255) NOT NULL,
    FOREIGN KEY (id_sesion_paciente) REFERENCES paciente_sesion(id_paciente_sesion)
);

-- Crear tabla regimen_por_tiempos
CREATE TABLE regimen_por_tiempos (
    id INT AUTO_INCREMENT PRIMARY KEY,                         
    paciente_id INT,                            
    limite_calorias DECIMAL(10, 2),             
    FOREIGN KEY (paciente_id) REFERENCES paciente(id_paciente) 
);

-- Crear tabla tiempos_comida
CREATE TABLE tiempos_comida (
    id INT AUTO_INCREMENT PRIMARY KEY,                        
    regimen_id INT,                             
    nombre_tiempo VARCHAR(50),                  
    FOREIGN KEY (regimen_id) REFERENCES regimen_por_tiempos(id) 
);

-- Crear tabla calorias_por_grupo
CREATE TABLE calorias_por_grupo (
    id INT AUTO_INCREMENT PRIMARY KEY,                         
    regimen_id INT,                             
    grupo VARCHAR(50),                          
    total_calorias DECIMAL(10, 2),              
    FOREIGN KEY (regimen_id) REFERENCES regimen_por_tiempos(id)
);

-- Crear tabla alimentos_tiempos
CREATE TABLE alimentos_tiempos (
    id INT AUTO_INCREMENT PRIMARY KEY,                         
    tiempo_id INT,                              
    calorias_por_grupo_id INT,                  
    alimento_principal VARCHAR(100),             
    alternativa_1 VARCHAR(100),                 
    alternativa_2 VARCHAR(100),                 
    FOREIGN KEY (tiempo_id) REFERENCES tiempos_comida(id),      
    FOREIGN KEY (calorias_por_grupo_id) REFERENCES calorias_por_grupo(id)
);

-- Crear tabla regimen_consumo_diario
CREATE TABLE regimen_consumo_diario (
    id INT AUTO_INCREMENT PRIMARY KEY,                         
    paciente_id INT,                                        
    FOREIGN KEY (paciente_id) REFERENCES paciente(id_paciente) 
);

-- Crear tabla dias
CREATE TABLE dias (
    id INT AUTO_INCREMENT PRIMARY KEY,
    regimen_id INT,                                                      
    dia VARCHAR(50),
    limite_calorias DECIMAL(10, 2),
    FOREIGN KEY (regimen_id) REFERENCES regimen_consumo_diario(id)
);

-- Crear tabla calorias_por_grupo
CREATE TABLE calorias_por_grupo_diario (
    id INT AUTO_INCREMENT PRIMARY KEY,
    dia_id INT,                         
    grupo VARCHAR(50),                          
    total_calorias DECIMAL(10, 2),
    FOREIGN KEY (dia_id) REFERENCES dias(id)              
);

-- Crear tabla alimentos_consumo_diario
CREATE TABLE alimentos_consumo_diario (
    id INT AUTO_INCREMENT PRIMARY KEY,                         
    calorias_por_grupo_id INT,                  
    alimento_principal VARCHAR(100),             
    alternativa_1 VARCHAR(100),                 
    alternativa_2 VARCHAR(100),                 
    FOREIGN KEY (calorias_por_grupo_id) REFERENCES calorias_por_grupo_diario(id)
);