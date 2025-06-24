import User from "../../models/user/index";

interface AuthData {
  username?: string;
  email: string;
  password: string;
}

export const registerUser = async ({ username, email, password }: AuthData) => {
  console.log("registerUser", username, email, password);
  return await User.create({ username, email, password });
};

export const loginUser = async ({ email, password }: AuthData) => {
  const user = await User.findOne({ email });
  if (!user || !(await user.matchPassword(password))) {
    throw new Error("Invalid credentials");
  }
  return user;
};
