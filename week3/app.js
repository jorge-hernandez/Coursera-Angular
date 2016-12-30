(function(){
'use strict';
angular.module('NarrowItDownApp', [])
.controller('NarrowItDownController', NarrowItDownController)
.service('MenuSearchService', MenuSearchService)
.directive('foundItems', FoundItemsDirective)
.constant('ApiBasePath'," https://davids-restaurant.herokuapp.com");

function FoundItemsDirective(){
  var ddo = {
    templateUrl: 'foundItems.html',
    scope:{
      items: '<',
      onRemove: '&'
    }
  };
  return ddo;
}
NarrowItDownController.$inject = ['MenuSearchService'];
function NarrowItDownController(MenuSearchService){
  var ctrl = this;
  ctrl.items = [];
  ctrl.searchTerm = "";
  ctrl.getMatchedMenuItems = function(){
    var promise = MenuSearchService.getMatchedMenuItems(ctrl.searchTerm)
    .then(function(response){

      ctrl.items = MenuSearchService.found;
    }, function(error){
    })
  }
  ctrl.remove = function(index){
    MenuSearchService.remove(index);
  }
}

MenuSearchService.$inject = ['$http', 'ApiBasePath'];
function MenuSearchService($http, ApiBasePath){
  var service =this;
  service.found = [];

  service.getMatchedMenuItems = function(searchTerm){
    service.found = [];
    var response = $http({
      method: 'GET',
      url: (ApiBasePath + '/menu_items.json')
    }).then(
      function(response){
          response.data.menu_items.map(
            function(element){
              if(element.description.indexOf(searchTerm) != -1 &&
                 searchTerm != "") {
                  service.found.push(element);
              }
            }
          )
      },
      function(error){
        console.log('error');
      });
    return response;
  }
  service.remove = function(index){
    service.found.splice(index,1);
  }
}
})();
