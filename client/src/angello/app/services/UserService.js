angular.module('Angello.Common')
    .service('UserService',
        function () {
            var service = this;

            var currentUser = null;

            service.getCurrentUser = function() {
                return currentUser;
            };

            service.setCurrentUser = function(id, access_token) {
            	currentUser = {
            		id: id,
            		access_token: access_token
            	};
            };

            service.resetUser = function() {
            	currentUser = null;
            };

})
;
