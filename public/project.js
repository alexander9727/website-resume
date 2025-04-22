"use strict";

const currentURL = new URL(window.location.toLocaleString()).searchParams;
const projectID = currentURL.get("p");

fetch("jsonData/project.json")
  .then((response) => response.json())
  .then((data) => {
    populateProjectData(data);
  })
  .catch((error) => console.error("Error:", error));

function populateProjectData(projectData) {
  const project = projectData[projectID];
  if (project === undefined) {
    document.getElementById("mainDisplay").style.display = "none";
    return;
  }
  document.getElementById("noProject").style.display = "none";

  document.getElementById("projectThumbnail").src = project["Thumbnail URL"];

  document.title = "Andrew Yorke | " + project["Project Name"];

  document.getElementById("projectTitle").innerHTML = project["Project Name"];

  document.getElementById("asPartOf").innerHTML = project["As part of"];

  document.getElementById("designation").innerHTML = project["Designation"];

  document.getElementById("platform").innerHTML = project["Platform"];

  setUpButton(document.getElementById("gPlay"), project, "Google play link");
  setUpButton(document.getElementById("itch"), project, "Itch link");
  setUpButton(document.getElementById("other"), project, "Other links");
  setUpButton(document.getElementById("github"), project, "Github link");

  document.getElementById("description").innerHTML = project["Description"];

  const responsibilities = document.getElementById("responsibilities");
  let split = project["Responsibilities"].split("\n");

  split.forEach((element) => {
    var li = document.createElement("li");
    li.innerHTML = element;
    responsibilities.append(li);
  });
}

function setUpButton(button, project, id) {
  const url = project[id];
  if (url === "") {
    button.style.display = "none";
    return;
  }

  button.onclick = function () {
    openInNewTab(url);
  };
}

function openInNewTab(url) {
  window.open(url, "_blank").focus();
}
