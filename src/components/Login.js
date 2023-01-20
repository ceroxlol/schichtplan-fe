import { useForm } from "react-hook-form";
import auth from "../services/auth";

import "./Login.css";

export default function Login() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const onSubmit = data => {
    const response = auth.login(data.email, data.password)
    // if(response){

    // }
  };

  //console.log(watch("example")); // watch input value by passing the name of it

  return (
    <div className="Auth-form-container">
      <form className="Auth-form" onSubmit={handleSubmit(onSubmit)}>
        <div className="Auth-form-content">
          <h3 className="Auth-form-title">Sign In</h3>
          <div className="form-group mt-3">
            <label>Email address</label>
            <input
              type="email"
              className="form-control mt-1"
              placeholder="Enter email"
              {...register("email")} />
          </div>

          {/* include validation with required or other standard HTML validation rules */}
          <div className="form-group mt-3">
            <label>Password</label>
            <input
              type="password"
              className="form-control mt-1"
              placeholder="Enter password"
              {...register("password", { required: true })} />
          </div>
          {/* errors will return when field validation fails  */}
          {errors.password && <p>This field is required</p>}
          <div className="d-grid gap-2 mt-3">
            <input type="submit" className="btn btn-primary" />
          </div>
        </div>
      </form>
    </div>
  );
}