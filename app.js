angular.module('myApp', [])
.controller('waitstaffController', function($scope) {
	// Init/Reset total earnings data
    $scope.reset = function() {
		$scope.data = {
			/* Meal data */
			mealPrice: null,
			mealTaxPct: null,
			mealTipPct: null,
			/* Calculated meal data */
			mealSubTotal: 0,
			mealTipDollar: 0,
			mealTotal: 0,
			/* Aggregate data */
		    mealCount: 0,
			tipTotal: 0,
			avgTip: 0,
			submitted: false
		};
	}
	$scope.reset();

    // Submit meal details
    $scope.submit = function() {
    	$scope.data.submitted = true;
    	if ($scope.mealDetails.$valid) {
    		console.log("Valid!");
    		/* Calculated meal data */
    		$scope.data.mealSubTotal = ($scope.data.mealPrice * (($scope.data.mealTaxPct / 100.00) + 1)).toFixed(2);
    		$scope.data.mealTipDollar = (($scope.data.mealTipPct / 100) * $scope.data.mealPrice).toFixed(2);
    		$scope.data.mealTotal = (($scope.data.mealSubTotal * 1) + ($scope.data.mealTipDollar * 1)).toFixed(2);
    		/* Aggregate data */
    		$scope.data.mealCount++;
    		$scope.data.tipTotal = (($scope.data.tipTotal * 1) + ($scope.data.mealTipDollar * 1)).toFixed(2);
    		$scope.data.avgTip = ($scope.data.tipTotal / $scope.data.mealCount).toFixed(2);
    		/* Null out meal details in input */
    		$scope.clear();
    	}
    	else {
    		console.log("Missing data");
    	}
    }

    // Reset meal details
    $scope.clear = function() {
    	$scope.data.mealPrice = null;
    	$scope.data.mealTaxPct = null;
    	$scope.data.mealTipPct = null;
    	$scope.data.submitted = false;
    }
});