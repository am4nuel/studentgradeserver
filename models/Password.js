module.exports = (sequelize, dataTypes) => {
  const Password = sequelize.define("Password", {
    sId: {
      type: dataTypes.STRING,
      allowNull: true,
    },
    password: {
      type: dataTypes.STRING,
      allowNull: true,
      defaultValue: "default",
    },
    userType: {
      type: dataTypes.STRING,
      allowNull: true,
      defaultValue: "student",
    },
  });
  return Password;
};
