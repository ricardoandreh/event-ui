import { useDispatch, useSelector } from "react-redux";
import { fetchToken, logout, selectAuth } from "../redux/authSlice";

const Login = () => {
  const dispatch = useDispatch();
  const auth = useSelector(selectAuth);

  function login(formData) {
    const email = formData.get("email");
    const password = formData.get("password");
    
    dispatch(fetchToken({ email, password }));
  }

  return auth.token ? (
    <section>
      <form action={() => dispatch(logout())}>
        <h3>
          Desejar Sair?
        </h3>
        <button type="submit">Log out</button>
      </form>
    </section>
  ) : (
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
