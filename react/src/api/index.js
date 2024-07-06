import axios from "axios";
import Cookies from "universal-cookie";


let http = function (c_type = "application/json") {
	let cookies = new Cookies();
	let XCSRFToken = cookies.get("csrftoken");
	let headers = {
		"Content-type": c_type,
		'Accept': c_type,
		'X-CSRFToken': XCSRFToken,
		// 'credentials': 'same-origin'
	}
	return axios.create({
		baseURL: localStorage.getItem("host"),
		headers: headers
	});
}

const logout = function () {
	return http().get("auth/logout/");
};

const checkAuthentication = function () {
	return http().get("auth/check-auth/")
};

const login = function (email, password) {
	return http().post("auth/login/", {
		email,
		password,
	});
};


const register = function (object) {
	return http().post("auth/register/", object);
};
export const Api = {
	login,
	logout,
	register,
	checkAuthentication,
};

