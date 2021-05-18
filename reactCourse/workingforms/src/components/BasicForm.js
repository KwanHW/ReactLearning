import useInput from '../hooks/use-input';

const BasicForm = (props) => {
  const {
    value: fnameVal,
    isValid: fnameIsValid,
    hasError: fnameHasError,
    valInputHandler: fnameOnChange,
    valInputBlurHandler: fnameOnBlur,
    reset: fNameReset,
  } = useInput((value) => value.trim() !== '');

  const {
    value: lnameVal,
    isValid: lnameIsValid,
    hasError: lnameHasError,
    valInputHandler: lnameOnChange,
    valInputBlurHandler: lnameOnBlur,
    reset: lNameReset,
  } = useInput((value) => value.trim() !== '');

  const {
    value: emailVal,
    isValid: emailIsValid,
    hasError: emailHasError,
    valInputHandler: emailOnChange,
    valInputBlurHandler: emailOnBlur,
    reset: emailReset,
  } = useInput((value) => value.includes('@'));

  const formSubmitHandler = (e) => {
    e.preventDefault();

    if (!fnameIsValid && !lnameIsValid && !emailIsValid) {
      return;
    }

    console.log(fnameVal, lnameVal, emailVal);
    fNameReset();
    lNameReset();
    emailReset();
  }
  
  const formIsValid = fnameIsValid && lnameIsValid && emailIsValid;
  const fNameClasses = fnameHasError ? 'form-control invalid' : 'form-control';
  const lNameClasses = lnameHasError ? 'form-control invalid' : 'form-control';
  const emailClasses = emailHasError ? 'form-control invalid' : 'form-control';

  return (
    <form onSubmit={formSubmitHandler}>
      <div className='control-group'>
        <div className={fNameClasses}>
          <label htmlFor='name'>First Name</label>
          <input type='text' id='name' onChange={fnameOnChange} onBlur={fnameOnBlur} value={fnameVal}/>
        </div>
        <div className={lNameClasses}>
          <label htmlFor='name'>Last Name</label>
          <input type='text' id='name' onChange={lnameOnChange} onBlur={lnameOnBlur} value={lnameVal}/>
        </div>
      </div>
      <div className={emailClasses}>
        <label htmlFor='name'>E-Mail Address</label>
        <input type='text' id='name' onChange={emailOnChange} onBlur={emailOnBlur} value={emailVal}/>
      </div>
      <div className='form-actions'>
        <button disabled={!formIsValid}>Submit</button>
      </div>
    </form>
  );
};

export default BasicForm;
