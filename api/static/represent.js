const input = document.getElementById("selectAvatar");
const avatar = document.getElementById("avatar");
const textArea = document.getElementById("textArea");
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

const uploadImage = async (event) => {
  const file = event.target.files[0];
  const base64 = await convertBase64(file);
  avatar.src = base64;
  textArea.innerText = base64;
  reqBase64 = { model_name: "Facenet", img: base64 };
  reqBase64 = JSON.stringify(reqBase64);
};

// REPRESENT - DEEPFACE
input.addEventListener("change", (e) => {
    uploadImage(e);
    console.log(reqBase64)
    $.ajax({
        url: "/represent",
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