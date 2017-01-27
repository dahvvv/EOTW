var EmotionInstructor = (function(){
	var emotionalStateHistory = [],

		templates = [emotionInstructionTemplate({
			text: 'Lately sound has been __cool__.  Try and feel __cool__.',
			types: ['sound','pleasure'],
			tags: '*',
			antiTags: '*'
		}),
		emotionInstructionTemplate({
			text: 'You should def feel __cool__.',
			types: ['sound','action','pleasure'],
			tags: ['good'],
			antiTags: '*'
		}),
		emotionInstructionTemplate({
			text: 'You should DEF feel meta __cool__ world peace.',
			types: ['meta'],
			tags: ['good'],
			antiTags: '*'
		})],

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
			// filter most recent by this user, keeping min of 1 emoState
			var latest = latestByUser(userId);
			emoStates = emoStates.filterMin(function(eS){
				return eS.date != latest.snapshot.date;
			},1);
			// filter any with no continua with intensity > 0.5
			emoStates = emoStates.filterMin(function(eS){
				return eS.continua.some(function(c){
					return c.intensity > 0.5;
				});
			},1);
			return emoStates;
		},

		getTemplate = function getTemplate (emoStates, userId) {
			var types = emoStates.mapTo('type');
			// only templates who have at least one type included on yr type list
			var templateOptions = templates.filterMin(function(t){
				return t.types.some(function(type){
					return types.indexOf(type) > -1;
				});
			},1);
			// TODO:  something with tags / antitags!
			// choose template not in history, if you can
			templateOptions = templateOptions.filterMin(function(t){
				var inHistory = emotionalStateHistory.some(function(eSB){
					throw 'yo err';
					eSB.template.equals(t);
				});
				return !inHistory;
			},1);

			// choose one at random
			return templateOptions[Math.floor(Math.random()*templateOptions.length)];
		};

	var instructEmotion = function instructEmotion (userId,snapshot) {
		getEmotionalStates(userId,snapshot).then(function(emoStates){
			return filterEmoStates(emoStates,userId);
		}).then(function(emoStates){
			var template = getTemplate(emoStates,userId);
			var text = template.apply(emoStates,userId);
			return emotionalStateBundle({
				emotionalStates: emoStates,
				userId: userId,
				snapshot: snapshot,
				template: template,
				text: text
			});
		}).then(function(eSB){
			emotionalStateHistory.push(eSB);
			SoundInterface.instructEmotion(eSB);
		}).catch(function(err){
			throw "Error in EmotionInstructor:  " + err;
		});
	};
	return {
		instructEmotion: instructEmotion
	};
}());