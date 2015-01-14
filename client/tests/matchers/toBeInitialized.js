beforeEach(function() {
  jasmine.addMatchers({
    toBeInitialized: function() {
      return {
        compare: function(ctrl) {
          var result = {pass: true};

          // Test currentStory
          if (ctrl.currentStory !== null) {
            result.pass = false;
            result.message = "Expected currentStory, which had a value of " + ctrl.currentStory + ", to be null";
            return result;

            // Test editedStory
          } else if (JSON.stringify(ctrl.editedStory) != '{}') {
            result.pass = false;
            result.message = "Expected editedStory, which had a value of " + JSON.stringify(ctrl.editedStory) + ", to be {}";
            return result;

            // Test stories
          } else if (ctrl.stories.length !== 2) {
            result.pass = false;
            result.message = "Expected stories.length, which had a value of " + ctrl.stories.length + ", to be 2";
            return result;

          } else if (ctrl.stories[0].id !== '1') {
            result.pass = false;
            result.message = "Expected stories[0].id, which had a value of " + ctrl.stories[0].id + ", to be 1";
            return result;

            // Test Types
          } else if (ctrl.types.length !== 4) {
            result.pass = false;
            result.message = "Expected types.length, which had a value of " + ctrl.types.length + ", to be 4";
            return result;

          } else if (ctrl.types[0].name !== 'Feature') {
            result.pass = false;
            result.message = "Expected types[0].name, which had a value of " + ctrl.types[0].name + ", to be Feature";
            return result;

            // Test statuses
          } else if (ctrl.statuses.length !== 5) {
            result.pass = false;
            result.message = "Expected statuses.length, which had a value of " + ctrl.statuses.length + ", to be 5";
            return result;

          } else if (ctrl.statuses[0].name !== 'To Do') {
            result.pass = false;
            result.message = "Expected statuses[0].name, which had a value of " + ctrl.statuses[0].name + ", to be To Do";
            return result;

            // Test users
          } else if (ctrl.users.length !== 2) {
            result.pass = false;
            result.message = "Expected users.length, which had a value of " + ctrl.users.length + ", to be 2";
            return result;

          } else if (ctrl.users[0].id !== '1') {
            result.pass = false;
            result.message = "Expected users[0].id, which had a value of " + ctrl.users[0].id + ", to be 1";
            return result;
          }

          return result;
        }};
    }
  });
});
