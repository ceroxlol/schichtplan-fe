import { useForm } from "react-hook-form";
import auth from "../services/auth";

import "./Login.css";

export default function Register() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const onSubmit = data => { auth.register(data.userName, data.email, data.password) };

  //console.log(watch("example")); // watch input value by passing the name of it

  return (
    <div className="Auth-form-container">
      <form className="Auth-form" onSubmit={handleSubmit(onSubmit)}>
        <div className="Auth-form-content">
          <h3 className="Auth-form-title">Register</h3>
          <div className="form-group mt-3">
            <label>Vollständiger Name</label>
            <input
              type="text"
              className="form-control mt-1"
              placeholder="Vollständiger Name"
              {...register("userName", { required: true })} />
          </div>
          {errors.userName && <p>Das Feld ist ungültig</p>}

          <div className="form-group mt-3">
            <label>Emailaddresse</label>
            <input
              type="email"
              className="form-control mt-1"
              placeholder="E-Mail-Adresse"
              {...register("email")} />
          </div>
          {errors.email && <p>Das Feld ist ungültig</p>}

          {/* include validation with required or other standard HTML validation rules */}
          <div className="form-group mt-3">
            <label>Password</label>
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