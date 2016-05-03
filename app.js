angular.module('myApp', ['ngRoute'])
.config(['$routeProvider', function($routeProvider){
    $routeProvider.when('/', { //i.e, when user visits / (root), app should respond with home.html and HomeCtrl
        templateUrl : 'home.html',
        controller : 'homeCtrl'
    })
    .when('/new_meal', {
        templateUrl : 'new_meal.html',
        controller : 'mealCtrl'
    })
    .when('/my_earnings', {
        templateUrl: 'my_earnings.html',
        controller: 'earningsCtrl'
    })
    .when('/error', {
        template: '<p>Error.  Page Not Found.</p>'
    })
    .otherwise('/error');
}])
.run(function($rootScope, $location) {
    $rootScope.$on('$routeChangeError', function() {
        $location.path('/error');
    });
})
.controller('homeCtrl', ['$scope', function($scope) {
    //empty for now
}])
.controller('mealCtrl', ['$scope', function($scope) {
    //empty for now
}])
.controller('earningsCtrl', ['$scope', function($scope) {
    //empty for now
}])
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