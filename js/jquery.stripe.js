/**
 * stripe 0.1
 * jQuery plugin
 * @author: hy0kle@gmail.com
 * @date: 2012.03
 */
(function($){
    $.fn.stripe = function(settings) {
        var defaults = {
            evenClass:   'evenNode',
            oddClass:    'oddNode',
            activeClass: 'activeNode'
        };

        if (settings)
        {
            $.extend(defaults, settings);
        }

        var i = 1;
        this.each(function(){
            var node = $(this);

            if (1 == i % 2)
            {
                node.addClass(defaults.evenClass);
            }
            else
            {
                node.addClass(defaults.oddClass);
            }

            node.bind('mouseover', function(){
                $(this).addClass(defaults.activeClass);
            });
            node.bind('mouseout', function(){
                $(this).removeClass(defaults.activeClass);
            });

            i++;
        });
    };
})(jQuery);
