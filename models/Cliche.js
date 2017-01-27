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
					keywords: ['sad','happy'],
					continua: [{
						'name': 'sad-happy',
						'level': 0.2,
						'intensity': 0.7
					},
					{
						'name': 'bored-excited',
						'level': 0.6,
						'intensity': 0.4
					},
					{
						'name': 'timid-confident',
						'level': 0.95,
						'intensity': 0.8
					},
					{
						'name': 'anxious-calm',
						'level': 0.2,
						'intensity': 0.1
					}],
					tags: ['good','doggie'],
					antiTags: ['dang','crap']
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
