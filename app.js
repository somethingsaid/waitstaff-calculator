angular.module('myApp', ['ngRoute'])
.config(['$routeProvider', function($routeProvider){
    $routeProvider.when('/', { //i.e, when user visits / (root), app should respond with home.html and HomeCtrl
        templateUrl : 'home.html',
        controller : 'homeCtrl'
    })
    .when('/new_meal', {
        templateUrl : 'new_meal.html',
        controller : 'waitstaffController'
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
.controller('waitstaffController', ['$scope', '$rootScope', function($scope, $rootScope) {
    $scope.mealData = {
        //Meal Data
        mealPrice: 0,
        mealTaxPct: 0,
        mealTipPct: 0,
        //Calculated meal data
        mealSubTotal: 0,
        mealTipDollar: 0,
        mealTotal: 0
    }
    $rootScope.earningsData = $rootScope.earningsData || {
            /* Earnings data */
            mealCount: 0,
            tipTotal: 0,
            avgTip: 0
    };
    // Submit meal details
    $scope.submit = function() {
        $scope.mealData.submitted = true;
        if ($scope.mealDetails.$valid) {
            console.log("Valid!");
            /* Calculated meal data */
            $scope.mealData.mealSubTotal = ($scope.mealData.mealPrice * (($scope.mealData.mealTaxPct / 100.00) + 1)).toFixed(2);
            $scope.mealData.mealTipDollar = (($scope.mealData.mealTipPct / 100) * $scope.mealData.mealPrice).toFixed(2);
            $scope.mealData.mealTotal = (($scope.mealData.mealSubTotal * 1) + ($scope.mealData.mealTipDollar * 1)).toFixed(2);
            /* Earnings data */
            $rootScope.earningsData.mealCount++;
            $rootScope.earningsData.tipTotal = (($rootScope.earningsData.tipTotal * 1) + ($scope.mealData.mealTipDollar * 1)).toFixed(2);
            $rootScope.earningsData.avgTip = ($rootScope.earningsData.tipTotal / $rootScope.earningsData.mealCount).toFixed(2);
            console.log('Meal #: ' + $rootScope.earningsData.mealCount + '; Tip Total: ' + $rootScope.earningsData.tipTotal + '; AvgTip: ' + $rootScope.earningsData.avgTip);
            /* Null out meal details in input */
            $scope.clear();
        }
        else {
            console.log("Missing data");
        }
    }

    // Reset meal details
    $scope.clear = function() {
        $scope.mealData.mealPrice = null;
        $scope.mealData.mealTaxPct = null;
        $scope.mealData.mealTipPct = null;
        $scope.mealData.submitted = false;
    };
}])
.controller('earningsCtrl', ['$scope', '$rootScope', function($scope, $rootScope) {
    // Init/Reset total earnings data
    $scope.reset = function() {
        $rootScope.earningsData = {
            /* Earnings data */
            mealCount: 0,
            tipTotal: 0,
            avgTip: 0
        };
    }
}]);