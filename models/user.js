var user = (function(){
	var counter = 0,
		api,

		request = function request (req) {
			console.log('user.request', req);
			if (this[req.funcName] == undefined) {
				throw "Error: user has no function named '" + req.funcName + "'";
			}
			this[req.funcName].apply(this,req.funcArgs);
		},
		instructEmotion = function instructEmotion () {
			console.log('user.instructEmotion()');
			var snap = Cliche.newSnapshot();
			var userId = this.id;
			EmotionInstructor.instructEmotion(userId, snap);
		};

	return function (opts) {
		checkArgs('user',opts,'preferredName');
		api = {
			class: 'user',
			preferredName: opts.preferredName,
			id: counter++,
			request: request,
			instructEmotion: instructEmotion
		};
		api.print = print('user', api);
		Router.registerUser(api);
		return api;
	};
}());