// function signIn() {
//     let oauth2Endpoint = "https://accounts.google.com/o/oauth2/v2/auth"
//     let form = document.createElement('form')
//     form.setAttribute('method', 'POST')
//     form.setAttribute('action', oauth2Endpoint)

//     let params = {
//         "client_id": "768857244422-1b8mje373gjmjsi5hdv7kcatja1roos2.apps.googleusercontent.com",
//         "redirect_uri": "http://127.0.0.1:5501/SRM.html",
//         "response_type": "token",
//         "scope": "https://www.googleapis.com/auth/userinfo.profile",
//         "include_granted_scopes": "true",
//         "clientSecret": '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',
//         'state': 'pass-through-value'
//     }

//     for (var p in params) {
//         let input = document.createElement('input')
//         input.setAttribute('type', 'hidden')
//         input.setAttribute('name', p)
//         input.setAttribute('value', params[p])
//         form.appendChild(input)
//     }
//     console.log();

//     document.body.appendChild(form)
//     form.submit()
// }

// var loadingDiv = document.querySelector(".loading-div");

// var overlay = document.createElement("div");
// overlay.style.position = "fixed";
// overlay.style.display = "none";
// overlay.style.top = "0";
// overlay.style.left = "0";
// overlay.style.width = "0%";
// overlay.style.height = "0%";
// overlay.style.backgroundColor = "rgba(255, 255, 255, 0.5)";
// // overlay.style.backdropFilter = "blur(5px)";
// overlay.style.zIndex = "1";
// document.body.appendChild(overlay);

// function change() {
//     loadingDiv.style.display = "block";
//     overlay.style.display = "block";
// }

// function hide() {
//     overlay.style.display = "none";
//     loadingDiv.style.display = "none";
// }

// const file = window.location.pathname + "/index.html";
// const destination = "http://127.0.0.1:5501/index.html";

// async function transferFile() {
//     const response = await fetch(file);
//     const data = await response.text();

//     const xhr = new XMLHttpRequest();
//     xhr.open("PUT", destination);
//     xhr.setRequestHeader("Content-Type", "text/html");
//     xhr.send(data);
// }

// transferFile();

window.onload = function () {
  location.reload(true); // Passing true as a parameter forces a reload from the server, not from the cache
};

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
var correct = false;
var count = 0;

//old api : https://script.google.com/macros/s/AKfycbzx8H-FSFyj8P5VMxSx5n47ddnurdrbuhCXHr0VEN5ZjbferzGecElgJdEv9mdX3l2X/exec

async function getdata() {
  const url = `https://script.google.com/macros/s/AKfycby74bvG7BwMd-CI4NsPUC_y2oB4PAKC7SH2q4aiHiR9hF1ZC3eMR5tKeNb0xx8cEk-r/exec`;
  response = await fetch(url);
  data = await response.json();
  return data;
}

myButton.addEventListener("click", async () => {
  show();

  if (username.value === "" || password.value === "") {
    hide();
    alert("Please enter both Username and Password");
    return;
  }
  let users = await getdata();

  users.forEach((user) => {
    if (username.value === user.Username && password.value == user.Password) {
      // alert('Done!');
      let emp = {
        username: user.Username,
        password: user.Password,
        role: user.Role,
        Code: user.Code,
      };
      // console.log("test " + emp.username);
      localStorage.setItem("myUser", emp.username);
      localStorage.setItem("myCode", user.Code);
      localStorage.setItem("myUserRole", emp.role);
      correct = true;
      return;
    }
    count++;
    console.log(count);
  });

  if (correct == true) {
    hide();
    window.location.href = "/SRM.html";
  } else {
    hide();
    alert("incorrect Username or Password");
  }
});

const passwordInput = document.querySelector("#password");
const passwordEye = document.querySelector(".password-eye");

passwordEye.addEventListener("click", function () {
  if (passwordInput.type === "password") {
    passwordInput.type = "text";
    passwordEye.classList.add("fa fa-eye-slash");
  } else {
    passwordInput.type = "password";
    passwordEye.classList.remove("fa fa-eye-slash");
  }
});

//for pervent back btn of browser
function preventBack() {
  window.history.forward();
}
setTimeout("preventBack()", 0);
window.onunload = function () {
  null;
};

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  await getdata();
  // displayLogin();
});

const loginbtn = document.querySelector(".loginbtn");

const LocationSelect = document.querySelector("#LocationSelect");

LocationSelect.addEventListener("change", (event) => {
  const selectedValue = event.target.value;
  // Do something with the selected value
  console.log(selectedValue);

  loginbtn.style.display = "block";
});

loginbtn.addEventListener("click", () => {
  // Get the id from session storage.
  const EmployeeLogin = document.querySelector("#EmployeeLogin");
  const username = document.querySelector("#username");

  // Continue with the rest of the function code.
  const Timestamp = document.querySelector("#loginTimestamp");
  const timestamp = new Date();
  // Convert the timestamp to dd/mm/yyyy format.
  const formattedDate = timestamp.toLocaleString("en-GB");

  // Set the Timestamp1 input field to the formatted date.
  Timestamp.value = formattedDate;
  if (username) {
    EmployeeLogin.value = username.value;
  }
});

const alertMsg = document.querySelector("#alertMsg"); //for alertMsg

// for Qr code btn
jQuery("#frmLogin").on("submit", function (e) {
  e.preventDefault();
  jQuery.ajax({
    url: "https://script.google.com/macros/s/AKfycbynJc5-n_o7XFgxq1FdrrJXyxjH3RRp3Qn-NZBAutqOBGrOcKLdOLsZy_QQPYx51i01nw/exec",
    type: "post",
    data: jQuery("#frmLogin").serialize(),
    beforeSend: function () {
      var spinner =
        '<div class="text-center appSpi" ><div class="spinner-border spinner-border-sm" role="status"><span class="visually-hidden"></span></div></div>';
      jQuery("#spinner-container").html(spinner);
    },

    success: function (result) {
      jQuery("#frmLogin")[0].reset();
    },
    error: function () {
      // Display error message here
      alertMsg.classList.add("alert", "alert-danger");
      alertMsg.style.width = "25%";
      alertMsg.style.position = "fixed";
      alertMsg.style.top = "0";
      alertMsg.style.left = "38%";
      alertMsg.style.margin = "20px";
      alertMsg.style.transition = "all 0.5s ease-in-out";
      alertMsg.innerHTML =
        "<strong>Error!</strong> An error occurred. Please try again.";
      alertMsg.style.display = "block";
      alertMsg.style.opacity = "0";
      setTimeout(function () {
        alertMsg.style.opacity = "1";
      }, 10);
      setTimeout(function () {
        alertMsg.style.display = "none";
      }, 2000);
    },
    complete: function () {
      jQuery("#spinner-container").empty();
    },
  });
});

// window.onload = function () {
//     if (window.innerWidth < 768 && window.location.pathname === '/index.html') {
//         const body = document.querySelector('body');
//         body.style.display = 'none';
//         alert('Please open this website from a desktop for the best experience.');
//     }
// }

window.onload = function () {
  localStorage.clear();
  if (window.innerWidth < 1024) {
    $("#popupModal").modal("show");
    // const body = document.querySelector('body');
    // body.style.display = 'none';
  }
};
