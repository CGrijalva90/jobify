import { useState, useEffect } from "react";
import Wrapper from "../assets/wrappers/RegisterPage";
import { Logo, FormRow, Alert } from "../components";
import { useAppContext } from "../context/appContext";
import { useNavigate } from "react-router-dom";

const initialState = {
  name: "",
  email: "",
  password: "",
  isMember: true,
};

const Register = () => {
  const navigate = useNavigate();
  const [values, setValues] = useState(initialState);
  const { isLoading, showAlert, displayAlert, user, setupUser } =
    useAppContext();

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const { name, email, password, isMember } = values;
    if (!email || !password || (!isMember && !name)) {
      displayAlert();
      return;
    }
    const currentUser = { name, email, password };
    if (isMember) {
      setupUser({
        currentUser,
        endpoint: "login",
        alertText: "Login Successful! Redirecting...",
      });
    } else {
      console.log(`Current user: ${currentUser}`);
      setupUser({
        currentUser,
        endpoint: "register",
        alertText: "User Created! Redirecting...",
      });
    }
  };

  const toggleMember = () => {
    setValues({ ...values, isMember: !values.isMember });
  };

  useEffect(() => {
    if (user) {
      setTimeout(() => {
        navigate("/");
      }, 3000);
    }
  }, [user, navigate]);

  return (
    <Wrapper className="full-page">
      <form className="form" onSubmit={onSubmit}>
        <Logo />
        <h3>{!values.isMember ? "Register" : "Login"}</h3>

        {showAlert && <Alert />}
        {/* name input */}
        {!values.isMember && (
          <FormRow
            name="name"
            type={"text"}
            value={values.name}
            handleChange={handleChange}
          />
        )}

        <FormRow
          name="email"
          type={"email"}
          value={values.email}
          handleChange={handleChange}
        />
        <FormRow
          name="password"
          type={"password"}
          value={values.password}
          handleChange={handleChange}
        />
        <button type="submit" className="btn btn-block" disabled={isLoading}>
          submit
        </button>
        <p>
          {values.isMember ? "Not a member yet?" : "Already a member?"}
          <button type="button" onClick={toggleMember} className="member-btn">
            {values.isMember ? "Register" : "Login"}
          </button>
        </p>
      </form>
    </Wrapper>
  );
};

export default Register;
