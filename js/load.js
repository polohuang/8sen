var app = angular.module('myApp', []).controller('myController', ['$scope', '$http', controller]);

function controller($scope, $http) {
    var vm = this;
    vm.datas = {};
    vm.loadData = function () {
        $http.get('http://tonyq.org/kptaipei/api-20150628.php').success(function (res) {
            vm.datas = angular.fromJson(res);
            $scope.$apply();
        });
    };
    vm.loadData();
}