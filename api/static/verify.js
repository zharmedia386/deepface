const input1 = document.getElementById("selectAvatar1");
const avatar1 = document.getElementById("avatar1");
const textArea1 = document.getElementById("textArea1");

const input2 = document.getElementById("selectAvatar2");
const avatar2 = document.getElementById("avatar2");
const textArea2 = document.getElementById("textArea2");
let reqBase64 = {};

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
        console.log(reqBase64)
        reqBase64 = JSON.stringify(reqBase64);

		$.ajax({
			url: "/verify",
			type: 'post',
			dataType: 'json',
			async: false,
			contentType: "application/json; charset=utf-8",
			data: reqBase64,
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