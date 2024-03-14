const express = require("express");
const app = express();
const PORT = process.env.PORT || 3001;
const db = require("./models");
const { Students, Password } = require("./models");
app.use(express.static("client/build"));
const cors = require("cors");

app.use(cors());
app.use(express.json()); // Middleware to parse JSON bodies
const session = require("express-session");
const SequelizeStore = require("express-session-sequelize")(session.Store);
const sessionStore = new SequelizeStore({
  db: db.sequelize,
});
app.use(
  session({
    secret: generateUniqueId(),
    resave: false,
    saveUninitialized: true,
    store: sessionStore,
  })
);
function generateUniqueId() {
  const randomPart = Math.random().toString(36).substring(2, 10);
  const timestampPart = new Date().getTime().toString(36);
  return randomPart + timestampPart;
}

app.get("/ids", async (req, res) => {
  const data = await Password.findAll();
  res.send(data);
});
app.get("/studentdata", async (req, res) => {
  const data = await Students.findAll();
  res.send(data);
});
const keepProperties = (objects, propertiesToKeep) => {
  return objects.map((obj) => {
    const newObj = {};

    // Keep only the specified properties
    for (const propToKeep of propertiesToKeep) {
      if (obj.hasOwnProperty(propToKeep)) {
        newObj[propToKeep] = obj[propToKeep];
      }
    }

    return newObj;
  });
};
const propertiesToKeep = ["sId", "password"];
app.post("/", async (req, res) => {
  Students.truncate()
    .then(async () => {
      const data = await Students.bulkCreate(req.body);
      const modifiedList = keepProperties(req.body, propertiesToKeep);
      const data2 = await Password.bulkCreate(modifiedList);
      res.send(data);
    })
    .catch((error) => {
      res.send("Error truncating table:", error);
    });
});
app.post("/login", async (req, res) => {
  try {
    const { id, password } = req.body;

    // Validate user credentials (this is a basic example, adjust as per your requirements)
    const user1 = await Password.findOne({
      where: {
        sId: id,
        password: password,
      },
    });
    console.log(user1);
    const user = await Students.findOne({
      where: {
        sId: id,
      },
    });
    console.log(user);
    if (user1) {
      // Successful login
      res.status(200).json({
        message: "Login successful",
        user: user,
        userType: user1.userType,
      });
    } else {
      // Invalid credentials
      res.status(401).json({ message: "Invalid credentials" });
    }
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});
app.post("/changepassword", async (req, res) => {
  try {
    const [affectedRowsCount, updatedRows] = await Password.update(
      { password: req.body.newPassword },
      {
        where: {
          sId: req.body.sId,
        },
      }
    );

    if (affectedRowsCount > 0) {
      res
        .status(200)
        .json({ message: "Password updated successfully", updatedRows });
    } else {
      res
        .status(404)
        .json({ message: "User not found or password not updated" });
    }
  } catch (error) {
    console.error("Error updating password:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

db.sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running port ${PORT}`);
  });
});
