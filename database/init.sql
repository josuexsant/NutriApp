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
    edad TINYINT NOT NULL,
    genero CHAR(1) CHECK (genero IN ('M', 'F', 'O')),
    peso FLOAT(5,2) NOT NULL,
    altura FLOAT(4,2) NOT NULL,
    telefono VARCHAR(10) NOT NULL
);

CREATE TABLE paciente_sesion (
    id_usuario INT AUTO_INCREMENT PRIMARY KEY,
    id_paciente INT NOT NULL,
    correo_electronico VARCHAR(50) NOT NULL UNIQUE,
    contrasena VARCHAR(8) NOT NULL,
    FOREIGN KEY (id_paciente) REFERENCES paciente(id_paciente) ON DELETE CASCADE
);