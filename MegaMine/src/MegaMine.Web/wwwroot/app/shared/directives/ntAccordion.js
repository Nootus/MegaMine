'use strict';
angular.module('megamine').directive('ntAccordion', ntAccordion)
ntAccordion.$inject = ['$compile', '$timeout'];

function ntAccordion($compile, $timeout) {
    return {
        restrict: 'AEC',
        scope: {
        },
        link: link
    }

    function link(scope, element, attrs) {
        //scope variables
        scope.current = null;
        scope.height = [];
        scope.items = [];
        scope.zero = { height: 0 };
        scope.toggle = function (i) {
            scope.current = scope.current === i ? null : i;
            scope.height[i] = { 'height': scope.items[i].querySelectorAll('.inner-content')[0].offsetHeight + 'px' };
        };

        var itemSelector = attrs.itemSelector || 'li',
            titleSelector = attrs.titleSelector || 'h2',
            contentSelector = attrs.contentSelector || 'p';

        $timeout(function () {
            //var items = element[0].querySelectorAll(itemSelector);
            //scope.items = items;

            //for (var i in items) {
            //    if (angular.isObject(items[i])) {
            //        var title = items[i].querySelectorAll(titleSelector)[0];
            //        var content = items[i].querySelectorAll(contentSelector)[0];
            //        var html = angular.element(content).html();
            //        angular.element(content).html('').prepend('<div class="inner-content">' + html + '</div>');
            //        scope.height.push({
            //            'height': 0
            //        });
            //        angular.element(items[i]).addClass('item').attr({
            //            'ng-class': '{\'open\':current == ' + i + '}'
            //        });
            //        angular.element(title).addClass('title').attr('ng-click', 'toggle(' + i + ')');
            //        angular.element(content).addClass('content').attr({
            //            'ng-style': 'current == ' + i + '?height[' + i + ']:zero'
            //        });
            //    }
            //}
            //$compile(element.contents())(scope.$parent);
        }, 500);
        var items = element[0].querySelectorAll(itemSelector);
        scope.items = items;

        for (var i in items) {
            if (angular.isObject(items[i])) {
                var title = items[i].querySelectorAll(titleSelector)[0];
                var content = items[i].querySelectorAll(contentSelector)[0];
                var html = angular.element(content).html();
                angular.element(content).html('').prepend('<div class="inner-content">' + html + '</div>');
                scope.height.push({
                    'height': 0
                });
                angular.element(items[i]).addClass('item').attr({
                    'ng-class': '{\'open\':current == ' + i + '}'
                });
                angular.element(title).addClass('title').attr('ng-click', 'toggle(' + i + ')');
                angular.element(content).addClass('content').attr({
                    'ng-style': 'current == ' + i + '?height[' + i + ']:zero'
                });
            }
        }
        $compile(element.contents())(scope.$parent);
    }
}




