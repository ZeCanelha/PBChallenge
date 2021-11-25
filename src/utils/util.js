// import axios from "axios";

// Regarding the first remark: ideally store the data in a server

/* const postData = async (state) => {
//   try {
//     const response = await axios.post(
//       "dummyapi.com/store",
//       JSON.stringify(state)
//     );
//     console.log(response.data);
//     // Do something with the response
//   } catch (error) {
//     // Do something with the error
//     console.log(error);
//   }
// };
*/

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
  text: "",
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
  notificationToast: {
    show: false,
  },
};

const getState = () => {
  if (localStorage.getItem("state")) {
    const savedState = JSON.parse(localStorage.getItem("state"));
    // Add the defaults
    savedState.tooltip = DEFAULT_STATE.tooltip;
    savedState.currentSelection = DEFAULT_STATE.currentSelection;
    savedState.notificationToast = DEFAULT_STATE.notificationToast;
    return savedState;
  }
  return DEFAULT_STATE;
};

module.exports = {
  getState,
  containsObject,
  DEFAULT_STATE,
};
