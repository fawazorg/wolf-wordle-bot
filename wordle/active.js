const Group = require("../models/group");

const setLastActive = async (gid) => {
  await Group.findOneAndUpdate({ gid }, { lastActiveAt: new Date() }, { upsert: true });
};

const getInactiveGroups = async (daysPass) => {
  let groups = await Group.aggregate([
    {
      $project: {
        gid: "$gid",
        days: {
          $dateDiff: {
            startDate: "$lastActiveAt",
            endDate: "$$NOW",
            unit: "day",
          },
        },
      },
    },
    { $match: { days: { $gt: daysPass } } },
  ]);
  return groups;
};

const deleteGroup = async (gid) => {
  await Group.findOneAndDelete({ gid });
};

/**
 *
 * @param {import ("wolf.js").WOLFBot} api
 */
const refreshUnsetGroup = async (api) => {
  let groups = await api.group().list();
  let groupsNames = groups.reduce(async (pv, group) => {
    let names = await pv;
    await setLastActive(group.id);
    return [...names, `[${group.name}]`];
  }, []);
  return groupsNames;
};

module.exports = { setLastActive, getInactiveGroups, refreshUnsetGroup, deleteGroup };
