import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const Paciente = sequelize.define(
  "Paciente",
  {
    ID_paciente: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    Nombre: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    Apellido_paterno: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    Apellido_materno: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    Fecha_nacimiento: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    Altura: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    Peso: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    Correo: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    Contrasena: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    Telefono: {
      type: DataTypes.STRING(11),
      allowNull: false,
    },
  },
  {
    tableName: "Paciente",
    timestamps: false,
  }
);

export default Paciente;
