const { DataTypes } = require("sequelize");
const sequelize = require("../config/db.js");

const Nutriologo = sequelize.define(
  "Nutriologo",
  {
    ID_nutriologo: {
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
    Telefono: {
      type: DataTypes.STRING(11),
      allowNull: false,
    },
    Estado: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    Ciudad: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    Licencia: {
      type: DataTypes.STRING(50),
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
  },
  {
    tableName: "Nutriologo",
    timestamps: false,
  }
);

module.exports = Nutriologo;
