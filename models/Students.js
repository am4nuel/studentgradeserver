module.exports = (sequelize, dataTypes) => {
  const Students = sequelize.define("Students", {
    sId: {
      type: dataTypes.STRING,
      allowNull: true,
    },
    fName: {
      type: dataTypes.STRING,
      allowNull: true,
    },
    mName: {
      type: dataTypes.STRING,
      allowNull: true,
    },
    lName: {
      type: dataTypes.STRING,
      allowNull: true,
    },
    age: {
      type: dataTypes.INTEGER,
      allowNull: true,
    },
    sex: {
      type: dataTypes.STRING,
      allowNull: true,
    },
    outOfTen1: {
      type: dataTypes.DOUBLE,
      allowNull: true,
    },
    outOfTen2: {
      type: dataTypes.DOUBLE,
      allowNull: true,
      default: "admin",
    },
    outOfTen3: {
      type: dataTypes.DOUBLE,
      allowNull: true,
      default: "admin",
    },
    outOfTen4: {
      type: dataTypes.DOUBLE,
      allowNull: true,
      default: "admin",
    },
    outOfTen5: {
      type: dataTypes.DOUBLE,
      allowNull: true,
      default: "admin",
    },
    outOfTen6: {
      type: dataTypes.DOUBLE,
      allowNull: true,
      default: "admin",
    },
    outOfTen7: {
      type: dataTypes.DOUBLE,
      allowNull: true,
      default: "admin",
    },
    outOfFive1: {
      type: dataTypes.DOUBLE,
      allowNull: true,
      default: "admin",
    },
    outOfFive2: {
      type: dataTypes.DOUBLE,
      allowNull: true,
      default: "admin",
    },
    outOfEighty: {
      type: dataTypes.DOUBLE,
      allowNull: true,
      default: "admin",
    },
    h40: {
      type: dataTypes.DOUBLE,
      allowNull: true,
      default: "admin",
    },
    outOfTwenty: {
      type: dataTypes.DOUBLE,
      allowNull: true,
      default: "admin",
    },
    outOfSixty: {
      type: dataTypes.DOUBLE,
      allowNull: true,
      default: "admin",
    },
    outOfForty: {
      type: dataTypes.DOUBLE,
      allowNull: true,
      default: "admin",
    },
    outOfOneHundred: {
      type: dataTypes.DOUBLE,
      allowNull: true,
      default: "admin",
    },
    remark: {
      type: dataTypes.STRING,
      allowNull: true,
    },
    userType: {
      type: dataTypes.STRING,
      allowNull: true,
      defaultValue: "student",
    },
  });
  return Students;
};
