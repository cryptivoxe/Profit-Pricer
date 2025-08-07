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


    // --- CHATBOT WINDOW LOGIC ---
    const chatbotIcon = document.querySelector(".chatbot-icon");
    const chatbotWindow = document.getElementById("chatbot-window");
    const closeChatBtn = chatbotWindow.querySelector(".close-chat");
    const chatBody = chatbotWindow.querySelector(".chat-body");
    const chatForm = chatbotWindow.querySelector(".chat-input-area");
    const chatInput = chatForm.querySelector("input");

    if (chatbotIcon && chatbotWindow && closeChatBtn && chatForm) {
        
        // --- Event Listeners to Open/Close Chat ---
        chatbotIcon.addEventListener("click", () => chatbotWindow.classList.toggle("visible"));
        closeChatBtn.addEventListener("click", () => chatbotWindow.classList.remove("visible"));

        // --- Event Listener for Sending a Message ---
        chatForm.addEventListener("submit", (e) => {
            e.preventDefault(); // Stop form from refreshing the page
            const userInput = chatInput.value.trim();
            if (userInput === "") return; // Don't send empty messages

            // Display user's message and get bot's response
            appendMessage(userInput, "sent");
            chatInput.value = ""; // Clear the input field
            getBotResponse(userInput);
        });

        // --- Function to Add a Message to the Chat Body ---
        function appendMessage(text, type) {
            const messageDiv = document.createElement("div");
            messageDiv.classList.add("chat-message", type);
            messageDiv.innerHTML = `<span>${text}</span>`;
            chatBody.appendChild(messageDiv);
            // Scroll to the bottom to see the new message
            chatBody.scrollTop = chatBody.scrollHeight;
        }

        // --- Function to Simulate Bot Response ---
        function getBotResponse(userInput) {
            // Simulate bot thinking time
            setTimeout(() => {
                const text = userInput.toLowerCase();
                let response;

                // Simple keyword-based logic
                if (text.includes("hello") || text.includes("hi")) {
                    response = "Hello there! How can I assist you with our pricing solutions today?";
                } else if (text.includes("pricing") || text.includes("solutions")) {
                    response = "We have two main solutions: Profit Pricer Fusion for large enterprises and Profit Pricer Lite for small businesses. Which one are you interested in?";
                } else if (text.includes("fusion")) {
                    response = "Profit Pricer Fusion is our advanced enterprise edition, tailored for complex pricing needs. You can find more details on our solutions page!";
                } else if (text.includes("lite")) {
                    response = "Profit Pricer Lite is a fast, simple pricing tool for small businesses and entrepreneurs, available via flexible subscription plans.";
                } else if (text.includes("contact") || text.includes("demo")) {
                    response = "You can request a demo or get in touch with our team through the 'Contact Us' page.";
                } else if (text.includes("thank")) {
                    response = "You're welcome! Is there anything else I can help you with?";
                } else {
                    response = "I'm sorry, I'm still learning. Can you please rephrase? You can ask me about 'pricing', 'solutions', or how to 'contact' us.";
                }

                appendMessage(response, "received");
            }, 1200); // 1.2 second delay
        }
    }

    
    // --- NEW LOAD MORE BLOGS LOGIC ---
  const allBlogCards = document.querySelectorAll(".blog-card");
  const loadMoreBtn = document.getElementById("loadMoreBtn");
  const initialVisibleCount = 4;

  if (loadMoreBtn) {
    if (allBlogCards.length <= initialVisibleCount) {
      const showMoreContainer = document.querySelector(".show-more");
      if (showMoreContainer) {
        showMoreContainer.style.display = "none";
      }
    } else {
      const hiddenCards = Array.from(allBlogCards).slice(initialVisibleCount);
      const loadCount = 4;
      let currentlyShown = 0;

      hiddenCards.forEach(card => card.classList.add("hidden"));

      loadMoreBtn.addEventListener("click", () => {
        const toShow = hiddenCards.slice(currentlyShown, currentlyShown + loadCount);
        toShow.forEach(card => card.classList.remove("hidden"));
        currentlyShown += toShow.length;

        if (currentlyShown >= hiddenCards.length) {
          loadMoreBtn.parentElement.style.display = "none";
        }
      });
    }
  }
});