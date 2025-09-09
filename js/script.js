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

    dropdowns.forEach(dropdown => {
        const dropdownLink = dropdown.querySelector("a");
        dropdownLink.addEventListener("click", (e) => {
            if (window.innerWidth <= 768) {
                e.preventDefault();
                e.stopPropagation();
                const parentLi = dropdown;
                parentLi.classList.toggle("active");
                dropdowns.forEach(otherDropdown => {
                    if (otherDropdown !== parentLi) {
                        otherDropdown.classList.remove("active");
                    }
                });
            }
        });
    });

    const nonDropdownLinks = document.querySelectorAll(".nav-center > ul > li:not(.dropdown) > a");
    nonDropdownLinks.forEach(link => {
        link.addEventListener("click", () => {
            if (window.innerWidth <= 768) {
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
        if (event.key === 'Enter') {
            const searchInput = document.getElementById('search-bar');
            const searchTerm = searchInput.value.trim();
            if (searchTerm) {
                window.location.href = `/pages/search-results.html?query=${encodeURIComponent(searchTerm)}`;
            }
        }
    };

    const searchBarInput = document.getElementById('search-bar');
    if (searchBarInput) {
        searchBarInput.addEventListener('keydown', handleSearch);
    }

    // --- HERO TEXT ANIMATION (Glitch & Flip Version) ---
    const animatedWordEl = document.getElementById("animated-word");
    if (animatedWordEl) {
        const words = ["Immersive", "Engaging", "Captivating", "Dynamic"];
        let wordIndex = 0;
        animatedWordEl.setAttribute("data-text", words[wordIndex]);
        setInterval(() => {
            animatedWordEl.classList.add("is-animating");
            setTimeout(() => {
                wordIndex = (wordIndex + 1) % words.length;
                const newWord = words[wordIndex];
                animatedWordEl.textContent = newWord;
                animatedWordEl.setAttribute("data-text", newWord);
                animatedWordEl.classList.remove("is-animating");
            }, 600);
        }, 2500);
    }

    // --- VIDEO MODAL LOGIC ---
    const learnMoreBtn = document.querySelector(".hero-btn");
    const videoModalOverlay = document.getElementById("video-modal-overlay");
    const closeVideoModalBtn = document.getElementById("close-modal-btn");
    const popupVideo = document.getElementById("popup-video");
    const miniHeroVideo = document.querySelector(".mini-video");

    if (learnMoreBtn && videoModalOverlay && closeVideoModalBtn && popupVideo) {
        const openModal = () => {
            videoModalOverlay.classList.add("visible");
            popupVideo.play();
        };
        const closeModal = () => {
            videoModalOverlay.classList.remove("visible");
            popupVideo.pause();
            popupVideo.currentTime = 0;
        };
        learnMoreBtn.addEventListener("click", (e) => {
            e.preventDefault();
            openModal();
        });
        miniHeroVideo.addEventListener("click", openModal);
        closeVideoModalBtn.addEventListener("click", closeModal);
        videoModalOverlay.addEventListener("click", (e) => {
            if (e.target === videoModalOverlay) {
                closeModal();
            }
        });
    }


    // ==========================================================
    // --- CHATBOT LOGIC  ---
    // ==========================================================
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

    // **NEW**: Selectors for the feedback system
    const feedbackModalOverlay = document.getElementById("feedback-modal-overlay");
    const closeFeedbackModalBtn = document.querySelector(".close-feedback-modal");
    const feedbackForm = document.getElementById("feedback-form");
    const feedbackSuccessPopup = document.getElementById("feedback-success-popup");

    const qaData = [{
        category: "General Product Information",
        questions: [{
            q: "What is Profit Pricer?",
            a: "Profit Pricer is a platform that uses artificial intelligence to help businesses optimize, manage, and grow their revenue and margins with smarter pricing strategies."
        }, {
            q: "What are the main products offered?",
            a: "Profit Pricer offers two main products:<br><ul><li><a href='/pages/solutions/fusion.html' target='_blank'><b>Profit Pricer Fusion:</b></a> An advanced enterprise solution for businesses with complex pricing needs.</li><li><a href='/pages/solutions/lite.html' target='_blank'><b>Profit Pricer Lite:</b></a> A fast, simple tool designed for small businesses and entrepreneurs.</li></ul>"
        }]
    }, {
        category: "Product Features & Benefits",
        questions: [{
            q: "How does Profit Pricer help my business?",
            a: "Profit Pricer helps you set, manage, and simulate pricing quickly, standardizes and tracks price changes, and provides recommendations to maximize profits."
        }, {
            q: "What makes Profit Pricer’s AI unique?",
            a: "Our AI-driven platform provides actionable pricing recommendations, automates complex processes, and adapts to market changes to support sustainable financial growth."
        }]
    }, {
        category: "Specific Product Information",
        questions: [{
            q: "What is Profit Pricer Fusion?",
            a: "<a href='/pages/solutions/fusion.html' target='_blank'>Fusion</a> is our advanced edition for larger organizations. It offers powerful tools for setting, managing, and simulating prices at scale for complex operations."
        }, {
            q: "What is Profit Pricer Lite?",
            a: "<a href='/pages/solutions/lite.html' target='_blank'>Lite</a> is a simple, efficient tool for small businesses. It offers key pricing features and is available through flexible subscription plans."
        }]
    }, {
        category: "Pricing & Subscription",
        questions: [{
            q: "What are the subscription options for Lite?",
            a: "We offer several plans, including a <a href='/pages/solutions/sign-up.html' target='_blank'><b>Free Trial</b></a>.<br><ul><li><b>Small:</b> ₹39.99/month per user</li><li><b>Medium:</b> ₹99/month per user (12-month minimum)</li></ul>"
        }, {
            q: "How do I start a free trial?",
            a: "You can <a href='/pages/solutions/sign-up.html' target='_blank'>“Start a Free Trial”</a> on our website. You’ll get 7 days with 1GB of data for one user."
        }]
    }, {
        category: "Request a Demo",
        questions: [{
            q: "How do I request a demo?",
            a: "Click the <a href='/pages/contact.html' target='_blank'>“Request a Demo”</a> button on our homepage. Fill out your details, and our team will schedule a personalized walkthrough."
        }, {
            q: "What happens after I request a demo?",
            a: "A Profit Pricer consultant will contact you to understand your needs and arrange a session where you can see the platform in action."
        }, {
            q: "Is the demo personalized?",
            a: "Yes, our demos are tailored to your company’s size, industry, and pricing challenges to ensure you get the most relevant insights."
        }]
    }, {
        category: "Customer Success & Support",
        questions: [{
            q: "Where can I see customer success stories?",
            a: "Visit the <a href='/index.html' target='_blank'><b>Client Success Stories</b> section</a> on our homepage for real customer experiences and success metrics."
        }, {
            q: "How can I contact support?",
            a: "If your question wasn't answered here, please use our website’s <a href='/pages/contact.html' target='_blank'>main contact form</a> for further assistance."
        }]
    }];

    const allQuestions = qaData.flatMap(category => category.questions);

    if (chatbotIcon && chatbotWindow && closeChatBtn && chatBody && chatInput && sendChatBtn && startChatBtn && chatInputArea && suggestionsContainer) {

        if (chatHeader) {
            chatHeader.textContent = "ProfitIQ";
        }

        chatbotIcon.addEventListener("click", () => {
            chatbotWindow.classList.add("visible");
            chatBody.innerHTML = '';
            startChatContainer.style.display = 'flex';
            chatInputArea.classList.add('hidden');
            suggestionsContainer.style.display = 'none';
            chatBody.appendChild(startChatContainer);
        });

        closeChatBtn.addEventListener("click", () => chatbotWindow.classList.remove("visible"));

        startChatBtn.addEventListener("click", () => {
            startChatContainer.style.display = 'none';
            chatInputArea.classList.remove('hidden');
            chatBody.innerHTML = "";
            appendMessage("Hi! How can I help you today?", "received", false);
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
                        "I am still learning and don't have the answer to that yet. For detailed help, please contact our support team at <a href='mailto:support@profitpricer.com'>support@profitpricer.com</a>.", "received"
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

        const showThinkingAndRespond = (responseCallback) => {
            const thinkingDiv = document.createElement("div");
            thinkingDiv.classList.add("chat-message", "received", "thinking-indicator");
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

        const appendMessage = (html, type, showFeedback = true) => {
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

            if (type === 'received' && showFeedback) {
                const feedbackControls = createFeedbackControls();
                chatBody.appendChild(feedbackControls);
            }
            chatBody.scrollTop = chatBody.scrollHeight;
        };

        const createFeedbackControls = () => {
            const controlsContainer = document.createElement('div');
            controlsContainer.className = 'feedback-controls';

            const likeBtn = document.createElement('button');
            likeBtn.className = 'feedback-btn like';
            likeBtn.innerHTML = '<i class="far fa-thumbs-up"></i>';
            likeBtn.setAttribute('aria-label', 'Like');
            likeBtn.onclick = (e) => handleFeedbackClick(e, 'like');

            const dislikeBtn = document.createElement('button');
            dislikeBtn.className = 'feedback-btn dislike';
            dislikeBtn.innerHTML = '<i class="far fa-thumbs-down"></i>';
            dislikeBtn.setAttribute('aria-label', 'Dislike');
            dislikeBtn.onclick = (e) => handleFeedbackClick(e, 'dislike');

            const feedbackLink = document.createElement('a');
            feedbackLink.className = 'feedback-link';
            feedbackLink.textContent = 'Feedback';
            feedbackLink.href = '#';
            feedbackLink.onclick = (e) => {
                e.preventDefault();
                if (feedbackModalOverlay) feedbackModalOverlay.classList.add('visible');
            };

            controlsContainer.appendChild(likeBtn);
            controlsContainer.appendChild(dislikeBtn);
            controlsContainer.appendChild(feedbackLink);
            return controlsContainer;
        };

        const handleFeedbackClick = (event, type) => {
            const button = event.currentTarget;
            const parent = button.parentElement;
            const like = parent.querySelector('.like');
            const dislike = parent.querySelector('.dislike');
            if (button.classList.contains('active')) {
                button.classList.remove('active');
            } else {
                like.classList.remove('active');
                dislike.classList.remove('active');
                button.classList.add('active');
            }
        };

        const showFeedbackSuccessPopup = () => {
            if (feedbackSuccessPopup) {
                feedbackSuccessPopup.classList.add('visible');
                setTimeout(() => {
                    feedbackSuccessPopup.classList.remove('visible');
                }, 3000);
            }
        };

        if (feedbackModalOverlay && closeFeedbackModalBtn && feedbackForm) {
            closeFeedbackModalBtn.addEventListener('click', () => {
                feedbackModalOverlay.classList.remove('visible');
            });
            feedbackModalOverlay.addEventListener('click', (e) => {
                if (e.target === feedbackModalOverlay) {
                    feedbackModalOverlay.classList.remove('visible');
                }
            });
            feedbackForm.addEventListener('submit', (e) => {
                e.preventDefault();
                const feedbackText = document.getElementById('feedback-text').value;
                const feedbackEmail = document.getElementById('feedback-email').value;
                console.log('Feedback Submitted:', { feedback: feedbackText, email: feedbackEmail });
                feedbackForm.reset();
                feedbackModalOverlay.classList.remove('visible');
                showFeedbackSuccessPopup();
            });
        }
    }


    // --- PROMOTIONAL POP-UP LOGIC ---
    const promoOverlay = document.getElementById("promo-modal-overlay");
    const closePromoBtn = document.getElementById("close-promo-btn");

    if (promoOverlay && closePromoBtn) {
        if (!sessionStorage.getItem('promoShownThisSession')) {
            setTimeout(() => {
                promoOverlay.classList.add("visible");
            }, 3000);
            sessionStorage.setItem('promoShownThisSession', 'true');
        }
        const closePromoModal = () => {
            promoOverlay.classList.remove("visible");
        };
        closePromoBtn.addEventListener("click", closePromoModal);
        promoOverlay.addEventListener("click", (e) => {
            if (e.target === promoOverlay) {
                closePromoModal();
            }
        });
    }

    // --- BLOGS SLIDER LOGIC ---
    const blogsContainer = document.querySelector(".blogs-container");
    if (blogsContainer) {
        const blogsWrapper = blogsContainer.querySelector(".blogs-wrapper");
        const leftBtn = blogsContainer.querySelector(".scroll-btn.left");
        const rightBtn = blogsContainer.querySelector(".scroll-btn.right");
        if (blogsWrapper && leftBtn && rightBtn) {
            const card = blogsWrapper.querySelector(".blog-card");
            if (card) {
                const cardWidth = card.offsetWidth + 30;
                const handleScrollButtons = () => {
                    leftBtn.classList.toggle("hidden", blogsWrapper.scrollLeft < 10);
                    const maxScrollLeft = blogsWrapper.scrollWidth - blogsWrapper.clientWidth;
                    rightBtn.classList.toggle("hidden", blogsWrapper.scrollLeft >= maxScrollLeft - 10);
                };
                rightBtn.addEventListener("click", () => {
                    blogsWrapper.scrollLeft += cardWidth;
                });
                leftBtn.addEventListener("click", () => {
                    blogsWrapper.scrollLeft -= cardWidth;
                });
                blogsWrapper.addEventListener("scroll", handleScrollButtons);
                handleScrollButtons();
            }
        }
    }

    // --- NEWSLETTER SUBSCRIPTION LOGIC ---
    const newsletterForm = document.getElementById("newsletter-form");
    const emailInput = document.getElementById("newsletter-email");
    const newsletterSuccessPopup = document.getElementById("success-popup");
    const closePopupBtn = document.querySelector(".close-popup-btn");

    if (newsletterForm && emailInput && newsletterSuccessPopup) {
        newsletterForm.addEventListener("submit", function (event) {
            event.preventDefault();
            if (emailInput.checkValidity()) {
                showPopup();
                emailInput.value = "";
            }
        });
        const showPopup = () => {
            newsletterSuccessPopup.classList.add("show");
            setTimeout(() => {
                hidePopup();
            }, 5000);
        };
        const hidePopup = () => {
            newsletterSuccessPopup.classList.remove("show");
        };
        if (closePopupBtn) {
            closePopupBtn.addEventListener("click", hidePopup);
        }
    }

    // --- SEARCHABLE SELECT (COUNTRY CODE) LOGIC ---
    const searchableSelect = document.querySelector(".searchable-select");
    if (searchableSelect) {
        const searchInput = searchableSelect.querySelector(".search-input");
        const hiddenInput = searchableSelect.querySelector(".hidden-value-input");
        const optionsContainer = searchableSelect.querySelector(".options-container");
        const options = optionsContainer.querySelectorAll(".option");

        searchInput.addEventListener("click", (event) => {
            event.stopPropagation();
            optionsContainer.classList.toggle("active");
        });
        searchInput.addEventListener("input", () => {
            const filter = searchInput.value.toLowerCase();
            hiddenInput.value = "";
            options.forEach(option => {
                const text = option.textContent.toLowerCase();
                option.style.display = text.includes(filter) ? "" : "none";
            });
        });
        options.forEach(option => {
            option.addEventListener("click", () => {
                searchInput.value = option.textContent;
                hiddenInput.value = option.getAttribute("data-value");
                hiddenInput.dispatchEvent(new Event('change'));
                optionsContainer.classList.remove("active");
            });
        });
        document.addEventListener("click", (event) => {
            if (!searchableSelect.contains(event.target)) {
                optionsContainer.classList.remove("active");
            }
        });
    }
});