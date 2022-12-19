const input = document.getElementById("selectAvatar");
const avatar = document.getElementById("avatar");
const textArea = document.getElementById("textArea");
let reqBase64 = { model_name: "Facenet", img: '' };

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
  reqBase64 = { model_name: "Facenet", img: base64 };
};

// REPRESENT - DEEPFACE
input.addEventListener("change", (e) => {
  uploadImage(e);
});

function getRepresent() {
	$('#my-form').on('submit', function (event) {
    event.preventDefault();

    console.log(reqBase64)
    if(reqBase64.img.length === 0 || !reqBase64.img[0]){
      alert('error')
      return
    }

    const reqBase64Str = JSON.stringify(reqBase64);

    $.ajax({
        url: "/represent",
        type: 'post',
        dataType: 'json',
        async: false,
        contentType: "application/json; charset=utf-8",
        data: reqBase64Str,
        success: function(response){
            console.log("success loh")
            console.log(response);
            const result = response.embedding

            $("textarea[id='text2']").css("display", "block");
            response = JSON.stringify(response, null, "\t");

            $("#alert-result").show()
            $("#represent-result").text(
              result
            )
        },
        error: function(data){
            console.log("error")
            console.log(data);
            // console.log(error);
        }
    });
	});
}