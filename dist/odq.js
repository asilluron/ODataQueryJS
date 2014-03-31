/**
 * @license
 * ODataQueryJS 0.0.0 
 * Copyright 2014 Andrew Silluron
 * Exporting based on Lo-Dash.js 2.4.1, Copyright 2012-2014 The Dojo Foundation
 */

;
(function () {
/**
 * Parses the queryStr and returns an array of query params
 * @method queryParser
 *
 * @param queryObj {Object} A set of query
 * @param queryType {String} $orderBy, $filter, $top etc
 *
 */

function parseQueryObj(queryObj, queryType) {
	var parsedOptions = [];
	Object.keys(queryObj).forEach(function (queryOption) {
		if (isOdataParam(queryOption) && queryOption === queryType) {
			var queryOpts = queryObj[queryOption].split(",");
			switch (queryType) {
			case "$orderBy":
				queryOpts.forEach(function (opt) {
					var optMatches = /([\w\@\$]\w*)(\s+)(asc|desc)/ig.exec(opt);

					if (optMatches.length === 4) {
						var parsedObj = {};
						parsedObj[optMatches[1]] = optMatches[3];
						parsedOptions.push(parsedObj);
					} else {
						//TODO thrown an exception
					}
				});
				break;
			}

			

		} else {
			//TODO throw an exception
		}
		
	});

	return parsedOptions;

	function isOdataParam(param) {
		return true;
	}
}

function parseQueryStr(queryStr) {

}
function orderBy(data, fields) {
	var key = Object.keys(fields[0])[0];
	var comparator = generateComparator(fields[0][key], key);
	data.sort(comparator);

	if (fields.length > 1) {
		var start = 0,
			$prev;
		for (var i = 0, len = data.length; i < len; ++i) {

			if ($prev === data[i][key]) {
				start = i - 1;
				while (i < len && data[start][key] === data[i][key]) {
					i++;
				}
				Array.prototype.splice.apply(data, [start, i - start].concat(orderBy(data.slice(start, i), fields.slice(1))));
			}
			if (typeof data[i] !== "undefined") {
				$prev = data[i][key];
			}
		}
	}
	return data;

	function generateComparator(direction, field) {
		return function (a, b) {

			if (direction === "desc") {
				var c = a;
				a = b;
				b = c;
			}
			//11.2.5.2 System Query Option $orderby - Null values come first
			if (a[field] == null) {
				return -1;
			}

			if (b[field] == null) {
				return 1;
			}

			if (typeof a[field] === "number" && typeof b[field] === "number") {
				return (a[field] - b[field]);
			}
			return a[field].localeCompare(b[field]);
		};
	}
}

	var odataQueries = ["$orderBy"]; //Ensure all queries we support are here
	
	function executeQuery(data, queryObj, queryType){
		switch(queryType){
			case "$orderBy":
				orderBy(data, queryObj);
		}
	}

	function odq(data, query){
		var queryObj = {};

		if(typeof query === "string"){
			queryObj = parseQueryStr(query);
		}
		else if(typeof query === "object"){
			//Parse in order
			var queryKeys = Object.keys(query);
			if(queryKeys.length === 1){
				executeQuery(data, parseQueryObj(query, queryKeys[0]), queryKeys[0]);
			}
			else{
				Object.keys(query).reduce(function(prev, currentKey){
					if(odataQueries.indexOf(currentKey)){
						return executeQuery(data, parseQueryObj(query[currentKey], currentKey), currentKey);
					}
					else {
						return {};
					}
				});
			}
			
		}

	}


	/**
	 * @license
	 * Lo-Dash 2.4.1 <http://lodash.com/>
	 * Copyright 2012-2014 The Dojo Foundation <http://dojofoundation.org/>
	 * Based on Underscore.js 1.6.0 <http://underscorejs.org/LICENSE>
	 * Copyright 2009-2014 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
	 * Available under MIT license <http://lodash.com/license>
	 */

	var objTypes = {
	    'function': true,
	    'object': true
	  };
	var root = (objTypes[typeof window] && window) || this;
  	var freeExports = objTypes[typeof exports] && exports && !exports.nodeType && exports;
  	var freeModule = objTypes[typeof module] && module && !module.nodeType && module;

	if (typeof define == 'function' && typeof define.amd == 'object' && define.amd) {
	    root.odquery = odq;
	    define(function() {
	      return odq;
	    });
	  }
	  else if (freeExports && freeModule) {
	    if (moduleExports) {
	      (freeModule.exports = odquery).odquery = odq;
	    }
	    else {
	      freeExports.odquery = odq;
	    }
	  }
	  else {
	    root.odquery = odq;
	  }


	root.odquery = odq;


}.call(this));