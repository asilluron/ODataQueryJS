
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