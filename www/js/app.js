var $container;
var $titlecard;
var $titlecard_wrapper;
var $w = $(window);
var $story_audio;
var $story_player;
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
var waypointOffset;

var unveilImages = function() {
    /*
    * Loads images using jQuery unveil.
    * Current depth: 3x the window height.
    */
    if (Modernizr.touch) {
        // If we're on a touch device, just load all the images.
        // Seems backwards, but iOS Safari and Android have terrible scroll event
        // handling that doesn't allow unveil to progressively load images.
        $container.find('img').unveil(
            $(document).height()
        );
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

            if ($(img).attr('data-src')) {
                // Sub in the responsive image from that data-src attribute.
                var responsive_image = $(img).attr('data-src').replace('.', '-16x9-m.');
                $(img).attr('data-src', responsive_image);
            }
        });

        _.each($container.find('.animation').find('img'), function(img){
            var responsive_image = $(img).attr('src').replace('.', '-16x9-m.');
            $(img).attr('src', responsive_image);
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

    // Dynamically size and style the titlecard.
    $titlecard.width(w + 'px').height(h + 'px');
    $titlecard.css('left', ((w_width - w) / 2) + 'px');
    $titlecard.css('top', ((w_height - h) / 2) + 'px');
    $titlecard_wrapper.height(w_height + 'px');
    $container.css('marginTop', w_height + 'px');

    // Set the image grid spacing properly
    // and re-initialize the waypoints.
    fixImageGridSpacing();
    setupWaypoints();
};

var fixImageGridSpacing = function() {
    /*
    * Adjusts the image grid for the side-by-side templates.
    * Handles some edge cases where on small screens we need fewer margins.
    */
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
    /*
    * Handles the time updates for the story player.
    * In particular, writes the time elapsed/remaining to the player div.
    */

    // Set up the time for when this story ends.
    var this_player = e.currentTarget.id;
    var story_end = story_end_1;

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
    if (Modernizr.touch) { $( "#content" ).addClass( "touch-begin" ); }

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

    // Toggle the captions!
    $( this ).parent( ".captioned" ).toggleClass('cap-on');
};

var onNavClick = function(){
    /*
    * Click handler for navigation element clicks.
    */
    var hash = $(this).attr('href').replace('#', '');


    // If the chapter has an edge_to_edge, offset the smoothScroll

    // Check for edge-to-edge existence.
    var edge_to_edge = $('#' + hash).children('.edge-to-edge');

    // Set up the base smooth scroll options.
    var scrollOptions = { speed: 800, scrollTarget: '#' + hash }

    // If there's edge-to-edge, set a new smooth scroll option.
    if (edge_to_edge.length > 0) { scrollOptions['offset'] = parseInt($(edge_to_edge).css('margin-top')); }

    // SmoothScroll to the correct thing now.
    $.smoothScroll(scrollOptions);

    return false;
};

var onLightboxClick = function() {
    /*
    * Click handler for lightboxed photos.
    * Nothing for touch devices.
    */
    if (!Modernizr.touch) { lightboxImage($(this).find('img')); }
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
    console.log(e);
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

    // Handle the down direction.
    if (direction == "down") {
        if ($(element).hasClass('chapter')) {
            $('ul.nav li').removeClass('active');
            $('.' + waypoint + '-nav').addClass('active');
        }
    }

    // Handle the up direction.
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

    // If this is one of those fancy scroll animations,
    // initialize the scroll motion when we trigger the waypoint.
    if ($(element).hasClass('animation')) {
        var $el = $(element);

        var topOffset = $el.offset().top  - ($w.height() * 0.5);
        var bottomOffset = $el.offset().top;
        
        if ($el.hasClass('scrum')) {
            var bottomOffset = $el.offset().top - ($w.height() * 0.1);
        }

        if ($el.hasClass('dirt')) {
            var bottomOffset = $el.offset().top + ($w.height() * 0.2);
        }

        $el.scrollMotion({
            top: topOffset,
            bottom: bottomOffset
        });
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

    // Prep the lightbox overlay.
    $('body').css({ overflow: 'hidden' });
    $lightbox.css({ opacity: 1 });

    // Handle the lightbox size depending on window/image orientation.
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
    // On click, remove the lightbox.
    $('body').css({ overflow: 'hidden' });
    $lightbox.on('click', onRemoveLightbox);
};

var onRemoveLightbox = function() {
    /*
    * Handles the click event.
    */

    // Set the element.
    $el = $('#lightbox');

    // Fade to black.
    $el.css({ opacity: 0 });
    $lightbox.remove();
    $('body').css({ overflow: 'auto' });
};

var setUpAudio = function(selector) {
    /*
    * Sets up the story audio player.
    */
    var urlBase = APP_CONFIG.S3_BASE_URL;
    if (urlBase == 'http://127.0.0.1:8000') {
        urlBase = 'http://stage-apps.npr.org'
    }
    selector.jPlayer({
        ready: function () {
            $(this).jPlayer('setMedia', {
                mp3: urlBase + '/buzkashi/assets/audio/part-1.mp3',
                oga: urlBase + '/buzkashi/assets/audio/part-1.ogg'
            }).jPlayer('pause');
        },
        cssSelectorAncestor: '#jp_container_1',
        timeupdate: onStoryTimeUpdate,
        swfPath: 'js/lib',
        supplied: 'mp3, oga',
        loop: false
    });
};

var setupSharePopover = function() {
    /*
    * Bootstrap sharing popover. Everyone likes to share.
    */
    $(function () { $('body').popover({ selector: '[data-toggle="popover"]' }); });

    $('.share').popover({
        'selector': '',
        'placement': 'top',
        'content': '<a target="_blank" href="https://twitter.com/intent/tweet?text=' + APP_CONFIG.TWITTER_SHARE_TEXT + ', via ' + APP_CONFIG.TWITTER_HANDLE + '.&url=' + APP_CONFIG.S3_BASE_URL + '&original_referer=' + APP_CONFIG.TWITTER_HANDLE + '"><i class="fa fa-twitter"></i></a> <a target="_blank" href="http://www.facebook.com/sharer/sharer.php?u=' + APP_CONFIG.S3_BASE_URL + '"><i class="fa fa-facebook-square"></i></a>',
        'html': 'true'
    });
}

var setupWaypoints = function() {
    /*
    * Sets up the global waypoints machinery.
    */
    $waypoints.waypoint(function(direction){
        onWaypointReached(this, direction);
    }, { offset: waypointOffset });
}

$(document).ready(function() {
    $container = $('#content');
    $titlecard = $('.titlecard');
    $titlecard_wrapper = $('.titlecard-wrapper');
    $story_player = $('#pop-audio_1');
    $waypoints = $('.waypoint');
    $nav = $('.nav a');
    $begin = $('.begin-bar');
    $button_download_audio = $('.download-audio');
    $button_toggle_caption = $('.caption-label');
    $overlay = $('#fluidbox-overlay');
    $story_player_button = $('#jp_container_1 .jp-play');
    $enlarge = $('.enlarge');
    $intro_advance = $("#intro-advance");
    $graphic_stats_year = $('#graphic-stats-year');
    $side_by_sides = $('.side-by-side-wrapper');
    waypointOffset = $w.height() / 2;

    // Global window events.
    $w.on('scroll', onWindowScroll);
    $w.on('resize', onWindowResize);

    // Click events.
    $begin.on('click', onBeginClick);
    $button_download_audio.on('click', onButtonDownloadAudioClick);
    $button_toggle_caption.on('click', buttonToggleCaptionClick);
    $enlarge.on('click', onLightboxClick);
    $intro_advance.on('click', onIntroAdvanceClick);
    $nav.on('click', onNavClick);
    $story_player_button.on('click', {player: $story_player}, onStoryPlayerButtonClick);

    // Events that need to be initialized.
    setUpAudio($story_player);
    setupSharePopover();
    onWindowResize();
    fixImageGridSpacing();
    subResponsiveImages();
    setupWaypoints();

});

// For some reason, this needs to be done on load.
$(window).load(function (){ $('header').css({ 'pointer-events': 'auto' }); });
