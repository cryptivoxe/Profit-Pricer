document.addEventListener("DOMContentLoaded", function () {
  const searchIcon = document.getElementById("search-icon");
  const searchBar = document.getElementById("search-bar");
  const mobileToggle = document.getElementById("mobile-toggle");
  const navLinks = document.getElementById("nav-links");
  const dropdowns = document.querySelectorAll(".dropdown");

  // Toggle search bar
  searchIcon.addEventListener("click", () => {
    searchBar.classList.toggle("active");
    if (searchBar.classList.contains("active")) {
      searchBar.focus();
    } else {
      searchBar.blur();
    }
  });

  // Close search bar when clicking outside
  document.addEventListener("click", (e) => {
    if (!searchIcon.contains(e.target) && !searchBar.contains(e.target)) {
      searchBar.classList.remove("active");
    }
  });

  // Toggle hamburger menu and icon
  mobileToggle.addEventListener("click", () => {
    navLinks.classList.toggle("active");
    mobileToggle.classList.toggle("active");

    // Close all mobile dropdowns when menu closes
    if (!navLinks.classList.contains("active")) {
      dropdowns.forEach(dropdown => {
        dropdown.classList.remove("active");
      });
    }
  });

  // Handle mobile dropdown clicks
  dropdowns.forEach(dropdown => {
    // Find the link that toggles the dropdown
    const dropdownLink = dropdown.querySelector("a");

    dropdownLink.addEventListener("click", (e) => {
      // Prevent the link from trying to navigate away
      e.preventDefault();

      // Stop the click from bubbling up to other listeners (like 'click outside to close')
      e.stopPropagation();

      // Check if the dropdown we just clicked is already open
      const wasActive = dropdown.classList.contains("active");

      // First, close all dropdowns to reset the state.
      dropdowns.forEach(otherDropdown => {
        otherDropdown.classList.remove("active");
      });

      // If the dropdown we clicked was NOT already open, then open it.
      // If it WAS open, it will simply remain closed from the step above.
      if (!wasActive) {
        dropdown.classList.add("active");
      }
    });
  });

  // Handle dropdown menu item clicks
  dropdowns.forEach(dropdown => {
    const dropdownMenu = dropdown.querySelector(".dropdown-menu");
    if (dropdownMenu) {
      const menuItems = dropdownMenu.querySelectorAll("a");
      menuItems.forEach(item => {
        item.addEventListener("click", (e) => {
          // Allow normal navigation for dropdown menu items
          // Close mobile menu after clicking a dropdown item
          if (window.innerWidth <= 768) {
            setTimeout(() => {
              navLinks.classList.remove("active");
              mobileToggle.classList.remove("active");
              dropdown.classList.remove("active");
            }, 100);
          }
        });
      });
    }
  });

  // Improve desktop hover behavior
  dropdowns.forEach(dropdown => {
    let hoverTimeout;

    dropdown.addEventListener("mouseenter", () => {
      if (window.innerWidth > 768) {
        clearTimeout(hoverTimeout);
        dropdown.classList.add("hover");
      }
    });

    dropdown.addEventListener("mouseleave", () => {
      if (window.innerWidth > 768) {
        hoverTimeout = setTimeout(() => {
          dropdown.classList.remove("hover");
        }, 150);
      }
    });
  });

  // Close mobile menu when clicking outside
  document.addEventListener("click", (e) => {
    if (!mobileToggle.contains(e.target) && !navLinks.contains(e.target)) {
      navLinks.classList.remove("active");
      mobileToggle.classList.remove("active");
      dropdowns.forEach(dropdown => {
        dropdown.classList.remove("active");
      });
    }
  });

  // Handle window resize
  window.addEventListener("resize", () => {
    if (window.innerWidth > 768) {
      navLinks.classList.remove("active");
      mobileToggle.classList.remove("active");
      dropdowns.forEach(dropdown => {
        dropdown.classList.remove("active");
      });
    }
  });

  // Load More Blogs Logic
  const blogCards = document.querySelectorAll(".blog-card.hidden");
  const loadMoreBtn = document.getElementById("loadMoreBtn");

  if (loadMoreBtn && blogCards.length > 0) {
    let loaded = 0;
    const loadCount = 4;

    loadMoreBtn.addEventListener("click", () => {
      for (let i = loaded; i < loaded + loadCount; i++) {
        if (blogCards[i]) {
          blogCards[i].classList.remove("hidden");
        }
      }
      loaded += loadCount;

      if (loaded >= blogCards.length) {
        loadMoreBtn.style.display = "none";
      }
    });
  }
});
