var emotionalStateBundle = function (opts) {
	checkArgs('emotionalStateBundle',opts,'emotionalStates','userId','snapshot','template','text');

	var keywords = opts.emotionalStates.mapTo('keywords'),
		continua = opts.emotionalStates.mapTo('continua'),
		tags = opts.emotionalStates.mapTo('tags'),
		antiTags = opts.emotionalStates.mapTo('antiTags');

	[keywords,continua,tags,antiTags].forEach(function(ary){
		flattenDestr(ary);
		uniqDestr(ary);
	});

	return {
		emotionalStates: opts.emotionalStates,
		snapshot: opts.snapshot,
		userId: opts.userId,
		template: opts.template,
		text: opts.text,
		keywords: keywords,
		continua: continua,
		tags: tags,
		antiTags: antiTags
	};
}