
$(document).ready(function(){
	
	var height = $('#documentation').innerHeight();
	var windowHeight = $(window).height();
	var navHeight = $('nav.navbar').innerHeight();
	var siblingHeight = $('#documentation').nextAll().innerHeight();


	if(height < windowHeight){
		$('body').css("padding-bottom", windowHeight-navHeight-height-siblingHeight + "px");
	}

	$(window).resize(function(event){
		var height = $('#documentation').innerHeight();
		var windowHeight = $(window).height();
		var navHeight = $('nav.navbar').innerHeight();
		var siblingHeight = $('#documentation').nextAll().innerHeight();
		
		
		if(height < windowHeight){
			$('body').css("padding-bottom", windowHeight-navHeight-height-siblingHeight + "px");
		}
	});
	
	$('nav.navbar a, .scrollTop').click(function(event){
		
		
			
    // Using jQuery's animate() method to add smooth page scroll
    // The optional number (800) specifies the number of milliseconds it takes to scroll to the specified area (the speed of the animation)
			$('html, body').animate({
				scrollTop: $(hash).offset().top - 69
			}, 600, function(){
				window.location.hash = hash;				
			});
					
			// Collapse Navbar for mobile view
			$(".navbar-collapse").collapse('hide');			
		}

    });
    
    
	$(window).scroll(function(){
		var scrollPos = $('body').scrollTop();
		if(scrollPos > 0){
			$('.navbar').addClass('show-color');
			$('.scrollTop').addClass('show-button');
		} else{
			$('.navbar').removeClass('show-color');
			$('.scrollTop').removeClass('show-button');
		}
		
	});
});