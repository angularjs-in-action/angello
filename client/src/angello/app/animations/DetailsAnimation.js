angular.module('Angello.Common')
    .animation('.details-animation',
        function () {
            return {
                addClass: function (element, className, done) {
                    if (className == 'details-visible') {
                        TweenMax.to(element, 0.5, {right: 0, onComplete: done });
                    }
                    else {
                        done();
                    }
                },
                removeClass: function (element, className, done) {
                    if (className == 'details-visible') {
                        TweenMax.to(element, 0.5, {
                            right: -element.width() + 50,
                            onComplete: done
                        });
                    }
                    else {
                        done();
                    }
                }
            };
        });
