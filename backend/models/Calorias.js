const { DataTypes } = require("sequelize");
const sequelize = require("../config/db.js");

const Calorias = sequelize.define(
  "Calorias",
  {
    // Cantidad de cereales sin grasa
    cerealesSinGrasa: {
      type: DataTypes.FLOAT,
      allowNull: false,
      validate: {
        min: 0,
        max: 1000,
      },
    },

    // Cantidad de frutas
    frutas: {
      type: DataTypes.FLOAT,
      allowNull: false,
      validate: {
        min: 0,
        max: 500,
      },
    },

    // Cantidad de verduras
    verduras: {
      type: DataTypes.FLOAT,
      allowNull: false,
      validate: {
        min: 0,
        max: 500,
      },
    },

    // Alimentos de origen animal muy bajos en grasa
    alimentosOAMuyBajoGrasa: {
      type: DataTypes.FLOAT,
      allowNull: false,
      validate: {
        min: 0,
        max: 300,
      },
    },

    // Alimentos de origen animal bajos en grasa
    alimentosOABajoGrasa: {
      type: DataTypes.FLOAT,
      allowNull: false,
      validate: {
        min: 0,
        max: 300,
      },
    },

    // Leche y sustitutos
    lecheYSustitutos: {
      type: DataTypes.FLOAT,
      allowNull: false,
      validate: {
        min: 0,
        max: 400,
      },
    },

    // Leguminosas
    leguminosas: {
      type: DataTypes.FLOAT,
      allowNull: false,
      validate: {
        min: 0,
        max: 300,
      },
    },

    // Grasas
    grasas: {
      type: DataTypes.FLOAT,
      allowNull: false,
      validate: {
        min: 0,
        max: 200,
      },
    },

    // Total de calorías calculadas
    totalCalorias: {
      type: DataTypes.FLOAT,
      allowNull: false,
      validate: {
        min: 0,
        max: 5000,
      },
    },
  },
  {
    tableName: "Calorias", // Nombre de la tabla en la base de datos
    timestamps: true, // Agrega los campos 'createdAt' y 'updatedAt'
  }
);

module.exports = Calorias;
