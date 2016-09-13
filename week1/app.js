(function(){
'use-strict';

angular.module('LunchCheck', [])
.controller('LunchCheckController', LunchCheckController);
LunchCheckController.$inject = ['$scope'];
function LunchCheckController($scope){
$scope.message = '';

var dishesCount = function(str){
    var count = 0;
    var i = 0;
    if(str){
        while(i < str.length && str[i] == ' ') i++;
        while(i < str.length){
            var first = false;
            while(i < str.length && str[i] != ',') {
                if(first === false) {count++; first = true;}
                i++;
            }
            i++;
        }
    }
    return count;
}
$scope.check = function(){
    var count = dishesCount($scope.name);
    if(count === 0) $scope.message = 'Please enter data first';
    else if(count <= 3) $scope.message = "Enjoy!";
         else $scope.message = "Too much!";
}
}})();