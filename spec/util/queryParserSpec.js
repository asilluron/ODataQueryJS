describe("Query parsing", function () {
	describe("using query param objects", function () {
		describeEach("with {value} query", ["$orderBy"], function (queryType) {
			var queryObject = {};
			queryObject[queryType] = "rating desc, age asc";
			queryObject.random = "dontparse desc, dontparse2 asc";
			queryObject.random2 = "dontparse3 desc, dontparse4 asc";

			it("will return an array of key/values (objects)", function () {
				var actualParse = parseQueryObj(queryObject, queryType);
				expect(actualParse).toEqual([{
					rating: "desc"
				}, {
					age: "asc"
				}]);
			});
		});
	});

	describe("using a string", function () {

	});
});