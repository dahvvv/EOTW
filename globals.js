function checkArgs (funcName, opts) {
	var args = [].slice.call(arguments,2);
	args.forEach(function(arg){
		if (!(opts.hasOwnProperty(arg))) {
			throw "Error: " + funcName + " requires argument '" + arg + "'";
		}
	});
}

function fetch (propName) {
	return function (obj) {
		return obj[propName];
	};
}

Array.prototype.mapTo = function (propName) {
	return this.map(fetch(propName));
};

function flatten (multiAry) {
	var flat = [];
	multiAry.forEach(function(ary){
		if (!Array.isArray(ary)) {
			throw Error("Passed flatten an array containing " + 
				ary + ", which is not an inner array.");
		}
		flat = flat.concat(ary);
	});
	return flat;
}

function flatten (ary) {
	// flatten a multidimensional array
	var flat = [];
	(function flattenRecur (item) {
		if (!Array.isArray(item)) {
			flat.push(item);
		} else {
			item.forEach(flattenRecur);
		}
	}(ary));
	return flat;
}

function flattenDestr (ary) {
	// flatten a multidimensional array
	var flat = [],
		args = [0, ary.length];
	(function flattenRecur (item) {
		if (!Array.isArray(item)) {
			flat.push(item);
		} else {
			item.forEach(flattenRecur);
		}
	}(ary));
	[].splice.apply(ary,args.concat(flat));
	return ary;
}

function uniq (ary) {
	var uniq = [];
	ary.forEach(function(x){
		if (uniq.indexOf(x) == -1) uniq.push(x);
	});
	return uniq;
}

function uniqDestr (ary) {
	var x;
	for (var i=ary.length-1; i > -1; i--) {
		x = ary[i];
		if (ary.indexOf(x) !== i) {
			ary.splice(i,1);
		}
	}
	return ary;
}

Array.prototype.filterMin = function filterMin (func,min) {
	var ary = this,
		min = min || 0,
		remaining = ary.length,
		filtered = [],
		test;
	for (var i=0; i < ary.length; i++) {
		// run function no matter what
		test = func(ary[i],i,ary);
		if (min - filtered.length == ary.length - i) {
			filtered.push(ary[filtered.length]);
		} else if (test) {
			filtered.push(ary[i]);
		}
	}
	return filtered;
}

Array.prototype.filterMinRPack = function filterMin (func,min) {
	var ary = this,
		min = min || 0,
		remaining = ary.length,
		filtered = [],
		test;
	for (var i=0; i < ary.length; i++) {
		// run function no matter what
		test = func(ary[i],i,ary);
		if (min - filtered.length == ary.length - i) {
			filtered.push(ary[i]);
		} else if (test) {
			filtered.push(ary[i]);
		}
	}
	return filtered;
}

function aryEqlShlw (ary1,ary2) {
	return ary1.every(function(a1item){
		return ary2.indexOf(a1item) > -1;
	}) && ary2.every(function(a2item){
		return ary1.indexOf(a2item) > -1;
	});
}

function print (modelname, api) {
	return function () {
		console.log('-----PRINT ' + modelname.toUpperCase() + '-----');
		console.log('PROPS:\n');
		var methods = [];
		for (var prop in api) {
			if (typeof api[prop] == 'function') {
				methods.push(prop);
			} else {
				console.log('\t' + prop + ':\t' + api[prop]);
			}
		}
		console.log('METHODS:\n');
		methods.forEach(function(method){
			console.log('\t' + modelname + '.' + method + '()');
		});
		console.log('\n');
	};
}
