function loadHTML(componentId, filename, callback = null) {
  fetch(filename)
    .then((response) => response.text())
    .then((data) => {
      document.getElementById(componentId).innerHTML = data;
      if (callback) callback();
    })
    .catch((err) => console.log("Error loading " + filename + ": " + err));
}

loadHTML("navbar", "html/navbar.html", addNavToggle);

loadHTML("about", "html/about.html");
loadHTML("people", "html/people.html");
loadHTML("footer", "html/footer.html");

function addNavToggle() {
  const menuToggle = document.querySelector(".menu-toggle");
  const navLinks = document.querySelector(".nav-links");

  if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", () => {
      navLinks.classList.toggle("active");

      if (navLinks.classList.contains("active")) {
        menuToggle.innerHTML = "✖";
      } else {
        menuToggle.innerHTML = "☰";
      }
    });
  } else {
    console.log("Menu toggle or nav-links not found.");
  }
}
