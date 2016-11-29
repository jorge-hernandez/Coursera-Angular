(function(){
'use strict';
angular.module('ShoppingListCheckOff',[])
.controller('ToBuyController', ToBuyController)
.controller('AlreadyBoughtController', AlreadyBoughtController)
.service('ShoppingListService', ShoppingListService);

ToBuyController.$inject = ['ShoppingListService'];
function ToBuyController(ShoppingListService){
    var itemsToBuy = this;
    itemsToBuy.items = ShoppingListService.getItemsToBuy();    
    itemsToBuy.bought = function(itemIndex){
        ShoppingListService.buy(itemIndex);
    }
}

AlreadyBoughtController.$inject = ['ShoppingListService'];
function AlreadyBoughtController(ShoppingListService){
    var itemsAlreadyBought = this;
    itemsAlreadyBought.items = ShoppingListService.getItemsAlreadyBought();
}

function ShoppingListService(){
    var service = this;
    var itemsToBuy = 
        [{quantity : '10', name :'pineapple'}, {quantity : '2', name : 'apple'},
          {quantity : '5', name :'chocolate'}, {quantity : '3', name : 'tomate'},
          {quantity : '5', name :'peanut bags'}];
    var itemsAlreadyBought = [];
    service.getItemsToBuy = function(){
        return itemsToBuy;
    }
    service.getItemsAlreadyBought = function(){
        return itemsAlreadyBought;
    }
    service.buy = function(itemIndex){
        itemsAlreadyBought.push(itemsToBuy[itemIndex]);
        itemsToBuy.splice(itemIndex, 1);
    }
}




})();