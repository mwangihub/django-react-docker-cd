import { useNavigate } from "react-router-dom";
import { Logout } from "./Logout";
import { useSelector } from "react-redux";
import { useEffect } from "react";

export const AlreadyAuthenticated = () => {
	const navigate = useNavigate();
	const authData = useSelector(state => state.AuthLoginReducer.authData);

	useEffect(() => {
		if (!authData) {
			navigate("/", { replace: true })
		}
	}, [authData, navigate])

	const props = {
		redirect: true, navigate_to: "/"
	}
	return (
		<div className="container col-xxl-8 p-5">
			<div className="col-lg-6">
				<h1 className="display-5 fw-bold lh-1 mb-3">You are already logged in!</h1>
				<div className="lead">

					<ul className="list-group list-group-flush">
						{authData &&
							<>
								<li className="list-group-item">
									<strong>Email: </strong> {authData.details.user.email}
								</li>
								<li className="list-group-item">
									<strong>Name: </strong> {`${authData.details.user.name}`}
								</li>
								<li className="list-group-item">
									<strong>Active: </strong> {`${authData.details.user.is_active}`}
								</li>
								<li className="list-group-item">
									<strong>Admin: </strong> {`${authData.details.user.is_admin}`}
								</li>
							</>
						}
					</ul>

				</div>
				<div className="d-grid gap-2 d-md-flex justify-content-md-start">
					<button type="button" className="btn btn-primary btn-sm px-4 me-md-2">Primary</button>
					<Logout {...props} />
				</div>
			</div>

		</div>
	)
}
