(function () {

var app = angular.module('queup');

app.factory('Queue', function($firebaseArray){
  var ref = new Firebase('https://shining-inferno-5737.firebaseio.com/');
  return $firebaseArray(ref);
});




})();
