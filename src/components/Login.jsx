import { useForm } from "react-hook-form";
import auth from "../services/auth";
import { useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";

import "./Login.css";

export default function Login() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const response = await auth.login(data.email, data.password);
      toast.success(`Eingeloggt als: ${response.data.username}`);
      navigate(`/shiftplan/${response.data.id}`);
    } catch (error) {
      if (error.response) {
        // The request was made, but the server responded with an error status code
        console.error("Server responded with status code:", error.response.status);
        console.error("Response data:", error.response.data);
      } else if (error.request) {
        // The request was made, but no response was received
        console.error("No response received from the server");
        console.error("Request details:", error.request);
      } else {
        // Something else happened while setting up the request
        console.error("Error:", error.message);
      }
    
      toast.error(`Etwas lief schief: ${error.message}`);
    }
  };

  //console.log(watch("example")); // watch input value by passing the name of it

  return (
    <div className="Auth-form-container">
      <form className="Auth-form" onSubmit={handleSubmit(onSubmit)}>
        <div className="Auth-form-content">
          <h3 className="Auth-form-title">Einloggen</h3>
          <div className="form-group mt-3">
            <label>E-Mail-Adresse</label>
            <input
              type="email"
              className="form-control mt-1"
              placeholder="E-Mail-Adresse"
              {...register("email", { required: true })} />
          </div>
          {errors.email && <p>Das Feld ist ungültig</p>}

          {/* include validation with required or other standard HTML validation rules */}
          <div className="form-group mt-3">
            <label>Passwort</label>
            <input
              type="password"
              className="form-control mt-1"
              placeholder="Passwort"
              {...register("password", { required: true })} />
          </div>
          {/* errors will return when field validation fails  */}
          {errors.password && <p>Das Feld ist ungültig</p>}

          <div className="d-grid gap-2 mt-3">
            <input type="submit" className="btn btn-primary" />
          </div>
        </div>
      </form>
    </div>
  );
}