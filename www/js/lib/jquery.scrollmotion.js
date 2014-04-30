/**
 * jQuery scrollMotion -  stop motion animation with scroll event
 * Copyright (c) 20012 Ben Palmer hello(at)benpalmer(dot)info | http://www.benpalmer.info
 * Dual licensed under MIT and GPL.
 * Date: 03/04/2012
 * @author Ben Palmer
 * @version 1.1
 **/
;(function($){
    var methods = {

        init: function(options){
            return this.each(function() {
                var $this = $(this);
                var settings = $.extend({
                    top: $(window).scrollTop(),
                    bottom: $(this).position().top,
                    n: $(this).children().length,
                    oneway: false,
                    active: true,
                    fadeIn: false
                }, options);

                var step = (settings.bottom - settings.top) / settings.n;

                settings.breaks = [settings.top];

                for (i=1; i<settings.n; i++) {
                    settings.breaks.push(
                        Math.round(step * i) + settings.top
                    );
                }

                $(window).bind('scroll.scrollMotion', function() {
                    var t = $(this).scrollTop();
                    var current = methods.detectBreak({
                        top: t,
                        settings: settings,
                        obj: $this
                    });

                    if (settings.oneway) {
                        if ( current == (settings.n - 1) ) {
                            settings.active = false;
                            methods.setFrame({
                                current : current,
                                obj : $this
                            });
                        }
                    }

                    if (settings.active) {
                        methods.setFrame({
                            current : current,
                            obj : $this
                        });
                    }

                });
            });
        },

        detectBreak: function(args) {
            var t = args.top;
            var settings = args.settings;
            var obj = args.obj;
            var place;

            if (t <= settings.top){
                place = 0;
                if (settings.fadeIn) {
                    obj.css('opacity',0);
                }

            } else if (t > settings.top && t < settings.bottom) {
                if(settings.fadeIn) {
                    var p = methods.getPercent({
                        top : t,
                        settings : settings
                    });
                    obj.css('opacity',p);
                }
                for (var a in settings.breaks) {
                    if (t > settings.breaks[a]) {
                        place = a;
                    }
                }
            } else {
                place = settings.breaks.length - 1;
                if (settings.fadeIn) { obj.css('opacity', 1); }
            }
            return place;
        },

        getPercent: function(args) {
            var t = args.top;
            var settings = args.settings;
            var perc = (t - settings.top)/(settings.bottom - settings.top);
            return perc;
        },

        setFrame: function(args) {
            var current = args.current;
            var obj = args.obj;
            if (current!==null) {
                obj.children().each(function() {
                    if (current==$(this).index()) {
                        $(this).show();
                    } else {
                        $(this).hide();
                    }
                });
            }
        },

        destroy: function() {
            return this.each(function(){
                var $this = $(this),
                data = $this.data('scrollMotion');
                $(window).unbind('.scrollMotion');
                $this.removeData('scrollMotion');
            });
        }
    };

    $.fn.scrollMotion = function(method) {
        if ( methods[method] ) {
            return methods[method].apply( this, Array.prototype.slice.call( arguments, 1 ));
        } else if ( typeof method === 'object' || ! method ) {
            return methods.init.apply( this, arguments );
        } else {
            $.error( 'Method ' +  method + ' does not exist on jQuery.scrollMotion' );
        }

    };
})(jQuery);