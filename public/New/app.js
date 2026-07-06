"use strict";

function redirectToURL(url) {
  window.location.href = url;
}

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function scrollToSection(targetId) {
  const element = document.getElementById(targetId);
  if (!element) return;
  element.scrollIntoView({ behavior: "smooth", block: "start" });
}

function openInNewTab(url) {
  window.open(url, "_blank", "noopener,noreferrer");
}

function resolveAssetUrl(path) {
  if (/^(https?:)?\/\//.test(path) || path.startsWith("data:")) {
    return path;
  }

  return "../" + path;
}

function populateProjectData(data) {
  const projectHolder = document.getElementById("projectsHolder");

  for (const key in data) {
    const element = data[key];

    const project = document.createElement("article");
    project.className = "projectCard";
    project.onclick = function () {
      redirectToURL("../projectPage.html?p=" + key);
    };

    const thumbnail = document.createElement("img");
    thumbnail.src = resolveAssetUrl(element["Thumbnail URL"]);
    thumbnail.alt = element["Project Name"];
    thumbnail.className = "projectThumbnail";

    const body = document.createElement("div");
    body.className = "cardBody";

    const title = document.createElement("h3");
    title.textContent = element["Project Name"];

    const description = document.createElement("p");
    description.innerHTML = element["Short Description"];

    const meta = document.createElement("div");
    meta.className = "projectMeta";

    const designation = document.createElement("span");
    designation.className = "tag";
    designation.textContent = element["Designation"];

    const platform = document.createElement("span");
    platform.className = "tag";
    platform.textContent = element["Platform"];

    const clickForMore = document.createElement("div");
    clickForMore.className = "clickForMore";
    clickForMore.textContent = "Open project details";

    meta.append(designation, platform);
    body.append(title, description, meta);
    project.append(thumbnail, body, clickForMore);
    projectHolder.append(project);
  }
}

function populateExperienceData(data) {
  const experienceHolder = document.getElementById("experienceHolder");

  for (const key in data) {
    const element = data[key];

    const experience = document.createElement("article");
    experience.className = "experienceCard";

    const companyName = document.createElement("h3");
    companyName.textContent = element["Company"];

    const designation = document.createElement("h4");
    designation.textContent = element["Position"];

    const tenure = document.createElement("h4");
    tenure.textContent = element["Tenure"];

    const description = document.createElement("p");
    description.textContent = element["Work done"];

    experience.append(companyName, designation, tenure, description);
    experienceHolder.append(experience);
  }
}

function populateSkillsData(data) {
  const skillsHolder = document.getElementById("skillsHolder");
  const skillTemplate = document.getElementById("skillsTemplate");

  for (const key in data) {
    const element = data[key];
    const skill = skillTemplate.content.cloneNode(true);

    skill.querySelector("h3").textContent = element["Skill name"];
    skill.querySelector("p").textContent = element["Description"];

    skillsHolder.append(skill);
  }
}

function populateToolsData(data) {
  const toolsHolder = document.getElementById("toolsHolder");
  const toolTemplate = document.getElementById("toolsTemplate");

  for (const key in data) {
    const element = data[key];
    const tool = toolTemplate.content.cloneNode(true);
    const toolRow = tool.querySelector(".toolGroupRow");
    toolRow.dataset.group = element["Group"];

    tool.querySelector("h4").textContent = element["Group"];

    const chipList = tool.querySelector(".chipList");
    for (const item of element["Items"]) {
      const chip = document.createElement("span");
      chip.className = "chip";
      chip.textContent = item;
      chipList.append(chip);
    }

    toolsHolder.append(tool);
  }
}

fetch("../jsonData/project.json")
  .then((response) => response.json())
  .then((data) => populateProjectData(data))
  .catch((error) => console.error("Error:", error));

fetch("../jsonData/experience.json")
  .then((response) => response.json())
  .then((data) => populateExperienceData(data))
  .catch((error) => console.error("Error:", error));

fetch("jsonData/skills.json")
  .then((response) => response.json())
  .then((data) => populateSkillsData(data))
  .catch((error) => console.error("Error:", error));

fetch("jsonData/tools.json")
  .then((response) => response.json())
  .then((data) => populateToolsData(data))
  .catch((error) => console.error("Error:", error));
