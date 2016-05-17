'use strict';
angular.module('megamine').directive('ntAccordion', ntAccordion)
ntAccordion.$inject = ['$compile', '$timeout'];

function ntAccordion($compile, $timeout) {

    return ({
        compile: compile,
        priority: 100,
    });


    function compile(element, attrs, transclude) {

        var id = getId(attrs);

        element.addClass("accordion");

        var options = element
            .children("li")
            .addClass("item");
    
        //for children set the class and ng events events
        var item = options[0];
        var headers = angular.element(item).children("h3")
                        .addClass("header")
                        .attr('ng-click', id + '_toggle($index)')
                        .attr('ng-class', id + '_data.current === $index ? \'expand\' : \'collapse\'')


        var content = angular.element(item).children("div")
                        .addClass("content slideUp")
                        .attr('ng-show', id + '_data.current === $index');


        return link;
    }

    function link(scope, element, attrs, controller) {
        var id = getId(attrs);
        var data = {
            current: -1,
            
        };

        scope.$parent[id + '_data'] = data;
        scope.$parent[id + '_toggle'] = function (index) {
            data.current = data.current === index ? -1 : index;
        }
    }

    function getId(attrs) {
        return attrs.ntAccordion || "accordion";
    }

    //function link(scope, element, attrs, nullController, transclude) {
    //    transclude(scope, function (content) {
    //        var cnt = content;
    //        var abc = $compile(content)(scope)
    //        element.parent().append(abc);
    //    });

        //scope variables
        //scope.current = null;
        //scope.height = [];
        //scope.items = [];
        //scope.zero = { height: 0 };
        //scope.toggle = function (i) {
        //    scope.current = scope.current === i ? null : i;
        //    scope.height[i] = { 'height': scope.items[i].querySelectorAll('.inner-content')[0].offsetHeight + 'px' };
        //};

        //var itemSelector = attrs.itemSelector || 'li',
        //    titleSelector = attrs.titleSelector || 'h2',
        //    contentSelector = attrs.contentSelector || 'p';

        //$timeout(function () {
        //    var items = element[0].querySelectorAll(itemSelector);
        //    scope.items = items;

        //    for (var i in items) {
        //        if (angular.isObject(items[i])) {
        //            var title = items[i].querySelectorAll(titleSelector)[0];
        //            var content = items[i].querySelectorAll(contentSelector)[0];
        //            var html = angular.element(content).html();
        //            angular.element(content).html('').prepend('<div class="inner-content">Hi' + html + '</div>');
        //            scope.height.push({
        //                'height': 0
        //            });
        //            angular.element(items[i]).addClass('item').attr({
        //                'ng-class': '{\'open\':current == ' + i + '}'
        //            });
        //            angular.element(title).addClass('title').attr('ng-click', 'toggle(' + i + ')');
        //            angular.element(content).addClass('content').attr({
        //                'ng-style': 'current == ' + i + '?height[' + i + ']:zero'
        //            });
        //        }
        //    }
        //    var el = $compile(element.html())(scope.$parent);
        //    //element.parent().append(el);
        //}, 500);
    //}
}

