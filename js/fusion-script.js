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

    // --- DYNAMIC BLOG SEARCH LOGIC ---
    const handleSearch = (event) => {
        // This function will handle the search redirection
        if (event.key === 'Enter') {
            const searchInput = document.getElementById('search-bar');
            const searchTerm = searchInput.value.trim();

            if (searchTerm) {
                // Redirect to the search results page with the query
                window.location.href = `/pages/search-results.html?query=${encodeURIComponent(searchTerm)}`;
            }
        }
    };

    // Attach the event listener to the search bar
    const searchBarInput = document.getElementById('search-bar');
    if (searchBarInput) {
        searchBarInput.addEventListener('keydown', handleSearch);
    }

    // --- CHATBOT WINDOW LOGIC ---
    const chatbotIcon = document.querySelector(".chatbot-icon");
    const chatbotWindow = document.getElementById("chatbot-window");
    const closeChatBtn = chatbotWindow ? chatbotWindow.querySelector(".close-chat") : null;
    const chatBody = chatbotWindow ? chatbotWindow.querySelector(".chat-body") : null;
    const chatHeader = chatbotWindow ? chatbotWindow.querySelector(".chat-header strong") : null;

    const startChatContainer = document.getElementById("start-chat-container");
    const startChatBtn = document.getElementById("start-chat-btn");
    const chatInputArea = document.querySelector(".chat-input-area");

    const chatInput = document.getElementById("chat-input");
    const sendChatBtn = document.getElementById("send-chat-btn");

    const suggestionsContainer = document.getElementById("chat-suggestions-container");

    const qaData = [
    {
        category: "General Product Information",
        questions: [
            { q: "What is Profit Pricer?", a: "Profit Pricer is a platform that uses artificial intelligence to help businesses optimize, manage, and grow their revenue and margins with smarter pricing strategies." },
            { q: "What are the main products offered?", a: "Profit Pricer offers two main products:<br><ul><li><a href='/pages/solutions/fusion.html' target='_blank'><b>Profit Pricer Fusion:</b></a> An advanced enterprise solution for businesses with complex pricing needs.</li><li><a href='/pages/solutions/lite.html' target='_blank'><b>Profit Pricer Lite:</b></a> A fast, simple tool designed for small businesses and entrepreneurs.</li></ul>" }
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
            { q: "What is Profit Pricer Fusion?", a: "<a href='/pages/solutions/fusion.html' target='_blank'>Fusion</a> is our advanced edition for larger organizations. It offers powerful tools for setting, managing, and simulating prices at scale for complex operations." },
            { q: "What is Profit Pricer Lite?", a: "<a href='/pages/solutions/lite.html' target='_blank'>Lite</a> is a simple, efficient tool for small businesses. It offers key pricing features and is available through flexible subscription plans." }
        ]
    },
    {
        category: "Pricing & Subscription",
        questions: [
            { q: "What are the subscription options for Lite?", a: "We offer several plans, including a <a href='/pages/solutions/sign-up.html' target='_blank'><b>Free Trial</b></a>.<br><ul><li><b>Small:</b> ₹39.99/month per user</li><li><b>Medium:</b> ₹99/month per user (12-month minimum)</li></ul>" },
            { q: "How do I start a free trial?", a: "You can <a href='/pages/solutions/sign-up.html' target='_blank'>“Start a Free Trial”</a> on our website. You’ll get 7 days with 1GB of data for one user." }
        ]
    },
    {
        category: "Request a Demo",
        questions: [
            { q: "How do I request a demo?", a: "Click the <a href='/pages/contact.html' target='_blank'>“Request a Demo”</a> button on our homepage. Fill out your details, and our team will schedule a personalized walkthrough." },
            { q: "What happens after I request a demo?", a: "A Profit Pricer consultant will contact you to understand your needs and arrange a session where you can see the platform in action." },
            { q: "Is the demo personalized?", a: "Yes, our demos are tailored to your company’s size, industry, and pricing challenges to ensure you get the most relevant insights." }
        ]
    },
    {
        category: "Customer Success & Support",
        questions: [
            { q: "Where can I see customer success stories?", a: "Visit the <a href='/index.html' target='_blank'><b>Client Success Stories</b> section</a> on our homepage for real customer experiences and success metrics." },
            { q: "How can I contact support?", a: "If your question wasn't answered here, please use our website’s <a href='/pages/contact.html' target='_blank'>main contact form</a> for further assistance." }
        ]
    }
];

    // Flatten the data for the autocomplete/suggestion feature
    const allQuestions = qaData.flatMap(category => category.questions);

    if (chatbotIcon && chatbotWindow && closeChatBtn && chatBody && chatInput && sendChatBtn && startChatBtn && chatInputArea && suggestionsContainer) {

        // Set bot name
        if (chatHeader) {
            chatHeader.textContent = "Profit IQ";
        }

        // Open chat window
        chatbotIcon.addEventListener("click", () => {
            chatbotWindow.classList.add("visible");
            chatBody.innerHTML = '';
            startChatContainer.style.display = 'flex';
            chatInputArea.classList.add('hidden');
            suggestionsContainer.style.display = 'none';
            chatBody.appendChild(startChatContainer);
        });

        // Close chat window
        closeChatBtn.addEventListener("click", () => chatbotWindow.classList.remove("visible"));

        // Start a new conversation
        startChatBtn.addEventListener("click", () => {
            startChatContainer.style.display = 'none';
            chatInputArea.classList.remove('hidden');
            chatBody.innerHTML = "";

            appendMessage("Hi! How can I help you today?", "received");

            const showCategoriesButton = document.createElement("button");
            showCategoriesButton.textContent = "Show Question Categories";
            showCategoriesButton.className = "show-questions-btn";
            showCategoriesButton.onclick = () => {
                appendMessage("Show Question Categories", "sent");
                showThinkingAndRespond(() => {
                    appendMessage("Please select a category:", "received");
                    displayCategoriesAsOptions();
                });
            };
            chatBody.appendChild(showCategoriesButton);
            chatBody.scrollTop = chatBody.scrollHeight;
        });

        // Autocomplete/Suggestion logic (remains unchanged)
        chatInput.addEventListener("input", () => {
            const userInput = chatInput.value.trim().toLowerCase();
            suggestionsContainer.innerHTML = '';

            if (userInput.length === 0) {
                suggestionsContainer.style.display = 'none';
                return;
            }

            const matchedQuestions = allQuestions.filter(item =>
                item.q.toLowerCase().includes(userInput)
            );

            if (matchedQuestions.length > 0) {
                matchedQuestions.forEach(item => {
                    const suggestionItem = document.createElement("div");
                    suggestionItem.className = "chat-suggestion-item";
                    suggestionItem.textContent = item.q;
                    suggestionItem.onclick = () => {
                        appendMessage(item.q, "sent");
                        chatInput.value = '';
                        suggestionsContainer.style.display = 'none';
                        showThinkingAndRespond(() => appendMessage(item.a, "received"));
                    };
                    suggestionsContainer.appendChild(suggestionItem);
                });
                suggestionsContainer.style.display = 'block';
            } else {
                suggestionsContainer.style.display = 'none';
            }
        });

        // Displays the main categories
        const displayCategoriesAsOptions = () => {
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

        // Displays questions for a chosen category
        const displayQuestionsForCategory = (categoryData) => {
            appendMessage(categoryData.category, "sent");
            showThinkingAndRespond(() => {
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

                const backButton = document.createElement("button");
                backButton.classList.add("chat-option", "back-to-questions");
                backButton.textContent = "⬅️ Back to Categories";
                backButton.onclick = () => {
                    appendMessage("Back to Categories", "sent");
                    showThinkingAndRespond(() => {
                        appendMessage("Please select another category.", "received");
                        displayCategoriesAsOptions();
                    });
                };
                optionsDiv.appendChild(backButton);

                chatBody.appendChild(optionsDiv);
                chatBody.scrollTop = chatBody.scrollHeight;
            });
        };

        // Displays the final answer and shows the "back to questions" button
        const showAnswer = (item, categoryData) => {
            appendMessage(item.q, "sent");
            showThinkingAndRespond(() => {
                appendMessage(item.a, "received");
                const optionsDiv = document.createElement("div");
                optionsDiv.classList.add("chat-options");

                const backButton = document.createElement("button");
                backButton.classList.add("chat-option", "back-to-questions");
                backButton.textContent = "⬅️ Back to Questions";
                backButton.onclick = () => displayQuestionsForCategory(categoryData);

                optionsDiv.appendChild(backButton);
                chatBody.appendChild(optionsDiv);
                chatBody.scrollTop = chatBody.scrollHeight;
            });
        };

        // Handles user input from typing and sending
        const handleUserInput = () => {
            const userInput = chatInput.value.trim();
            if (!userInput) return;

            appendMessage(userInput, "sent");
            chatInput.value = "";
            suggestionsContainer.style.display = 'none';

            showThinkingAndRespond(() => {
                const exactMatch = allQuestions.find(
                    item => item.q.toLowerCase() === userInput.toLowerCase()
                );

                if (exactMatch) {
                    appendMessage(exactMatch.a, "received");
                } else {
                    appendMessage(
                        "I'm sorry, I'm not aware of the answer to that. For more complex inquiries, please contact our support team at <a href='mailto:support@profitpricer.com'>support@profitpricer.com</a>.", "received"
                    );
                }
            });
        };

        sendChatBtn.addEventListener("click", handleUserInput);
        chatInput.addEventListener("keydown", (e) => {
            if (e.key === "Enter") {
                e.preventDefault();
                handleUserInput();
            }
        });

        // --- Helper Functions ---
        const showThinkingAndRespond = (responseCallback) => {
            const thinkingDiv = document.createElement("div");
            thinkingDiv.classList.add("chat-message", "received", "thinking-indicator");

            // Replace the text span with an image tag for your GIF
            thinkingDiv.innerHTML = `<img src="/assets/images/thinking-dots.gif" alt="Thinking..." class="thinking-gif">`;

            chatBody.appendChild(thinkingDiv);
            chatBody.scrollTop = chatBody.scrollHeight;

            
            setTimeout(() => {
                if (chatBody.contains(thinkingDiv)) {
                    chatBody.removeChild(thinkingDiv);
                }
                responseCallback();
                chatBody.scrollTop = chatBody.scrollHeight;
            }, 1500);
        };

        const appendMessage = (html, type) => {
            const messageDiv = document.createElement("div");
            messageDiv.classList.add("chat-message", type);
            const span = document.createElement('span');
            if (type === 'sent') {
                span.textContent = html;
            } else {
                span.innerHTML = html;
            }
            messageDiv.appendChild(span);
            chatBody.appendChild(messageDiv);
            chatBody.scrollTop = chatBody.scrollHeight;
        };
    }

    // --- NEWSLETTER SUBSCRIPTION LOGIC ---
    const newsletterForm = document.getElementById("newsletter-form");
    const emailInput = document.getElementById("newsletter-email");
    const successPopup = document.getElementById("success-popup");
    const closePopupBtn = document.querySelector(".close-popup-btn");

    if (newsletterForm && emailInput && successPopup) {

        newsletterForm.addEventListener("submit", function (event) {
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
});