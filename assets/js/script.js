(function ($) {
    "use strict";

    var healthApp = {
        
        /* ============================================================ */
        /* StickyHeader
        /* ============================================================ */
        sticky_header: function() {
            var fixed_top = $("header");
            $(window).on('scroll', function () {
                if ($(this).scrollTop() > 30) {
                    fixed_top.addClass("sticky");
                } else {
                    fixed_top.removeClass("sticky");
                }
            });
        },

        /* ============================================================ */
        /* Jquery Plugins Calling
        /* ============================================================ */
        onePageFunction: function(){
            $('header .navbar-nav a[href*="#"]:not([href="#"])').on('click', function() {
                if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') || location.hostname == this.hostname) {
                    var target = $(this.hash);
                    target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
                    if (target.length) {
                        $('html,body').animate({
                          scrollTop: target.offset().top - 50,
                        }, 100);
                        return false;
                    }
                }
            });
        },

        /* ============================================================ */
        /* Mobile Menu Integration
        /* ============================================================ */
        mobile_menu: function() {
            //Clone Mobile Menu
            function cloneMobileMenu($cloneItem, $mobileLoc) {
                var $combinedmenu = $($cloneItem).clone();
                $combinedmenu.appendTo($mobileLoc);                
            }
            cloneMobileMenu("header .main-menu > ul", ".mobile-menu .menu");

            function mobile_menu(selector, actionSelector) {
                var mobile_menu = $(selector);
                mobile_menu.on("click", function() {
                    $(selector).toggleClass('is-menu-open');
                });
                
                var hamburgerbtn = $(selector);
                hamburgerbtn.on("click", function() {
                    $(actionSelector).toggleClass('is-menu-open');
                });
        
                $(document).on('click', function(e) {
                    var selectorType = $(actionSelector).add(mobile_menu);
                    if (selectorType.is(e.target) !== true && selectorType.has(e.target).length === 0) {
                        $(actionSelector).removeClass("is-menu-open");
                        $(selector).removeClass("is-menu-open");
                    }          
                });
            
            };
            mobile_menu('.toggler-menu, .close-menu', '.mobile-menu');  	
            $('.mobile-menu ul li.menu-item-has-submenu > a').on('click', function () {
                var link = $(this);
                var closestUl = link.closest("ul");
                var parallelActiveLinks = closestUl.find(".active")
                var closestLi = link.closest("li");
                var linkStatus = closestLi.hasClass("active");
                var count = 0;

                closestUl.find("ul").slideUp(function () {
                    if (++count == closestUl.find("ul").length)
                        parallelActiveLinks.removeClass("active");
                });

                if (!linkStatus) {
                    closestLi.children("ul").slideDown();
                    closestLi.addClass("active");
                }
            });
        },

        /* ============================================================ */
        /* Swiper Slider Init
        /* ============================================================ */
        swiperCarousel: function () {
            var testimonial = new Swiper('.testimonial-slider', {
                slidesPerView: 1,
                spaceBetween: 30,
                loop: 1,
                autoplay: {
                    delay: 5000,
                },
                speed: 1000,
                pagination: {
                    el: ".swiper-pagination",
                    clickable: true,
                },
                breakpoints: {   
                    // when window width is >= 480px
                    480: {
                        slidesPerView: 2,
                    },
                    // when window width is >= 768px
                    768: {
                        slidesPerView: 3,
                    },
                    992: {
                        slidesPerView: 4,
                    }
                }
            });
            var vision_slider = new Swiper('.vision-slider', {
                slidesPerView: 1,
                spaceBetween: 30,
                loop: 1,
                autoplay: {
                    delay: 5000,
                },
                speed: 1000,
                pagination: {
                    el: ".swiper-pagination",
                    clickable: true,
                },
            });
        },

        /* ============================================================ */
        /* Scroll Top
        /* ============================================================ */
        scroll_to_top: function() {
            var $scrolltop = $('#scroll-top');
            $(window).on('scroll', function () {
                if ($(this).scrollTop() > $(this).height()) {
                    $scrolltop.addClass('btn-show').removeClass('btn-hide');
                } else {
                    $scrolltop.addClass('btn-hide').removeClass('btn-show');
                }
            });
            $("a[href='#top']").on('click', function () {
                $('html, body').animate(
                    {
                        scrollTop: 0,
                    },
                    'normal'
                );
                return false;
            });
        },
        /* ============================================================ */
        /* Magnific Popup
        /* ============================================================ */
        magnificPopup: function () {
            $('.video-popup').each(function() { // the containers for all your galleries
                $(this).magnificPopup({
                    disableOn: 375,
                    type: 'iframe',
                    mainClass: 'mfp-fade',
                    removalDelay: 160,
                    preloader: false,
                    fixedContentPos: false
                });
            }); 
        },

        /* ============================================================ */
        /* JQUERY WOW ANIMATION
        /* ============================================================ */
        wowJs: function(){
            var wow = new WOW({
                animateClass: 'animated',
                offset: 100,
                mobile: false,
                duration: 1000,
            });
            wow.init();
        }, 
        initialize: function() {
            healthApp.sticky_header();
			healthApp.onePageFunction();
			healthApp.mobile_menu();
			healthApp.swiperCarousel();
			healthApp.scroll_to_top();
			healthApp.magnificPopup();
			healthApp.wowJs();
		}
    };
    $(function() {
		healthApp.initialize();

        $(window).on('load', function() {
            $(".preloader").fadeOut();     
        });
	});


})(jQuery);