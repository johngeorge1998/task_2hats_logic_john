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
  const body = document.body;

  if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", () => {
      navLinks.classList.toggle("active");

      if (navLinks.classList.contains("active")) {
        menuToggle.innerHTML = "✖";
        body.classList.add("no-scroll");
      } else {
        menuToggle.innerHTML = "☰";
        body.classList.remove("no-scroll");
      }
    });

    document.addEventListener("click", (event) => {
      if (
        !navLinks.contains(event.target) &&
        !menuToggle.contains(event.target)
      ) {
        navLinks.classList.remove("active");
        body.classList.remove("no-scroll");
        menuToggle.innerHTML = "☰";
      }
    });
  } else {
    console.log("Menu toggle or nav-links not found.");
  }
}

document.addEventListener("DOMContentLoaded", function () {
  setTimeout(function () {
    setupDarkModeToggle();
  }, 500);
});

function setupDarkModeToggle() {
  const darkModeToggle = document.querySelector(".intro-icon");
  const body = document.body;
  const plus = document.querySelector(".bulb-on");

  const isDarkMode = localStorage.getItem("darkMode") === "enabled";

  if (isDarkMode) {
    enableDarkMode();
  }

  if (darkModeToggle) {
    darkModeToggle.addEventListener("click", () => {
      if (body.classList.contains("dark-mode")) {
        disableDarkMode();
      } else {
        enableDarkMode();
      }
    });
  } else {
    console.log("Dark mode toggle icon not found.");
  }

  function enableDarkMode() {
    body.classList.add("dark-mode");
    localStorage.setItem("darkMode", "enabled");

    if (plus) {
      plus.src = "assets/bulb-off.svg";
    }
  }

  function disableDarkMode() {
    body.classList.remove("dark-mode");
    localStorage.setItem("darkMode", "disabled");

    if (plus) {
      plus.src = "assets/bulb-on.svg";
    }
  }
}
