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

const getState = () => {
  if (localStorage.getItem("state")) {
    const savedState = JSON.parse(localStorage.getItem("state"));
    // Add the defaults
    savedState.tooltip = DEFAULT_STATE.tooltip;
    savedState.currentSelection = DEFAULT_STATE.currentSelection;

    return savedState;
  }

  return DEFAULT_STATE;
};

module.exports = {
  getState,
  containsObject,
  DEFAULT_STATE,
};
