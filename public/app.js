"use strict";

function redirectToURL(url) {
  window.location.href = url;
}

function scrollToTop() {
  document.body.scroll = 0;
  document.documentElement.scrollTop = 0;
}

function scrollToPoint(targetElement, offset) {
  var element = document.getElementById(targetElement);
  var elementPosition = element.getBoundingClientRect().top;
  var offsetPosition = elementPosition + window.scrollY - offset;

  window.scrollTo({
    top: offsetPosition,
  });
}

function populateProjectData(data) {
  let projectHolder = document.getElementById("projectsHolder");

  for (const key in data) {
    var element = data[key];

    let project = document.createElement("div");
    project.className = "card";
    project.onclick = function () {
      redirectToURL("projectPage.html?p=" + key);
    };

    let thumbnail = document.createElement("img");
    thumbnail.src = element["Thumbnail URL"];
    thumbnail.className = "projectThumbnail";

    let containerDiv = document.createElement("div");
    containerDiv.className = "cardContainer";

    let title = document.createElement("h1");
    title.innerHTML = element["Project Name"];

    let description = document.createElement("h3");
    description.innerHTML = element["Short Description"];

    let clickForMore = document.createElement("h4");
    clickForMore.className = "clickForMore";
    clickForMore.innerHTML = "Click to View";

    containerDiv.appendChild(title);
    containerDiv.appendChild(description);

    project.append(thumbnail);
    project.append(containerDiv);
    project.append(clickForMore);
    projectHolder.append(project);
  }
}

function populateExperienceData(data) {
  let experienceHolder = document.getElementById("experienceHolder");
  for (const key in data) {
    var element = data[key];

    let experience = document.createElement("div");
    // experience.className = "card";

    let companyName = document.createElement("h1");
    companyName.innerHTML = element["Company"];

    let designation = document.createElement("h3");
    designation.innerHTML = element["Position"];

    let tenure = document.createElement("h3");
    tenure.innerHTML = element["Tenure"];

    let description = document.createElement("p");
    description.innerHTML = element["Work done"];

    experience.append(companyName);
    experience.append(designation);
    experience.append(tenure);
    experience.append(description);

    experienceHolder.append(experience);
  }
}

function populateSkillsData(data) {
  let skillsHolder = document.getElementById("skillsHolder");
  let skillTemplate = document.getElementById("skillsTemplate");
  for (const key in data) {
    var element = data[key];

    let skill = skillTemplate.content.cloneNode(true);

    skill.querySelector("h1").innerHTML = element["Skill name"];
    skill.querySelector("p").innerHTML = element["Description"];

    skillsHolder.append(skill);
  }
}

function populateToolsData(data) {
  let toolsHolder = document.getElementById("toolsHolder");
  let toolTemplate = document.getElementById("toolsTemplate");
  for (const key in data) {
    var element = data[key];

    let tool = toolTemplate.content.cloneNode(true);

    tool.querySelector("h1").innerHTML = element["Skill"];
    tool.querySelector("h2").innerHTML = element["Level"];
    tool.querySelector("p").innerHTML = element["Description"];

    toolsHolder.append(tool);
  }
}

fetch("jsonData/project.json")
  .then((response) => response.json())
  .then((data) => {
    populateProjectData(data);
  })
  .catch((error) => console.error("Error:", error));

fetch("jsonData/experience.json")
  .then((response) => response.json())
  .then((data) => {
    populateExperienceData(data);
  })
  .catch((error) => console.error("Error:", error));

fetch("jsonData/skills.json")
  .then((response) => response.json())
  .then((data) => {
    populateSkillsData(data);
  })
  .catch((error) => console.error("Error:", error));

fetch("jsonData/tools.json")
  .then((response) => response.json())
  .then((data) => {
    populateToolsData(data);
  })
  .catch((error) => console.error("Error:", error));

window.addEventListener("scroll", function () {});

function openInNewTab(url) {
  window.open(url, "_blank").focus();
}
