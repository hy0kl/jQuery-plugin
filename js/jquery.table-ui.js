(function($){
    $.fn.tableUI = function(settings) {
        var defaults = {
            evenClass:   'evenRow',
            oddClass:    'oddRow',
            activeClass: 'activeRow'
        };

        if (settings)
        {
            $.extend(defaults, settings);
        }

        this.each(function(){
            var table = $(this);
            table.find('tr:even').addClass(defaults.evenClass);
            table.find('tr:odd').addClass(defaults.oddClass);

            table.find('tr').bind('mouseover', function(){
                $(this).addClass(defaults.activeClass);
            });
            table.find('tr').bind('mouseout', function(){
                $(this).removeClass(defaults.activeClass);
            });
        });
    };
})(jQuery);
