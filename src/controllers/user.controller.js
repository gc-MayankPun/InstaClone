const followModel = require("../models/follow.model");
const userModel = require("../models/user.model");

async function followUserController(req, res) {
  const followerUsername = req.user.username;
  const followeeUsername = req.params.username;

  if (followerUsername === followeeUsername) {
    return res.status(400).json({ message: "You cannot follow yourself" });
  }

  const isFolloweeExists = await userModel.findOne({
    username: followeeUsername,
  });
  if (!isFolloweeExists) {
    return res
      .status(404)
      .json({ message: "User you are trying to follow does not exists" });
  }

  const isAlreadyFollowing = await followModel.findOne({
    followee: followeeUsername,
    follower: followerUsername,
  });
  if (isAlreadyFollowing) {
    return res.status(200).json({
      message: `You are already following ${followeeUsername}`,
      follow: isAlreadyFollowing,
    });
  }

  const followRecord = await followModel.create({
    follower: followerUsername,
    followee: followeeUsername,
  });

  res.status(201).json({
    message: `You are now following ${followeeUsername}`,
    follow: followRecord,
  });
}

async function unfollowUserController(req, res) {
  const followerUsername = req.user.username;
  const followeeUsername = req.params.username;

  const isUserFollowing = await followModel.findOne({
    follower: followerUsername,
    followee: followeeUsername,
  });
  if (!isUserFollowing) {
    return res
      .status(200)
      .json({ message: `You are not following ${followeeUsername}` });
  }

  await followModel.findByIdAndDelete(isUserFollowing._id);
  res.status(200).json({ message: `You have unfollowed ${followeeUsername}` });
}

async function sendFollowRequestController(req, res) {
  const followerUsername = req.user.username;
  const followeeUsername = req.params.username;

  if (followerUsername === followeeUsername) {
    return res
      .status(400)
      .json({ message: "You cannot send follow request to yourself" });
  }

  const isFolloweeExists = await userModel.findOne({
    username: followeeUsername,
  });
  if (!isFolloweeExists) {
    return res
      .status(404)
      .json({ message: "User you are trying to follow a user who does not exists" });
  }

  const followRequest = await followModel.findOne({
    followee: followeeUsername,
    follower: followerUsername,
  });
  if (!followRequest) {
    const followRecord = await followModel.create({
      follower: followerUsername,
      followee: followeeUsername,
      status: "pending",
    });

    return res.status(201).json({
      message: `You have sent follow request to ${followeeUsername}`,
      follow: followRecord,
    });
  }

  if (followRequest.status === "pending") {
    return res.status(403).json({
      message: "Follow request is already sent",
      follow: followRequest,
    });
  }
  if (followRequest.status === "accepted") {
    return res.status(200).json({
      message: `You are already following ${followeeUsername}`,
      follow: followRequest,
    });
  }

  return res.status(400).json({ message: "Invalid request state" });
}

async function acceptFollowRequestController(req, res) {
  const followeeUsername = req.user.username;
  const followerUsername = req.params.username;

  const followRequest = await followModel.findOne({
    followee: followeeUsername,
    follower: followerUsername,
  });
  if (!followRequest) {
    return res.status(404).json({ message: "Follow request does not exists" });
  }
  if (followRequest.status !== "pending") {
    return res.status(400).json({ message: "Invalid request state" });
  }

  followRequest.status = "accepted";
  await followRequest.save();

  return res.status(200).json({
    message: `You have accepted follow request from ${followerUsername}`,
    follow: followRequest,
  });
}

async function rejectFollowRequestController(req, res) {
  const followeeUsername = req.user.username;
  const followerUsername = req.params.username;

  const followRequest = await followModel.findOne({
    followee: followeeUsername,
    follower: followerUsername,
  });
  if (!followRequest) {
    return res.status(404).json({ message: "Follow request does not exists" });
  }
  if (followRequest.status !== "pending") {
    return res.status(400).json({ message: "Invalid request state" });
  }

  await followModel.findByIdAndDelete(followRequest._id);

  return res.status(200).json({
    message: `You have rejected follow request from ${followerUsername}`,
    follow: followRequest,
  });
}

module.exports = {
  followUserController,
  unfollowUserController,
  sendFollowRequestController,
  acceptFollowRequestController,
  rejectFollowRequestController,
};
