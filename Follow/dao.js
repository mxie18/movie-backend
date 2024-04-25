import userModel from "../Users/model.js";

export const followUser = async (curUserId, userId) => {
    const curUser = await userModel.findById(curUserId);
    const userToFollow = await userModel.findById(userId);
    curUser.following.push(userToFollow._id);
    userToFollow.followers.push(curUser._id);
    await userToFollow.save();
    await curUser.save();
    return curUser;
};

export const unfollowUser = async (curUserId, userId) => {
    const curUser = await userModel.findById(curUserId);
    const userToUnfollow = await userModel.findById(userId);

    // console.log("cur", curUser);

    // console.log("unfollow", userToUnfollow);
    curUser.following = curUser.following.filter((id) => !id.equals(userId));
    userToUnfollow.followers = userToUnfollow.followers.filter(
        (id) => !id.equals(curUserId)
    );
    await userToUnfollow.save();
    await curUser.save();
    return curUser;
};

export const findFollowers = async (userId) => {
    const user = await userModel.findById(userId).populate("followers");
    return user.followers;
};

export const findFollowing = async (userId) => {
    const user = await userModel.findById(userId).populate("following");
    return user.following;
};

export const removeUserFollows = async (userId) => {
    const user = await userModel.findById(userId);
    for (const userId of user.followers) {
        const otherUser = await userModel.findById(userId);
        otherUser.following = otherUser.following.filter(
            (id) => !id.equals(user._id)
        );
        await otherUser.save();
    }
    for (const userId of user.following) {
        const otherUser = await userModel.findById(userId);
        otherUser.followers = otherUser.followers.filter(
            (id) => !id.equals(user._id)
        );
        await otherUser.save();
    }
};
