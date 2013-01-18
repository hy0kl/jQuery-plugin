/*
 * jQuery Select Plugins v1.3.6.2
 * Copyright (c) 2009 zhangjingwei
 * Dual licensed under the MIT and GPL licenses.
 * Date: 2009-11-17 09:37
 * Revision: 1.3.6.1
 * Improve by: hy0kle@gmail.com #2013.01.18
 */

(function($){
  $.fn.extend({
    sSelect: function(callback) {
      return this.each(function(i, obj){
        var selectId = (this.name || this.id) + '__jQSelect' + i || '__jQSelect' + i;

        if (obj.style.display != 'none' 
            && $(this).parents()[0].id.indexOf('__jQSelect') < 0)
        {
            var tabindex = this.tabIndex||0;
            $(this).before("<div class='dropdown' id=" + selectId 
                + ' tabIndex=' + tabindex + '></div>').prependTo($('#' + selectId));
            var selectZindex = $(this).css('z-index');
            var selectIndex  = $('#' + selectId + ' option').index($('#' + selectId + ' option:selected')[0]);
            $('#' + selectId).append('<div class="dropselectbox"><h4></h4><ul></ul></div>');

            var dropdown_h4 = $('#'+ selectId + ' h4');
            dropdown_h4.html($('#' + selectId + ' option:selected').text());

            var selectWidth = $('#' + selectId + ' select').width();
            if ($.browser.safari)
            {
                selectWidth = selectWidth + 15;
            }
            else if ($.browser.mozilla)
            {
                selectWidth += 20;
            }
            dropdown_h4.css({width: selectWidth});
            
            var selectUlwidth = selectWidth + parseInt(dropdown_h4.css('padding-left')) + parseInt(dropdown_h4.css("padding-right"));
            var dropdown_ul = $('#' + selectId + ' ul');
            dropdown_ul.css({width: selectUlwidth + 'px'});
            $('#' + selectId + ' select').hide();
            
            $('#' + selectId + ' div').hover(function(){
                dropdown_h4.addClass("over");
            },function(){
                dropdown_h4.removeClass("over");
            });
        
            $('#' + selectId)
            .bind('focus', function(){
                $.fn.clearSelectMenu(selectId, selectZindex);
                dropdown_h4.addClass("over");
            })
            .bind('click',function(e){
                if(dropdown_ul.css("display") == 'block'){
                    $.fn.clearSelectMenu(selectId,selectZindex);
                    return false;
                }else{
                    dropdown_h4.addClass('current');
                    dropdown_ul.show();
                    var selectZindex = $(this).css('z-index');
                    if ($.browser.msie || $.browser.opera)
                    {
                        $('.dropdown').css({'position': 'relative', 'z-index': '0'});
                    }
                    
                    $('#' + selectId).css({'position': 'relative', 'z-index': '999'});
                    $.fn.setSelectValue(selectId);

                    selectIndex = $('#' + selectId + ' li').index($('.selectedli')[0]);
                    var windowspace = ($(window).scrollTop() + document.documentElement.clientHeight) - $(this).offset().top;
                    var ulspace = $('#' + selectId + ' ul').outerHeight(true);
                    var windowspace2 = $(this).offset().top - $(window).scrollTop() - ulspace;
                    windowspace < ulspace && windowspace2 > 0 
                        ? dropdown_ul.css({top:-ulspace}) 
                            : dropdown_ul.css({top: dropdown_h4.outerHeight(true)});
                    $(window).scroll(function(){
                        windowspace = ($(window).scrollTop() 
                            + document.documentElement.clientHeight) - $('#' + selectId).offset().top;
                        windowspace < ulspace 
                            ? dropdown_ul.css({top:-ulspace})
                                : dropdown_ul.css({top: dropdown_h4.outerHeight(true)});
                    });    

                    var dropdown_li = $('#' + selectId + ' li');
                    dropdown_li.click(function(e){
                            selectIndex = dropdown_li.index(this);
                            $.fn.keyDown(selectId,selectIndex);
                            dropdown_h4.html($('#' + selectId + ' option:selected').text());
                            $.fn.clearSelectMenu(selectId, selectZindex);
                            e.stopPropagation();
                            e.cancelbubble = true;
                    })
                    .hover(
                           function(){
                                dropdown_li.removeClass('over');
                                $(this).addClass('over').addClass('selectedli');
                                selectIndex = dropdown_li.index(this);
                            },
                            function(){
                                $(this).removeClass('over');
                            }
                    );
                };
                e.stopPropagation();
            })
            .bind('mousewheel', function(e, delta) {
                    e.preventDefault();
                    var mousewheel = {
                        $obj : $('#' + selectId + ' li.over'),
                        $slength : $('#' + selectId + ' option').length,
                        mup: function(){
                            this.$obj.removeClass('over');
                            selectIndex == 0 ? selectIndex = 0 : selectIndex--;
                            $.fn.keyDown(selectId, selectIndex);
                        },
                        mdown:function(){
                            this.$obj.removeClass('over');
                            selectIndex == (this.$slength - 1) ? selectIndex = this.$slength - 1 : selectIndex ++;
                            $.fn.keyDown(selectId, selectIndex);
                        }
                    }
                    delta > 0 ? mousewheel.mup() : mousewheel.mdown();
             })
            .bind('dblclick', function(){
                $.fn.clearSelectMenu(selectId, selectZindex);
                return false;
            })
            .bind('keydown', function(e){
                $(this).bind('keydown', function(e){
                    if (e.keyCode == 40 || e.keyCode == 38 || e.keyCode == 35 || e.keyCode == 36){
                        return false;
                    }
                });
                var $obj = $('#' + selectId + ' li.over'),$slength = $('#' + selectId + ' option').length;
                switch(e.keyCode){
                    case 9:
                        return true;
                        break;
                    case 13:
                        //enter
                        $.fn.clearSelectMenu(selectId, selectZindex);
                        break;
                    case 27:
                        //esc
                        $.fn.clearSelectMenu(selectId, selectZindex);
                        break;
                    case 33:
                        $obj.removeClass('over');
                        selectIndex = 0;
                        $.fn.keyDown(selectId, selectIndex);
                        break;
                    case 34:
                        $obj.removeClass('over');
                        selectIndex = ($slength - 1);
                        $.fn.keyDown(selectId, selectIndex);
                        break;
                    case 35:
                        $obj.removeClass('over');
                        selectIndex = ($slength - 1);
                        $.fn.keyDown(selectId, selectIndex);
                        break;
                    case 36:
                        $obj.removeClass('over');
                        selectIndex = 0;
                        $.fn.keyDown(selectId, selectIndex);
                        break;
                    case 38:
                        //up
                        e.preventDefault();
                        $obj.removeClass('over');
                        selectIndex == 0 ? selectIndex = 0 : selectIndex--;
                        $.fn.keyDown(selectId, selectIndex);
                        break;
                    case 40:
                        //down
                        e.preventDefault();
                        $obj.removeClass('over');
                        selectIndex == ($slength - 1) ? selectIndex = $slength - 1 : selectIndex ++;
                        $.fn.keyDown(selectId, selectIndex);
                        break;
                    default:
                        e.preventDefault();
                        break;
                };
            })
            .bind('blur', function(){
                $.fn.clearSelectMenu(selectId,selectZindex);
                return false;
            })
            .bind('selectstart', function(){
                    return false;
            });
        }else if ($(this).parents()[0].id.indexOf('__jQSelect') > 0){
            selectId = $(this).parents()[0].id;
            $.fn.setSelectValue(selectId);

            var dropdown_h4 = $('#'+selectId+' h4');
            var dropdown_ul = $('#'+selectId+' ul');
            var selectWidth = $('#' + selectId + ' select').width();
            if ($.browser.safari)
            {
                selectWidth = selectWidth + 15
            }
            
            dropdown_h4.css({width: selectWidth});
            var selectUlwidth = selectWidth + parseInt(dropdown_h4.css('padding-left')) 
                + parseInt(dropdown_h4.css('padding-right'));
            dropdown_ul.css({width: selectUlwidth + 'px'});
            if(this.style.display != 'none'){
                $(this).hide();
            }
      }
    })},

    clearSelectMenu: function(selectId, selectZindex){
        if(selectId != undefined){
            selectZindex = selectZindex||'auto';
            $('#' + selectId + ' ul').empty().hide();
            $('#' + selectId + ' h4').removeClass('over').removeClass('current');
            $('#' + selectId).css({'z-index': selectZindex});
        }
    },

    setSelectValue:function(sID){
        var content = [];
        $.each($('#' + sID + ' option'), function(i){
            var opt_obj = $(this);
            content.push('<li class="FixSelectBrowser" key="' + opt_obj.attr('value') + '">' + opt_obj.text() + '</li>');
        });
        content = content.join('');
        $('#' + sID + ' ul').html(content);
        $('#' + sID + ' h4').html($('#' + sID + ' option:selected').text());
        $('#' + sID + ' li').eq($('#' + sID + ' select')[0].selectedIndex).addClass('over').addClass('selectedli');
    },

    keyDown: function(sID, selectIndex){
        var $obj = $('#' + sID+' select');
        $obj[0].selectedIndex = selectIndex;
        $obj.change();
        $('#' + sID + ' li:eq('+selectIndex+')').toggleClass('over');
        $('#' + sID + ' h4').html($('#' + sID + ' option:selected').text());
    }
  });
  var types = ['DOMMouseScroll', 'mousewheel'];
  $.event.special.mousewheel = {
    setup: function() {
        if ( this.addEventListener )
            for ( var i=types.length; i; )
                this.addEventListener( types[--i], handler, false );
        else
            this.onmousewheel = handler;
    },    
    teardown: function() {
        if ( this.removeEventListener )
            for ( var i=types.length; i; )
                this.removeEventListener( types[--i], handler, false );
        else
            this.onmousewheel = null;
    }
  };

  $.fn.extend({
    mousewheel: function(fn) {
        return fn ? this.bind('mousewheel', fn) : this.trigger('mousewheel');
    },
    
    unmousewheel: function(fn) {
        return this.unbind('mousewheel', fn);
    }
  });

  function handler(event) {
    var args = [].slice.call( arguments, 1 ), delta = 0, returnValue = true;
    event = $.event.fix(event || window.event);
    event.type = 'mousewheel';    
    if ( event.wheelDelta ) delta = event.wheelDelta/120;
    if ( event.detail     ) delta = -event.detail/3;
    args.unshift(event, delta);
    return $.event.handle.apply(this, args);
  }
})(jQuery);
