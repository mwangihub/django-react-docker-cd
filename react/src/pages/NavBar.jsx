import { NavLink, Link } from "react-router-dom";
import { Logout } from "./auth/Logout";
import { useSelector } from "react-redux";


export const NavBar = () => {
	const authData = useSelector(state => state.AuthLoginReducer.authData);
	return (
		<>
			<nav className="navbar navbar-expand-md navbar-dark bg-primary" aria-label="Fourth navbar example">
				<div className="container">
					<Link className="navbar-brand" to="/">DjangoReact</Link>
					<button className="navbar-toggler collapsed" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasWithBackdrop" aria-controls="offcanvasWithBackdrop">
						<span className="navbar-toggler-icon"></span>
					</button>
					<div className="navbar-collapse collapse" >
						<ul className="navbar-nav ms-auto mb-2 mb-md-0">
							{/* Example
							*  https://reactrouter.com/en/main/components/nav-link
							* 	<NavLink
							* 	  to="/messages"
							* 	  className={({ isActive, isPending, isTransitioning }) =>
							* 	    [
							* 	     isPending ? "pending" : "",
							* 	     isActive ? "active" : "",
							* 	     isTransitioning ? "transitioning" : "",
							* 	   ].join(" ")
							* 	 }
							* 	>
							* 	  Messages
							* 	</NavLink>
							*
							*/}
							<li className="nav-item">
								<NavLink to="/"
									className={`nav-link ${({ isActive }) => (isActive ? "active" : "")}`}>Home</NavLink>
							</li>
							{authData &&
								<li className="nav-item">
									<NavLink to="/profile"
										className={`nav-link ${({ isActive }) => (isActive ? "active" : "")}`}>Profile</NavLink>
								</li>
							}
							{!authData &&
								<li className="nav-item">
									<NavLink to="/login"
										className={`nav-link ${({ isActive }) => (isActive ? "active" : "")}`}>Login</NavLink>
								</li>
							}
							{!authData &&
								<li className="nav-item">
									<NavLink to="/register"
										className={`nav-link ${({ isActive }) => (isActive ? "active" : "")}`}>Register</NavLink>
								</li>
							}
						</ul>
						<Logout />
					</div>
				</div>
			</nav>
			<MobileNavigator />
		</>
	)
}


const MobileNavigator = () => {
	return (
		<>
			<div className="offcanvas offcanvas-start" data-bs-scroll="true" data-bs-backdrop="false" tabIndex="-1" id="offcanvasScrolling" aria-labelledby="offcanvasScrollingLabel">
				<div className="offcanvas-header">
					<h5 className="offcanvas-title" id="offcanvasScrollingLabel">DjangoReact</h5>
					<button type="button" className="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
				</div>
				<div className="offcanvas-body">
					<p>Create your links.</p>
				</div>
			</div>

			<div className="offcanvas offcanvas-start" tabIndex="-1" id="offcanvasWithBackdrop" aria-labelledby="offcanvasWithBackdropLabel">
				<div className="offcanvas-header">
					<h5 className="offcanvas-title" id="offcanvasWithBackdropLabel">DjangoReact</h5>
					<button type="button" className="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
				</div>
				<div className="offcanvas-body">
					<p>Create your links.</p>
				</div>
			</div>

			<div className="offcanvas offcanvas-start" data-bs-scroll="true" tabIndex="-1" id="offcanvasWithBothOptions" aria-labelledby="offcanvasWithBothOptionsLabel">
				<div className="offcanvas-header">
					<h5 className="offcanvas-title" id="offcanvasWithBothOptionsLabel">DjangoReact</h5>
					<button type="button" className="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
				</div>
				<div className="offcanvas-body">
					<p>Create your links.</p>
				</div>
			</div>
		</>
	)
}