'use strict';
angular.module('megamine').directive('ntAccordion', ntAccordion)
ntAccordion.$inject = ['$compile', '$timeout'];

function ntAccordion($compile, $timeout) {
    return {
        restrict: 'AEC',
        transclude: true,
        priority: 1,
        scope: {
        },
        link: link
    }

    function link(scope, element, attributes, _controller, transclude) {

        element.addClass("m-menu");

        // Link and transclude the user-defined content into our component.
        transclude(
            function (userContent) {

                var optionsList = userContent
                    .eq(1)
                        .addClass("menu-options")
                ;

                var options = optionsList
                    .children("li")
                        .addClass("menu-option option-label")
                ;

                element.append(userContent);

            }
        );

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




// Create an application module for our demo.
var app = angular.module('megamine');


// -------------------------------------------------- //
// -------------------------------------------------- //


// When a directive uses a TEMPLATE, the compile function will accept the
// content of that template. But, in this case, what we actually want to do
// is compile the transcluded content (pre-transclusion). As such, we need to
// define this directive at two priorities, with this one executing before the
// transclude one.
app.directive(
    "bnMenu",
    function () {

        // Return the directive configuration. Note that we are executing at
        // priority 1 so that we execute before the transclude version.
        return ({
            compile: compile,
            priority: 1501,
        });


        // I compile the directive element prior to trnasclusion. I add the
        // necessary classes to the transcluded content for the CSS hooks and
        // (not shown in this demo) the JavaScript event hooks (that will use
        // event delegation based on event-target / CSS class).
        function compile(tElement, tAttibutes) {


            tElement.addClass("m-menu");

            var optionsList = tElement
                .children("ul")
                    .addClass("menu-options")
            ;

            var options = optionsList
                .children("li")
                    .addClass("menu-option option-label")
                    .attr('ng-click', 'toggle()')
            ;

        }
    }
);


// Since this directive uses a TEMPLATE (url), any attempt to call the compile()
// method will only give us access to the template content, not the transcluded
// content. As such, this priority will only take care of transcluding the
// content into the template.
app.directive(
    "bnMenu",
    function ($compile, $timeout) {

        // Return the directive configuration.
        // --
        // NOTE: Priority defaults to 0. I'm including it here for explicitness.
        return ({
            scope: {},
            link: link,
            priority: 1500,
            transclude: true
        });


        // I bind the JavaScript events to the local scope.
        function link(scope, element, attributes, _controller, transclude) {

            scope.toggle = function () {
                alert('hi');
            }


            $timeout(function () {
                console.log(element.html());
                transclude(
                    function (content) {

                        var linkFn = $compile(element.contents());
                        var content = linkFn(scope.$parent);
                        element.append(content);
                        //element.append(userContent);

                    }
                );
            });
            // Link and transclude the user-defined content into our component.

        }

    }
);


// -------------------------------------------------- //
// -------------------------------------------------- //


// In this version of the menu component, we're going to forego the COMPILE step
// and try to do everything in the LINK function.
app.directive(
    "bnMenuFail",
    function () {

        // Return the directive configuration.
        return ({
            link: link,
            transclude: true
        });


        // I bind the JavaScript events to the local scope.
        function link(scope, element, attributes, _controller, transclude) {

            element.addClass("m-menu");

            // Link and transclude the user-defined content into our component.
            transclude(
                function (userContent) {

                    var optionsList = userContent
                        .eq(1)
                            .addClass("menu-options")
                    ;

                    var options = optionsList
                        .children("li")
                            .addClass("menu-option option-label")
                    ;

                    element.append(userContent);

                }
            );

        }

    }
);
