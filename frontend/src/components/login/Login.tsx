import React, { useState, ChangeEvent, FormEvent } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import style from "./Login.module.css";

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

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.post("https://www.backendrestfulltest.icu/api/login", {
        email: formData.mail,
        password: formData.password,
      });
      localStorage.setItem("token", response.data.access_token);
      localStorage.setItem("id", response.data.id);
      localStorage.setItem("data", response.data); // Solo para pruebas
      window.location.reload(); // Reload the page to update the Header component
    } catch (error) {
      const axiosError = error as AxiosError;
      if (axiosError.response) {
        setError(axiosError.response.data.message);
      } else {
        setError("An unknown error occurred");
      }
    }
  };

  return (
    <div className={style.login}>
      <form onSubmit={handleSubmit} className={style.form}>
        <h2 className={style.title}>Ingresar</h2>
        <div className={style.box}>
          <input
            className={style.input}
            type="text"
            name="mail"
            placeholder="Ingrese su mail"
            onChange={handleChange}
          />
        </div>
        <div className={style.box}>
          <input
            className={style.input}
            type="password"
            name="password"
            placeholder="Contraseña"
            onChange={handleChange}
          />
        </div>
        <div className={style.box}>
          <button type="submit" className={style.button}>
            Ingresar
          </button>
        </div>
        {error && <p className={style.red}>{error}</p>}
        <div className={style.text}>
          <p>¿No tenés cuenta?</p>
          <p>
            Registrate{" "}
            <Link to={"/registro"} className={style.link}>
              aquí
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Login;



// Por tiempo le pedí a ChatGPT que cambiara el login para agilizar al manejo de sesión pero acá dejo el código original

// import React, { useState, ChangeEvent, FormEvent } from "react";
// import axios from "axios";
// import { Link } from "react-router-dom";
// import style from "./Login.module.css";

// interface FormData {
//   mail: string;
//   password: string;
// }

// interface AxiosError {
//   response?: {
//     data: {
//       message: string;
//     };
//   };
// }

// const Login: React.FC = () => {
//   const [formData, setFormData] = useState<FormData>({
//     mail: "",
//     password: "",
//   });
//   const [error, setError] = useState<string>("");
//   const [emptyPasswordFieldError, setEmptyPasswordFieldError] =
//     useState<boolean>(false);
//   const [emptyEmailFieldError, setEmptyEmailFieldError] =
//     useState<boolean>(false);

//   const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });

//     if (name === "password" && value.trim() === "") {
//       setEmptyPasswordFieldError(true);
//     } else {
//       setEmptyPasswordFieldError(false);
//     }
//     if (name === "mail" && value.trim() === "") {
//       setEmptyEmailFieldError(true);
//     } else {
//       setEmptyEmailFieldError(false);
//     }
//   };

//   const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     if (!emptyPasswordFieldError && !emptyEmailFieldError) {
//       try {
//         const csrfToken = document
//           .querySelector('meta[name="csrf-token"]')
//           ?.getAttribute("content");
//         const response = await axios.post(
//           "https://www.backendrestfulltest.icu/api/login",
//           {
//             email: formData.mail,
//             password: formData.password,
//           },
//           {
//             headers: {
//               "X-CSRF-TOKEN": csrfToken,
//             },
//           }
//         );
//         localStorage.setItem("token", response.data.access_token);
//         localStorage.setItem("id", response.data.id);
//       } catch (error) {
//         const axiosError = error as AxiosError;
//         if (axiosError.response) {
//           setError(axiosError.response.data.message);
//         } else {
//           setError("An unknown error occurred");
//         }
//       }
//     }
//   };

//   return (
//     <div className={style.login}>
//       <form onSubmit={handleSubmit} className={style.form}>
//         <h2 className={style.title}>Ingresar</h2>
//         <div className={style.box}>
//           <input
//             className={style.input}
//             type="text"
//             name="mail"
//             placeholder="Ingrese su mail"
//             onChange={handleChange}
//           />
//           {emptyEmailFieldError && (
//             <p className={style.red}>Este campo no puede estar vacío</p>
//           )}
//         </div>
//         <div className={style.box}>
//           <input
//             className={style.input}
//             type="password"
//             name="password"
//             placeholder="Contraseña"
//             onChange={handleChange}
//           />
//           {emptyPasswordFieldError && (
//             <p className={style.red}>Este campo no puede estar vacío</p>
//           )}
//         </div>
//         <div className={style.box}>
//           <button type="submit" className={style.button}>
//             Ingresar
//           </button>
//         </div>
//         {error && <p className={style.red}>{error}</p>}
//         <div className={style.text}>
//           <p>¿No tenés cuenta?</p>
//           <p>
//             Registrate{" "}
//             <Link to={"/registro"} className={style.link}>
//               aquí
//             </Link>
//           </p>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default Login;
