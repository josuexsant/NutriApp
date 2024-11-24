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

CREATE TABLE IF NOT EXISTS `actividad_fisica` (
  `Id_actividad_fisica` int(11) NOT NULL,
  `Estado` varchar(50) NOT NULL,
  PRIMARY KEY (`Id_actividad_fisica`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `ajuste_profecional`
--

CREATE TABLE IF NOT EXISTS `ajuste_profecional` (
  `Id_ajuste` int(11) NOT NULL AUTO_INCREMENT,
  `comentario` varchar(50) NOT NULL,
  `Fecha_correcion` date NOT NULL,
  `id_alimento` int(11) NOT NULL,
  `Id_nutriologo` int(11) NOT NULL,
  `Cantidad` int(11) NOT NULL,
  `Id_unidad` int(11) NOT NULL,
  PRIMARY KEY (`Id_ajuste`),
  KEY `FK_alimento_ajuste` (`id_alimento`),
  KEY `FK_nutriologo` (`Id_nutriologo`),
  KEY `FK_unidad_medida_ajuste` (`Id_unidad`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `alimentos`
--

CREATE TABLE IF NOT EXISTS `alimentos` (
  `Id_alimento` int(11) NOT NULL AUTO_INCREMENT,
  `Nombre_alimento` varchar(50) NOT NULL,
  `Calorias` double NOT NULL,
  `Proteinas` double NOT NULL,
  `Carbohidratos` double NOT NULL,
  `Grasas` double NOT NULL,
  `Fibra` double NOT NULL,
  `Id_grupo` int(11) NOT NULL,
  `Cantidad` int(11) NOT NULL,
  `Id_unidad` int(11) NOT NULL,
  `Id_Subgrupo` int(11) NOT NULL,
  PRIMARY KEY (`Id_alimento`),
  KEY `FK_grupo` (`Id_grupo`),
  KEY `FK_subgrupo` (`Id_Subgrupo`),
  KEY `FK_unidad_medida` (`Id_unidad`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `genero`
--

CREATE TABLE IF NOT EXISTS `genero` (
  `Id_Genero` int(11) NOT NULL,
  `Genero` varchar(50) NOT NULL,
  PRIMARY KEY (`Id_Genero`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `grupo`
--

CREATE TABLE IF NOT EXISTS `grupo` (
  `Id_grupo` int(11) NOT NULL,
  `Nombre_grupo` varchar(50) NOT NULL,
  PRIMARY KEY (`Id_grupo`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `nutriologo`
--

CREATE TABLE IF NOT EXISTS `nutriologo` (
  `Id_nutriologo` int(11) NOT NULL AUTO_INCREMENT,
  `Nombre` varchar(50) NOT NULL,
  `Correo` varchar(50) NOT NULL,
  `Contrasena` varchar(50) NOT NULL,
  `Telefono` varchar(11) NOT NULL,
  `Apellido_paterno` varchar(50) NOT NULL,
  `Apellido_Materno` varchar(50) NOT NULL,
  PRIMARY KEY (`Id_nutriologo`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `plan_diario`
--

CREATE TABLE IF NOT EXISTS `plan_diario` (
  `Id_plan` int(11) NOT NULL AUTO_INCREMENT,
  `Dia` date NOT NULL,
  `Cambio_realizada` int(11) NOT NULL,
  `Id_regimen` int(11) NOT NULL,
  `id_alimento_principal` int(11) NOT NULL,
  `id_alimento_equivalente` int(11) NOT NULL,
  `id_alimento_sustituto` int(11) NOT NULL,
  `ID_ajuste` int(11) NOT NULL,
  PRIMARY KEY (`Id_plan`),
  KEY `FK_alimento_principal` (`id_alimento_principal`),
  KEY `FK_alimento_equivalente` (`id_alimento_equivalente`),
  KEY `FK_alimento_sustituto` (`id_alimento_sustituto`),
  KEY `FK_ajuste_profesional` (`ID_ajuste`),
  KEY `FK_regimen_alimenticio` (`Id_regimen`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `plan_diario_tiempos`
--

CREATE TABLE IF NOT EXISTS `plan_diario_tiempos` (
  `Id_plan` int(11) NOT NULL AUTO_INCREMENT,
  `Dia` date NOT NULL,
  `Cambio_realizado` int(11) NOT NULL,
  `Id_regimen_tiempos` int(11) NOT NULL,
  `Id_alimento_principal_tiempos` int(11) NOT NULL,
  `Id_alimento_equivalente_tiempos` int(11) NOT NULL,
  `Id_tiempo` int(11) NOT NULL,
  `Id_ajuste_tiempos` int(11) NOT NULL,
  `Id_alimento_sustituto_tiempos` int(11) NOT NULL,
  PRIMARY KEY (`Id_plan`),
  KEY `FK_tiempo` (`Id_tiempo`),
  KEY `FK_alimento_principal_tiempos` (`Id_alimento_principal_tiempos`),
  KEY `FK_alimento_equivalente_tiempos` (`Id_alimento_equivalente_tiempos`),
  KEY `FK_alimento_sustituto_tiempos` (`Id_alimento_sustituto_tiempos`),
  KEY `FK_ajuste_tiempos` (`Id_ajuste_tiempos`),
  KEY `FK_regimen_alimenticio_tiempos` (`Id_regimen_tiempos`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `regimen_alimenticio_tiempos`
--

CREATE TABLE IF NOT EXISTS `regimen_alimenticio_tiempos` (
  `Id_regimen` int(11) NOT NULL AUTO_INCREMENT,
  `Calorias_diarias` double NOT NULL,
  `Proteinas_diarias` double NOT NULL,
  `Carbohidratos_diarios` double NOT NULL,
  `Grasas_diarias` double NOT NULL,
  `Id_nutriologo` int(11) NOT NULL,
  `Objetivo` varchar(50) NOT NULL,
  `ID_usuario` int(11) NOT NULL,
  PRIMARY KEY (`Id_regimen`),
  KEY `FK_usuario_regimen` (`ID_usuario`),
  KEY `FK_nutriologo_regimen` (`Id_nutriologo`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `subgrupo`
--

CREATE TABLE IF NOT EXISTS `subgrupo` (
  `Id_Subgrupo` int(11) NOT NULL AUTO_INCREMENT,
  `Nombre` varchar(50) NOT NULL,
  PRIMARY KEY (`Id_Subgrupo`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tiempo`
--

CREATE TABLE IF NOT EXISTS `tiempo` (
  `Id_tiempo` int(11) NOT NULL AUTO_INCREMENT,
  `Nombre` varchar(50) NOT NULL,
  PRIMARY KEY (`Id_tiempo`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `unidad_medida`
--

CREATE TABLE IF NOT EXISTS `unidad_medida` (
  `Id_unidad` int(11) NOT NULL AUTO_INCREMENT,
  `Unidad` varchar(50) NOT NULL,
  PRIMARY KEY (`Id_unidad`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `usuario`
--

CREATE TABLE IF NOT EXISTS `usuario` (
  `Id_usuario` int(11) NOT NULL AUTO_INCREMENT,
  `Nombre` varchar(50) NOT NULL,
  `Fecha_nacimiento` date NOT NULL,
  `Altura` int(11) NOT NULL,
  `Peso` int(11) NOT NULL,
  `Correo` varchar(50) NOT NULL,
  `Contrasena` varchar(50) NOT NULL,
  `Telefono` varchar(11) NOT NULL,
  `Apellido_paterno` varchar(50) NOT NULL,
  `Apellido_materno` varchar(50) NOT NULL,
  `Id_Genero` int(11) NOT NULL,
  `Id_actividad_fisica` int(11) NOT NULL,
  PRIMARY KEY (`Id_usuario`),
  KEY `FK_genero_usuario` (`Id_Genero`),
  KEY `FK_actividad_usuario` (`Id_actividad_fisica`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `usuario_log`
--

CREATE TABLE IF NOT EXISTS `usuario_log` (
  `Id_usuario_log` int(11) NOT NULL AUTO_INCREMENT,
  `Correo` varchar(50) NOT NULL,
  `Contrasena` varchar(50) NOT NULL,
  `ID_usuario` int(11) DEFAULT NULL,
  PRIMARY KEY (`Id_usuario_log`),
  KEY `IXFK_Usuario_log_Usuario` (`ID_usuario`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `ajuste_profecional`
--
ALTER TABLE `ajuste_profecional`
  ADD CONSTRAINT `FK_alimento_ajuste` FOREIGN KEY (`id_alimento`) REFERENCES `alimentos` (`Id_alimento`),
  ADD CONSTRAINT `FK_nutriologo` FOREIGN KEY (`Id_nutriologo`) REFERENCES `nutriologo` (`Id_nutriologo`),
  ADD CONSTRAINT `FK_unidad_medida_ajuste` FOREIGN KEY (`Id_unidad`) REFERENCES `unidad_medida` (`Id_unidad`);

--
-- Constraints for table `alimentos`
--
ALTER TABLE `alimentos`
  ADD CONSTRAINT `FK_grupo` FOREIGN KEY (`Id_grupo`) REFERENCES `grupo` (`Id_grupo`),
  ADD CONSTRAINT `FK_subgrupo` FOREIGN KEY (`Id_Subgrupo`) REFERENCES `subgrupo` (`Id_Subgrupo`),
  ADD CONSTRAINT `FK_unidad_medida` FOREIGN KEY (`Id_unidad`) REFERENCES `unidad_medida` (`Id_unidad`);

--
-- Constraints for table `plan_diario`
--
ALTER TABLE `plan_diario`
  ADD CONSTRAINT `FK_ajuste_profesional` FOREIGN KEY (`ID_ajuste`) REFERENCES `ajuste_profecional` (`Id_ajuste`),
  ADD CONSTRAINT `FK_alimento_equivalente` FOREIGN KEY (`id_alimento_equivalente`) REFERENCES `alimentos` (`Id_alimento`),
  ADD CONSTRAINT `FK_alimento_principal` FOREIGN KEY (`id_alimento_principal`) REFERENCES `alimentos` (`Id_alimento`),
  ADD CONSTRAINT `FK_alimento_sustituto` FOREIGN KEY (`id_alimento_sustituto`) REFERENCES `alimentos` (`Id_alimento`),
  ADD CONSTRAINT `FK_regimen_alimenticio` FOREIGN KEY (`Id_regimen`) REFERENCES `regimen_alimenticio_tiempos` (`Id_regimen`);

--
-- Constraints for table `plan_diario_tiempos`
--
ALTER TABLE `plan_diario_tiempos`
  ADD CONSTRAINT `FK_ajuste_tiempos` FOREIGN KEY (`Id_ajuste_tiempos`) REFERENCES `ajuste_profecional` (`Id_ajuste`),
  ADD CONSTRAINT `FK_alimento_equivalente_tiempos` FOREIGN KEY (`Id_alimento_equivalente_tiempos`) REFERENCES `alimentos` (`Id_alimento`),
  ADD CONSTRAINT `FK_alimento_principal_tiempos` FOREIGN KEY (`Id_alimento_principal_tiempos`) REFERENCES `alimentos` (`Id_alimento`),
  ADD CONSTRAINT `FK_alimento_sustituto_tiempos` FOREIGN KEY (`Id_alimento_sustituto_tiempos`) REFERENCES `alimentos` (`Id_alimento`),
  ADD CONSTRAINT `FK_regimen_alimenticio_tiempos` FOREIGN KEY (`Id_regimen_tiempos`) REFERENCES `regimen_alimenticio_tiempos` (`Id_regimen`),
  ADD CONSTRAINT `FK_tiempo` FOREIGN KEY (`Id_tiempo`) REFERENCES `tiempo` (`Id_tiempo`);

--
-- Constraints for table `regimen_alimenticio_tiempos`
--
ALTER TABLE `regimen_alimenticio_tiempos`
  ADD CONSTRAINT `FK_nutriologo_regimen` FOREIGN KEY (`Id_nutriologo`) REFERENCES `nutriologo` (`Id_nutriologo`),
  ADD CONSTRAINT `FK_usuario_regimen` FOREIGN KEY (`ID_usuario`) REFERENCES `usuario` (`Id_usuario`);

--
-- Constraints for table `usuario`
--
ALTER TABLE `usuario`
  ADD CONSTRAINT `FK_actividad_usuario` FOREIGN KEY (`Id_actividad_fisica`) REFERENCES `actividad_fisica` (`Id_actividad_fisica`),
  ADD CONSTRAINT `FK_genero_usuario` FOREIGN KEY (`Id_Genero`) REFERENCES `genero` (`Id_Genero`);

--
-- Constraints for table `usuario_log`
--
ALTER TABLE `usuario_log`
  ADD CONSTRAINT `FK_Usuario_log_Usuario` FOREIGN KEY (`ID_usuario`) REFERENCES `usuario` (`Id_usuario`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;