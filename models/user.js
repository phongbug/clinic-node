module.exports = (sequelize, Sequelize) => {
  const Customer = sequelize.define('user', {
    username: Sequelize.STRING,
    password: Sequelize.STRING,
  });
  return Customer;
};
