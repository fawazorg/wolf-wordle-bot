const Group = require("../models/group");

const addGroupHashtag = async (gid, hashtag = true) => {
  try {
    return await Group.findOneAndUpdate({ gid }, { hashtag }, { upsert: true, new: true });
  } catch (error) {
    throw error;
  }
};

const removeGroupHashtag = async (gid) => {
  try {
    await Group.findOneAndDelete({ gid });
  } catch (error) {
    throw error;
  }
};
const isGroupHashtag = async (gid) => {
  try {
    const group = await Group.findOne({ gid });
    if (!group) {
      return true;
    }
    return group.hashtag;
  } catch (error) {
    return true;
  }
};

const toggleGroupHashtag = async (gid) => {
  const hashtag = await isGroupHashtag(gid);
  const group = await addGroupHashtag(gid, !hashtag);
  return group.hashtag;
};

module.exports = {
  addGroupHashtag,
  removeGroupHashtag,
  isGroupHashtag,
  toggleGroupHashtag,
};
