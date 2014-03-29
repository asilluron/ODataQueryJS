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