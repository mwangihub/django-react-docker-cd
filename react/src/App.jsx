import React from "react";
import { Routes, Route } from "react-router-dom";
import { useDispatch } from "react-redux";
import { checkAuthentication } from "./resource";
import {
	AlreadyAuthenticated,
	Home,
	LoginComponent,
	NavBar,
	Profile,
	RegisterComponent,
} from "./pages";


const App = () => {
	const dispatch = useDispatch();
	React.useEffect(() => {
		dispatch(checkAuthentication());
	}, [dispatch])

	return (
		<>
			<NavBar />
			
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/login" element={<LoginComponent />} />
					<Route path="/register" element={<RegisterComponent />} />
					<Route path="/authenticated" element={<AlreadyAuthenticated />} />
					<Route path="/profile" element={<Profile />} />
	
					{/* Just example for Navigate */}
					{/* <Route path="/profile" element={<Navigate to="/Dashboard" />} /> */}
				</Routes>
			
		</>
	);
}


export default App;

