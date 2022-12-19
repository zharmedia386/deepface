const input = document.getElementById("selectAvatar");
const avatar = document.getElementById("avatar");
const textArea = document.getElementById("textArea");
let reqBase64 = { img: [ ] };

const convertBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);

    fileReader.onload = () => {
      resolve(fileReader.result);
    };

    fileReader.onerror = (error) => {
      reject(error);
    };
  });
};

const uploadImage = async (event) => {
  const file = event.target.files[0];
  const base64 = await convertBase64(file);
  avatar.src = base64;
  textArea.innerText = base64;
  reqBase64 = { img: [base64] };
};


// ANALYZE - DEEPFACE
input.addEventListener("change", (e) => {
	uploadImage(e);
});

function getAnalyze() {
	$('#my-form').on('submit', function (event) {
		event.preventDefault();

		$("#alert-result").hide()

		console.log(reqBase64)
		if(reqBase64.img.length === 0 || !reqBase64.img[0]){
			$("#analyze-error").text("Please Choose an Image")
        	$("#alert-error").show()
			return
		}

		const reqBase64Str = JSON.stringify(reqBase64);

		$.ajax({
			url: "/analyze",
			type: 'post',
			dataType: 'json',
			async: false,
			contentType: "application/json; charset=utf-8",
			data: reqBase64Str,
			success: function(response){
				console.log("success loh")
				console.log(response);
				const result = response.instance_1

				$("#alert-error").hide()

				$("textarea[id='text2']").css("display", "block");
				response = JSON.stringify(response, null, "\t");

				$("#alert-result").show()
				$("#analyze-result-age").text(
					result.age
				)
				$("#analyze-result-emotion").text(
					result.dominant_emotion
				)
				$("#analyze-result-race").text(
					result.dominant_race
				)
				$("#analyze-result-gender").text(
					result.gender
				)
			},
			error: function(error){
				console.log("error")
				console.log(error.message);

				$("#analyze-error").text("No human face detected in input image")
        		$("#alert-error").show()
			}
		});
	});
}