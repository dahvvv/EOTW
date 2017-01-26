var Router = (function(){
	var usersById = {},

		request = function request (req) {
			var user = usersById[req.userId];
			user.request(req);
		},
		registerUser = function registerUser (user) {
			usersById[user.id] = user;
		},
		getUsers = function getUsers () {
			return usersById;
		};

	return {
		request: request,
		registerUser: registerUser,
		getUsers: getUsers
	};
}());