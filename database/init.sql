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

---- tabla tokens_nutriologos
CREATE TABLE tokens_nutriologos (
    id_token INT AUTO_INCREMENT PRIMARY KEY,
    id_sesion_nutriologo INT NOT NULL,
    token VARCHAR(255) NOT NULL,
    FOREIGN KEY (id_sesion_nutriologo) REFERENCES nutriologo_sesion(id_nutriologo_sesion)
);

---- tabla tokens_nutriologos
CREATE TABLE tokens_paciente (
    id_token INT AUTO_INCREMENT PRIMARY KEY,
    id_sesion_paciente INT NOT NULL,
    token VARCHAR(255) NOT NULL,
    FOREIGN KEY (id_sesion_paciente) REFERENCES paciente_sesion(id_paciente_sesion)
);