const containsObject = (obj, objList) => {
  for (const key in objList) {
    if (
      objList[key].start === obj.start_index &&
      objList[key].end === obj.final_index
    )
      return true;
  }

  return false;
};

const DEFAULT_STATE = {
  text: "Paste your text here to start editing....",
  tags: {
    Person: [],
    Organization: [],
    Place: [],
    Event: [],
  },
  tooltip: {
    show: false,
    positionX: 0,
    positionY: 0,
  },
  currentSelection: {
    start_index: 0,
    final_index: 0,
    word: "",
  },
};

module.exports = {
  DEFAULT_STATE,
  containsObject,
};
