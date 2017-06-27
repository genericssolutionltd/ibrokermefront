ibrokermeApp.directive('tabdirective', jqueryTabs());
function jqueryTabs() {
    return {
        $container: [],
        $list: [],
        link: function (scope, element, attrs) {
            var _self = this;
            setTimeout(function () {
                _self.$container = $(element[0]);
                _self.$list = _self.$container.find('ul:first-child');
                _self.init();
            }, 200);
        },
        init: function () {
            var _self = this;

            this.$container.addClass('ui-tabs ui-widget ui-widget-content ui-corner-all');
            this.$list.addClass('ui-tabs-nav ui-helper-reset ui-helper-clearfix ui-widget-header ui-corner-all');

            var $bodyItems = this.$container.children('div');
            $bodyItems.addClass('ui-tabs-panel ui-widget-content ui-corner-bottom');

            var $listItems = this.$list.children('li');
            $listItems.addClass('ui-state-default ui-corner-top ui-tabs-active');

            var $listAnchors = $listItems.children('a');
            $listAnchors.addClass('ui-tabs-anchor');
            $listAnchors.css('cursor', 'pointer');
            $listAnchors.on('click', function () {
                _self.tabClicked($(this));
            });

            var $firstAnchor = $listItems.children('a').first();
            $firstAnchor.trigger('click');
        },
        tabClicked: function ($element) {
            var targetId = $element.data('target');
            var $target = this.$container.find(targetId);
            var $parent = $element.parent();

            $parent.addClass('ui-state-active').siblings('li').removeClass('ui-state-active');
            $target.css('display', 'block').siblings('div').css('display', 'none');
        }
    };
};

