function getText() {
	$('#my-form').on('submit', function (event) {
		event.preventDefault();
		let text1 = $(this).find('#text1').val();

		$.ajax({
			url: "/analyze",
			type: 'post',
			dataType: 'json',
			async: false,
			contentType: "application/json; charset=utf-8",
			data: text1,
			success: function(response){
				console.log("success loh")
				console.log(response);
				$("textarea[id='text2']").css("display", "block");
				response = JSON.stringify(response, null, "\t");
				$("#text2").val(response);
			},
			error: function(data){
				console.log("error")
				console.log(data);
				// console.log(error);
			}
		});
	});
}

function getTextVerify() {
	$('#my-form').on('submit', function (event) {
		event.preventDefault();
		let text1 = $(this).find('#text1').val();

		$.ajax({
			url: "/verify",
			type: 'post',
			dataType: 'json',
			async: false,
			contentType: "application/json; charset=utf-8",
			data: text1,
			success: function(response){
				console.log("success loh")
				console.log(response);
				$("textarea[id='text2']").css("display", "block");
				response = JSON.stringify(response, null, "\t");
				$("#text2").val(response);
			},
			error: function(data){
				console.log("error")
				console.log(data);
				// console.log(error);
			}
		});
	});
}

function getTextRepresent() {
	$('#my-form').on('submit', function (event) {
		event.preventDefault();
		let text1 = $(this).find('#text1').val();

		$.ajax({
			url: "/represent",
			type: 'post',
			dataType: 'json',
			async: false,
			contentType: "application/json; charset=utf-8",
			data: text1,
			success: function(response){
				console.log("success loh")
				console.log(response);
				$("textarea[id='text2']").css("display", "block");
				response = JSON.stringify(response, null, "\t");
				$("#text2").val(response);
			},
			error: function(data){
				console.log("error")
				console.log(data);
				// console.log(error);
			}
		});
	});
}