document.addEventListener("DOMContentLoaded", function () {
  // --- CONSTANTS ---
  const searchWrapper = document.getElementById("search-wrapper");
  const searchIcon = document.getElementById("search-icon");
  const searchBar = document.getElementById("search-bar");
  const mobileToggle = document.getElementById("mobile-toggle");
  const navLinks = document.getElementById("nav-links");
  const dropdowns = document.querySelectorAll(".dropdown");

  // --- SEARCH LOGIC ---
  if (searchIcon && searchWrapper && searchBar) {
    searchIcon.addEventListener("click", (e) => {
      e.stopPropagation(); 
      searchWrapper.classList.toggle("active");
      if (searchWrapper.classList.contains("active")) {
        searchBar.focus();
      }
    });
  }

  document.addEventListener("click", (e) => {
    if (searchWrapper && !searchWrapper.contains(e.target)) {
      searchWrapper.classList.remove("active");
    }
  });

  // --- MENU LOGIC ---

  if (mobileToggle && navLinks) {
    mobileToggle.addEventListener("click", () => {
      navLinks.classList.toggle("active");
      mobileToggle.classList.toggle("active");

      if (!navLinks.classList.contains("active")) {
        dropdowns.forEach(dropdown => {
          dropdown.classList.remove("active");
        });
      }
    });
  }

  // Handles clicks on dropdowns (Solutions, Resources)
  dropdowns.forEach(dropdown => {
    const dropdownLink = dropdown.querySelector("a");
    dropdownLink.addEventListener("click", (e) => {
      if (window.innerWidth <= 768) {
        e.preventDefault();
        e.stopPropagation();
        const wasActive = dropdown.classList.contains("active");
        
        // First, close all other dropdowns
        dropdowns.forEach(otherDropdown => {
          otherDropdown.classList.remove("active");
        });

        // If the clicked dropdown wasn't already open, open it
        if (!wasActive) {
          dropdown.classList.add("active");
        }
        // If it was already active, the loop above has now closed it.
      }
    });
  });

  // Handles clicks on non-dropdown links (Home, About Us, etc.)
  const nonDropdownLinks = document.querySelectorAll(".nav-center > ul > li:not(.dropdown) > a");
  nonDropdownLinks.forEach(link => {
      link.addEventListener("click", () => {
          if (window.innerWidth <= 768) {
              // When a non-dropdown item is clicked, close any open dropdowns
              dropdowns.forEach(d => {
                  d.classList.remove("active");
              });
          }
      });
  });

  dropdowns.forEach(dropdown => {
    const dropdownMenu = dropdown.querySelector(".dropdown-menu");
    if (dropdownMenu) {
      const menuItems = dropdownMenu.querySelectorAll("a");
      menuItems.forEach(item => {
        item.addEventListener("click", () => {
          if (window.innerWidth <= 768) {
            setTimeout(() => {
              navLinks.classList.remove("active");
              mobileToggle.classList.remove("active");
              dropdowns.forEach(d => d.classList.remove("active"));
            }, 100);
          }
        });
      });
    }
  });

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

  document.addEventListener("click", (e) => {
    if (navLinks && mobileToggle && !mobileToggle.contains(e.target) && !navLinks.contains(e.target)) {
      navLinks.classList.remove("active");
      mobileToggle.classList.remove("active");
      dropdowns.forEach(dropdown => {
        dropdown.classList.remove("active");
      });
    }
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 768) {
      if (navLinks) navLinks.classList.remove("active");
      if (mobileToggle) mobileToggle.classList.remove("active");
      dropdowns.forEach(dropdown => {
        dropdown.classList.remove("active");
      });
    }
  });
});