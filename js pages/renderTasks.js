var loadingDiv = document.querySelector(".loading-div");
const tableBody = document.querySelector(".tbodyTask");

async function getTasks() {
  const baseUrl = `https://script.google.com/macros/s/AKfycbzBlucAi_byAP7uNXzyDbqZhoMlgBwHP-RUYXgKeHEs4QEBoPApKSIG9pEmf0yxQR4r/exec`;
  try {
    const response = await fetch(baseUrl);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}

var overlay = document.createElement("div");
overlay.style.position = "fixed";
overlay.style.display = "none";
overlay.style.top = "0";
overlay.style.left = "0";
overlay.style.width = "100%";
overlay.style.height = "100%";
overlay.style.backgroundColor = "rgba(255, 255, 255, 0.5)";
overlay.style.backdropFilter = "blur(5px)";
overlay.style.zIndex = "1";
document.body.appendChild(overlay);

function change() {
  loadingDiv.style.display = "block";
  overlay.style.display = "block";
}

function hide() {
  overlay.style.display = "none";
  loadingDiv.style.display = "none";
}

async function displayTasks() {
  try {
    change();

    const tasks = await getTasks();

    if (!tasks || !Array.isArray(tasks)) {
      console.error("Invalid or undefined tasks array");
      return;
    }

    tableBody.innerHTML = "";

    for (let i = 0; i < tasks.length; i++) {
      const task = {
        TaskNo: tasks[i].TaskNo,
        TaskName: `<a target="_blank" href="${tasks[i].TaskDesLink}">${tasks[i]["TaskName "]}</a>`,
        Department: tasks[i].Department,
        Responsible: tasks[i].Responsible,
        TaskDesLink: tasks[i].TaskDesLink,
        Type: tasks[i].Type,
        Days: tasks[i].Days,
        From: tasks[i].From,
        To: tasks[i].To,
        TimeBeforeEnd: tasks[i]["TimeBef.End"], // Use optional chaining to avoid errors if TimeBef is undefined
      };

      // const formattedDate = new time(task.From).toLocaleDateString("en-GB");
      const formattedTime = new Date(task.From).toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
      });
      const formattedTime1 = new Date(task.To).toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
      });

      const newRow = document.createElement("tr");
      newRow.innerHTML = `
        <td class="text-center">${task.TaskNo}</td>
        <td style="direction: rtl " >${task.TaskName}</td>
        <td>${task.Responsible}</td>
        <td>${task.Days}</td>
        <td>${formattedTime}</td>
        <td>${formattedTime1}</td>
        <td>
        <div dis. style="display: flex; justify-content: center;">
        <button id="cancel" type="submit" data-bs-toggle="modal" data-bs-target="#reportTask"
          class="btn button mx-1 mt-2"><iconify-icon style="color: black;" class="qrIcon mx-1" icon="bi:folder-check"
            width="23" height="23"></iconify-icon>
          <p class="mb-0">Report</p>
          <!-- <div id="spinner-container"></div> -->
        </button>
      </div>

      <div class="modal fade" id="reportTask" tabindex="-1" aria-labelledby="exampleModalLabel"
        aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="exampleModalLabel">Please Write Your Reason
              </h1>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">

              <form method="POST" id="frmCancel">
                <div class="form-group form-floating mb-3 frmDiv ">


                  <div class="form-group form-floating mt-3" style="display:none ;">
                    <input name="Employee" type="text" id="Empcancel" class="form-control">
                    <label for="smsEmployee">Employee</label>
                  </div>
                </div>


                <div class="form-group form-floating" style="display:none ;">
                  <input name="Timestamp" type="text" placeholder="Scholarship" id="cancelTimestamp"
                    class="form-control">
                  <label for="Timestamp">Scholarship</label>
                </div>


                <div class="form-group form-floating" style="display:none ;">
                  <input name="Student Num" type="number" placeholder="Scholarship" id="cancelId"
                    class="form-control">
                  <label for="qrCodeId">Scholarship</label>
                </div>


                <div class="form-group mt-3 form-floating">
                  <textarea name="Cancel Reason" class="form-control" placeholder="Nots" id="CancelReason"
                    rows="10" required></textarea>
                  <label for="CancelReason" class="form-label">Write Your Note</label>
                </div>


                <div class="my-3">
                  <div class="error-message"></div>
                  <div dir="ltr" class="sent-message text-center alert alert-success d-none"></div>

                </div>
                <div class="d-flex justify-content-center mt-3">
                  <button class="btn btn-primary scrollto btn-info text-light d-flex cancelBtn" type="submit">
                    Submit
                    <div id="spinner-container7"></div>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
        </td>
      `;

      // Add the new row to the table body
      if (task.TaskNo == "") {
        newRow.style.display = "none";
      }
      tableBody.appendChild(newRow);
    }
    // Hide the loading overlay once the requests are processed
    hide();
  } catch (error) {
    console.error(error);
    // Handle errors if necessary
  }
}

displayTasks();

window.addEventListener("load", function () {
  if (
    localStorage.getItem("myCode") === "" ||
    localStorage.getItem("myCode") === null
  ) {
    // Redirect to index.html
    window.location.href = "index.html";
  }
});
