describe("oData query: $orderBy", function () {


	describe("String sorting", function () {
		var sortableFields = ["name", "address", "city", "state", "country"];
		describeEach("in {value} order - ", ['dsc', 'asc'], function (direction) {
			it("can sort data using one field", function () {
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

				orderBy(mockAlphaArr, [{
					name: direction
				}]);
				if (direction === "asc") {
					expectedMockAlphaArr.reverse();
				}

				expect(mockAlphaArr).toEqual(expectedMockAlphaArr);
			});

			describeEach("with a subfield in the {value} direction - ", ["asc", "dsc"], function (direction2) {
				it("can sort data using 2 fields", function () {
					var mockAlphaArr = [{
						name: "Jake Howard",
						city: "Atlanta"
					}, {
						name: "Andrew",
						city: "New Jersey"
					}, {
						name: "Jake Howard",
						city: "Los Angeles"
					}, {
						name: "Blake Howard",
						city: "Detroit"
					}, {
						name: "Margaret Keeler",
						city: "Austin"
					}, {
						name: "Tyrone Hunter",
						city: "Austin"
					}, {
						name: "Early Graves",
						city: "Nashville"
					}, {
						name: "Dave Graves",
						city: "New York"
					}, {
						name: "Margaret Keeler",
						city: "New York"
					}, {
						name: "Margaret Keeler",
						city: "Boston"
					}, {
						name: "Haliey Orchard",
						city: "Orlando"
					}, {
						name: "Zeus",
						city: "Alberta"
					}];

					var subArrExpected1 = [{
						name: 'Andrew',
						city: 'New Jersey'
					}, {
						name: 'Blake Howard',
						city: 'Detroit'
					}, {
						name: 'Dave Graves',
						city: 'New York'
					}, {
						name: 'Early Graves',
						city: 'Nashville'
					}, {
						name: 'Haliey Orchard',
						city: 'Orlando'
					}];

					var subArrExpected2 = [{
						name: 'Jake Howard',
						city: 'Atlanta'
					}, {
						name: 'Jake Howard',
						city: 'Los Angeles'
					}];

					var subArrExpected3 = [{
						name: 'Margaret Keeler',
						city: 'Austin'
					}, {
						name: 'Margaret Keeler',
						city: 'Boston'
					}, {
						name: 'Margaret Keeler',
						city: 'New York'
					}];

					var subArrExpected4 = [{
						name: 'Tyrone Hunter',
						city: 'Austin'
					}, {
						name: 'Zeus',
						city: 'Alberta'
					}];

					if(direction2 === "dsc"){
						subArrExpected2.reverse();
						subArrExpected3.reverse();
					}

					var subArrExpected = [].concat(subArrExpected1, subArrExpected2, subArrExpected3, subArrExpected4);

					orderBy(mockAlphaArr, [{
						name: direction,
						city: direction
					}]);

					if (direction === "dsc") {
						subArrExpected.reverse();
					}

					expect(mockAlphaArr).toEqual(subArrExpected);
				});
			});
		});
	});
});