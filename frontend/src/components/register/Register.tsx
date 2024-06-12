import React, { useState, ChangeEvent, FormEvent } from "react";
import axios, { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";
import style from "./Register.module.css";

interface FormData {
  username: string;
  email: string;
  password: string;
  passwordMatch?: string;
}

interface ErrorResponse {
  message: string;
}

const Register: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    username: "",
    email: "",
    password: "",
  });

  const [passwordsMatch, setPasswordsMatch] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    console.log(formData);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    if (passwordsMatch) {
      try {
        const csrfToken = document
          .querySelector('meta[name="csrf-token"]')
          ?.getAttribute("content");

        const response = await axios.post(
          "https://www.backendrestfulltest.icu/api/register",
          formData,
          {
            headers: {
              "X-CSRF-TOKEN": csrfToken,
            },
          }
        );
        console.log(response.data);
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("id", response.data.id);
        navigate("/");
      } catch (error) {
        const axiosError = error as AxiosError<ErrorResponse>;
        if (axiosError.response && axiosError.response.data) {
          setError(axiosError.response.data.message);
        } else {
          setError("An unknown error occurred.");
        }
      }
    } else {
      console.log("Passwords do not match");
    }
  };

  const passwordCheck = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setPasswordsMatch(formData.password === value);
  };

  return (
    <div className={style.box}>
      <form onSubmit={handleSubmit} className={style.form}>
        <p className={style.title}>Registrate</p>
        <div className={style.flex}>
          <div>
            <input
              className={style.input}
              type="text"
              name="username"
              placeholder="Usuario"
              required
              onChange={handleChange}
            />
          </div>
          <div className={style.flex}>
            <input
              className={style.input}
              type="password"
              name="password"
              placeholder="Contraseña"
              required
              value={formData.password}
              onChange={handleChange}
            />
            <input
              className={style.input}
              type="password"
              name="passwordMatch"
              placeholder="Verifique su contraseña"
              required
              onChange={passwordCheck}
            />
          </div>
          {!passwordsMatch && (
            <p className={style.red}>Las contraseñas no coinciden</p>
          )}
          <div>
            <input
              className={style.input}
              type="text"
              name="email"
              placeholder="Email"
              required
              onChange={handleChange}
            />
          </div>
          <div>
            <button type="submit" className={style.button}>
              Registrate
            </button>
          </div>
          {error && <p className={style.red}>{error}</p>}
        </div>
      </form>
    </div>
  );
};

export default Register;
