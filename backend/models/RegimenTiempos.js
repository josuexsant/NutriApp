const { DataTypes } = require("sequelize");
const sequelize = require("../config/db.js");

const RegimenTiempos = sequelize.define(
  "RegimenTiempos",
  {
    ID_regimen: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    ID_paciente: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Paciente",
        key: "ID_paciente",
      },
    },
    Dia: {
      type: DataTypes.ENUM(
        "Lunes",
        "Martes",
        "Miércoles",
        "Jueves",
        "Viernes",
        "Sábado",
        "Domingo"
      ),
      allowNull: false,
    },
    Calorias_totales: {
      type: DataTypes.FLOAT,
      allowNull: false,
      validate: {
        min: 0,
      },
    },
    Grupos_calorias: {
      type: DataTypes.JSON,
      allowNull: false,
    },
    Comidas: {
      type: DataTypes.JSON,
      allowNull: false,
    },
  },
  {
    tableName: "RegimenTiempos",
    timestamps: true,
    createdAt: "fecha_creacion",
    updatedAt: "fecha_actualizacion",
  }
);

module.exports = RegimenTiempos;
