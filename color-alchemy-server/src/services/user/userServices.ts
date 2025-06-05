import UserModel from "../../models/user/index.js";

export const getUserStats = async (userId: string) => {
  const user = await UserModel.findById(userId).select("stats");
  if (!user) throw new Error("User not found");
  return user.stats;
};

export const recordGameResult = async (userId: string, won: boolean) => {
  const updateKey = won ? "stats.wins" : "stats.losses";
  const updatedUser = await UserModel.findByIdAndUpdate(
    userId,
    { $inc: { [updateKey]: 1 } },
    { new: true }
  ).select("stats");

  if (!updatedUser) {
    throw new Error("User not found or update failed");
  }

  return updatedUser.stats;
};
