import React, { useState } from "react";

function App() {
  const [state, setState] = useState({
    leftItems: { React: false, HTML: false, Vue: false, CSS: false },
    rightItems: { Angular: false, TS: false, JS: false, Svelte: false },
  });

  function moveItems(check) {
    if (check) {
      const newList1 = { ...state.leftItems, ...state.rightItems };
      setState({
        leftItems: newList1,
        rightItems: {},
      });
    } else {
      const newList2 = { ...state.rightItems, ...state.leftItems };
      setState({
        leftItems: {},
        rightItems: newList2,
      });
    }
  }

  function toggleItems(check) {
    let leftItems2, rightItems2;
    if (check) {
      const checkedItems = {};
      const nonCheckedItems = {};

      for (const [key, value] of Object.entries(state.rightItems)) {
        if (value) {
          checkedItems[key] = false;
        } else {
          nonCheckedItems[key] = value;
        }
      }

      leftItems2 = { ...state.leftItems, ...checkedItems };
      rightItems2 = nonCheckedItems;
    } else {
      const checkedItems = {};
      const nonCheckedItems = {};

      for (const [key, value] of Object.entries(state.leftItems)) {
        if (value) {
          checkedItems[key] = false;
        } else {
          nonCheckedItems[key] = value;
        }
      }

      leftItems2 = nonCheckedItems;
      rightItems2 = { ...state.rightItems, ...checkedItems };
    }
    setState({
      leftItems: leftItems2,
      rightItems: rightItems2,
    });
  }

  function check(items) {
    return Object.values(items).some((value) => value === true);
  }

  const leftDisable = Object.keys(state.leftItems).length;
  const rightDisable = Object.keys(state.rightItems).length;

  return (
    <>
      <h2>Transfer List</h2>
      <div className="container">
        <section className="left-section">
          {Object.keys(state.leftItems).map((item) => (
            <label key={item}>
              <input
                checked={state.leftItems[item]}
                type="checkbox"
                onChange={() => {
                  setState((prevState) => ({
                    leftItems: {
                      ...prevState.leftItems,
                      [item]: !prevState.leftItems[item],
                    },
                    rightItems: { ...prevState.rightItems },
                  }));
                }}
              />
              {item}
            </label>
          ))}
        </section>
        <section className="manage-section">
          <button onClick={() => moveItems(true)} disabled={rightDisable <= 0}> &lt;&lt; </button>
          <br />
          <button onClick={() => toggleItems(true)} disabled={!check(state.rightItems)}> &lt; </button>
          <br />
          <button onClick={() => toggleItems(false)} disabled={!check(state.leftItems)} > &gt; </button>
          <br />
          <button onClick={() => moveItems(false)} disabled={leftDisable <= 0}> &gt;&gt; </button>
        </section>
        <section className="right-section">
          {Object.keys(state.rightItems).map((item) => (
            <label key={item}>
              <input
                checked={state.rightItems[item]}
                type="checkbox"
                onChange={() => {
                  setState((prevState) => ({
                    leftItems: { ...prevState.leftItems },
                    rightItems: {
                      ...prevState.rightItems,
                      [item]: !prevState.rightItems[item],
                    },
                  }));
                }}
              />
              {item}
            </label>
          ))}
        </section>
      </div>
    </>
  );
}

export default App;
