import Sequelize from 'sequelize';

const sequelize = new Sequelize('ssa', 'root', '1234', {
  host: 'localhost',
  dialect: 'mysql',
});

export default sequelize;