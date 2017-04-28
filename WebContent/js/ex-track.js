$(document).ready(function() {
	var email = "";
	var isAdmin = false;
	
	function setCookie(cname,cvalue,exdays) {
	    var d = new Date();
	    d.setTime(d.getTime() + (exdays*24*60*60*1000));
	    var expires = "expires=" + d.toGMTString();
	    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
	}

	function getCookie(cname) {
	    var name = cname + "=";
	    var decodedCookie = decodeURIComponent(document.cookie);
	    var ca = decodedCookie.split(';');
	    for(var i = 0; i < ca.length; i++) {
	        var c = ca[i];
	        while (c.charAt(0) == ' ') {
	            c = c.substring(1);
	        }
	        if (c.indexOf(name) == 0) {
	            return c.substring(name.length, c.length);
	        }
	    }
	    return "";
	}

	function checkCookie() {
	    var user=getCookie("username");
	    if (user != "") {
			email = $("#email").val();
			isAdmin = data.admin;
			$("#report").show();
			$("#create").show();
			$("#view-expenses").show();
			$("#login").hide();
			$("li#view-expenses-li").show();
			$("li#create-li").show();
			$("li#report-li").show();
			$("li#user-li").text($("#email").val());
			$("li#user-li").show();
			$("li#login-li").hide();
	    } 
	}
	function eraseCookie(cname) {
	    createCookie(cname,"",-1);
	}
	
	$("#loginButton").click(function() {
		
		$.post("/ex-tracker/rest/v1/users/auth", JSON.stringify({
			"email" : $("#email").val(),
			"password" : $("#password").val()
		}),
		function(data, status) {
			if(status == "success")
			{
				email = $("#email").val();
				isAdmin = data.admin;
				$("#report").show();
				$("#create").show();
				$("#view-expenses").show();
				$("#login").hide();
				$("li#view-expenses-li").show();
				$("li#create-li").show();
				$("li#report-li").show();
				$("li#user-li").text($("#email").val());
				$("li#user-li").show();
				$("li#login-li").hide();
		        setCookie("username", email, 30);

				
			}
		});
	});
	
	$("#createButton").click(function() {
		$.post("/ex-tracker/rest/v1/expenses", JSON.stringify({
			"dt":$("#dateTime").val(),
			  "amount":$("#amount").val(),
			  "email": email,
			  "exDesc": $("#description").val() 
		}),
		function(data, status) {
			if(status == "success")
			{
				alert(data);
			}
		});
	});
	
	$("#deleteButton").click(function() {
		var radio = $('input[name=deleteUpdateRadio]:checked').val();
		radio = radio.substring(radio.indexOf("_")+1);
		$.ajax({
	        type: "DELETE",
	        url: "/ex-tracker/rest/v1/expenses/"+radio,
	        contentType: "application/x-www-form-urlencoded; charset=utf-8",
	        success: function (result) {
	        	alert("Row deleted successfully");
	    		$.ajax({
	    	        type: "GET",
	    	        url: "/ex-tracker/rest/v1/expenses?email="+email+"&admin="+isAdmin,
	    	        contentType: "application/json; charset=utf-8",
	    	        dataType: "json",
	    	        success: function (data, status, jqXHR) {
	    	        	console.log(data);
	            		$('#viewExpensesTable tr:not(:first)').remove();
	    	        	for(var index = 0; index < data.length; index++)
	    	        	{
	    	        		$('#viewExpensesTable tbody').append('<tr><td contenteditable="false" id = "dateTime_'+data[index].id+'">'+data[index].dt+'</td><td contenteditable="false" id = "amount_'+data[index].id+'">'+data[index].amount+'</td><td contenteditable="false" id = "description_'+data[index].id+'">'+data[index].exDesc+'</td><td><input type="radio" name="deleteUpdateRadio" value="deleteUpdateRadio_'+data[index].id+'" id="deleteUpdateRadio_'+data[index].id+'"></td></tr>');
	    	        	}
	    	        },
	    	
	    	        error: function (jqXHR, status) {
	    	            // error handler
	    	        }
	    		});

	        }
		});

	});

	$("#updateButton").click(function() {
		var radio = $('input[name=deleteUpdateRadio]:checked').val();
		radio = radio.substring(radio.indexOf("_")+1);
		
			var $this = $('input[name=deleteUpdateRadio]:checked');
			var tds = $this.closest('tr').find('td').filter(function() {
				return $(this).find('.editbtn').length === 0;
			});
			if ($("#updateButton").html() === 'Edit') {
				$("#updateButton").html('Save');
				tds.prop('contenteditable', true);
			} else {
				$("#updateButton").html('Edit');
				tds.prop('contenteditable', false);
				$.post("/ex-tracker/rest/v1/expenses/update", JSON.stringify({
					  "dt": $("#dateTime_"+radio).text(),
					  "amount":$("#amount_"+radio).text(),
					  "email": email,
					  "exDesc": $("#description_"+radio).text(), 
					  "id": radio 
				}),
				function(data, status) {
					if(status == "success")
					{
			        	alert("Row updates successfully");
			    		$.ajax({
			    	        type: "GET",
			    	        url: "/ex-tracker/rest/v1/expenses?email="+email+"&admin="+isAdmin,
			    	        contentType: "application/json; charset=utf-8",
			    	        dataType: "json",
			    	        success: function (data, status, jqXHR) {
			    	        	console.log(data);
			            		$('#viewExpensesTable tr:not(:first)').remove();
			    	        	for(var index = 0; index < data.length; index++)
			    	        	{
			    	        		$('#viewExpensesTable tbody').append('<tr><td contenteditable="false" id = "dateTime_'+data[index].id+'">'+data[index].dt+'</td><td contenteditable="false" id = "amount_'+data[index].id+'">'+data[index].amount+'</td><td contenteditable="false" id = "description_'+data[index].id+'">'+data[index].exDesc+'</td><td><input type="radio" name="deleteUpdateRadio" value="deleteUpdateRadio_'+data[index].id+'" id="deleteUpdateRadio_'+data[index].id+'"></td></tr>');
			    	        	}
			    	        },
			    	
			    	        error: function (jqXHR, status) {
			    	            // error handler
			    	        }
			    		});
					}
				});

			}
		

	});
	
	
	$("#viewExpensesButton").click(function() {
	
		$.ajax({
	        type: "GET",
	        url: "/ex-tracker/rest/v1/expenses?email="+email+"&admin="+isAdmin,
	        contentType: "application/json; charset=utf-8",
	        dataType: "json",
	        success: function (data, status, jqXHR) {
	        	console.log(data);
        		$('#viewExpensesTable tr:not(:first)').remove();
	        	for(var index = 0; index < data.length; index++)
	        	{
	        		$('#viewExpensesTable tbody').append('<tr><td contenteditable="false" id = "dateTime_'+data[index].id+'">'+data[index].dt+'</td><td contenteditable="false" id = "amount_'+data[index].id+'">'+data[index].amount+'</td><td contenteditable="false" id = "description_'+data[index].id+'">'+data[index].exDesc+'</td><td><input type="radio" name="deleteUpdateRadio" value="deleteUpdateRadio_'+data[index].id+'" id="deleteUpdateRadio_'+data[index].id+'"></td></tr>');
	        	}
	        },
	
	        error: function (jqXHR, status) {
	            // error handler
	        }
		});

	});
	
	$("#viewCustomButton").click(function() {
		
		$.ajax({
	        type: "POST",
	        url: "/ex-tracker/rest/v1/expenses/range",
	        data: JSON.stringify({
	          "end_dt":$("#endDateTime").val(),
			  "start_dt":$("#startDateTime").val(),
			  "email": email
		}),
	        contentType: "application/x-www-form-urlencoded; charset=utf-8",
	        dataType: "json",
	        success: function (data, status, jqXHR) {
	        	console.log(data);
        		$('#viewReport tr:not(:first)').remove();
	        	for(var index = 0; index < data.length; index++)
	        	{
	        		$('#viewReport tbody').append('<tr><td contenteditable="false" id = "dateTime_'+data[index].id+'">'+data[index].dt+'</td><td contenteditable="false" id = "amount_'+data[index].id+'">'+data[index].amount+'</td><td contenteditable="false" id = "description_'+data[index].id+'">'+data[index].exDesc+'</td></tr>');
	        	}
	        },
	
	        error: function (jqXHR, status) {
	            // error handler
	        }
		});

	});

	
	
	$("#customButton").click(function() {
		$("#weeklyDate").hide(1000);
		$("#customDate").show(1000);
	});
	$("#weeklyButton").click(function() {
		$("#customDate").hide(1000);
		$("#weeklyDate").show(1000);
		
		$.ajax({
	        type: "POST",
	        url: "/ex-tracker/rest/v1/expenses/range",
	        data: JSON.stringify({
	          "end_dt": "",
			  "start_dt": "",
			  "email": email
		}),
	        contentType: "application/x-www-form-urlencoded; charset=utf-8",
	        dataType: "json",
	        success: function (data, status, jqXHR) {
	        	console.log(data);
        		$('#viewReport tr:not(:first)').remove();
	        	for(var index = 0; index < data.length; index++)
	        	{
	        		$('#viewReport tbody').append('<tr><td contenteditable="false" id = "dateTime_'+data[index].id+'">'+data[index].dt+'</td><td contenteditable="false" id = "amount_'+data[index].id+'">'+data[index].amount+'</td><td contenteditable="false" id = "description_'+data[index].id+'">'+data[index].exDesc+'</td></tr>');
	        	}
	        },
	
	        error: function (jqXHR, status) {
	            // error handler
	        }
		});

		
	});

});
