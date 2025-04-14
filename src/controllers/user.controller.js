const User = require("../models/user.model");

exports.getUsers = async (req, res) => {
  try {
    const users = await User.getAll((err, userss) => {
      if (err) {
        console.error("Error al obtener usuarios:", err);
      } else {
        console.log("Usuarios:", userss);
      }
    });
      res.status(201).json(users);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener usuarios" });
    console.log('Error al obtener usuarios:', error);
  }
};

exports.createUser = async (req, res) => {
  try {
    console.log('Creating users...');
    // const newUser = new User(req.body);
    // await newUser.save();
    res.status(201);
  } catch (error) {
    res.status(400).json({ message: "Error al crear usuario" });
  }
};
