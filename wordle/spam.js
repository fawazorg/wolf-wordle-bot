const Groups = new Map();

const TOTAL_MESSAGES = 1;
const PER_SECONDS = 5;

const groupHit = (id) => {
  if (Groups.has(id)) {
    let group = Groups.get(id);
    group.hit++;
    return;
  }
  let IntervalID = setInterval(clearFromSpam, PER_SECONDS * 1000, id);
  Groups.set(id, { id, hit: 1, IntervalID });
};

const isSpam = (id) => {
  groupHit(id);
  const group = Groups.get(id);
  if (group.hit <= TOTAL_MESSAGES) {
    return false;
  }
  return true;
};

const clearFromSpam = (id) => {
  let group = Groups.get(id);
  clearInterval(group.IntervalID);
  Groups.delete(id);
};

module.exports = { isSpam };
