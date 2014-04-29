window.Firebase = function() {

};

angular.module('firebase', [])
.factory('$firebaseSimpleLogin', function($q) {
  return function(firebase) {
    return {
      $getCurrentUser: function() {
        return $q.when(null);
      }
    };
  };
});
