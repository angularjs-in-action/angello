'use strict';

describe('Controller: MainCtrl', function () {

  // load the controller's module
  beforeEach(module('Angello'));

  var MainCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller) {
    scope = {};
    MainCtrl = $controller('MainCtrl', {
      $scope: scope,
      angelloModel: angelloModelMock()
    });
  }));

  it('should attach a list of story types to the scope', function () {
    expect(scope.types).toBeDefined();
  });

  it('should attach a list of story statuses to the scope', function () {
    expect(scope.statuses).toBeDefined();
  });

  it('should attach a list of stories to the scope', function () {
    expect(scope.stories).toBeDefined();
  });
});
