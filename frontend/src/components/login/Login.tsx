import React, { useState, ChangeEvent, FormEvent } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

interface FormData {
  mail: string;
  password: string;
}

interface AxiosError {
  response?: {
    data: {
      message: string;
    };
  };
}

const Login: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    mail: "",
    password: "",
  });
  const [error, setError] = useState<string>("");
  const [emptyPasswordFieldError, setEmptyPasswordFieldError] =
    useState<boolean>(false);
  const [emptyEmailFieldError, setEmptyEmailFieldError] =
    useState<boolean>(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (name === "password" && value.trim() === "") {
      setEmptyPasswordFieldError(true);
    } else {
      setEmptyPasswordFieldError(false);
    }
    if (name === "mail" && value.trim() === "") {
      setEmptyEmailFieldError(true);
    } else {
      setEmptyEmailFieldError(false);
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!emptyPasswordFieldError && !emptyEmailFieldError) {
      try {
        const csrfToken = document
          .querySelector('meta[name="csrf-token"]')
          ?.getAttribute("content");
          const response = await axios.post(
            "https://www.backendrestfulltest.icu/api/login",
            {
              email: formData.mail,
              password: formData.password,
            },
            {
              headers: {
                "X-CSRF-TOKEN": csrfToken,
              },
            }
          );
        localStorage.setItem("token", response.data.access_token);
        localStorage.setItem("id", response.data.id);
      } catch (error) {
        const axiosError = error as AxiosError;
        if (axiosError.response) {
          setError(axiosError.response.data.message);
        } else {
          setError("An unknown error occurred");
        }
      }
    }
  };

  return (
    <div className="flex justify-center items-center">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg w-full max-w-sm"
      >
        <h2 className="text-2xl font-bold mb-6">Ingresar</h2>
        <div className="mb-4">
          <input
            className="w-full p-3 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
            type="text"
            name="mail"
            placeholder="Ingrese su mail"
            onChange={handleChange}
          />
          {emptyEmailFieldError && (
            <p className="text-red-500 text-sm mt-1">
              Este campo no puede estar vacío
            </p>
          )}
        </div>
        <div className="mb-4">
          <input
            className="w-full p-3 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
            type="password"
            name="password"
            placeholder="Contraseña"
            onChange={handleChange}
          />
          {emptyPasswordFieldError && (
            <p className="text-red-500 text-sm mt-1">
              Este campo no puede estar vacío
            </p>
          )}
        </div>
        <div className="mb-6">
          <button
            type="submit"
            className={`w-full p-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring ${
              emptyPasswordFieldError || emptyEmailFieldError
                ? "opacity-50 cursor-not-allowed"
                : ""
            }`}
            disabled={emptyPasswordFieldError || emptyEmailFieldError}
          >
            Ingresar
          </button>
        </div>
        {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
        <div className="text-center">
          <p>¿No tenés cuenta?</p>
          <p>
            Registrate{" "}
            <Link to={"/registro"} className="text-blue-500 hover:underline">
              aquí
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Login;
