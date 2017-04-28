$(document).ready(function() {
	var email = "";
	var isAdmin = false;
	var date = ""
	function getCookie(cname) {
	    var name = cname + "=";
	    var decodedCookie = decodeURIComponent(document.cookie);
	    var ca = decodedCookie.split(';');
	    for(var i = 0; i <ca.length; i++) {
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
	
	function checkCookie(name) {
	    var username = getCookie(name);
	    if (username != "") 
	    {
	    	if(name == "user")
	    	{
				email = username;
				$("#report").show();
				$("#create").show();
				$("#view-expenses").show();
				$("#login").hide();
				$("li#view-expenses-li").show();
				$("li#create-li").show();
				$("li#report-li").show();
				$("li#user-li").text(username);
				$("li#user-li").show();
				$("li#login-li").hide();
				$("li#logout-li").show();
	    	}
	    	else
	    	{
	    		isAdmin = username;
	    	}
	    } else {
	    }
	}
	
	checkCookie("user");
	checkCookie("isAdmin");
	
	$("#loginButton").click(function() {
		
		$.post("/ExpenseTrackerGigster/rest/v1/users/auth", JSON.stringify({
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
				$("li#logout-li").show();
				$("li#user-li").show();
				$("li#login-li").hide();
				document.cookie = "user= "+email+"";
				document.cookie = "isAdmin= "+isAdmin+"";

				
			}
		});
	});
	var delete_cookie = function(name) {
	    document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
	};
	$("#logout-li").click(function() {
	    delete_cookie("user");
		$("#report").hide();
		$("#create").hide();
		$("#view-expenses").hide();
		$("#login").show();
		$("li#view-expenses-li").hide();
		$("li#create-li").hide();
		$("li#report-li").hide();
		$("li#user-li").text("Login");
		$("li#logout-li").hide();
		$("li#user-li").hide();
		$("li#login-li").show();

	});
	$("#createButton").click(function() {
		$.post("/ExpenseTrackerGigster/rest/v1/expenses", JSON.stringify({
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
	        url: "/ExpenseTrackerGigster/rest/v1/expenses/"+radio,
	        contentType: "application/x-www-form-urlencoded; charset=utf-8",
	        success: function (result) {
	        	alert("Row deleted successfully");
	    		$.ajax({
	    	        type: "GET",
	    	        url: "/ExpenseTrackerGigster/rest/v1/expenses?email="+email+"&admin="+isAdmin,
	    	        contentType: "application/json; charset=utf-8",
	    	        dataType: "json",
	    	        success: function (data, status, jqXHR) {
	    	        	console.log(data);
	            		$('#viewExpensesTable tr:not(:first)').remove();
	            		alert(email);
	    	        	for(var index = 0; index < data.length; index++)
	    	        	{
	    	        		if(data[index].email == email)
	    	        			$('#viewExpensesTable tbody').append('<tr><td contenteditable="false" id = "dateTime_'+data[index].id+'">'+data[index].dt+'</td><td contenteditable="false" id = "amount_'+data[index].id+'">'+data[index].amount+'</td><td contenteditable="false" id = "description_'+data[index].id+'">'+data[index].exDesc+'</td><td><input type="radio" name="deleteUpdateRadio" value="deleteUpdateRadio_'+data[index].id+'" id="deleteUpdateRadio_'+data[index].id+'"></td></tr>');
	    	        		else
	    	        			$('#viewExpensesTable tbody').append('<tr><td contenteditable="false" id = "dateTime_'+data[index].id+'">'+data[index].dt+'</td><td contenteditable="false" id = "amount_'+data[index].id+'">'+data[index].amount+'</td><td contenteditable="false" id = "description_'+data[index].id+'">'+data[index].exDesc+'</td><td></td></tr>');
	    	        			
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
				$.post("/ExpenseTrackerGigster/rest/v1/expenses/update", JSON.stringify({
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
			    	        url: "/ExpenseTrackerGigster/rest/v1/expenses?email="+email+"&admin="+isAdmin,
			    	        contentType: "application/json; charset=utf-8",
			    	        dataType: "json",
			    	        success: function (data, status, jqXHR) {
			    	        	console.log(data);
			            		$('#viewExpensesTable tr:not(:first)').remove();
			    	        	for(var index = 0; index < data.length; index++)
			    	        	{
			    	        		if(data[index].email == email)
			    	        			$('#viewExpensesTable tbody').append('<tr><td contenteditable="false" id = "dateTime_'+data[index].id+'">'+data[index].dt+'</td><td contenteditable="false" id = "amount_'+data[index].id+'">'+data[index].amount+'</td><td contenteditable="false" id = "description_'+data[index].id+'">'+data[index].exDesc+'</td><td><input type="radio" name="deleteUpdateRadio" value="deleteUpdateRadio_'+data[index].id+'" id="deleteUpdateRadio_'+data[index].id+'"></td></tr>');
			    	        		else
			    	        			$('#viewExpensesTable tbody').append('<tr><td contenteditable="false" id = "dateTime_'+data[index].id+'">'+data[index].dt+'</td><td contenteditable="false" id = "amount_'+data[index].id+'">'+data[index].amount+'</td><td contenteditable="false" id = "description_'+data[index].id+'">'+data[index].exDesc+'</td><td></td></tr>');
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
	        url: "/ExpenseTrackerGigster/rest/v1/expenses?email="+email+"&admin="+isAdmin,
	        contentType: "application/json; charset=utf-8",
	        dataType: "json",
	        success: function (data, status, jqXHR) {
	        	console.log(data);
        		$('#viewExpensesTable tr:not(:first)').remove();
	        	for(var index = 0; index < data.length; index++)
	        	{
	        		if(data[index].email == email)
	        			$('#viewExpensesTable tbody').append('<tr><td contenteditable="false" id = "dateTime_'+data[index].id+'">'+data[index].dt+'</td><td contenteditable="false" id = "amount_'+data[index].id+'">'+data[index].amount+'</td><td contenteditable="false" id = "description_'+data[index].id+'">'+data[index].exDesc+'</td><td><input type="radio" name="deleteUpdateRadio" value="deleteUpdateRadio_'+data[index].id+'" id="deleteUpdateRadio_'+data[index].id+'"></td></tr>');
	        		else
	        			$('#viewExpensesTable tbody').append('<tr><td contenteditable="false" id = "dateTime_'+data[index].id+'">'+data[index].dt+'</td><td contenteditable="false" id = "amount_'+data[index].id+'">'+data[index].amount+'</td><td contenteditable="false" id = "description_'+data[index].id+'">'+data[index].exDesc+'</td><td></td></tr>');
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
	        url: "/ExpenseTrackerGigster/rest/v1/expenses/range",
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
	
	$("#nextWeekButton").click(function() {
		 dd = date.getDate();
		 mm = date.getMonth()+1; //January is 0!
		 yyyy = date.getFullYear();
		 min = date.getMinutes();
		 hr = date.getHours();

		if(dd<10) {
		    dd='0'+dd
		} 

		if(mm<10) {
		    mm='0'+mm
		} 
		if(min<10) {
		    min='0'+min
		} 

		if(hr<10) {
		    hr='0'+hr
		} 
		var startDt = yyyy + "-" + mm + "-" + dd +"T"+ hr + ":" +min;
		date.setDate(date.getDate() + 7);
		var dd = date.getDate();
		var mm = date.getMonth()+1; //January is 0!
		var yyyy = date.getFullYear();
		var min = date.getMinutes();
		var hr = date.getHours();
		if(dd<10) {
		    dd='0'+dd
		} 

		if(mm<10) {
		    mm='0'+mm
		} 
		if(min<10) {
		    min='0'+min
		} 

		if(hr<10) {
		    hr='0'+hr
		} 
		var endDt = yyyy + "-" + mm + "-" + dd +"T"+ hr + ":" +min;
		$.ajax({
	        type: "POST",
	        url: "/ExpenseTrackerGigster/rest/v1/expenses/range",
	        data: JSON.stringify({
	          "end_dt": endDt,
			  "start_dt": startDt,
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
	$("#prevWeekButton").click(function() {
		date.setDate(date.getDate() - 7);
		var dd = date.getDate();
		var mm = date.getMonth()+1; //January is 0!
		var yyyy = date.getFullYear();
		var min = date.getMinutes();
		var hr = date.getHours();
		if(dd<10) {
		    dd='0'+dd
		} 

		if(mm<10) {
		    mm='0'+mm
		} 
		if(min<10) {
		    min='0'+min
		} 

		if(hr<10) {
		    hr='0'+hr
		} 
		var endDt = yyyy + "-" + mm + "-" + dd +"T"+ hr + ":" +min;
		var prevDate = new Date(date);
		prevDate.setDate(prevDate.getDate() - 7);

		dd = prevDate.getDate();
		 mm = prevDate.getMonth()+1; //January is 0!
		 yyyy = prevDate.getFullYear();
		 min = prevDate.getMinutes();
		 hr = prevDate.getHours();

		if(dd<10) {
		    dd='0'+dd
		} 

		if(mm<10) {
		    mm='0'+mm
		} 
		if(min<10) {
		    min='0'+min
		} 

		if(hr<10) {
		    hr='0'+hr
		} 
		var startDt = yyyy + "-" + mm + "-" + dd +"T"+ hr + ":" +min;
		$.ajax({
	        type: "POST",
	        url: "/ExpenseTrackerGigster/rest/v1/expenses/range",
	        data: JSON.stringify({
	          "end_dt": endDt,
			  "start_dt": startDt,
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

	$("#weeklyButton").click(function() {
		$("#customDate").hide(1000);
		$("#weeklyDate").show(1000);
		var today = new Date();
		date = today;
		var dd = today.getDate();
		var mm = today.getMonth()+1; //January is 0!
		var yyyy = today.getFullYear();
		var min = today.getMinutes();
		var hr = today.getHours();

		if(dd<10) {
		    dd='0'+dd
		} 

		if(mm<10) {
		    mm='0'+mm
		} 
		if(min<10) {
		    min='0'+min
		} 

		if(hr<10) {
		    hr='0'+hr
		} 
		var endDt = yyyy + "-" + mm + "-" + dd +"T"+ hr + ":" +min;
//		startDate = startDate - 7;
		 today = new Date();
		 today.setDate(today.getDate() - 7);
		 dd = today.getDate();
		 mm = today.getMonth()+1; //January is 0!
		 yyyy = today.getFullYear();
		 min = today.getMinutes();
		 hr = today.getHours();

		if(dd<10) {
		    dd='0'+dd
		} 

		if(mm<10) {
		    mm='0'+mm
		} 
		if(min<10) {
		    min='0'+min
		} 

		if(hr<10) {
		    hr='0'+hr
		} 
		var startDt = yyyy + "-" + mm + "-" + dd +"T"+ hr + ":" +min;
		$.ajax({
	        type: "POST",
	        url: "/ExpenseTrackerGigster/rest/v1/expenses/range",
	        data: JSON.stringify({
	          "end_dt": endDt,
			  "start_dt": startDt,
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
