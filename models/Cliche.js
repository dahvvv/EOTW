var Cliche = (function(){
	var newSnapshot = function newSnapshot () {
		return {
			date: new Date()
		};
	};

	return {
		newSnapshot: newSnapshot
	};
}());