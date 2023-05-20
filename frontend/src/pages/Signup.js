import { useRef } from 'react';

// redux
import { useDispatch, useSelector } from 'react-redux'
import { signup } from '../store/auth/authSlice';

const Signup = () => {
  const dispatch = useDispatch();


  const emailRef = useRef();
  const passwordRef = useRef();
  const { loading , error } = useSelector(state => state.auth)
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    const json = await dispatch(signup({ email: emailRef.current.value, password: passwordRef.current.value }));
    console.log(json);
  };

  return (
    <form className="signup" onSubmit={handleSubmit}>
      <h3>Sign Up</h3>
      <label>Email: </label>
      <input 
        type="email" 
        ref={emailRef}/>
      <label>Password: </label>
      <input 
        type="password" 
        ref={passwordRef}/>
      <button disabled={ loading }>Sign Up</button>
      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default Signup