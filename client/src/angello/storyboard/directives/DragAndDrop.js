angular.module('Angello.Storyboard')
    .factory('$dragging', function () {
        var data = null;
        var type = null;

        return {
            getData: function () {
                return data;
            },
            getType: function () {
                return type;
            },
            setData: function (newData) {
                data = newData;
                return data;
            },
            setType: function (newType) {
                type = newType;
                return type;
            }
        };
    })

    .directive('dragContainer', function () {
        return {
            restrict: 'A',
            controller: 'DragContainerController',
            controllerAs: 'dragContainer',
            link: function ($scope, $element, $attrs, dragContainer) {
                dragContainer.init($element);

                $element.on('dragstart', dragContainer.handleDragStart.bind(dragContainer));
                $element.on('dragend', dragContainer.handleDragEnd.bind(dragContainer));
                // $element.on('dragenter', dragContainer.handleDragEnter.bind(dragContainer));

                $scope.$watch($attrs.dragContainer, dragContainer.updateDragData.bind(dragContainer));
                $attrs.$observe('mimeType', dragContainer.updateDragType.bind(dragContainer));

                $attrs.$set('draggable', true);
            }
        };
    })

    .controller('DragContainerController', function ($dragging) {
        var dragContainer = this;

        dragContainer.init = function (el) {
            dragContainer.el = el;
        };

        dragContainer.handleDragStart = function (e) {
            if (e.originalEvent) e = e.originalEvent;

            // console.log('handleDragStart', e);
            e.dataTransfer.dropEffect = 'move';
            e.dataTransfer.effectAllowed = 'move';

            dragContainer.el.addClass('drag-container-active');
            dragContainer.dragging = true;

            $dragging.setData(dragContainer.data);
            $dragging.setType(dragContainer.type);
        };

        dragContainer.handleDragEnd = function (e) {
            if (e.originalEvent) e = e.originalEvent;

            angular.element(e.target).removeClass('drag-active');

            dragContainer.el.removeClass('drag-container-active');
            dragContainer.dragging = false;

            $dragging.setData(null);
            $dragging.setType(null);
        };

        dragContainer.updateDragData = function (data) {
            // console.log('dragContainer.updateDragData', data);

            dragContainer.data = data;

            if (dragContainer.dragging) $dragging.setData(dragContainer.data);
        };

        dragContainer.updateDragType = function (type) {
            // console.log('dragContainer.updateDragType', type);

            dragContainer.type = type || 'text/x-drag-and-drop';

            if (dragContainer.dragging) $dragging.setType(dragContainer.type);
        };
    })


    .directive('dropContainer', function ($document, $parse) {
        return {
            restrict: 'A',
            controller: 'DropContainerController',
            controllerAs: 'dropContainer',
            link: function ($scope, $element, $attrs, dropContainer) {
                var bindTo = function (event) {
                    return function (e) {
                        return $scope.$apply(function () {
                            return dropContainer['handle' + event](e);
                        });
                    };
                };

                var dragEnd = dropContainer.handleDragEnd.bind(dropContainer);
                var handleDragEnter = bindTo('DragEnter');
                var handleDragOver = bindTo('DragOver');
                var handleDragLeave = bindTo('DragLeave');
                var handleDrop = bindTo('Drop');


                dropContainer.init($element, $scope, {
                    onDragEnter: $parse($attrs.onDragEnter),
                    onDragOver: $parse($attrs.onDragOver),
                    onDragLeave: $parse($attrs.onDragLeave),
                    onDrop: $parse($attrs.onDrop)
                });

                $element.on('dragenter', handleDragEnter);
                $element.on('dragover', handleDragOver);
                $element.on('dragleave', handleDragLeave);
                $element.on('drop', handleDrop);

                $scope.$watch($attrs.accepts, dropContainer.updateMimeTypes.bind(dropContainer));

                $document.on('dragend', dragEnd);

                $scope.$on('$destroy', function () {
                    $document.off('dragend', dragEnd);
                });
            }
        };
    })

    .controller('DropContainerController', function ($dragging) {
        var dropContainer = this;
        var targets = {};
        var validAnchors = 'center top top-right right bottom-right bottom bottom-left left top-left'.split(' ');

        dropContainer.init = function (el, scope, callbacks) {
            dropContainer.el = el;
            dropContainer.scope = scope;
            dropContainer.callbacks = callbacks;
            dropContainer.accepts = ['text/x-drag-and-drop'];

            dropContainer.el.addClass('drop-container');
        };

        dropContainer.addDropTarget = function (anchor, dropTarget) {
            if (validAnchors.indexOf(anchor) < 0) throw new Error('Invalid anchor point ' + anchor);
            if (targets[anchor]) throw new Error('Duplicate drop targets for the anchor ' + anchor);

            targets[anchor] = dropTarget;
        };

        dropContainer.removeDropTarget = function (anchor) {
            if (targets[anchor] && targets[anchor] === anchor) {
                dropContainer.activeTarget = null;
            }

            delete targets[anchor];
        };

        dropContainer.updateMimeTypes = function (mimeTypes) {
            if (!mimeTypes) mimeTypes = ['text/x-drag-and-drop'];
            if (!angular.isArray(mimeTypes)) mimeTypes = [mimeTypes];

            // console.log('dropContainer.updateMimeTypes', mimeTypes);

            dropContainer.accepts = mimeTypes;
        };

        dropContainer.updateDragTarget = function (e, skipUpdateTarget) {
            if (e.originalEvent) e = e.originalEvent;

            var activeTarget = null;
            var activeAnchor = null;
            var minDistanceSq = Number.MAX_VALUE;

            var prevAnchor = dropContainer.activeAnchor;
            var prevTarget = dropContainer.activeTarget;

            if (!skipUpdateTarget) {
                angular.forEach(targets, function (dropTarget, anchor) {
                    var width = dropContainer.el[0].offsetWidth;
                    var height = dropContainer.el[0].offsetHeight;
                    var anchorX = width / 2;
                    var anchorY = height / 2;

                    if (anchor.indexOf('left') >= 0) anchorX = 0;
                    if (anchor.indexOf('top') >= 0) anchorY = 0;
                    if (anchor.indexOf('right') >= 0) anchorX = width;
                    if (anchor.indexOf('bottom') >= 0) anchorY = height;

                    var distanceSq = Math.pow(anchorX - e.offsetX, 2) + Math.pow(anchorY - e.offsetY, 2);

                    if (distanceSq < minDistanceSq) {
                        activeAnchor = anchor;
                        activeTarget = dropTarget;
                        minDistanceSq = distanceSq;
                    }
                });
            }

            dropContainer.activeAnchor = activeAnchor;
            dropContainer.activeTarget = activeTarget;

            var eventData = {
                $event: e,
                data: $dragging.getData(),
                anchor: activeAnchor,
                target: activeTarget,
                prevAnchor: prevAnchor,
                prevTarget: prevTarget
            };

            if (prevTarget !== activeTarget) {
                if (prevTarget) {
                    dropContainer.el.removeClass('drop-container-active-' + prevAnchor);
                    prevTarget.handleDragLeave(eventData);
                }

                if (activeTarget) {
                    dropContainer.el.addClass('drop-container-active-' + activeAnchor);
                    activeTarget.handleDragEnter(eventData);
                }
            }

            return eventData;
        };

        dropContainer.handleDragEnter = function (e) {
            if (e.originalEvent) e = e.originalEvent;

            // console.log('handleDragEnter', e, dropContainer.accepts, $dragging.getType());

            if (!dropContainer.accepts || dropContainer.accepts.indexOf($dragging.getType()) >= 0) {
                e.preventDefault();
            } else {
                return;
            }

            var eventData = dropContainer.updateDragTarget(e);

            dropContainer.el.children().css({'pointer-events': 'none'});
            dropContainer.el.addClass('drop-container-active');

            if (dropContainer.callbacks.onDragEnter) {
                dropContainer.callbacks.onDragEnter(dropContainer.scope, eventData);
            }
        };

        dropContainer.handleDragOver = function (e) {
            if (e.originalEvent) e = e.originalEvent;

            // console.log('dropContainer.handleDragOver', e);

            if (!dropContainer.accepts || dropContainer.accepts.indexOf($dragging.getType()) >= 0) {
                e.preventDefault();
            } else {
                return;
            }

            var eventData = dropContainer.updateDragTarget(e);

            if (eventData.target) {
                eventData.target.handleDragOver(eventData);
            }

            if (dropContainer.callbacks.onDragOver) {
                dropContainer.callbacks.onDragOver(dropContainer.scope, eventData);
            }
        };

        dropContainer.handleDragLeave = function (e) {
            if (e.originalEvent) e = e.originalEvent;

            // console.log('dropContainer.handleDragLeave', e);

            var eventData = dropContainer.updateDragTarget(e, true);

            dropContainer.el.children().css({'pointer-events': null});
            dropContainer.el.removeClass('drop-container-active');

            if (dropContainer.callbacks.onDragLeave) {
                dropContainer.callbacks.onDragLeave(dropContainer.scope, eventData);
            }
        };

        dropContainer.handleDragEnd = function (e) {
            // console.log('dropContainer.handleDragEnd', e);

            dropContainer.el.children().css({'pointer-events': null});
            dropContainer.el.removeClass('drop-container-active');
        };

        dropContainer.handleDrop = function (e) {
            if (e.originalEvent) e = e.originalEvent;

            // console.log('dropContainer.handleDrop', e);

            if (!dropContainer.accepts || dropContainer.accepts.indexOf($dragging.getType()) >= 0) {
                e.preventDefault();
            } else {
                return;
            }

            var eventData = dropContainer.updateDragTarget(e);

            if (eventData.target) {
                eventData.target.handleDrop(eventData);
            }

            if (dropContainer.callbacks.onDrop) {
                dropContainer.callbacks.onDrop(dropContainer.scope, eventData);
            }

            dropContainer.handleDragEnd(e);
        };
    })

    .directive('dropTarget', function ($parse) {
        return {
            restrict: 'A',
            require: ['^dropContainer', 'dropTarget'],
            controller: 'DropTargetController',
            controllerAs: 'dropTarget',
            link: function ($scope, $element, $attrs, ctrls) {
                var dropContainer = ctrls[0];
                var dropTarget = ctrls[1];
                var anchor = $attrs.dropTarget || 'center';
                var destroy = dropContainer.removeDropTarget.bind(dropContainer, anchor);

                $element.addClass('drop-target drop-target-' + anchor);

                dropTarget.init($element, $scope, {
                    onDragEnter: $parse($attrs.onDragEnter),
                    onDragOver: $parse($attrs.onDragOver),
                    onDragLeave: $parse($attrs.onDragLeave),
                    onDrop: $parse($attrs.onDrop),
                });

                dropContainer.addDropTarget(anchor, dropTarget);

                $scope.$on('$destroy', destroy);
            }
        };
    })

    .controller('DropTargetController', function () {
        var dropTarget = this;

        // TODO: Luke, is passing in scope from the link function necessary?
        dropTarget.init = function (el, scope, callbacks) {
            dropTarget.el = el;
            dropTarget.scope = scope;
            dropTarget.callbacks = callbacks;
        };

        dropTarget.handleDragEnter = function (eventData) {
            // console.log('dropTarget.handleDragEnter', eventData);

            dropTarget.el.addClass('drop-target-active');

            if (dropTarget.callbacks.onDragEnter) {
                dropTarget.callbacks.onDragEnter(dropTarget.scope, eventData);
            }
        };

        dropTarget.handleDragOver = function (eventData) {
            // console.log('dropTarget.handleDragOver', eventData);

            if (dropTarget.callbacks.onDragOver) {
                dropTarget.callbacks.onDragOver(dropTarget.scope, eventData);
            }
        };

        dropTarget.handleDragLeave = function (eventData) {
            // console.log('dropTarget.handleDragLeave', eventData);

            dropTarget.el.removeClass('drop-target-active');

            if (dropTarget.callbacks.onDragLeave) {
                dropTarget.callbacks.onDragLeave(dropTarget.scope, eventData);
            }
        };

        dropTarget.handleDrop = function (eventData) {
            // console.log('dropTarget.handleDrop', eventData);

            if (dropTarget.callbacks.onDrop) {
                dropTarget.callbacks.onDrop(dropTarget.scope, eventData);
            }
        };
    });
