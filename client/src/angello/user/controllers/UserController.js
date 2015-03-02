angular.module('Angello.User')
    .controller('UserCtrl',
        function ($routeParams, user, stories) {
            var myUser = this;

            myUser.userId = $routeParams['userId'];
            myUser.user = user.data;


            myUser.getAssignedStories = function (userId, stories) {
                var assignedStories = {};

                Object.keys(stories, function(key, value) {
                    if (value.assignee == userId) assignedStories[key] = stories[key];
                });

                return assignedStories;
            };

            myUser.stories = myUser.getAssignedStories(myUser.userId, stories);
        });
