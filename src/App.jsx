import React from "react";
import update from "immutability-helper";
import Buttons from "./components/Buttons";
import Tooltip from "./components/Tooltip";
import Tags from "./components/Tags";
import { containsObject, getState, DEFAULT_STATE } from "./utils/util";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = getState();
    // Create a reference to the tooltip
    this.tooltipRef = React.createRef();

    // Bind the event functions to this
    this.onPasteEvent = this.onPasteEvent.bind(this);
    this.onSelectedEvent = this.onSelectedEvent.bind(this);
    this.onDismiss = this.onDismiss.bind(this);
    this.onSetTag = this.onSetTag.bind(this);
    this.onClearText = this.onClearText.bind(this);
    this.onSaveSesstion = this.onSaveSesstion.bind(this);
  }

  wordMapper(tagArray) {
    return tagArray.map((item, index) => {
      return (
        <span className="words" key={index}>
          {item.word + " (" + item.start + ", " + item.end + ")"}
        </span>
      );
    });
  }

  onClearText(e) {
    e.preventDefault();
    this.setState(update(this.state, { $set: DEFAULT_STATE }));
  }
  onSaveSesstion(e) {
    const saveSession = {
      text: this.state.text,
      tags: this.state.tags,
    };
    localStorage.setItem("state", JSON.stringify(saveSession));
  }

  onSetTag(e) {
    // Get tag and persist the temporary selection to the state
    const tag = e.target.value;

    // Util function to check for *exact* duplicates

    if (!containsObject(this.state.currentSelection, this.state.tags[tag])) {
      this.setState(
        update(this.state, {
          tooltip: {
            show: { $set: false },
          },
          tags: {
            [tag]: {
              $push: [
                {
                  start: this.state.currentSelection.start_index,
                  end: this.state.currentSelection.final_index,
                  word: this.state.currentSelection.word,
                },
              ],
            },
          },
        })
      );
    } else {
      this.setState(
        update(this.state, {
          tooltip: {
            show: { $set: false },
          },
        })
      );
    }
    window.getSelection().empty();
  }

  onPasteEvent(e) {
    // Get the copied text from the clipboard
    let pastedText = e.clipboardData.getData("text");

    // Save/Set the copied text to the component state
    this.setState({
      text: pastedText,
    });
    e.preventDefault();
  }

  onDismiss(e) {
    // Dismiss the tooltip by pressing the escape key or clicking outside of it
    if (
      (this.tooltipRef.current &&
        !this.tooltipRef.current.contains(e.target)) ||
      e.key === "Escape"
    ) {
      window.getSelection().empty();
      this.setState(
        update(this.state, {
          tooltip: {
            show: { $set: false },
            positionX: { $set: 0 },
            positionY: { $set: 0 },
          },
        })
      );
    }
  }

  onSelectedEvent(e) {
    // Check if anything is selected
    const selection = window.getSelection();
    if (!selection.rangeCount) return false;
    if (selection.type !== "Range") return false;

    // Get the indexes and text from the Selection.

    let start_idx = selection.anchorOffset;
    let final_idx = selection.focusOffset;
    const selectedText = selection.toString();

    // Remarks: Anchor and focus should not be confused with the start and end positions
    // of a selection. The anchor can be placed before the focus or vice-versa,
    // depending on the direction you made your selection.

    if (start_idx > final_idx) {
      [start_idx, final_idx] = [final_idx, start_idx];
    }

    // Show tooltip if some text is selected
    // Set the selection to a temporary value
    this.setState(
      update(this.state, {
        tooltip: {
          show: { $set: true },
          positionX: { $set: e.clientX },
          positionY: { $set: e.clientY },
        },
        currentSelection: {
          start_index: { $set: start_idx },
          final_index: { $set: final_idx },
          word: { $set: selectedText },
        },
      })
    );
  }

  // When component mount, add the necessary event listeners
  componentDidMount() {
    window.addEventListener("mouseup", this.onSelectedEvent);
    window.addEventListener("mousedown", this.onDismiss);
    window.addEventListener("keydown", this.onDismiss);
    window.addEventListener("paste", this.onPasteEvent);
  }
  // When component unmount, remove the listeners
  componentWillUnmount() {
    window.removeEventListener("mouseup", this.onSelectedEvent);
    window.removeEventListener("paste", this.onPasteEvent);
    window.removeEventListener("mousedown", this.onDismiss);
    window.removeEventListener("keydown", this.onDismiss);
  }

  render() {
    return (
      <main className="main-content">
        <h1 className="not-selectable">Low Budget Anotator!</h1>
        <div className="side-by-side">
          <div className="text-container">
            <div className="text-content">
              <span className="text-span">{this.state.text}</span>
            </div>
          </div>
          <Tags tags={this.state.tags} mapper={this.wordMapper}></Tags>
        </div>
        <Buttons
          onSaveSession={this.onSaveSesstion}
          onClearText={this.onClearText}
        ></Buttons>

        <Tooltip
          tooltipRef={this.tooltipRef}
          setTag={this.onSetTag}
          tooltip={this.state.tooltip}
        ></Tooltip>
      </main>
    );
  }
}
