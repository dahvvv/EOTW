var SoundInterface = (function(){

	var getEmotionalState = function getEmotionalState (userId, snapshot) {
		// do some possibly-async stuff.  eventually somehow...
		return emotionalState({
			type: 'sound',
			date: snapshot.date,
			keywords: [/* some keywords */],
			continua: [/* some continua */],
			tags: [/* some tags */],
			antiTags: [/* some antiTags */]
		});
	},
	instructEmotion = function instructEmotion (text) {
		// play text thru da speakers
	};

	return {
		getEmotionalState: getEmotionalState,
		instructEmotion: instructEmotion
	};
}());