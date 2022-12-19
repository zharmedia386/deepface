const input1 = document.getElementById("selectAvatar1");
const avatar1 = document.getElementById("avatar1");
const textArea1 = document.getElementById("textArea1");

const input2 = document.getElementById("selectAvatar2");
const avatar2 = document.getElementById("avatar2");
const textArea2 = document.getElementById("textArea2");
let reqBase64 = { model_name: "Facenet", img: [ {} ] };

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

const uploadImage1 = async (event) => {
  const file = event.target.files[0];
  const base64 = await convertBase64(file);
  avatar1.src = base64;
  textArea1.innerText = base64;
  reqBase64 = { model_name: "Facenet", img: [ { img1: base64 }] };
};

const uploadImage2 = async (event) => {
    const file = event.target.files[0];
    const base64 = await convertBase64(file);
    avatar2.src = base64;
    textArea2.innerText = base64;
    reqBase64.img[0].img2 = base64;
};

// INPUT 1
input1.addEventListener("change", (e) => {
    uploadImage1(e);
});

// INPUT 2
input2.addEventListener("change", (e) => {
    uploadImage2(e);    
});

function getVerify() {
	$('#my-form').on('submit', function (event) {
		event.preventDefault();

    if(reqBase64.img.length === 0 || !reqBase64.img[0].img1 || !reqBase64.img[0].img2){
      $('#alert-error').show()
      return
    }

    console.log(reqBase64)
    const reqBase64Str = JSON.stringify(reqBase64);

    $("#verify-submit").prop('disabled', true);
		$.ajax({
			url: "/verify",
			type: 'post',
			dataType: 'json',
			async: false,
			contentType: "application/json; charset=utf-8",
			data: reqBase64Str,
			success: function(response){
				console.log("success loh")
				console.log(response);
        const result = response.pair_1.verified;

				$("textarea[id='text2']").css("display", "block");
				response = JSON.stringify(response, null, "\t");

        $("#alert-result").show()
        if(result) {
          $("#verify-result").text(" the same person")
        } else {
          $("#verify-result").text(" not the same person")
        }

        $("#alert-error").hide()
        $("#verify-submit").prop('disabled', false);
			},
			error: function(data){
				console.log("error")
				console.log(data);

        $("#alert-error").hide()
        $("#verify-submit").prop('disabled', false);
				// console.log(error);
			}
		});
	});
}