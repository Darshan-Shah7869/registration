import userModel from "../models/userModel";
import { hashpassword, comparePassword } from "./../utils/auth";
const jwt = require("jsonwebtoken");

export const register = async (req, res) => {
  try {
    const { firstName, lastName, email, password, contact, address } = {
      ...req.body,
    };

    if (!firstName) {
      return res
        .status(404)
        .json({ status: "Failed", message: "Please enter first name" });
    }

    if (!lastName) {
      return res
        .status(404)
        .json({ status: "Failed", message: "Please enter last name" });
    }

    let userExist = await userModel.findOne({ email });
    if (userExist) {
      return res
        .status(400)
        .json({ status: "Failed", message: "Email is taken" });
    }

    // hashpassword

    const hashedPassword = await hashpassword(password);

    // Save the data to the database
    await userModel.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      contact,
      address,
    });
    res.status(201).json({ message: "successfully sent the data" });
  } catch (error) {
    console.log(error.message);
  }
};

export const login = async (req, res) => {
  const { email, password } = { ...req.body };
  console.log(email);
  jwt.sign(
    { user: { email: email, password: password } },
    "secret-key",
    async (err, token) => {
      const user = await userModel.findOne({ email }).exec();
      console.log(user);

      if (comparePassword(hashpassword(password), user.password)) {
        res.status(200).json({ token });
      } else {
        res.status(400).json("Wrong password");
      }
    }
  );
};
