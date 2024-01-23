import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { setAuth } from "../../store/slices/AuthorizationSlice";
import Search from "../../components/common/Search/Search";
import {
  useLoginUserMutation,
  useRegistrationUserMutation,
} from "../../serviceQuery/auth";
import s from "./Auth.module.css";
import Input from "../../components/UI/Input/Input";
import Button from "../../components/UI/Button/Button";
import Footer from "../../components/common/Footer/Footer";

export default function Auth() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const isLogin = pathname === "/auth";
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [city, setCity] = useState("");
  const [loginUser] = useLoginUserMutation();
  const [registrationUser] = useRegistrationUserMutation();

  const checkInputs = () => {
    const pattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!email || !password) {
      toast.error("Введите логин или пароль", { className: s.error });
      return;
    }
    if (!isLogin && !repeatPassword) {
      toast.error("Вы не подтвердили пароль!", { className: s.error });
      return;
    }
    if (!isLogin && email && !pattern.test(email.toLowerCase())) {
      toast.error("Введите корректный email", { className: s.error });
      return;
    }
    if (password.length < 6 && !isLogin) {
      toast.error("Длина пароля должна быть не менее 6  символов", {
        className: s.error,
      });
      return;
    }

    if (isLogin) {
      handleLogin();
    } else {
      handleRegister();
    }
  };

  const handleLogin = async () => {
    try {
      const response = await loginUser({
        email: email,
        password: password,
      });

      if (response.error?.data.detail === "Incorrect email") {
        toast.error("Пользователя с таким email не существует", {
          className: s.error,
        });
        return;
      }
      if (response.error?.data?.detail === "Incorrect password") {
        toast.error("Введен неправильный пароль", { className: s.error });
        return;
      }

      dispatch(
        setAuth({
          access: response.data.access_token,
          refresh: response.data.refresh_token,
        })
      );
      navigate("/profile");
    } catch (currentError) {
      console.log(currentError);

      toast.error(currentError.message, { className: s.error });
    }
  };

  const handleRegister = async () => {
    if (password !== repeatPassword) {
      toast.error("Пароли не совпадают", { className: s.error });
    } else {
      try {
        const regRes = await registrationUser({
          email: email,
          password: password,
          name,
          surname,
          city,
        });

        if (regRes.error?.data?.details) {
          toast.error("Пользователь с таким email уже зарегистрирован", {
            className: s.error,
          });
          return;
        }

        const response = await loginUser({
          email: email,
          password: password,
        });

        dispatch(
          setAuth({
            access: response.data.access_token,
            refresh: response.data.refresh_token,
          })
        );

        navigate("/profile");
      } catch (currentError) {
        toast.error(currentError.message, { className: s.error });
      }
    }
  };

  return (
    <div className={s.wrapper}>
      <div className={s.containerEnter}>
        <div className={s.pageWrapper}>
          <Search />
        </div>
        <div className={s.modalBlock}>
          <form className={s.modalFormLogin} id="formLogIn">
            <Link to="/">
              {" "}
              <div className={s.logo}>
                <img src="../img/logo_modal.png" alt="logo" />
              </div>
            </Link>

            <div className={s.wrapperInput}>
              <div>
                <Input
                  classes="input"
                  type="email"
                  name="login"
                  placeholder="email"
                  autoComplete="true"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                />
              </div>

              <div>
                <Input
                  classes="input"
                  type="password"
                  name="password"
                  placeholder="Пароль"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                />
              </div>

              {!isLogin && (
                <>
                  <div>
                    <Input
                      classes="input"
                      type="password"
                      name="repeatPassword"
                      placeholder="Повторите пароль"
                      value={repeatPassword}
                      onChange={(e) => {
                        setRepeatPassword(e.target.value);
                      }}
                    />
                  </div>
                  <Input
                    classes="input"
                    type="text"
                    name="name"
                    placeholder="Имя (необязательно)"
                    onChange={(e) => {
                      setName(e.target.value);
                    }}
                  />
                  <Input
                    classes="input"
                    type="text"
                    name="name"
                    placeholder="Фамилия (необязательно)"
                    onChange={(e) => {
                      setSurname(e.target.value);
                    }}
                  />
                  <Input
                    classes="input"
                    type="text"
                    name="city"
                    placeholder="Город (необязательно)"
                    onChange={(e) => {
                      setCity(e.target.value);
                    }}
                  />
                </>
              )}
            </div>

            <Button classes="btnEnter" onClick={() => checkInputs()}>
              {isLogin ? "Войти" : "Зарегистрироваться"}
            </Button>
            <Button
              classes="btnSignup"
              onClick={() => {
                if (isLogin) {
                  navigate("/registration");
                } else {
                  navigate("/auth");
                }
              }}
            >
              {!isLogin ? "Войти" : "Зарегистрироваться"}
            </Button>
          </form>
        </div>
        <Footer />
      </div>
    </div>
  );
}
