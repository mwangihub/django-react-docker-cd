import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { authLoginAction } from "../index";
import { useNavigate } from "react-router-dom";
import { localLogout } from "../../resource";


export const LoginComponent = React.memo(function Login() {
	const [isPassword, setisPassword] = useState(true);
	const authLoader = useSelector(state => state.AuthLoginReducer.authLoader);
	const authError = useSelector(state => state.AuthLoginReducer.authError);
	const authData = useSelector(state => state.AuthLoginReducer.authData);
	const dispatch = useDispatch();
	const navigate = useNavigate()

	useEffect(() => {
		if (authData) {
			navigate("/profile", { replace: true })
		}
	}, [authData, navigate]);

	const handleSubmit = event => {
		event.preventDefault();
		const { email, password } = event.target;
		const object = {
			email: email.value,
			password: password.value,
		};
		dispatch(authLoginAction(object));
	};

	const clearAuthLoginReducerError = () => dispatch(localLogout());


	return (
		<div className="container d-flex justify-content-center my-5 pt-5">
			<div className="col-lg-6 col-12">

				{authError &&
					<div className="alert alert-danger alert-dismissible fade show">
						<strong className='ms-1'>Register error:</strong> {JSON.stringify(authError)}
						<button type="button" className="btn-close" onClick={clearAuthLoginReducerError} />
					</div>
				}

				<form onSubmit={handleSubmit}>
					<h3 className="">Sign in</h3>
					<hr className="border border-dark  border-2 " />
					<div className="form-floating mb-3">
						<input type="email" className="form-control" name="email" id="floatingInput" placeholder="" required />
						<label htmlFor="floatingInput">Email address</label>
					</div>

					<div className="form-floating mb-3">
						<input type={isPassword ? "password" : "text"} className="form-control" name="password" id="password_input" placeholder="" required />
						<label htmlFor="password_input">Password</label>
					</div>

					<div className="form-check mb-2">
						<input className="form-check-input" type="checkbox" value="" id="flexCheckChecked" onChange={() => setisPassword(!isPassword)} />
						<label className="form-check-label text-muted" htmlFor="flexCheckChecked">
							Show passwords
						</label>
					</div>

					<button className="w-100 btn btn-sm btn-primary" type="submit" disabled={authLoader}>Sign in</button>
				</form>

			</div>
		</div>

	)
});