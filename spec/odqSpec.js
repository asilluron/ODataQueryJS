describe("odquery usage", function () {
	it("will publish it's namespace to the global context", function () {
		var objTypes = {
			'function': true,
			'object': true
		};
		var root = (objTypes[typeof window] && window) || this;

		expect(typeof root.odquery).toBe("function");
	});

	describeEach(" - Routing $orderBy query with {value} order", ['asc', 'desc'], function (direction) {
		it("standard usage with object for the query", function () {
			var mockAlphaArr = [{
				name: "Jake"
			}, {
				name: "Andrew"
			}, {
				name: "Zeus"
			}];
			var expectedMockAlphaArr = [{
				name: "Zeus"
			}, {
				name: "Jake"
			}, {
				name: "Andrew"
			}];

			if (direction === "asc") {
				expectedMockAlphaArr.reverse();
			}

			odquery(mockAlphaArr, {
				$orderBy: "name " + direction
			});

			expect(mockAlphaArr).toEqual(expectedMockAlphaArr);
		});
	});

});