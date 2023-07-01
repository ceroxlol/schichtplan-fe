import { useForm } from "react-hook-form";
import auth from "../services/auth";
import { useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";

import "./Login.css";

export default function Login() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();

  const onSubmit = async data => {
    const response = await auth.login(data.email, data.password)
    if (response && response.data && response.data.username) {
      console.log(response)
      // console.log("Logged in successfully as " + response.data.username)
      // toast.success("Welcome " + response.data.username)
      // localStorage.setItem("user", JSON.stringify(response.data))
      // navigate("/shiftplan/" + response.data.id)
    }
    else {
      toast.error("Something went wrong...")
      console.log(response)
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