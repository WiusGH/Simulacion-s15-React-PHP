import React, { useState, ChangeEvent, FormEvent } from "react";
import axios, { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";

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
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    if (passwordsMatch) {
      try {
        const response = await axios.post("http://.......", formData);
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("id", response.data.id);
        navigate("/usuario");
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
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-200">
      <p className="text-2xl font-bold mb-4">Registrate</p>
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md"
      >
        <div className="space-y-4">
          <div>
            <input
              className="w-full p-3 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
              type="text"
              name="username"
              placeholder="Usuario"
              required
              onChange={handleChange}
            />
          </div>
          <div className="space-y-4">
            <input
              className="w-full p-3 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
              type="password"
              name="password"
              placeholder="Contraseña"
              required
              value={formData.password}
              onChange={handleChange}
            />
            <input
              className="w-full p-3 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
              type="password"
              name="passwordMatch"
              placeholder="Verifique su contraseña"
              required
              onChange={passwordCheck}
            />
          </div>
          {!passwordsMatch && (
            <p className="text-red-500 text-sm">Las contraseñas no coinciden</p>
          )}
          <div>
            <input
              className="w-full p-3 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
              type="text"
              name="email"
              placeholder="Email"
              required
              onChange={handleChange}
            />
          </div>
          <div>
            <button
              type="submit"
              className={`w-full p-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring ${
                !passwordsMatch ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={!passwordsMatch}
            >
              Registrate
            </button>
          </div>
          {error && <p className="text-red-500 text-sm">{error}</p>}
        </div>
      </form>
    </div>
  );
};

export default Register;
