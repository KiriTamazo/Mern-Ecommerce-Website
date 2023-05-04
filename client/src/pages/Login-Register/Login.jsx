import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import InputField from "../../components/InputField/InputField";
import "./Login-Register.scss";
import { Link, useNavigate } from "react-router-dom";
import apiRequest from "../../ultis/apiRequest";
import HelperPopup from "../../components/Popup/Popup";
const loginSchema = yup
  .object()
  .shape({
    email: yup.string().email().required("Email is required"),
    password: yup
      .string()
      .min(8, "password must be at least 8 characters")
      .max(32, "password must be at most 32 characters")
      .required("Password is required"),
  })
  .required();

const Login = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitSuccessful, isSubmitting, errors },
  } = useForm({
    resolver: yupResolver(loginSchema),
    defaultValues: {
      email: "testseller@gmail.com",
      password: "testseller",
    },
  });
  const [message, setMessage] = useState(null);
  const messageRef = useRef(null);
  const navigate = useNavigate();
  const onSubmit = async (data) => {
    try {
      const res = await apiRequest.post(
        "auth/login",
        {
          email: data.email,
          password: data.password,
        },
        {
          withCredentials: true,
        }
      );
      localStorage.setItem("currentUser", JSON.stringify(res.data));
      navigate("/");
    } catch (error) {
      setMessage(error?.response?.data);
      messageRef.current = setTimeout(() => {
        setMessage(null);
      }, 5000);
    }
  };

  // For form reset
  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
  }, [isSubmitSuccessful, reset]);
  // For message disappear
  useEffect(() => {
    return () => clearTimeout(messageRef.current);
  }, []);

  return (
    <>
      <section className="login-register-container">
        <div className="container login">
          <form action="" onSubmit={handleSubmit(onSubmit)}>
            <h1>Sign In</h1>
            {message && (
              <p ref={messageRef} className="errMessage">
                {message}
              </p>
            )}
            <InputField
              label="Email"
              type="text"
              name="email"
              placeholder="Enter your email"
              register={register}
              errors={errors?.email}
            />

            <InputField
              label="Password"
              type="password"
              name="password"
              placeholder="Enter your password"
              register={register}
              errors={errors?.password}
            />

            <button type="submit" disabled={isSubmitting ? true : false}>
              {isSubmitting ? "Loading" : "Login"}
            </button>
            <Link to="/register" className="login-register-link">
              Don't have an account yet? Sign up
            </Link>
          </form>
          <HelperPopup />
        </div>
      </section>
    </>
  );
};

export default Login;
