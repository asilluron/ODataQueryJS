describe("oData query: $orderBy", function () {


	describe("String sorting", function () {
		describeEach("in {value} order - ", ['desc', 'asc'], function (direction) {
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

			it("can sort data that contains only 1 element", function () {
				var mockAlphaArr = [{
					name: "Jake"
				}];
				var expectedMockAlphaArr = [{
					name: "Jake"
				}];

				orderBy(mockAlphaArr, [{
					name: direction
				}]);

				expect(mockAlphaArr).toEqual(expectedMockAlphaArr);
			});

			it("can sort data that contains only 0 elements", function () {
				var mockAlphaArr = [];
				var expectedMockAlphaArr = [];

				orderBy(mockAlphaArr, [{
					name: direction
				}]);

				expect(mockAlphaArr).toEqual(expectedMockAlphaArr);
			});

			it("can sort data that contains all similar elements", function () {
				var mockAlphaArr = ["a", "a", "a", "a"];
				var expectedMockAlphaArr = ["a", "a", "a", "a"];

				orderBy(mockAlphaArr, [{
					name: direction
				}]);

				expect(mockAlphaArr).toEqual(expectedMockAlphaArr);
			});

			describeEach("with a subfield in the {value} direction - ", ["asc", "desc"], function (direction2) {
				it("can sort data using 2 fields", function () {
					var mockAlphaArr = [{
						name: "A",
						city: "S"
					}, {
						name: "A",
						city: "X"
					}, {
						name: "K",
						city: "T"
					}, {
						name: "U",
						city: "Z"
					}, {
						name: "A",
						city: "A"
					}, {
						name: "U",
						city: "P"
					}, {
						name: "U",
						city: "Q"
					}];

					var subArrExpected1 = [{
						name: 'A',
						city: 'A'
					}, {
						name: 'A',
						city: 'S'
					}, {
						name: 'A',
						city: 'X'
					}];

					var subArrExpected2 = [{
						name: 'K',
						city: 'T'
					}];

					var subArrExpected3 = [{
						name: 'U',
						city: 'P'
					}, {
						name: 'U',
						city: 'Q'
					}, {
						name: 'U',
						city: 'Z'
					}];


					if (direction2 === "desc") {
						subArrExpected1.reverse();
						subArrExpected3.reverse();
					}

					var subArrExpected;
					if (direction === "asc") {
						subArrExpected = [].concat(subArrExpected1, subArrExpected2, subArrExpected3);
					} else {
						subArrExpected = [].concat(subArrExpected3, subArrExpected2, subArrExpected1);
					}

					orderBy(mockAlphaArr, [{
						name: direction
					}, {
						city: direction2
					}]);



					expect(mockAlphaArr).toEqual(subArrExpected);
				});
			});
		});
	});

	describe("Number sorting", function () {
		describeEach("in {value} order - ", ['desc', 'asc'], function (direction) {
			it("can sort data using one field", function () {
				var mockAlphaArr = [{
					name: 3
				}, {
					name: 0
				}, {
					name: 1
				}];
				var expectedMockAlphaArr = [{
					name: 0
				}, {
					name: 1
				}, {
					name: 3
				}];

				orderBy(mockAlphaArr, [{
					name: direction
				}]);
				if (direction === "desc") {
					expectedMockAlphaArr.reverse();
				}

				expect(mockAlphaArr).toEqual(expectedMockAlphaArr);
			});

			it("can sort data that contains only 1 element", function () {
				var mockAlphaArr = [{
					name: 1
				}];
				var expectedMockAlphaArr = [{
					name: 1
				}];

				orderBy(mockAlphaArr, [{
					name: direction
				}]);

				expect(mockAlphaArr).toEqual(expectedMockAlphaArr);
			});

			it("can sort data that contains all similar elements", function () {
				var mockAlphaArr = [0, 0, 0, 0];
				var expectedMockAlphaArr = [0, 0, 0, 0];

				orderBy(mockAlphaArr, [{
					name: direction
				}]);

				expect(mockAlphaArr).toEqual(expectedMockAlphaArr);
			});

			describeEach("with a subfield in the {value} direction - ", ["asc", "desc"], function (direction2) {
				it("can sort data using 2 fields", function () {
					var mockAlphaArr = [{
						name: 0,
						city: 2
					}, {
						name: 0,
						city: 3
					}, {
						name: 4,
						city: -1
					}, {
						name: 5,
						city: 23213
					}, {
						name: 0,
						city: 1
					}, {
						name: 5,
						city: 6
					}, {
						name: 5,
						city: 5
					}];

					var subArrExpected1 = [{
						name: 0,
						city: 1
					}, {
						name: 0,
						city: 2
					}, {
						name: 0,
						city: 3
					}];

					var subArrExpected2 = [{
						name: 4,
						city: -1
					}];

					var subArrExpected3 = [{
						name: 5,
						city: 5
					}, {
						name: 5,
						city: 6
					}, {
						name: 5,
						city: 23213
					}];


					if (direction2 === "desc") {
						subArrExpected1.reverse();
						subArrExpected3.reverse();
					}

					var subArrExpected;
					if (direction === "asc") {
						subArrExpected = [].concat(subArrExpected1, subArrExpected2, subArrExpected3);
					} else {
						subArrExpected = [].concat(subArrExpected3, subArrExpected2, subArrExpected1);
					}

					orderBy(mockAlphaArr, [{
						name: direction
					}, {
						city: direction2
					}]);



					expect(mockAlphaArr).toEqual(subArrExpected);
				});
			});
		});
	});

	describe("Non and mixed alphanumeric sorting", function () {
		describeEach("in {value} order - ", ['desc', 'asc'], function (direction) {
			it("will sort null before alphanumeric", function () {
				var mockAlphaArr = [{
					name: "Jake"
				}, {
					name: null
				}, {
					name: "Zeus"
				}];
				var expectedMockAlphaArr = [{
					name: null
				}, {
					name: "Jake"
				}, {
					name: "Zeus"
				}];

				orderBy(mockAlphaArr, [{
					name: direction
				}]);
				if (direction === "desc") {
					expectedMockAlphaArr.reverse();
				}

				expect(mockAlphaArr).toEqual(expectedMockAlphaArr);
			});
		});
	});
});