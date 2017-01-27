var EmotionInstructor = (function(){
	var emotionalStateHistory = [], // each bundle has a snapshot, list of emotional states, userId, template, text

		historyByUser = function historyByUser (userId) {
			if (typeof userId == 'number') {
				return emotionalStateHistory.filter(function(eSB){
					return eSB.userId == userId;
				});
			} else {
				var map = {};
				emotionalStateHistory.forEach(function(eSB){
					map[eSB.userId] = eSB;
				});
				return map;
			}
		},

		latestByUser = function latestByUser (userId) {
			var latest = historyByUser(userId)
				.sort(function(eSB1,eSB2){
					return eSB1.snapshot.date - eSB2.snapshot.date;
				})[0];
			if (latest == undefined) {
				latest = emotionalStateBundle({
					emotionalStates: [],
					snapshot: { date: 0.0 },
					userId: null,
					template: null,
					text: ''
				});
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
		}).then(function(emoStates){
			var template = getTemplate(emoStateBundle);
			var text = applyTemplate(userId,emo,template);
			return emotionalStateBundle({
				emotionalStates: emoStates,
				userId: userId,
				snapshot: snapshot,
				template: template,
				text: text
			});
		}).then(function(esB){
			registerBundle(esB);
			SoundInterface.instructEmotion(esB);
		}).catch(function(err){
			throw "Error in EmotionInstructor:  " + err;
		});
	};
	return {
		instructEmotion: instructEmotion
	};
}());