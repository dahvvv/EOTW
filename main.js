Cliche.print();
Router.print();
ActionInterface.print();
PleasureInterface.print();
SoundInterface.print();
TimePerceptionInterface.print();
EmotionInstructor.print();

var dave = user({
	preferredName: 'dahhhv'
});

dave.print();

var instructEmo = request({
	userId: dave.id,
	funcName: 'instructEmotion',
	funcArgs: []
});

// instructEmo.print();
