var request = function request (opts) {
	checkArgs('request',opts,'userId','funcName','funcArgs');
	var req = {
		userId: opts.userId,
		funcName: opts.funcName,
		funcArgs: opts.funcArgs
	};
	theRouter.request(req);
};