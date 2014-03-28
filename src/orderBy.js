function orderBy(data, fields) {

	var keys = Object.keys(fields[0]);
	var comparator = generateComparator(fields[0][keys[0]], keys[0]);
	data.sort(comparator);

	function generateComparator(direction, field) {
		return function (a, b) {
			if(direction === "dsc"){
				var c = a;
				a = b;
				b = c;
			}
			//11.2.5.2 System Query Option $orderby - Null values come first
			if (a[field] == null) {
				return -1;
			}

			if (typeof a[field] === "number" && typeof b[field] === "number") {
				return (a[field] - b[field]);
			}

			return a[field].localeCompare(b[field]);
		};
	}

}