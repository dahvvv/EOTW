var Cliche = (function(){
	var api,

		newSnapshot = function newSnapshot () {
			return {
				date: new Date()
			};
		},

		newPrivateInterface = function newPrivateInterface (opts) {
			checkArgs('newPrivateInterface',opts,'type');
			var api,

				getEmotionalState = function (userId,snapshot) {
					// do some possibly-async stuff, via opts
					// eventually somehow...
					return emotionalState({
						type: opts.type,
						date: snapshot.date,
						keywords: ['sad','confident','anxious','angry'],
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
					console.log('instructEmotion() via the ' + opts.type + ' private interface');
					console.log('got passed:',text);
				};
			api = {
				getEmotionalState: getEmotionalState,
				instructEmotion: instructEmotion
			};
			api.print = print(opts.type + 'Interface', api);
			return api;
		};

	api = {
		newSnapshot: newSnapshot,
		newPrivateInterface: newPrivateInterface
	};
	api.print = print('Cliche', api);
	return api;
}());
