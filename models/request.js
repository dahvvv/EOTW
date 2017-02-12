var request = function request (opts) {
	checkArgs('request',opts,'userId','funcName','funcArgs');
	var req = {
		class: 'request',
		userId: opts.userId,
		funcName: opts.funcName,
		funcArgs: opts.funcArgs
	};
	req.print = print('request', req);
	Router.request(req);
	return req;
};