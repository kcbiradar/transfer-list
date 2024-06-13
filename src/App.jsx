import React, { useState } from 'react';

function App() {
  const [state, setState] = useState({
    leftArray: ["React", "HTML", "Vue", "CSS"],
    rightArray: ["Angular", "TS", "JS", "Svelte"],
    isLeftSelected: false,
    isRightSelected: false
  });

  function handleRight() {
    const selectedOptions = state.leftArray.filter((option, index) => document.getElementById(`leftCheckbox${index}`).checked);
    setState(prevState => ({
      leftArray: prevState.leftArray.filter(option => !selectedOptions.includes(option)),
      rightArray: prevState.rightArray.concat(selectedOptions),
      isLeftSelected: false,
    }));
    clearLeftCheckboxes();
  }

  function handleLeft() {
    const selectedOptions = state.rightArray.filter((option, index) => document.getElementById(`rightCheckbox${index}`).checked);
    setState(prevState => ({
      leftArray: prevState.leftArray.concat(selectedOptions),
      rightArray: prevState.rightArray.filter(option => !selectedOptions.includes(option)),
      isRightSelected: false,
    }));
    clearRightCheckboxes();
  }

  function handleMoveAllRight() {
    setState(prevState => ({
      leftArray: [],
      rightArray: [...prevState.rightArray, ...prevState.leftArray],
      isLeftSelected: false,
    }));
    clearLeftCheckboxes();
  }

  function handleMoveAllLeft() {
    setState(prevState => ({
      leftArray: [...prevState.leftArray, ...prevState.rightArray],
      rightArray: [],
      isRightSelected: false,
    }));
    clearRightCheckboxes();
  }

  function handleLeftCheckboxChange() {
    const anyLeftChecked = state.leftArray.some((option, index) => document.getElementById(`leftCheckbox${index}`).checked);
    setState(prevState => ({
      ...prevState,
      isLeftSelected: anyLeftChecked,
    }));
  }

  function handleRightCheckboxChange() {
    const anyRightChecked = state.rightArray.some((option, index) => document.getElementById(`rightCheckbox${index}`).checked);
    setState(prevState => ({
      ...prevState,
      isRightSelected: anyRightChecked,
    }));
  }

  function clearLeftCheckboxes() {
    state.leftArray.forEach((option, index) => {
      document.getElementById(`leftCheckbox${index}`).checked = false;
    });
  }

  function clearRightCheckboxes() {
    state.rightArray.forEach((option, index) => {
      document.getElementById(`rightCheckbox${index}`).checked = false;
    });
  }

  return (
    <>
      <h2>Transfer List</h2>
      <div className='container'>
        <section className='left-section'>
          {state.leftArray.map((each_option, index) => (
            <div key={index}>
              <label htmlFor={`leftCheckbox${index}`}>
                <input id={`leftCheckbox${index}`} type='checkbox' onChange={handleLeftCheckboxChange} />
                {each_option}
              </label>
            </div>
          ))}
        </section>
        <section className='manage-section'>
          <button onClick={handleMoveAllRight} disabled={state.leftArray.length === 0}> &gt;&gt; </button>
          <br />
          <button onClick={handleRight} disabled={!state.isLeftSelected}> &gt; </button>
          <br />
          <button onClick={handleLeft} disabled={!state.isRightSelected}> &lt; </button>
          <br />
          <button onClick={handleMoveAllLeft} disabled={state.rightArray.length === 0}> &lt;&lt; </button>
        </section>
        <section className='right-section'>
          {state.rightArray.map((each_option, index) => (
            <div key={index}>
              <label htmlFor={`rightCheckbox${index}`}>
                <input id={`rightCheckbox${index}`} type='checkbox' onChange={handleRightCheckboxChange} />
                {each_option}
              </label>
            </div>
          ))}
        </section>
      </div>
    </>
  );
}

export default App;
