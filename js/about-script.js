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
    const closeChatBtn = chatbotWindow ? chatbotWindow.querySelector(".close-chat") : null;
    const chatBody = chatbotWindow ? chatbotWindow.querySelector(".chat-body") : null;
    
    // Your new questions and answers are stored here
    const qaData = [
        {
            category: "General Product Information",
            questions: [
                { q: "What is Profit Pricer?", a: "Profit Pricer is a platform that uses artificial intelligence to help businesses optimize, manage, and grow their revenue and margins with smarter pricing strategies." },
                { q: "What are the main products offered?", a: "Profit Pricer offers two main products:<br><ul><li><b>Profit Pricer Fusion:</b> An advanced enterprise solution for businesses with complex pricing needs.</li><li><b>Profit Pricer Lite:</b> A fast, simple tool designed for small businesses and entrepreneurs.</li></ul>" }
            ]
        },
        {
            category: "Product Features & Benefits",
            questions: [
                { q: "How does Profit Pricer help my business?", a: "Profit Pricer helps you set, manage, and simulate pricing quickly, standardizes and tracks price changes, and provides recommendations to maximize profits." },
                { q: "What makes Profit Pricer’s AI unique?", a: "Our AI-driven platform provides actionable pricing recommendations, automates complex processes, and adapts to market changes to support sustainable financial growth." }
            ]
        },
        {
            category: "Specific Product Information",
            questions: [
                { q: "What is Profit Pricer Fusion?", a: "Fusion is our advanced edition for larger organizations. It offers powerful tools for setting, managing, and simulating prices at scale for complex operations." },
                { q: "What is Profit Pricer Lite?", a: "Lite is a simple, efficient tool for small businesses. It offers key pricing features and is available through flexible subscription plans." }
            ]
        },
        {
            category: "Pricing & Subscription",
            questions: [
                { q: "What are the subscription options for Lite?", a: "We offer several plans:<br><ul><li><b>Free Trial:</b> 7 days, 1GB data, 1 user</li><li><b>Small:</b> ₹39.99/month per user</li><li><b>Medium:</b> ₹99/month per user (12-month minimum)</li></ul>" },
                { q: "How do I start a free trial?", a: "Click “Start Free Trial” on our website. You’ll get 7 days with 1GB of data for one user." }
            ]
        },
        {
            category: "Request a Demo",
            questions: [
                { q: "How do I request a demo?", a: "Click the “Request a Demo” button on our homepage. Fill out your details, and our team will schedule a personalized walkthrough." },
                { q: "What happens after I request a demo?", a: "A Profit Pricer consultant will contact you to understand your needs and arrange a session where you can see the platform in action." },
                { q: "Is the demo personalized?", a: "Yes, our demos are tailored to your company’s size, industry, and pricing challenges to ensure you get the most relevant insights." }
            ]
        },
        {
            category: "Customer Success & Support",
            questions: [
                { q: "Where can I see customer success stories?", a: "Visit the <b>Client Success Stories</b> section on our homepage for real customer experiences and success metrics." },
                { q: "How can I contact support?", a: "If your question wasn't answered here, please use our website’s main contact form or type 'Contact Support' for further assistance." }
            ]
        }
    ];

    if (chatbotIcon && chatbotWindow && closeChatBtn && chatBody) {
        
        // Open chat and display the main categories
        chatbotIcon.addEventListener("click", () => {
            chatbotWindow.classList.add("visible");
            displayInitialCategories();
        });

        // Close chat
        closeChatBtn.addEventListener("click", () => chatbotWindow.classList.remove("visible"));

        const displayInitialCategories = () => {
            chatBody.innerHTML = "";
            appendMessage("Hey There! I'm John. Please select a category below.", "received");

            const optionsDiv = document.createElement("div");
            optionsDiv.classList.add("chat-options");
            
            qaData.forEach(categoryData => {
                const categoryBtn = document.createElement("button");
                categoryBtn.classList.add("chat-option");
                categoryBtn.textContent = categoryData.category;
                categoryBtn.onclick = () => displayQuestionsForCategory(categoryData);
                optionsDiv.appendChild(categoryBtn);
            });
            
            chatBody.appendChild(optionsDiv);
            chatBody.scrollTop = chatBody.scrollHeight;
        };
        
        const displayQuestionsForCategory = (categoryData) => {
            chatBody.innerHTML = "";
            appendMessage(categoryData.category, "sent");
            appendMessage(`Great! Here are some questions about ${categoryData.category}.`, "received");

            const optionsDiv = document.createElement("div");
            optionsDiv.classList.add("chat-options");

            categoryData.questions.forEach(item => {
                const optionBtn = document.createElement("button");
                optionBtn.classList.add("chat-option");
                optionBtn.textContent = item.q;
                optionBtn.onclick = () => showAnswer(item, categoryData);
                optionsDiv.appendChild(optionBtn);
            });
            
            chatBody.appendChild(optionsDiv);
            appendBackButton(displayInitialCategories, "⬅️ Back to Categories");
        };

        const showAnswer = (item, categoryData) => {
            chatBody.innerHTML = "";
            appendMessage(item.q, "sent");
            setTimeout(() => {
                appendMessage(item.a, "received");
                appendBackButton(() => displayQuestionsForCategory(categoryData), "⬅️ Back to Questions");
            }, 400);
        };
        
        const appendMessage = (html, type) => {
            const messageDiv = document.createElement("div");
            messageDiv.classList.add("chat-message", type);
            messageDiv.innerHTML = `<span>${html}</span>`;
            chatBody.appendChild(messageDiv);
            chatBody.scrollTop = chatBody.scrollHeight;
        };

        const appendBackButton = (onClickAction, text) => {
             const backButton = document.createElement("button");
             backButton.textContent = text;
             backButton.classList.add("back-to-questions", "chat-option");
             backButton.onclick = onClickAction;
             chatBody.appendChild(backButton);
             chatBody.scrollTop = chatBody.scrollHeight;
        };
    }


    // --- NEWSLETTER SUBSCRIPTION LOGIC ---
    const newsletterForm = document.getElementById("newsletter-form");
    const emailInput = document.getElementById("newsletter-email");
    const successPopup = document.getElementById("success-popup");
    const closePopupBtn = document.querySelector(".close-popup-btn");

    if (newsletterForm && emailInput && successPopup) {
        
        newsletterForm.addEventListener("submit", function(event) {
            event.preventDefault(); // Stop the form from reloading the page

            // The 'required' and 'type="email"' attributes already handle validation.
            // This checks if the browser considers the input valid.
            if (emailInput.checkValidity()) {
                showPopup();
                emailInput.value = ""; // Clear the input field after successful submission
            }
            // If invalid, the browser will automatically show a default error message.
        });

        const showPopup = () => {
            successPopup.classList.add("show");

            // Hide the pop-up automatically after 5 seconds
            setTimeout(() => {
                hidePopup();
            }, 5000);
        };

        const hidePopup = () => {
            successPopup.classList.remove("show");
        };

        // Allow the user to close the pop-up by clicking the 'x'
        if (closePopupBtn) {
            closePopupBtn.addEventListener("click", hidePopup);
        }
    }

    const searchableSelect = document.querySelector(".searchable-select");
    if (searchableSelect) {
        const searchInput = searchableSelect.querySelector(".search-input");
        const hiddenInput = searchableSelect.querySelector(".hidden-value-input");
        const optionsContainer = searchableSelect.querySelector(".options-container");
        const options = optionsContainer.querySelectorAll(".option");

        // 1. Toggle dropdown visibility
        searchInput.addEventListener("click", (event) => {
            event.stopPropagation();
            optionsContainer.classList.toggle("active");
        });

        // 2. Filter options based on search input
        searchInput.addEventListener("input", () => {
            const filter = searchInput.value.toLowerCase();
            // When user starts typing, we treat it as a search, not a selection display
            hiddenInput.value = ""; 

            options.forEach(option => {
                const text = option.textContent.toLowerCase();
                if (text.includes(filter)) {
                    option.style.display = "";
                } else {
                    option.style.display = "none";
                }
            });
        });

        // 3. Handle option selection
        options.forEach(option => {
            option.addEventListener("click", () => {
                // Set the visible input to the selected country's text
                searchInput.value = option.textContent;
                // Set the hidden input's value to the country code
                hiddenInput.value = option.getAttribute("data-value");
                
                // Manually trigger a "change" event for any other scripts that might be listening
                hiddenInput.dispatchEvent(new Event('change'));

                // Hide the dropdown
                optionsContainer.classList.remove("active");
            });
        });

        // 4. Close dropdown when clicking outside
        document.addEventListener("click", (event) => {
            if (!searchableSelect.contains(event.target)) {
                optionsContainer.classList.remove("active");
            }
        });
    }
});