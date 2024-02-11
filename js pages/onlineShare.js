const shareSubmit = document.querySelector(".shareSubmit");

shareSubmit.addEventListener("click", () => {
  // Get the id from session storage.
  const id = sessionStorage.getItem("idToPass");
  const Employee = document.querySelector("#Employee");
  const StudentNum = document.querySelector("#StudentNum");
  const userr = localStorage.getItem("user");

  // Check if the id is empty.
  if (!id) {
    // Return from the function to stop it from executing.
    return;
  }

  const ShareEnd = document.querySelector(".ShareEnd");

  // Get the current date
  const currentDate = new Date();

  // Add 30 days to the current date
  const futureDate = new Date(currentDate);
  futureDate.setDate(currentDate.getDate() + 30);

  // Convert the future date to dd/mm/yyyy format
  const formattedFutureDate = futureDate.toLocaleDateString("en-GB");

  // Display the result
  ShareEnd.innerHTML = "share End : " + formattedFutureDate;

  // Continue with the rest of the function code.
  const Timestamp = document.querySelector("#Timestamp3");
  const timestamp = new Date();
  // Convert the timestamp to dd/mm/yyyy format.
  const formattedDate = timestamp.toLocaleString("en-GB");

  // Set the Timestamp1 input field to the formatted date.
  Timestamp.value = formattedDate;
  StudentNum.value = id;
  Employee.value = userr;
  const selectedModuleCode = sessionStorage.getItem("ModuleCodeSelect");

  // Check if a module is selected
  if (!selectedModuleCode) {
    alert("Please select a module before submitting.");
    return;
  }

  ModuleCodeSelect.value = selectedModuleCode;

  // Proceed to form submission logic
  selectModuleAndSubmitForm();
});

const ModuleSelect = document.querySelector("#ModuleSelect");
const ModuleCodeSelect = document.querySelector("#ModuleCodeSelect");

async function selectModule() {
  let getModule = await getOnlineShare();

  // Clear existing options
  ModuleSelect.innerHTML = "";

  getModule.forEach((element) => {
    var modules = {
      Module: element.Module,
      ModuleCode: element["Module Code"],
    };
    const option = document.createElement("option");
    option.text = modules.Module.toLowerCase(); // Assuming you want module names in lowercase
    option.value = modules.Module;
    ModuleSelect.appendChild(option);
  });

  // Add a single event listener outside the loop
  ModuleSelect.addEventListener("change", () => {
    let selectedModuleCode = getModule.find(
      (element) => element.Module === ModuleSelect.value
    )["Module Code"];
    ModuleCodeSelect.value = selectedModuleCode;
    sessionStorage.setItem("ModuleCodeSelect", ModuleCodeSelect.value);
  });
}
const alertMsg = document.querySelector(".alertMsg");

// Attach the event listener to the form
jQuery("#frmOnlineShare").on("submit", function (e) {
  e.preventDefault();
  selectModuleAndSubmitForm(); // Call the function to handle module selection and form submission
});

function selectModuleAndSubmitForm() {
  const alertMsg = document.querySelector("#alertMsg");

  // Your existing form submission logic
  jQuery.ajax({
    url: "https://script.google.com/macros/s/AKfycby6GwNH9BYUTScFsXIu88OnvkP-dHztg_BvzT0aZfTAxFG4dGFU-MBogBwTRr0dsh3P/exec",
    type: "post",
    data: jQuery("#frmOnlineShare").serialize(),
    beforeSend: function () {
      var spinner =
        '<div class="text-center appSpi ml-2" ><div class="spinner-border spinner-border-sm" role="status"><span class="visually-hidden"></span></div></div>';
      jQuery("#spinner-container2").html(spinner);
    },
    success: function (result) {
      jQuery("#frmOnlineShare")[0].reset();

      const id = sessionStorage.getItem("idToPass");
      if (id === null || id === "") {
        alertMsg.classList.add("alert", "alert-danger");
        alertMsg.innerHTML =
          "<strong>Error!</strong> Please Enter Invalid Id .";
        alertMsg.style.display = "block";
      } else {
        alertMsg.classList.remove("alert", "alert-danger");
        alertMsg.classList.add("alert", "alert-success");
        alertMsg.innerHTML = "<strong>Success!</strong> Send successfully.";
        alertMsg.style.display = "block";
      }
      alertMsg.style.width = "25%";
      alertMsg.style.position = "fixed";
      alertMsg.style.top = "0";
      alertMsg.style.left = "38%";
      alertMsg.style.margin = "20px";
      alertMsg.style.transition = "all 0.5s ease-in-out";
      alertMsg.style.opacity = "0";
      setTimeout(function () {
        alertMsg.style.opacity = "1";
      }, 10);
      setTimeout(function () {
        alertMsg.style.display = "none";
      }, 2000);
    },
    error: function () {
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
      jQuery("#spinner-container2").empty();
      jQuery("#exampleModal1").modal("hide");
      $("#exampleModal1").on("hidden.bs.modal", function (e) {
        $(".modal-backdrop").remove();
      });
    },
  });
}
