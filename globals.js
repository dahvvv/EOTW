var checkArgs = function checkArgs (funcName, opts) {
	var args = [].slice.call(arguments,2);
	args.forEach(function(arg){
		if (!(opts.hasOwnProperty(arg))) {
			throw "Error: " + funcName + " requires argument '" + arg + "'";
		}
	});
}