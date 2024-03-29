import React, { useState } from "react";

import { useNavigate } from "react-router-dom";
import styles from "./Login.module.scss";
import Input from "../../components/Input/Input";
import Button from "../../components/Buton/Button";

import { ReactComponent as View } from "../../assets/icons/view.svg";
import { ReactComponent as ViewOff } from "../../assets/icons/view-off.svg";

import useAuth from "../../hooks/useAuth";
import useStateProvider from "../../hooks/useStateProvider";

import { login } from "../../api/API";

const Login = () => {
  const { setUser, setUserId, rememberMe, setRememberMe } = useAuth();

  const { setAlert } = useStateProvider();

  const navigate = useNavigate();

  // const { setUser } = useAuth();
  const [passwordShown, setPasswordShown] = useState(true);

  // form values
  const [email, setEmail] = useState("vasile.popescu@example.com"); // ""
  const [pwd, setPwd] = useState("parola123"); // ""

  // error states
  const [emailError, setEmailError] = useState(""); // null
  const [pwdError, setPwdError] = useState(""); // null

  const handleEmailError = (e) => {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
    if (reg.test(e) === false) {
      setEmailError("Invalid e-mail address!");
    } else {
      setEmailError("");
    }
  };


  const handlePwdError = (e) => {
    if (e.length < 7) {
      setPwdError("Parola trebuie sa fie de cel putin 7 caractere!");
    } else setPwdError("");
  };

  const handleLogin = async () => {
    try {
      if (emailError === "" && pwdError === "") {
        if (pwd.length > 6) {
          console.log(email, pwd);
          const response = await login(email, pwd);
          if (response) {
            setUser(response.data);
            navigate("/");
            if (rememberMe) localStorage.setItem("userID", response?.data.idUtilizator);
            else sessionStorage.setItem("userID", response?.data.idUtilizator);
            setAlert({
              type: "success",
              message: "Login successfully",
            });
          }
        }
      } else {
        if (emailError !== "") handleEmailError("");
        if (pwdError !== "") handlePwdError("");
        setAlert({
          type: "danger",
          message: "Fill all the required fields correctly.",
        });
      }
    } catch (error) {
      console.log(error, "error");
      setAlert({
        type: "danger",
        message: "Something went wrong! Check your credentials",
      });
    }
  };

  const passToggleHandler = () => {
    setPasswordShown(!passwordShown);
  };

  return (
    <div className={styles.auth}>
      <div className={styles.containerAuth}>
        <div className={styles.contentContainerForm}>
          <div className={styles.form}>
            <div className={styles.formTitle}>
              <h4 className={styles.title}>Autentificare</h4>
              <p className={styles.subTitle}>Introdu datele contului.</p>
            </div>

            <div className={styles.formInput}>
              {/* email */}
              {emailError && <div className={styles.authError}>{emailError}</div>}
              <Input
                label="Email"
                id="email"
                name="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  handleEmailError(e.target.value);
                }}
                type="email"
                placeholder={"Email"}
                required
              />

              {/* password */}
              {pwdError && <div className={styles.authError}>{pwdError}</div>}
              <Input
                label="Parola"
                id="password"
                name="password"
                value={pwd}
                onChange={(e) => {
                  setPwd(e.target.value);
                  handlePwdError(e.target.value);
                }}
                type={passwordShown ? "password" : "text"}
                placeholder={"Parola"}
                icon={passwordShown ? <View /> : <ViewOff />}
                onIconClick={passToggleHandler}
                required
              />
            </div>
          </div>

          <div className={styles.rememberMe}>
            <div
              className={styles.checkBox}
              type="button"
              onClick={(e) => setRememberMe(!rememberMe)}
            >
              <Input
                type="checkbox"
                label=""
                value={rememberMe}
                checked={rememberMe}
                onClick={(e) => setRememberMe(!rememberMe)}
              />
              <p className={styles.textRememberMe}>Ține-mă minte!</p>
            </div>

            <div className={styles.forgotPassword}>
              <span
                className={styles.textForgotPassword}
                onClick={() => {
                  navigate("/forgot-password");
                }}
              >
                Ai uitat parola?
              </span>
            </div>
          </div>
        </div>

        <div className={styles.contentContainerAuthOptions}>
          <div className={styles.contentContainerButtons}>
            <Button variant="primary" label="Conectare" onClick={handleLogin} />
          </div>
          <div className={`${styles.contentContainerAuthEndForm} ${styles.authRegister}`}>
            <div className={styles.textAuthEndForm}>
              Nu aveti cont?{" "}
              <span
                className={styles.textAuthEndForm}
                onClick={() => {
                  navigate("/register");
                }}
              >
                Inregistrare
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;