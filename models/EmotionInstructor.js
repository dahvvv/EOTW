var EmotionInstructor = (function(){
	var emotionalStateHistory = [];

	var instructEmotion = function instructEmotion (userId,snapshot) {
		console.log('emotion instructor is instructin!');
		// var emo = getEmotionalState();
		// filterEmotionalState(emo);
		// var template = getTemplate(emo);
		// var text = applyTemplate(userId,emo,template);
	};
	return {
		instructEmotion: instructEmotion
	};
}());