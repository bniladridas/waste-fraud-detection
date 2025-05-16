document.addEventListener('DOMContentLoaded', () => {
    // Check if device is mobile
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

    // Add mobile class to body if on mobile device
    if (isMobile) {
        document.body.classList.add('mobile-device');
    }

    // Handle cookie notice
    const cookieNotice = document.getElementById('cookie-notice');
    const acceptCookiesBtn = document.getElementById('accept-cookies');

    // Check if user has already accepted cookies
    if (!localStorage.getItem('cookiesAccepted')) {
        // Show the cookie notice after a short delay
        setTimeout(() => {
            cookieNotice.classList.add('show');
        }, 1000);
    }

    // Handle accept button click
    if (acceptCookiesBtn) {
        acceptCookiesBtn.addEventListener('click', () => {
            localStorage.setItem('cookiesAccepted', 'true');
            cookieNotice.classList.remove('show');
        });
    }

    // Fade in the quote
    const quote = document.querySelector('.quote');

    setTimeout(() => {
        quote.classList.add('visible');
    }, 300);

    // Get elements for parallax effects
    const dotPattern = document.querySelector('.dotted-pattern');
    const cross = document.querySelector('.cross');
    const dottedLandscape = document.querySelector('.dotted-landscape');
    const handsImage = document.querySelector('.hands-image');
    const quoteRight = document.querySelector('.quote-right');
    const dotPatternRight = document.querySelector('.dotted-pattern-right');
    const checkeredPattern = document.querySelector('.checkered-pattern');
    const hopeContainer = document.querySelector('.hope-container');
    const searchContainer = document.querySelector('.search-container');
    const pixelatedHeart = document.querySelector('.pixelated-heart');
    const horizontalLine = document.querySelector('.horizontal-line');
    const prayerText = document.querySelector('.prayer-text');
    const pixelatedMountain = document.querySelector('.pixelated-mountain');

    // Intersection Observer for the second section
    const secondSection = document.querySelector('.second-section');
    const secondObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add animation classes when second section is visible
                cross.classList.add('animate');
                dottedLandscape.classList.add('animate');
            }
        });
    }, { threshold: 0.3 });

    secondObserver.observe(secondSection);

    // Intersection Observer for the third section
    const thirdSection = document.querySelector('.third-section');
    const thirdObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add animation classes when third section is visible
                handsImage.classList.add('animate');
                quoteRight.classList.add('animate');
            }
        });
    }, { threshold: 0.3 });

    thirdObserver.observe(thirdSection);

    // Intersection Observer for the fourth section
    const fourthSection = document.querySelector('.fourth-section');
    const fourthObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add animation classes when fourth section is visible
                checkeredPattern.classList.add('animate');
                hopeContainer.classList.add('animate');
                searchContainer.classList.add('animate');
            }
        });
    }, { threshold: 0.3 });

    fourthObserver.observe(fourthSection);

    // Intersection Observer for the fifth section
    const fifthSection = document.querySelector('.fifth-section');
    const fifthObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add animation classes when fifth section is visible
                pixelatedHeart.classList.add('animate');
                horizontalLine.classList.add('animate');
            }
        });
    }, { threshold: 0.3 });

    fifthObserver.observe(fifthSection);

    // Intersection Observer for the sixth section
    const sixthSection = document.querySelector('.sixth-section');
    const sixthObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add animation classes when sixth section is visible
                prayerText.classList.add('animate');
                pixelatedMountain.classList.add('animate');
            }
        });
    }, { threshold: 0.3 });

    sixthObserver.observe(sixthSection);

    // Subtle parallax effect on mouse move for all sections
    document.addEventListener('mousemove', (e) => {
        const x = e.clientX / window.innerWidth;
        const y = e.clientY / window.innerHeight;

        // First section parallax
        if (dotPattern) {
            dotPattern.style.transform = `translateX(${x * 10}px) translateY(${y * 5}px)`;
        }

        // Second section parallax
        if (cross && dottedLandscape) {
            cross.style.transform = `scale(1) rotate(${x * 1}deg)`;
            dottedLandscape.style.transform = `translateX(${x * -15}px) translateY(${y * 5}px)`;
        }

        // Third section parallax
        if (handsImage && dotPatternRight) {
            handsImage.style.transform = `translateX(${x * -8}px)`;
            dotPatternRight.style.transform = `translateX(${x * 12}px) translateY(${y * 8}px)`;
        }

        // Fourth section parallax
        if (checkeredPattern) {
            checkeredPattern.style.transform = `translateX(${x * 5}px)`;
        }

        // Fifth section parallax
        if (pixelatedHeart) {
            pixelatedHeart.style.transform = `scale(1) rotate(${x * 3}deg)`;
        }

        // Sixth section parallax
        if (pixelatedMountain) {
            pixelatedMountain.style.transform = `translateY(0) translateX(${x * 10}px)`;
        }
    });

    // Add scroll indicator
    const pageContainer = document.querySelector('.page-container');
    const scrollIndicator = document.createElement('div');
    scrollIndicator.className = 'scroll-indicator';
    document.querySelector('.first-section').appendChild(scrollIndicator);

    // Hide scroll indicator when scrolled
    pageContainer.addEventListener('scroll', () => {
        if (pageContainer.scrollTop > 50) {
            scrollIndicator.classList.add('hidden');
        } else {
            scrollIndicator.classList.remove('hidden');
        }
    });

    // Modern search functionality
    const searchInput = document.querySelector('.search-input');

    // Add event listener for Enter key
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            performSearch('Search');
        }
    });

    // Add click event to search button
    const searchButton = document.querySelector('.search-button');
    if (searchButton) {
        searchButton.addEventListener('click', () => {
            performSearch('Search');
        });
    }





    function performSearch(method) {
        const searchTerm = searchInput.value.trim();
        if (searchTerm) {
            // Create a loading indicator
            const loadingIndicator = document.createElement('div');
            loadingIndicator.className = 'loading-indicator';
            loadingIndicator.innerHTML = `
                <div class="loading-spinner"></div>
                <p>Processing your search request...</p>
            `;
            document.body.appendChild(loadingIndicator);

            // Call the Gemini API through our Flask backend
            // Use relative URL for compatibility with both local and Vercel deployment
            fetch('/api/generate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    query: searchTerm,
                    method: 'Comprehensive' // Use a comprehensive analysis that combines all methods
                }),
            })
            .then(response => response.json())
            .then(data => {
                // Remove loading indicator
                document.body.removeChild(loadingIndicator);

                // Display the result
                const resultModal = document.createElement('div');
                resultModal.className = 'result-modal';

                // Check if device is mobile for responsive design
                const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
                const mobileClass = isMobile ? 'mobile-result' : '';

                // Athletic motivational quotes
                const athleticQuotes = [
                    "Champions keep playing until they get it right. — Billie Jean King",
                    "It's not whether you get knocked down; it's whether you get up. — Vince Lombardi",
                    "The harder you work, the harder it is to surrender. — Vince Lombardi",
                    "The only way to prove you're a good sport is to lose. — Ernie Banks",
                    "It's not the will to win that matters—everyone has that. It's the will to prepare to win that matters. — Paul Bryant",
                    "The difference between the impossible and the possible lies in a person's determination. — Tommy Lasorda",
                    "Never give up, never give in, and when the upper hand is ours, may we have the ability to handle the win with the dignity that we absorbed the loss. — Doug Williams",
                    "You miss 100% of the shots you don't take. — Wayne Gretzky",
                    "Hard work beats talent when talent doesn't work hard. — Tim Notke",
                    "The more difficult the victory, the greater the happiness in winning. — Pelé"
                ];

                // Select a random quote
                const randomQuote = athleticQuotes[Math.floor(Math.random() * athleticQuotes.length)];

                resultModal.innerHTML = `
                    <div class="result-content ${mobileClass}">
                        <div class="result-header">
                            <h3>Analysis Results</h3>
                            <button class="close-button" aria-label="Close">&times;</button>
                        </div>
                        <div class="result-body">
                            <div class="markdown-content">${data.result.html || data.result.replace(/\n/g, '<br>')}</div>
                            <div class="athletic-quote">"${randomQuote}"</div>
                        </div>
                    </div>
                `;
                document.body.appendChild(resultModal);

                // Add close functionality
                resultModal.querySelector('.close-button').addEventListener('click', () => {
                    document.body.removeChild(resultModal);
                });
            })
            .catch(error => {
                // Remove loading indicator
                document.body.removeChild(loadingIndicator);

                // Show error
                alert(`Error: ${error.message}. Make sure the Flask server is running.`);
                console.error('Error:', error);
            });
        } else {
            alert(`Please enter a query to use ${method}`);
        }
    }
});
