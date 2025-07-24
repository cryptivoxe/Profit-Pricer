document.addEventListener("DOMContentLoaded", function () {
  // --- CONSTANTS ---
  const searchWrapper = document.getElementById("search-wrapper");
  const searchIcon = document.getElementById("search-icon");
  const searchBar = document.getElementById("search-bar");
  const mobileToggle = document.getElementById("mobile-toggle");
  const navLinks = document.getElementById("nav-links");
  const dropdowns = document.querySelectorAll(".dropdown");

  // --- NEW SEARCH LOGIC (ONLY CHANGE MADE) ---
  // Toggles the 'active' class on the search wrapper when the icon is clicked.
  if (searchIcon && searchWrapper && searchBar) {
    searchIcon.addEventListener("click", (e) => {
      e.stopPropagation(); // Prevents click from bubbling to document
      searchWrapper.classList.toggle("active");
      if (searchWrapper.classList.contains("active")) {
        searchBar.focus();
      }
    });
  }

  // Close search bar when clicking anywhere else on the page
  document.addEventListener("click", (e) => {
    if (searchWrapper && !searchWrapper.contains(e.target)) {
      searchWrapper.classList.remove("active");
    }
  });
  // --- END OF NEW SEARCH LOGIC ---


  // --- EXISTING MENU AND BLOG LOGIC (PRESERVED FROM YOUR ORIGINAL FILE) ---

  // Toggle hamburger menu and icon
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

  // Handle mobile dropdown clicks
  dropdowns.forEach(dropdown => {
    const dropdownLink = dropdown.querySelector("a");
    dropdownLink.addEventListener("click", (e) => {
      if (window.innerWidth <= 768) {
        e.preventDefault();
        e.stopPropagation();
        const wasActive = dropdown.classList.contains("active");
        dropdowns.forEach(otherDropdown => {
          otherDropdown.classList.remove("active");
        });
        if (!wasActive) {
          dropdown.classList.add("active");
        }
      }
    });
  });

  // Handle dropdown menu item clicks for mobile
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
    if (navLinks && mobileToggle && !mobileToggle.contains(e.target) && !navLinks.contains(e.target)) {
      navLinks.classList.remove("active");
      mobileToggle.classList.remove("active");
      dropdowns.forEach(dropdown => {
        dropdown.classList.remove("active");
      });
    }
  });

  // Handle window resize to close mobile menu
  window.addEventListener("resize", () => {
    if (window.innerWidth > 768) {
      if (navLinks) navLinks.classList.remove("active");
      if (mobileToggle) mobileToggle.classList.remove("active");
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
