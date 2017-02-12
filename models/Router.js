var Router = (function(){
	var usersById = {},
		api,

		request = function request (req) {
			console.log('Router.request:', req);
			var user = usersById[req.userId];
			user.request(req);
		},
		registerUser = function registerUser (user) {
			console.log('Router.registerUser:', user);
			usersById[user.id] = user;
		},
		getUsers = function getUsers () {
			console.log('Router.getUsers:', usersById);
			return usersById;
		};

	api = {
		request: request,
		registerUser: registerUser,
		getUsers: getUsers
	};
	api.print = print('Router', api);
	return api;
}());