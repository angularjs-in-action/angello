angular.module('Angello.User')
    .controller('UserCtrl',
    function ($routeParams, $log, user, stories) {
        var myUser = this;

        myUser.userId = $routeParams['userId'];
        myUser.user = user.data;

        $log.debug('user: ', user, '   stories: ', stories)
        myUser.stories = stories.data;
        myUser.getAssignedStories = function (userId, stories) {
            var assignedStories = {};
            var keys = Object.keys(stories);
            for (var i = 0, len = keys.length; i < len; i++) {
                var key = keys[i];
                if (stories[key].assignee == userId) assignedStories[key] = stories[key];
            }
            return assignedStories;
        };

        myUser.stories = myUser.getAssignedStories(myUser.userId, myUser.stories);
    });
