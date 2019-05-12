// Add initial active class
$(function(){

//wow animation	
	new WOW().init();
//smooth slider scroll

//transition
smoothScroll.init();



//clicliful

   $("#html,#bootstrap").circliful({
        animationStep: 5,
        foregroundBorderWidth: 5,
        backgroundBorderWidth: 15,
        foregroundColor:'#ff0000',
        percent: 85
    });

    $("#nodejs,#sass").circliful({
        animationStep: 5,
        foregroundBorderWidth: 5,
        backgroundBorderWidth: 15,
        foregroundColor:'#0000ff',
        percent: 70
    });

    $("#javascript,#codeigniter").circliful({
        animationStep: 5,
        foregroundBorderWidth: 5,
        backgroundBorderWidth: 15,
        foregroundColor:'#4d004d',
        percent: 75
    });

     $("#php,#object").circliful({
        animationStep: 5,
        foregroundBorderWidth: 5,
        backgroundBorderWidth: 15,
        foregroundColor:'#0f1f3d',
        percent: 80
    });
	
	$('#navmenu a').on('click', function(e){
		$('#navmenu a').removeClass('on');
		$(this).addClass('on');
		
	});
   $(window).bind('scroll', function() {
        var navHeight = $(window).height() - 100;
        if ($(window).scrollTop() > navHeight) {
            $('.navbar-default').addClass('transit_to');
        } else {
            $('.navbar-default').removeClass('transit_to');
        }
    });

 
	
	
});

