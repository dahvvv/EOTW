var Cliche = (function(){
	var newSnapshot = function newSnapshot () {
		return {
			date: new Date()
		};
	},

		newPrivateInterface = function newPrivateInterface (opts) {
			checkArgs('newPrivateInterface',opts,'type');
			var getEmotionalState = function (userId,snapshot) {
				// do some possibly-async stuff, via opts
				// eventually somehow...
				return emotionalState({
					type: opts.type,
					date: snapshot.date,
					keywords: [/* some keywords */],
					continua: [/* some continua */],
					tags: [/* some tags */],
					antiTags: [/* some antiTags */]
				});
			},
				instructEmotion = function (text) {
					console.log('doin things wit my ' + opts.type + 'private interface');
					console.log(text);
				};	
			return {
				getEmotionalState: getEmotionalState,
				instructEmotion: instructEmotion
			};
		};

	return {
		newSnapshot: newSnapshot,
		newPrivateInterface: newPrivateInterface
	};
}());
