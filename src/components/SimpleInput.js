import { useState } from "react";

const SimpleInput = (props) => {
  const [enteredName, setEnteredName] = useState("");
  const [enteredNameTouched, setEnteredNameTouched] = useState(false);
  // const [formIsVaild, setFormIsVaild] = useState(false); 얘를 state로 사용하지 않고 그냥 불리언 값으로 사용한다

  const [enteredEmail, setEnteredEmail] = useState("");
  const [enteredEmailTouched, setEnteredEmailTouched] = useState(false);

  const enteredNameValid = enteredName.trim() !== "";
  const nameInputIsValid = !enteredNameValid && enteredNameTouched;
  // 네임벨리드가 false면 네임터치드가 true일 때 이 상상수의 값을 true로 만듬.

  const enteredEmailVaild = enteredEmail.includes("@");
  const emailInputIsValid = !enteredEmailVaild && enteredEmailTouched;

  let formIsValid = false;

  // useEffect(() => {
  if (enteredNameValid && enteredEmail) {
    // 여기에 다른 Vaild상태를 전부 곱연산자로 체크함
    formIsValid = true;
    // 모든 인풋이 유효한 상태일 때, formIsValid를 true로 세팅함.
  }
  // else {formIsValid = false;} 있어도 그만 없어도 그만임
  // }, [enteredNameValid]);
  // useEffect를 사용해도 되지만 없어도 됨 = 결과적으로 낭비

  const nameInputChangeHandler = (e) => {
    setEnteredName(e.target.value);
  };
  const emailInputChangeHandler = (e) => {
    setEnteredEmail(e.target.value);
  };

  const nameBlurHandler = (e) => {
    setEnteredNameTouched(true);
  };
  const emailBlurHandler = (e) => {
    setEnteredEmailTouched(true);
  };

  const submitHanlder = (e) => {
    e.preventDefault();

    setEnteredNameTouched(true);

    if (!enteredNameValid) {
      return;
    }

    setEnteredName("");
    setEnteredEmail("");
    setEnteredNameTouched(false);
    console.log(enteredName);
    // setEnteredName(inputRef.current.value);
    // console.log(enteredName);
    // 키를 입력할 떄 마다(enteredName이 set될 때 마다) 피드백을 보내고 싶을 땐 state를 사용하고
    // const enteredValue = inputRef.current.value;
    // console.log(enteredValue);
    // 서브밋이 발생했을 때만 피드백을 보내고 싶다면, useRef를 사용하는 것이 편할 것이다.
    // 서브밋 후 입력창이 초기화 되는 것을 원한다면 state를 사용하는 게 더 좋은 선택이다.
  };

  const nameInputClass = nameInputIsValid
    ? "form-control invalid"
    : "form-control";

  const emailInputClass = emailInputIsValid
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
          onChange={nameInputChangeHandler}
          onBlur={nameBlurHandler}
        />
        {nameInputIsValid && (
          <p className="error-text">입력한 값이 유효하지 않아요</p>
        )}
      </div>
      <div className={emailInputClass}>
        <label htmlFor="name">Your Email</label>
        <input
          type="text"
          id="email"
          minLength={5}
          value={enteredEmail}
          onChange={emailInputChangeHandler}
          onBlur={emailBlurHandler}
        />
        {emailInputIsValid && (
          <p className="error-text">입력한 값이 유효하지 않아요</p>
        )}
      </div>
      <div className="form-actions">
        <button disabled={!formIsValid} onClick={() => console.log("클릭!")}>
          {/* 온클릭 이벤트는 disabled가 제대로 작동되는지 확인하기위해 잠깐 써놓음 */}
          Submit
        </button>
      </div>
    </form>
  );
};

export default SimpleInput;
