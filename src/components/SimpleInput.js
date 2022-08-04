import { useRef, useState } from "react";

const SimpleInput = (props) => {
  const [enteredName, setEnteredName] = useState("");
  const [enteredNameValid, setEnteredNameValid] = useState(false);
  const [enteredNameTouched, setEnteredNameTouched] = useState(false);
  const inputRef = useRef();

  const nameInputChangeHandler = (e) => {
    setEnteredName(e.target.value);
    setEnteredNameTouched(true);
    console.log(enteredName);
    if (enteredName.trim().length <= 4) {
      setEnteredNameValid(true);
    }
  };

  const submitHanlder = (e) => {
    e.preventDefault();

    setEnteredNameTouched(true);

    if (enteredName.trim().length < 4) {
      setEnteredNameValid(false);
      return;
    }
    setEnteredNameValid(true);

    setEnteredName("");

    // setEnteredName(inputRef.current.value);
    // console.log(enteredName);
    // 키를 입력할 떄 마다(enteredName이 set될 때 마다) 피드백을 보내고 싶을 땐 state를 사용하고
    // const enteredValue = inputRef.current.value;
    // console.log(enteredValue);
    // 서브밋이 발생했을 때만 피드백을 보내고 싶다면, useRef를 사용하는 것이 편할 것이다.
    // 서브밋 후 입력창이 초기화 되는 것을 원한다면 state를 사용하는 게 더 좋은 선택이다.
  };

  const nameInputIsValid = !enteredNameValid && enteredNameTouched;

  const nameInputClass = nameInputIsValid
    ? "form-control invalid"
    : "form-control";

  return (
    <form onSubmit={submitHanlder}>
      <div className={nameInputClass}>
        <label htmlFor="name">Your Name</label>
        <input
          type="text"
          id="name"
          ref={inputRef}
          value={enteredName}
          onChange={nameInputChangeHandler}
        />
        {nameInputIsValid && (
          <p className="error-text">입력한 값이 유효하지 않아요</p>
        )}
      </div>
      <div className="form-actions">
        <button>Submit</button>
      </div>
    </form>
  );
};

export default SimpleInput;
