angular.module('myApp', [])
.controller('waitstaffController', function($scope) {
	// Init/Reset total earnings data
    $scope.reset = function() {
		$scope.data = {
			/* Meal data */
			mealPrice: null,
			mealTaxPct: null,
			mealTipPct: null,
			mealSubTotal: 0.00,
			mealTipDollar: 0.00,
			mealTotal: 0.00,
			/* Aggregate data */
		    mealCount: 0.00,
			tipTotal: 0.00,
			avgTip: 0.00
		}
	}
	$scope.reset();

    // Submit meal details
    $scope.submit = function() {
    	if ($scope.mealDetails.$valid) {
    		console.log("Valid!");
    	}
    	else {
    		console.log("Missing data");
    	}
    }
});