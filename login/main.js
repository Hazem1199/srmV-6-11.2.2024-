const spinnerLog = document.querySelector("#spinnerLog");

function show() {
  spinnerLog.style.display = "block";
}

function hide() {
  spinnerLog.style.display = "none";
}

const form = document.querySelector(".form");
const username = document.querySelector("#username");
const password = document.querySelector("#password");
const myButton = document.querySelector(".myButton");

async function getdata() {
  const url = `https://script.google.com/macros/s/AKfycbxv-B5kgU0CeVmAt_3thPg_MV4m1QbcnxmqOkvj8lHvsnmdq084DTzjz8uyfKsdehZl/exec`;
  const response = await fetch(url);
  const data = await response.json();
  return data;
}

function saveUserData(user) {
  localStorage.setItem("myUser", user.Username);
  localStorage.setItem("myCode", user.Code);
  localStorage.setItem("myUserRole", user.Role);

}

async function handleButtonClick() {
  show();

  const users = await getdata();
  const matchedUser = users.find(
    (user) =>
      user.Username === username.value && user.Password === password.value
  );

  if (matchedUser) {
    localStorage.setItem("myUser", matchedUser.Username);
    localStorage.setItem("myCode", matchedUser.Code);
    localStorage.setItem("myUserRole", matchedUser.Role);
    localStorage.setItem("myDepartment", matchedUser.Department);


    console.log("myUser : " + localStorage.getItem("myUser"));
    console.log("myCode : " + localStorage.getItem("myCode"));
    console.log("myUserRole : " + localStorage.getItem("myUserRole"));
    console.log("myDepartment : " + localStorage.getItem("myDepartment"));

    saveUserData(matchedUser);
    hide();
    window.location.href = "/SRM.html";
  } else {
    hide();
    alert("Incorrect Username or Password");
  }
}

myButton.addEventListener("click", handleButtonClick);

form.addEventListener("submit", (e) => {
  e.preventDefault();
});

const passwordInput = document.querySelector("#password");
const passwordEye = document.querySelector(".password-eye");

passwordEye.addEventListener("click", function () {
  if (passwordInput.type === "password") {
    passwordInput.type = "text";
    passwordEye.classList.add("fa-eye-slash");
  } else {
    passwordInput.type = "password";
    passwordEye.classList.remove("fa-eye-slash");
  }
});

// For preventing the back button of the browser
function preventBack() {
  window.history.forward();
}
setTimeout(preventBack, 0);
window.onunload = function () {
  null;
};
