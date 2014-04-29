var $container;
var $titlecard;
var $titlecard_wrapper;
var $w = $(window);
var $story_audio;
var $story_player;
//var $story_player_2;
var $waypoints;
var $nav;
var $begin;
var $button_download_audio;
var $button_toggle_caption;
var $lightbox;
var $lightboxImage;
var $story_player_button;
var $enlarge;
var $intro_advance;
var $graphic_stats_year;
var $side_by_sides;
var aspect_width = 16;
var aspect_height = 9;
var audio_supported = true;
var currently_playing = false;
var volume_narration_active = 1;
var volume_narration_inactive = 0;
var first_page_load = true;
var w;
var h;
var w_optimal;
var h_optimal;
var fade;
var graphic_data_url = 'data/year.csv';
var graphic_data;
var graphic_height = 175;
var story_start = 0;
var story_end_1 = 673;
var story_end_2 = 771;


var unveilImages = function() {
    /*
    * Loads images using jQuery unveil.
    * Current depth: 3x the window height.
    */
    if (Modernizr.touch) {
        // If we're on a touch device, just load all the images.
        // Seems backwards, but iOS Safari and Android have terrible scroll event
        // handling that doesn't allow unveil to progressively load images.
        $container.find('img').unveil($(document).height());
    }
    else {
        // Otherwise, start loading at 3x the window height.
        $container.find('img').unveil($w.height() * 3);
    }
};

var subResponsiveImages = function() {
    /*
    * Replaces large images with small ones for tiny devices.
    * Contains a test for non-tablet devices.
    */

    // If the window is narrow and this is a touch device ...
    if ($w.width() < 769 && Modernizr.touch === true) {

        // Loop over our images ...
        _.each($container.find('img'), function(img){

            // If the image has a data-src attribute ...
            if ($(img).attr('data-src')){

                // Sub in the responsive image from that data-src attribute.
                var responsive_image = $(img).attr('data-src').replace('_1500', '_750');
                $(img).attr('data-src', responsive_image);
            }
        });
    }

    // Call unveil afterwards.
    unveilImages();
};

var onWindowResize = function() {
    /*
    * Handles resizing our full-width images.
    * Makes decisions based on the window size.
    */
    var w_width = $w.width();
    var w_height = $w.height();

    // Calculate optimal width if height is constrained to window height.
    w_optimal = (w_height * aspect_width) / aspect_height;

    // Calculate optimal height if width is constrained to window width.
    h_optimal = (w_width * aspect_height) / aspect_width;

    // Decide whether to go with optimal height or width.
    w = w_width;
    h = h_optimal;

    if (w_optimal > w_width) {
        w = w_optimal;
        h = w_height;
    }

    $titlecard.width(w + 'px').height(h + 'px');
    $titlecard.css('left', ((w_width - w) / 2) + 'px');
    $titlecard.css('top', ((w_height - h) / 2) + 'px');
    $titlecard_wrapper.height(w_height + 'px');
    //$opener.height($w.height() + 'px');
    $container.css('marginTop', w_height + 'px');

    resizeFilmstrip();



    // set the image grid spacing properly
    fixImageGridSpacing();
};

var fixImageGridSpacing = function() {
    _.each($side_by_sides, function(side_by_side) {
        if ($w.width() < 992) {
            if ($(side_by_side).next().hasClass('side-by-side-wrapper')) {
                $(side_by_side).css('margin-bottom', 0);
            }
        }
        else {
            if ($(side_by_side).next().hasClass('side-by-side-wrapper')) {
                $(side_by_side).css('margin-bottom', 30);
            }
        }
    });
};

var onStoryTimeUpdate = function(e) {
    var this_player = e.currentTarget.id;
    var story_end;
    if (this_player == 'pop-audio_1') {
        story_end = story_end_1;
    } /*else if (this_player == 'pop-audio_2') {
        story_end = story_end_2;
    }*/

    /*
    * Handles the time updates for the story player.
    */

    // If we reach the end, stop playing AND send a Google event.
    if (e.jPlayer.status.currentTime > parseInt(story_end, 0)) {
        e.jPlayer('stop');
        _gaq.push(['_trackEvent', 'Audio', 'Completed story audio', APP_CONFIG.PROJECT_NAME, 1]);
    }

    // Count down when playing but for the initial time, show the length of the audio.
    // Set the time to the current time ...
    var time_text = $.jPlayer.convertTime(e.jPlayer.status.currentTime);

    // ... unless it's the initial state. In that case, show the length of the audio.
    if (parseInt(e.jPlayer.status.currentTime, 0) === 0) {
        time_text = $.jPlayer.convertTime(story_end);
    }

    // Write the current time to our time div.
    $(this).next().find('.current-time').text(time_text);
};

var onBeginClick = function() {
    /*
    * Handles clicks on the begin button.
    */

    // If this is a mobile device, start up the waterworks.
    if (Modernizr.touch) {
        $( "#content" ).addClass( "touch-begin" );
    }

    // Smooth scroll us to the intro.
    $.smoothScroll({ speed: 1500, scrollTarget: '#content' });

    // Don't do anything else.
    return false;
};

var buttonToggleCaptionClick = function() {
    /*
    * Click handler for the caption toggle.
    */
    _gaq.push(['_trackEvent', 'Captions', 'Clicked caption button', APP_CONFIG.PROJECT_NAME, 1]);
    $( this ).parent( ".captioned" ).toggleClass('cap-on');
};

var onNavClick = function(){
    /*
    * Click handler for navigation element clicks.
    */
    var hash = $(this).attr('href').replace('#', '');


    // If the chapter has an edge_to_edge, offset the smoothScroll

    var edge_to_edge = $('#' + hash).children('.edge-to-edge');
    var has_edge_to_edge;

    if (edge_to_edge.length > 0) {
        has_edge_to_edge = true;
    }
    else {
        has_edge_to_edge = false;
    }

    var edge_to_edge_margin = parseInt($(edge_to_edge).css('margin-top'));
    console.log(edge_to_edge_margin);

    if (has_edge_to_edge == true) {
        $.smoothScroll({ offset: edge_to_edge_margin, speed: 800, scrollTarget: '#' + hash });
    }
    else {
        $.smoothScroll({ speed: 800, scrollTarget: '#' + hash });
    }

    return false;
};

var onLightboxClick = function() {
    /*
    * Click handler for lightboxed photos.
    */
    if (!Modernizr.touch) {
        lightboxImage($(this).find('img'));
    }
};

var onButtonDownloadAudioClick = function(){
    /*
    * Click handler for the download button.
    */
    _gaq.push(['_trackEvent', 'Audio', 'Downloaded story audio mp3', APP_CONFIG.PROJECT_NAME, 1]);
};

var onStoryPlayerButtonClick = function(e){
    /*
    * Click handler for the story player "play" button.
    */
    _gaq.push(['_trackEvent', 'Audio', 'Played audio story', APP_CONFIG.PROJECT_NAME, 1]);
    e.data.player.jPlayer("pauseOthers");
    e.data.player.jPlayer('play');
};

var onWindowScroll = function() {
    /*
    * Fires on window scroll.
    * Largely for handling bottom-of-page or nearly bottom-of-page
    * events, because waypoints won't ever trigger.
    */
    if ($(window).scrollTop() + $(window).height() > $(document).height() - 25) {

        $('ul.nav li').removeClass('active');
        $('.listen-nav').addClass('active');

    } else {

        if ($('.listen-nav').hasClass('active')) {
            $('ul.nav li').removeClass('active');
            $('.listen-nav').prev().addClass('active');
        }
    }
};

var onIntroAdvanceClick = function() {
    /*
    * Click handler on intro advance.
    */

    $.smoothScroll({ speed: 800, scrollTarget: '#intro-copy' });
};

var onWaypointReached = function(element, direction) {
    /*
    * Event for reaching a waypoint.
    */

    // Get the waypoint name.
    var waypoint = $(element).attr('id');


    // Just hard code this because of reasons.
    if (direction == "down") {
        if ($(element).hasClass('chapter')) {
            $('ul.nav li').removeClass('active');
            $('.' + waypoint + '-nav').addClass('active');
        }
    }

    if (direction == "up") {
        var $previous_element = $(element).prev();
        if ($previous_element.hasClass('chapter')) {
            $('ul.nav li').removeClass('active');
            $('.' + $previous_element.attr('id') + '-nav').addClass('active');
        }
    }

    // If this is a chapter waypoint, run the chapter transitions.
    if ($(element).children('.edge-to-edge')){
        $(element).addClass('chapter-active');
    }
};
var lightboxImage = function(element) {
    /*
    * We built our own lightbox function.
    * We wanted more control over transitions and didn't
    * require image substitution.
    * You'll note that there are three functions.
    * This is because we need to fade the lightbox in and out,
    * but removing/adding it to the document is instantaneous with CSS.
    */

    // Add lightbox to the document.
    $('body').append('<div id="lightbox"><i class="fa fa-plus-circle close-lightbox"></i></div>');

    // Get our elements.
    $lightbox = $('#lightbox');
    var $el = $(element);

    // Get the clicked image and add it to lightbox.
    $lightbox.append('<img src="' + $el.attr('src') + '" id="lightboxImage">');
    $lightboxImage = $('#lightboxImage');

    // Base styles for the lightbox.
    $lightbox.css({
        display: 'block',
        position: 'fixed',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        'z-index': 500,
    });

    $('body').css({ overflow: 'hidden' });
    fadeLightboxIn();

    // Transition with debounce.

    // fade = _.debounce(fadeLightboxIn, 100);
    // fade();

    // Never looks good to have scroll bars appear, adding
    // several pixels of padding to the body. Make this match
    // the fade in above.
    // _.delay(function(){
    //     $('body').css({ overflow: 'hidden' });
    // }, 250);
    // Grab Wes's properly sized width.
    var lightbox_width = w;

    // Sometimes, this is wider than the window, which is bad.
    if (lightbox_width > $w.width()) {
        lightbox_width = $w.width();
    }

    // Set the hight as a proportion of the image width.
    var lightbox_height = ((lightbox_width * aspect_height) / aspect_width);

    // Sometimes the lightbox width is greater than the window height.
    // Center it vertically.
    if (lightbox_width > $w.height()) {
        lightbox_top = (lightbox_height - $w.height()) / 2;
    }

    // Sometimes the lightbox height is greater than the window height.
    // Resize the image to fit.
    if (lightbox_height > $w.height()) {
        lightbox_width = ($w.height() * aspect_width) / aspect_height;
        lightbox_height = $w.height();
    }

    // Sometimes the lightbox width is greater than the window width.
    // Resize the image to fit.
    if (lightbox_width > $w.width()) {
        lightbox_height = ($w.width() * aspect_height) / aspect_width;
        lightbox_width = $w.width();
    }

    // Set the top and left offsets.
    var lightbox_top = ($w.height() - lightbox_height) / 2;
    var lightbox_left = ($w.width() - lightbox_width) / 2;

    // Set styles on the lightbox image.
    $lightboxImage.css({
        'width': lightbox_width + 'px',
        'height': lightbox_height + 'px',
        'opacity': 1,
        'position': 'absolute',
        'top': lightbox_top + 'px',
        'left': lightbox_left + 'px',
    });

    // Disable scrolling while the lightbox is present.
    $('body').css({
        overflow: 'hidden'
    });

    // On click, remove the lightbox.
    $lightbox.on('click', onRemoveLightbox);
};

var onRemoveLightbox = function() {
    /*
    * Handles the click event.
    */

    // Set the element.
    $el = $('#lightbox');

    // Fade to black.
    $el.css({
        opacity: 0,
    });

    fadeLightboxOut();
    $('body').css({ overflow: 'auto' });

    // Debounce the fade.
    // fade = _.debounce(fadeLightboxOut, 100);
    // fade();

    // Never looks good to have scroll bars appear, adding
    // several pixels of padding to the body. Make this match
    // the fade out above.
    // _.delay(function(){
    //     $('body').css({ overflow: 'auto' });
    // }, 100);
};

var fadeLightboxIn = function() {
    /*
    * Fade in event.
    */
    $lightbox.css({
        opacity: 1
    });
};

var fadeLightboxOut = function() {
    /*
    * Fade out event.
    */
    $lightbox.remove();
};

var setUpAudio = function(selector, part) {
    selector.jPlayer({
        ready: function () {
            $(this).jPlayer('setMedia', {
                mp3: 'buzkashi/assets/audio/part-' + part + '.mp3',
                oga: 'buzkashi/assets/audio/part-' + part + '.ogg'
            }).jPlayer('pause');
        },
        cssSelectorAncestor: '#jp_container_' + part,
        timeupdate: onStoryTimeUpdate,
        swfPath: 'js/lib',
        supplied: 'mp3, oga',
        loop: false
    });
};

var setupFilmstrip = function() {
    /*
    * Creates the CSS rules to animate the filmstrip.
    */
    var prefixes = [ '-webkit-', '-moz-', '-o-', '' ];
    var keyframes = '';
    var filmstrip_steps = 14;
    for (var i = 0; i < prefixes.length; i++) {
        var filmstrip = '';
        for (var f = 0; f < filmstrip_steps; f++) {
            var current_pct = f * (100/filmstrip_steps);
            filmstrip += current_pct + '% {background-position:0 -' + (f * 100) + '%;' + prefixes[i] + 'animation-timing-function:steps(1);}';
        }
        keyframes += '@' + prefixes[i] + 'keyframes filmstrip {' + filmstrip + '}';
    }
    var s = document.createElement('style');
    s.innerHTML = keyframes;
    document.getElementsByTagName('head')[0].appendChild(s);
}

var resizeFilmstrip = function() {
    var $filmstrip_scrum = $('#content').find('.filmstrip-wrapper');
    var $filmstrip_scrum_wrapper = $('#content').find('.filmstrip-outer-wrapper');
    var filmstrip_scrum_aspect_width = 800;
    var filmstrip_scrum_aspect_height = 450;
    var filmstrip_scrum_width = $filmstrip_scrum_wrapper.width();
    var filmstrip_scrum_height = Math.ceil((filmstrip_scrum_width * filmstrip_scrum_aspect_height) / filmstrip_scrum_aspect_width);
    $filmstrip_scrum.width(filmstrip_scrum_width + 'px').height(filmstrip_scrum_height + 'px');
}


$(document).ready(function() {
    $container = $('#content');
    $titlecard = $('.titlecard');
    $titlecard_wrapper = $('.titlecard-wrapper');
    $story_player = $('#pop-audio_1');
    //$story_player_2 = $('#pop-audio_2');
    $waypoints = $('.waypoint');
    $nav = $('.nav a');
    $begin = $('.begin-bar');
    $button_download_audio = $('.download-audio');
    $button_toggle_caption = $('.caption-label');
    $overlay = $('#fluidbox-overlay');
    $story_player_button = $('#jp_container_1 .jp-play');
    //$story_player_button_2 = $('#jp_container_2 .jp-play');
    $enlarge = $('.enlarge');
    $intro_advance = $("#intro-advance");
    $graphic_stats_year = $('#graphic-stats-year');
    $side_by_sides = $('.side-by-side-wrapper');

    //share popover
    $(function () {
        $('body').popover({
            selector: '[data-toggle="popover"]'
        });
    });

    $('.share').popover({
        'selector': '',
        'placement': 'left',
        'content': '<a target="_blank" href="https://twitter.com/intent/tweet?text=' + APP_CONFIG.TWITTER_SHARE_TEXT + ', via ' + APP_CONFIG.TWITTER_HANDLE + '.&url=' + APP_CONFIG.S3_BASE_URL + '&original_referer=' + APP_CONFIG.TWITTER_HANDLE + '"><i class="fa fa-twitter"></i></a> <a target="_blank" href="http://www.facebook.com/sharer/sharer.php?u=' + APP_CONFIG.S3_BASE_URL + '"><i class="fa fa-facebook-square"></i></a>',
        'html': 'true'
      });

    setUpAudio($story_player, 1);
    //setUpAudio($story_player_2, 2);


    $button_toggle_caption.on('click', buttonToggleCaptionClick);

    $begin.on('click', onBeginClick);

    $nav.on('click', onNavClick);

    $enlarge.on('click', onLightboxClick);

    $button_download_audio.on('click', onButtonDownloadAudioClick);

    $story_player_button.on('click', {player: $story_player}, onStoryPlayerButtonClick);
    //$story_player_button_2.on('click', {player: $story_player_2}, onStoryPlayerButtonClick);

    $w.on('scroll', onWindowScroll);

    $w.on('resize', onWindowResize);

    $intro_advance.on('click', onIntroAdvanceClick);

    onWindowResize();

    subResponsiveImages();

    fixImageGridSpacing();

    setupFilmstrip();

    $waypoints.waypoint(function(direction){
        onWaypointReached(this, direction);
    }, { offset: $w.height() / 2 });

    // CineScroll!
    _.each(['.scrum', '.megaphone', '.practice', '.dirt', '.match1', '.match2',], function(el) {
        var $el = $(el);

        // For most animations, begin when the first pixel of
        // the container becomes visible and continue the
        // animation until we reach 10px from the top offset.
        var topOffset = $el.offset().top - $w.height();
        var bottomOffset = $el.offset().top - 10;

        // For those instances near/at the top of the document,
        // these calculations won't work. Instead, we need to
        // set the top offset to 0 and finish the animations
        // over the whole window height -- with 10px to spare.
        if (topOffset < 0) {
            topOffset = 0;
            bottomOffset = $w.height() - 10;
        }

        $el.scrollMotion({
            top: topOffset,
            bottom: bottomOffset
        });
    });

});

// Defer pointer events on animated header
$w.load(function (){ $('header').css({ 'pointer-events': 'auto' }); });
