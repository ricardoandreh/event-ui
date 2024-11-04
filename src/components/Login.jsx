import { useDispatch, useSelector } from "react-redux";
// import { Redirect } from "react-router-dom";
import { fetchToken, selectAuth } from "../redux/authSlice";

const Login = () => {
  const dispatch = useDispatch();
  const auth = useSelector(selectAuth)

  function login(formData) {
    const email = formData.get("email");
    const password = formData.get("password");
    
    console.info(email, password);
    dispatch(fetchToken({ email, password }));
  };

  // return auth.token ? <Redirect to="/"/> 
  
  return (
    <section>
      <form action={login}>
        <label>
          Email
          <input type="text" name="email" />
        </label>
        <label>
          Password
          <input type="password" name="password" />
        </label>
        <button type="submit">Log in</button>
      </form>
    </section>
  );
};

export default Login;
