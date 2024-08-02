import UserModel from "../models/usermodel.js";
import bcrypt, { genSalt } from "bcrypt";

const userpasswordChangeController = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await UserModel.find({
      email,
    });

    if (!user) {
      return res.status(200).json({
        status: "failed",
        message: "Invalid user",
      });
    }

    const salt = await genSalt(10);
    const newHashedpassword = await bcrypt.hash(password, salt);
    console.log(newHashedpassword);

    await UserModel.findByIdAndUpdate(user._id, {
      $set: { password: newHashedpassword },
    });

    res.status(200).json({
      status: "sucess",
      message: "Password cahnged succesfully",
    });
  } catch (error) {
    res.status(200).json({
      status: "failed",
      message: "Password cahnging failed",
    });
  }
};

export default userpasswordChangeController;
