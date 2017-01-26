var user = (function(){
	var counter = 0,

		request = function request (req) {
			if (this[req.funcName] == undefined) {
				throw "Error: user has no function named '" + req.funcName + "'";
			}
			this[req.funcName].apply(req,req.funcArgs);
		},
		instructEmotion = function instructEmotion () {
			var snap = Cliche.newSnapshot();
			EmotionInstructor.instructEmotion(this.id, snap);
		};

	return function (opts) {
		checkArgs('user',opts,'preferredName');
		var api = {
			preferredName: opts.preferredName,
			id: counter++,
			request: request,
			instructEmotion: instructEmotion
		};
		Router.registerUser(api);
		return api;
	};
}());