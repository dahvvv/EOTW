var EmotionInstructor = (function(){
	var emotionalStateHistory = [], // each bundle has a snapshot, list of emotional states, user, template, text

		historyByUser = function historyByUser (userId) {
			if (typeof userId == 'number') {
				return emotionalStateHistory.filter(function(eS){
					return eS.userId == userId;
				});
			} else {
				var map = {};
				emotionalStateHistory.forEach(function(eS){
					map[eS.userId] = eS;
				});
				return map;
			}
		},

		latestByUser = function latestByUser (userId) {
			var latest = historyByUser(userId)
				.sort(function(eSBundle1,eSBundle2){
					return eSBundle1.snapshot.date - eSBundle2.snapshot.date;
				})[0];
			if (latest == undefined) {
				latest = {
					snapshot: { date: 0.0 },
					keywords: [],
					continua: [],
					tags: [],
					antiTags: []
				};
			}
			return latest;
		},

		getEmotionalStates = function getEmotionalStates (userId,snap) {
			var soundState = new Promise(function(res,rej){
				res(SoundInterface.getEmotionalState(userId,snap));
			});
			var actionState = new Promise(function(res,rej){
				res(ActionInterface.getEmotionalState(userId,snap));
			});
			var pleasureState = new Promise(function(res,rej){
				res(PleasureInterface.getEmotionalState(userId,snap));
			});
			var timeState = new Promise(function(res,rej){
				res(TimePerceptionInterface.getEmotionalState(userId,snap));
			});
			var metaState = new Promise(function(res,rej){
				res(getEmotionalState(userId,snap));
			});
			return Promise.all([soundState,actionState,pleasureState,timeState,metaState]);
		},

		getEmotionalState = function getEmotionalState (userId, snapshot) {
			// return emotionalState based on most recent emotional state given to this user
			var latest = latestByUser(userId);
			return emotionalState({
				type: 'meta',
				date: snapshot.date,
				timeDiff: snapshot.date - latest.snapshot.date,
				keywords: latest.keywords,
				continua: latest.continua,
				tags: latest.tags,
				antiTags: latest.antiTags
			});
		},

		filterEmoStates = function filterEmoStates (emoStates,userId) {
			// minimum of 1 emo state
			if (emoStates.length == 1) return emoStates;
			// filter most recent by this user
			var latest = latestByUser(userId);
			emoStates = emoStates.filter(function(eS){
				return eS.date != latest.snapshot.date;
			});
			if (emoStates.length == 1) return emoStates;
			// filter any with no continua with intensity > 0.5
			emoStates = emoStates.filter(function(eS){
				var returnable = 0;
				for (var i=0; i < eS.continua.length; i++) {
					if (eS.continua[i].intensity > 0.5) {
						returnable = 1;
						break;
					}
				}
				if (returnable) return eS;
			});
			return emoStates;
		};

	var instructEmotion = function instructEmotion (userId,snapshot) {
		getEmotionalStates(userId,snapshot).then(function(emoStates){
			return filterEmoStates(emoStates,userId);
		}).then(function(emoStateBundle){
			var template = getTemplate(emoStateBundle);
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