import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { logIn, signInWithGoogle, auth } from "../../../firebase/firebaseconfig.js";
import { useAuthState } from "react-firebase-hooks/auth";
import "./SignIn.scss";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, loading] = useAuthState(auth);

  const navigate = useNavigate();

  const checkDetails = (e: any) => {
    e.preventDefault();
    logIn(email, password);
  };

  useEffect(() => {
    if (loading) {
      return;
    }
    if (user) {
      navigate("/");
    }
  }, [user, loading]);
  
  return (
    <div className="temp">
      <div className="split-left">
        <div className="signin">
          <form className="form-signin" onSubmit={checkDetails}>
            <label>Sign In</label>
            <div className="field">
              <input
                type="email"
                id="inputEmail"
                className="form-control"
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <label>EMAILADRESS</label>
            </div>
            <div className="field">
              <input
                type="password"
                id="inputPassword"
                className="form-control"
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <div className="field">
                <input type="submit" value="Login"/>
              </div>
              <label>PASSWORD</label>
            </div>
            <div className="content">
              <input type="checkbox" />
              <label>Remember me</label>
            </div>
            <div className="pass-link">
              <a onClick={(e) => navigate("/resetpassword")}>Forgot password?</a>
            </div>
          </form>
          <input
            type="submit"
            className="google-signin-button"
            value="Continue with Google"
            onClick={(e) => signInWithGoogle()}
          />
        </div>
        </div>
        <div className="split right">
          <div className="signup-side">
            <div className="signup-link">
              <label>Don't have an account?</label>
              <input type="submit" value="Sign Up" onClick={(e) => navigate("/signup")}/>
            </div>
          </div>
        </div>
    </div>
  );
};

export default SignIn;
