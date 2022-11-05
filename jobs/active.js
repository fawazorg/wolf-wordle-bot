const { getInactiveGroups, deleteGroup } = require("../wordle/active");
const { ignoreGroups, AdminGroup } = require("../data/admin");
/**
 *
 * @param {import ("wolf.js").WOLFBot} api
 * @param {Number} days
 */
const leaveInactiveGroups = async (api, days) => {
  let inactiveGroups = await getInactiveGroups(days);
  if (inactiveGroups.length <= 0) {
    return;
  }
  let inGroups = await api.group().list();
  if (inGroups.length <= 0) {
    return;
  }
  let toExitGroups = [];
  inGroups.forEach((group) => {
    if (!ignoreGroups.includes(group.id) && inArray(inactiveGroups, "gid", group.id)) {
      toExitGroups.push(group);
    }
  });
  if (toExitGroups.length > 0) {
    let groupsNames = await toExitGroups.reduce(async (pv, group) => {
      let names = await pv;
      await sendLeaveMessage(api, group);
      await api.group().leaveById(group.id);
      await deleteGroup(group.id);
      await api.utility().delay(2000);
      return [...names, `[${group.name}]`];
    }, []);
    await sendLogMessage(api, groupsNames);
  }
};
/**
 *
 * @param {import ("wolf.js").WOLFBot} api
 * @param {import ("wolf.js").GroupObject} group
 */
const sendLeaveMessage = async (api, group) => {
  let language = group.language === "ar" ? "ar" : "en";
  let phrase = api.phrase().getByLanguageAndName(language, "auto_leave_message");
  await api.messaging().sendGroupMessage(group.id, phrase);
};
/**
 *
 * @param {import ("wolf.js").WOLFBot} api
 * @param {Array} names
 */
const sendLogMessage = async (api, names) => {
  let phrase = api.phrase().getByLanguageAndName("ar", "auto_leave_log");
  let groupsCount = await api.group().list();
  let content = api
    .utility()
    .string()
    .replace(phrase, {
      count: groupsCount.length,
      inactiveCount: names.length,
      groupsName: names.join("\n"),
    });
  await api.messaging().sendGroupMessage(AdminGroup, content);
};
/**
 *
 * @param {Array} array
 * @param {String} key
 * @param {*} value
 * @returns
 */
const inArray = (array, key, value) => {
  return array.filter((item) => item[key] === value).length > 0 ? true : false;
};
module.exports = { leaveInactiveGroups };
