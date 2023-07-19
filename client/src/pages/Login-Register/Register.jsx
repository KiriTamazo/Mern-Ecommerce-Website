import "./Login-Register.scss";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import InputField from "../../components/InputField/InputField";
import * as yup from "yup";
import apiRequest from "../../ultis/apiRequest";
import { Link, useNavigate } from "react-router-dom";
import { QuestionMarkCircleIcon } from "@heroicons/react/24/outline";

const registerSchema = yup
  .object()
  .shape({
    userName: yup.string().required("User Name is required"),
    email: yup.string().email().required("Email is required"),
    password: yup
      .string()
      .min(8, "Password must be at least 8 characters")
      .max(32, "Password must be at most 32 characters")
      .required("Password is required"),
    country: yup.string().required("Country is required"),
  })
  .required();

const Register = () => {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { isSubmitSuccessful, errors },
  } = useForm({
    resolver: yupResolver(registerSchema),
    defaultValues: {
      isSeller: false,
    },
  });
  const [show, setShow] = useState(true);

  const [message, setMessage] = useState(null);
  const messageRef = useRef(null);
  const navigate = useNavigate();
  const checked = watch("isSeller");
  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
  }, [isSubmitSuccessful, reset]);

  // File Upload to the cloudinary
  const upload = async (file) => {
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "allure_users");
    try {
      const res = await axios.post(
        "https://api.cloudinary.com/v1_1/tamazo/image/upload",
        data
      );
      const { url } = res.data;
      return url;
    } catch (error) {
      console.log(error);
    }
  };

  const onSubmit = async (data) => {
    const url = await upload(data.img[0]);
    try {
      const result = await apiRequest.post("auth/register", {
        ...data,
        img: url,
      });
      localStorage.setItem("currentUser", JSON.stringify(result.data));
      navigate("/");
    } catch (error) {
      setMessage(error.response?.data);
      messageRef.current = setTimeout(() => {
        setMessage(null);
      }, 5000);
    }
  };
  // For message disappear
  useEffect(() => {
    return () => clearTimeout(messageRef.current);
  }, []);

  return (
    <section className="login-register-container">
      <div className="container register">
        <form action="" onSubmit={handleSubmit(onSubmit)}>
          <h1>Sign Up</h1>
          {message && (
            <p ref={messageRef} className="errMessage">
              {message}
            </p>
          )}
          <div className="formControl">
            <div className="info">
              <InputField
                type="text"
                label="User Name"
                name="userName"
                placeholder="Enter your User Name"
                register={register}
                errors={errors?.userName}
              />
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

              <InputField
                label="Upload a file"
                type="file"
                name="img"
                register={register}
                errors={errors.img}
              />
              <InputField
                label="Country"
                type="text"
                name="country"
                placeholder="USA"
                register={register}
                errors={errors.country}
              />
              <InputField
                label="Activate the seller account"
                type="checkbox"
                name="isSeller"
                register={register}
                errors={errors.isSeller}
              />

              {checked && (
                <>
                  <InputField
                    label="Phone No"
                    type="text"
                    name="phone"
                    placeholder="+123456789"
                    register={register}
                    errors={errors.phone}
                  />
                  <InputField
                    label="Your Message"
                    type="textarea"
                    name="desc"
                    placeholder="Enter your message here"
                    register={register}
                    errors={errors.desc}
                    rows="5"
                  />
                </>
              )}
            </div>
          </div>
          <button type="submit">Signup</button>
          <Link className="login-register-link" to="/login">
            Already have an account?<span>Login</span>
          </Link>
        </form>
      </div>
    </section>
  );
};
export default Register;
