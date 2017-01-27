var EmotionInstructor = (function(){
	var emotionalStateHistory = [],

		getEmotionalStates = function getEmotionalStates (userId,snapshot) {
			var soundState = new Promise(function(res,rej){
				res(SoundInterface.getEmotionalState());
			});
			var actionState = new Promise(function(res,rej){
				res(ActionInterface.getEmotionalState());
			});
			var pleasureState = new Promise(function(res,rej){
				res(PleasureInterface.getEmotionalState());
			});
			var timeState = new Promise(function(res,rej){
				res(TimePerceptionInterface.getEmotionalState());
			});
			var metaState = new Promise(function(res,rej){
				res(this.getEmotionalState());
			})
			return Promise.all([soundState,actionState,pleasureState,timeState,metaState]);
		},

		getEmotionalState = function getEmotionalState (userId, snapshot) {
			// return emotionalState based on last emotional state given to this user
			var latest = historyByUser(userId)
				.sort(/* SORT BY DATE */)[0]; // most recent
			return emotionalState({
				type: 'meta',
				date: snapshot.date,
				timeDiff: snapshot.date - latest.date,
				keywords: latest.keywords,
				continua: latest.continua,
				tags: latest.tags,
				antiTags: latest.antiTags
			});
		};

	var instructEmotion = function instructEmotion (userId,snapshot) {
		getEmotionalStates(userId,snapshot).then(function(emoState){
			return filterEmotionalState(emoState);
			console.log('emotion instructor is instructin!');
		}).then(function(emoState){
			var template = getTemplate(emoState);
			return applyTemplate(userId,emo,template);
		}).then(function(emoText){
			SoundInterface.instructEmotion(emoText);
		}).catch(function(err){
			throw "Error in EmotionInstructor:  " + err;
		});
	};
	return {
		instructEmotion: instructEmotion
	};
}());