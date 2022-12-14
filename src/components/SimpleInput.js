import { useState } from "react";
import useInput from "../hooks/use-input";

const SimpleInput = (props) => {
  const {
    value: enteredName,
    isValid: enteredNameValid,
    hasError: nameInputHasError,
    valueChangeHandler: nameChangeHandler,
    InputBlurHandler: nameBlurHandler,
    reset: resetNameInput,
  } = useInput((value) => value.trim() !== "");

  const [enteredEmail, setEnteredEmail] = useState("");
  const [enteredEmailTouched, setEnteredEmailTouched] = useState(false);

  const enteredEmailVaild = enteredEmail.includes("@");
  const emailInputIsInValid = !enteredEmailVaild && enteredEmailTouched;

  let formIsValid = false;
  // 이 값에 따라 버튼의 disabled값이 변함.

  if (enteredNameValid && enteredEmailVaild) {
    // 여기에 다른 Vaild상태를 전부 곱연산자로 체크함
    formIsValid = true;
    // 모든 인풋이 유효한 상태일 때, formIsValid를 true로 세팅함.
  }
  // else {formIsValid = false;} state가 아니라 그냥 값으로 사용하고 있기 때문에 없어도 됨

  const emailInputChangeHandler = (e) => {
    setEnteredEmail(e.target.value);
  };
  // input이 받은 target.value를 각값의 상태로 만듬

  const emailBlurHandler = (e) => {
    setEnteredEmailTouched(true);
  };
  // blur되었을 때 상태에 변화를 주기 위함

  const submitHanlder = (e) => {
    e.preventDefault();
    // setEnteredNameTouched(true);
    // if (!enteredNameValid) {
    //   return;
    // }
    // 버튼의 disabled를 제어하고 있기 때문에 필요 없다.

    // setEnteredName("");
    // setEnteredNameTouched(false);
    resetNameInput();
    setEnteredEmail("");
    setEnteredEmailTouched(false);
    console.log(`name ${enteredName} , email ${enteredEmail}`);
    // setEnteredName(inputRef.current.value);
    // console.log(enteredName);
    // 키를 입력할 떄 마다(enteredName이 set될 때 마다) 피드백을 보내고 싶을 땐 state를 사용하고
    // const enteredValue = inputRef.current.value;
    // console.log(enteredValue);
    // 서브밋이 발생했을 때만 피드백을 보내고 싶다면, useRef를 사용하는 것이 편할 것이다.
    // 서브밋 후 입력창이 초기화 되는 것을 원한다면 state를 사용하는 게 더 좋은 선택이다.
  };

  const nameInputClass = nameInputHasError
    ? "form-control invalid"
    : "form-control";

  const emailInputClass = emailInputIsInValid
    ? "form-control invalid"
    : "form-control";

  return (
    <form onSubmit={submitHanlder}>
      <div className={nameInputClass}>
        <label htmlFor="name">Your Name</label>
        <input
          type="text"
          id="name"
          minLength={5}
          value={enteredName}
          onChange={nameChangeHandler}
          onBlur={nameBlurHandler}
        />
        {nameInputHasError && (
          <p className="error-text">입력한 값이 유효하지 않아요</p>
        )}
      </div>
      <div className={emailInputClass}>
        <label htmlFor="email">Your Email</label>
        <input
          type="text"
          id="email"
          minLength={5}
          value={enteredEmail}
          onChange={emailInputChangeHandler}
          onBlur={emailBlurHandler}
        />
        {emailInputIsInValid && (
          <p className="error-text">입력한 값이 유효하지 않아요</p>
        )}
      </div>
      <div className="form-actions">
        <button disabled={!formIsValid}>Submit</button>
      </div>
    </form>
  );
};

export default SimpleInput;
