import { useRef } from 'react';

// redux 
import { useDispatch, useSelector } from 'react-redux'
import { login } from '../store/auth/authSlice'

const Login = () => {
  const dispatch = useDispatch();
  const {loading, error} = useSelector(state => state.auth);

  const emailRef = useRef();
  const passwordRef = useRef();
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    await dispatch(login({email: emailRef.current.value, password: passwordRef.current.value}))
  };

  return (
    <form className="login" onSubmit={handleSubmit}>
      <h3>Log In</h3>
      <label>Email: </label>
      <input 
        type="email" 
        ref={emailRef}/>
      <label>Password: </label>
      <input 
        type="password" 
        ref={passwordRef}/>
      <button disabled={ loading }>Log In</button>
      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default Login