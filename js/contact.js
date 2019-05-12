$(function(){
	
	var form = $('form#contact_email');
	form.submit(function(e) {'use strict',
		e.preventDefault();
		var sender=$('#sender').val();
		var email=$('#email').val();
		var subject=$('#subject').val();
		var message=$('#message').val();
		
		//var data='sender' + sender + '&subject' + subject + '&email' + email + '&message' + message;
		
				$.ajax({
					type:'POST',
					url:'services/contact',
					data:{
					sender:sender,
					email:email,
					subject:subject,
					message:message	
					},
					success:function(response){
					$('#sender').val('sent');
					$('#email').val('');
					$('#subject').val('');
					$('#message').val('');
					console.log(response);
					}
				});
		
		/*
				$.post("services/contact",$("form#contact_email").serialize(), function(response){
					$('#sender').val('sent');
					$('#email').val('');
					$('#subject').val('');
					$('#message').val('');
					console.log(response);
					});

			*/	
			
	});

});