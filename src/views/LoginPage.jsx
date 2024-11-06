import { useCallback } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { fetchToken, logout, selectAuth } from "../redux/auth/authSlice";

export default function Login() {
  const dispatch = useDispatch();
  const auth = useSelector(selectAuth);

  const login = useCallback((formData) => {
    const email = formData.get("email");
    const password = formData.get("password");

    toast.promise(dispatch(fetchToken({ email, password })).unwrap(), {
      loading: "Logando...",
      error: "Não foi possível logar",
    });
  }, []);

  return auth.token ? (
    <section>
      <form action={() => dispatch(logout())}>
        <h2>Deseja sair?</h2>

        {/* From Uiverse.io by Lealdos */}
        <button type="submit" className="button">
          <div className="sign">
            <svg viewBox="0 0 512 512">
              <path d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z"></path>
            </svg>
          </div>

          <div className="text">Logout</div>
        </button>
      </form>
    </section>
  ) : (
    <section>
      <Toaster />

      <form action={login} className="form">
        <div className="title">
          Event UI
          <br />
          <span>log in to continue</span>
        </div>
        <input
          type="email"
          placeholder="Email"
          name="email"
          className="input"
        />
        <input
          type="password"
          placeholder="Password"
          name="password"
          className="input"
        />
        <button className="button-confirm">Log in &rarr;</button>
      </form>

      {/* From Uiverse.io by G4b413l */}
      {auth.isPending && (
        <div className="newtons-cradle">
          <div className="newtons-cradle__dot"></div>
          <div className="newtons-cradle__dot"></div>
          <div className="newtons-cradle__dot"></div>
          <div className="newtons-cradle__dot"></div>
        </div>
      )}
    </section>
  );
}
