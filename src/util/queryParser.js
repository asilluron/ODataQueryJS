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