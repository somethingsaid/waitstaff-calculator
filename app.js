angular.module('myApp', [])
.controller('waitstaffController', function($scope) {
	// Reset total earnings data
    $scope.reset = function() {
		$scope.earnings = {
			mealCount: 0,
			tipTotal: 0
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