var emotionInstructionTemplate = function (opts) {
	checkArgs('emotionInstructionTemplate',opts,'text','types','tags','antiTags');
	var seeded = 0;

	var apply = function apply (emoStates,userId) {
		var keywords = emoStates.mapTo('keywords');
		flattenDestr(keywords);
		uniqDestr(keywords);
		return opts.text.replace(/\b__\w+__\b/g, function () {
			return keywords[Math.floor(Math.random()*keywords.length)];
		});
		// TODO:  make work with more than one keyword!
	},

		equals = function equals (template) {
			return this.text == template.text &&
				aryEqlShlw(this.types, template.types) &&
				aryEqlShlw(this.tags, template.tags) &&
				aryEqlShlw(this.antiTags, template.antiTags);
		};

	return {
		text: opts.text,
		types: opts.types,
		tags: opts.tags,
		antiTags: opts.antiTags,
		apply: apply,
		equals: equals
	};
}