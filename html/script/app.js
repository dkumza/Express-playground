const controlForm = document.querySelector("form");
const controlName = document.querySelector(".msg-name");
const controlTxt = document.querySelector(".msg-txt");

controlForm.addEventListener("submit", function (event) {
   event.preventDefault();

   let formData = new FormData(this);
   let object = {};
   formData.forEach((value, key) => {
      object[key] = value;
   });

   axios
      .post("/", object)
      .then(function (response) {
         alert("Message sent successfully");
         controlName.value = "";
         controlTxt.value = "";
      })
      .catch(function (error) {
         console.error("Error:", error);
      });
});
