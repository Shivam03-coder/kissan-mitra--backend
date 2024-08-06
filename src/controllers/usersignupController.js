import UserModel from "../models/usermodel.js";

const usersignupController = async (req, res) => {
  try {
    const { fullname, phonenumber, email, password } = req.body;

    // CHECKING EXISTING USER

    const existingUser = await UserModel.findOne({
      $or: [{ phonenumber }, { email }],
    });

    if (existingUser) {
      return res.status(409).json({
        status: "failed",
        message: "Email already registered !",
      });
    }

    const createdUser = await UserModel.create({
      fullname,
      phonenumber,
      email,
      password,
    });

    const newUser = await UserModel.findById(createdUser._id).select(
      "-password -isAuthenticated -isemailVerified  -isphoneNoVerified -phonenumber -createdAt -updatedAt -__v"
    );

    return res.status(200).json({
      status: "success",
      message: "Registeration successfull !",
      user: newUser,
    });
  } catch (error) {
    res.status(500).json({
      status: "failed",
      message: `Unable to register ! : ${error}`,
    });
  }
};

export default usersignupController;
