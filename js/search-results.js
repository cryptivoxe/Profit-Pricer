document.addEventListener("DOMContentLoaded", () => {
    const searchHeading = document.getElementById("search-heading");
    const resultsGrid = document.getElementById("results-grid");
    const noResultsMessage = document.getElementById("no-results");

    const params = new URLSearchParams(window.location.search);
    const query = params.get("query");

    if (searchHeading && query) {
        searchHeading.textContent = `Search Results for: "${query}"`;
        performSearch(query);
    } else if (searchHeading) {
        searchHeading.textContent = "Please enter a search term.";
    }

    function performSearch(searchTerm) {
        const normalizedSearchTerm = searchTerm.toLowerCase();

        const results = blogData.filter(blog => {
            const titleMatch = blog.title.toLowerCase().includes(normalizedSearchTerm);
            const descriptionMatch = blog.description.toLowerCase().includes(normalizedSearchTerm);
            return titleMatch || descriptionMatch;
        });

        displayResults(results);
    }

    function displayResults(results) {
        resultsGrid.innerHTML = ""; 

        if (results.length > 0) {
            noResultsMessage.classList.add("hidden");
            results.forEach(blog => {
                const card = document.createElement("div");
                card.className = "blog-card";
                card.innerHTML = `
                    <img src="${blog.imgSrc}" alt="${blog.title}" />
                    <div class="card-info">
                        <p class="blog-meta">${blog.meta}</p>
                        <h4>${blog.title}</h4>
                        <p>${blog.description}</p>
                        <button class="card-btn">Learn More</button>
                    </div>
                `;
                resultsGrid.appendChild(card);
            });
        } else {
            // Show the "no results" message
            noResultsMessage.classList.remove("hidden");
        }
    }
});