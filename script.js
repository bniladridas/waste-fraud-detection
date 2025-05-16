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

    // Handle floating terms and copyright
    const floatingTerms = document.getElementById('floating-terms');
    const minimizeTermsBtn = document.getElementById('minimize-terms');
    const closeTermsBtn = document.getElementById('close-terms');
    const viewTermsBtn = document.getElementById('view-terms-btn');
    const viewPrivacyBtn = document.getElementById('view-privacy-btn');

    // Show floating terms after a delay if not already hidden
    if (!sessionStorage.getItem('termsHidden')) {
        setTimeout(() => {
            floatingTerms.classList.add('show');
        }, 5000); // Show after 5 seconds
    }

    // Handle minimize button click
    if (minimizeTermsBtn) {
        minimizeTermsBtn.addEventListener('click', () => {
            floatingTerms.classList.toggle('minimized');
            minimizeTermsBtn.textContent = floatingTerms.classList.contains('minimized') ? '+' : '−';
        });
    }

    // Handle close button click
    if (closeTermsBtn) {
        closeTermsBtn.addEventListener('click', () => {
            floatingTerms.classList.remove('show');
            // Store in session storage so it doesn't show again during this session
            sessionStorage.setItem('termsHidden', 'true');
        });
    }

    // Handle Terms of Service button click
    if (viewTermsBtn) {
        viewTermsBtn.addEventListener('click', () => {
            alert('Terms of Service: This system is provided for authorized use only. All activities are logged and monitored. Unauthorized access is prohibited and may result in legal action. By using this system, you agree to comply with all applicable laws and regulations.');
        });
    }

    // Handle Privacy Policy button click
    if (viewPrivacyBtn) {
        viewPrivacyBtn.addEventListener('click', () => {
            alert('Privacy Policy: We collect and process data necessary for fraud detection purposes. Your data is handled securely and in compliance with applicable privacy laws. We do not share your personal information with third parties except as required by law or with your explicit consent.');
        });
    }

    // Make the floating terms draggable
    if (floatingTerms) {
        const termsHeader = floatingTerms.querySelector('.terms-header');
        let isDragging = false;
        let offsetX, offsetY;

        termsHeader.addEventListener('mousedown', (e) => {
            isDragging = true;
            offsetX = e.clientX - floatingTerms.getBoundingClientRect().left;
            offsetY = e.clientY - floatingTerms.getBoundingClientRect().top;
            floatingTerms.style.transition = 'none';
        });

        document.addEventListener('mousemove', (e) => {
            if (isDragging) {
                const x = e.clientX - offsetX;
                const y = e.clientY - offsetY;

                // Keep within window bounds
                const maxX = window.innerWidth - floatingTerms.offsetWidth;
                const maxY = window.innerHeight - floatingTerms.offsetHeight;

                floatingTerms.style.right = 'auto';
                floatingTerms.style.bottom = 'auto';
                floatingTerms.style.left = `${Math.max(0, Math.min(maxX, x))}px`;
                floatingTerms.style.top = `${Math.max(0, Math.min(maxY, y))}px`;
            }
        });

        document.addEventListener('mouseup', () => {
            isDragging = false;
            floatingTerms.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
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

            // Array of loading messages
            const loadingMessages = [
                "Analyzing data patterns...",
                "Detecting anomalies...",
                "Applying fraud detection algorithms...",
                "Scanning for compliance issues...",
                "Identifying potential waste...",
                "Cross-referencing with known patterns...",
                "Evaluating risk factors...",
                "Generating insights...",
                "Preparing comprehensive analysis..."
            ];

            // Create the loading content
            loadingIndicator.innerHTML = `
                <div class="loading-content">
                    <div class="loading-animation">
                        <img src="advanced-loader.svg" alt="Loading" width="240" height="240">
                    </div>
                    <h2 class="loading-title">Processing Your Request</h2>
                    <p class="loading-subtitle">Our AI is analyzing your query to detect potential waste and fraud patterns.</p>
                    <div class="loading-message-container">
                        <p id="loading-message">Initializing analysis...</p>
                    </div>
                    <div class="loading-progress">
                        <div class="loading-progress-bar"></div>
                    </div>
                    <button class="loading-cancel">Cancel</button>
                </div>
            `;

            document.body.appendChild(loadingIndicator);

            // Add animation after a small delay to trigger transitions
            setTimeout(() => {
                loadingIndicator.classList.add('visible');
            }, 10);

            // Set up message rotation
            let messageIndex = 0;
            const messageElement = loadingIndicator.querySelector('#loading-message');

            // Change message every 2.5 seconds
            const messageInterval = setInterval(() => {
                messageIndex = (messageIndex + 1) % loadingMessages.length;
                // Fade out
                messageElement.style.opacity = 0;
                setTimeout(() => {
                    // Change text and fade in
                    messageElement.textContent = loadingMessages[messageIndex];
                    messageElement.style.opacity = 1;
                }, 300);
            }, 2500);

            // Store the interval ID on the loading indicator element so we can clear it later
            loadingIndicator.messageInterval = messageInterval;

            // Add cancel functionality
            const cancelButton = loadingIndicator.querySelector('.loading-cancel');
            cancelButton.addEventListener('click', () => {
                // Clear the message interval
                clearInterval(loadingIndicator.messageInterval);

                // Remove loading indicator with animation
                loadingIndicator.classList.remove('visible');
                setTimeout(() => {
                    if (document.body.contains(loadingIndicator)) {
                        document.body.removeChild(loadingIndicator);
                    }
                }, 300);

                // Abort the fetch if possible
                if (controller) {
                    controller.abort();
                }
            });

            // Create an AbortController to allow canceling the fetch
            const controller = new AbortController();
            const signal = controller.signal;

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
                signal: signal
            })
            .then(response => response.json())
            .then(data => {
                // Clear the message interval
                clearInterval(loadingIndicator.messageInterval);

                // Remove loading indicator with animation
                loadingIndicator.classList.remove('visible');
                setTimeout(() => {
                    document.body.removeChild(loadingIndicator);
                }, 300);

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

                // Format current date and time
                const now = new Date();
                const formattedDate = now.toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric'
                });
                const formattedTime = now.toLocaleTimeString('en-US', {
                    hour: '2-digit',
                    minute: '2-digit'
                });

                // Create the modal content
                resultModal.innerHTML = `
                    <div class="result-content ${mobileClass}">
                        <div class="result-header">
                            <h3>Analysis Results</h3>
                            <button class="close-button" aria-label="Close"></button>
                        </div>
                        <div class="result-body">
                            <div class="markdown-content">${data.result.html || data.result.replace(/\n/g, '<br>')}</div>
                            <div class="athletic-quote">"${randomQuote}"</div>
                        </div>
                        <div class="result-footer">
                            <div class="result-timestamp">Generated on ${formattedDate} at ${formattedTime}</div>
                            <div class="result-actions">
                                <button class="action-button share-button">
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M18 8C19.6569 8 21 6.65685 21 5C21 3.34315 19.6569 2 18 2C16.3431 2 15 3.34315 15 5C15 6.65685 16.3431 8 18 8Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                        <path d="M6 15C7.65685 15 9 13.6569 9 12C9 10.3431 7.65685 9 6 9C4.34315 9 3 10.3431 3 12C3 13.6569 4.34315 15 6 15Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                        <path d="M18 22C19.6569 22 21 20.6569 21 19C21 17.3431 19.6569 16 18 16C16.3431 16 15 17.3431 15 19C15 20.6569 16.3431 22 18 22Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                        <path d="M8.59 13.51L15.42 17.49" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                        <path d="M15.41 6.51L8.59 10.49" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                    </svg>
                                    Share
                                </button>
                                <button class="action-button save-button">
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H16L21 8V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                        <path d="M17 21V13H7V21" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                        <path d="M7 3V8H15" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                    </svg>
                                    Save
                                </button>
                                <button class="action-button print-button">
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M6 9V2H18V9" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                        <path d="M6 18H4C3.46957 18 2.96086 17.7893 2.58579 17.4142C2.21071 17.0391 2 16.5304 2 16V11C2 10.4696 2.21071 9.96086 2.58579 9.58579C2.96086 9.21071 3.46957 9 4 9H20C20.5304 9 21.0391 9.21071 21.4142 9.58579C21.7893 9.96086 22 10.4696 22 11V16C22 16.5304 21.7893 17.0391 21.4142 17.4142C21.0391 17.7893 20.5304 18 20 18H18" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                        <path d="M18 14H6V22H18V14Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                    </svg>
                                    Print
                                </button>
                            </div>
                        </div>
                    </div>
                `;

                document.body.appendChild(resultModal);

                // Add animation after a small delay to trigger transitions
                setTimeout(() => {
                    resultModal.classList.add('visible');
                }, 10);

                // Add close functionality
                resultModal.querySelector('.close-button').addEventListener('click', () => {
                    // First remove the visible class to trigger the exit animation
                    resultModal.classList.remove('visible');

                    // Then remove the element after the animation completes
                    setTimeout(() => {
                        document.body.removeChild(resultModal);
                    }, 300);
                });

                // Add action button functionality
                resultModal.querySelector('.share-button').addEventListener('click', () => {
                    if (navigator.share) {
                        navigator.share({
                            title: 'Waste & Fraud Detection Analysis',
                            text: `Analysis Results: ${searchTerm}\n\n${data.result.text.substring(0, 100)}...`,
                            url: window.location.href
                        }).catch(err => {
                            console.log('Error sharing:', err);
                        });
                    } else {
                        alert('Sharing is not supported in your browser. You can copy the URL manually.');
                    }
                });

                resultModal.querySelector('.save-button').addEventListener('click', () => {
                    const blob = new Blob([`# Analysis Results for "${searchTerm}"\n\n${data.result.text}\n\n${formattedDate} at ${formattedTime}`], {type: 'text/plain'});
                    const url = URL.createObjectURL(blob);
                    const a = document.createElement('a');
                    a.href = url;
                    a.download = `analysis-${searchTerm.replace(/[^a-z0-9]/gi, '-').toLowerCase()}.txt`;
                    document.body.appendChild(a);
                    a.click();
                    document.body.removeChild(a);
                    URL.revokeObjectURL(url);
                });

                resultModal.querySelector('.print-button').addEventListener('click', () => {
                    const printWindow = window.open('', '_blank');
                    printWindow.document.write(`
                        <html>
                            <head>
                                <title>Analysis Results for "${searchTerm}"</title>
                                <style>
                                    body { font-family: Arial, sans-serif; line-height: 1.6; padding: 20px; }
                                    h1 { border-bottom: 1px solid #ddd; padding-bottom: 10px; }
                                    .timestamp { color: #666; font-size: 0.9rem; margin-top: 30px; }
                                    .quote { font-style: italic; margin: 30px 0; padding: 15px; border-left: 3px solid #ddd; }
                                </style>
                            </head>
                            <body>
                                <h1>Analysis Results for "${searchTerm}"</h1>
                                <div>${data.result.html || data.result.text.replace(/\n/g, '<br>')}</div>
                                <div class="quote">"${randomQuote}"</div>
                                <div class="timestamp">Generated on ${formattedDate} at ${formattedTime}</div>
                            </body>
                        </html>
                    `);
                    printWindow.document.close();
                    printWindow.focus();
                    setTimeout(() => {
                        printWindow.print();
                    }, 250);
                });
            })
            .catch(error => {
                // Clear the message interval
                clearInterval(loadingIndicator.messageInterval);

                // Remove loading indicator with animation
                loadingIndicator.classList.remove('visible');
                setTimeout(() => {
                    document.body.removeChild(loadingIndicator);
                }, 300);

                // Create an error modal instead of using alert
                const errorModal = document.createElement('div');
                errorModal.className = 'result-modal';

                errorModal.innerHTML = `
                    <div class="result-content ${isMobile ? 'mobile-result' : ''}">
                        <div class="result-header">
                            <h3>Error Occurred</h3>
                            <button class="close-button" aria-label="Close"></button>
                        </div>
                        <div class="result-body">
                            <div class="markdown-content">
                                <h2>Unable to Process Request</h2>
                                <p>We encountered an error while processing your search:</p>
                                <pre>${error.message}</pre>
                                <p>Please try again later or contact support if the issue persists.</p>
                                <p>Make sure the server is running properly.</p>
                            </div>
                        </div>
                        <div class="result-footer">
                            <div class="result-timestamp">Error occurred at ${new Date().toLocaleTimeString()}</div>
                            <div class="result-actions">
                                <button class="action-button retry-button">
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M1 4V10H7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                        <path d="M23 20V14H17" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                        <path d="M20.49 9C19.9828 7.56678 19.1209 6.2854 17.9845 5.27542C16.8482 4.26543 15.4745 3.55976 13.9917 3.22426C12.5089 2.88875 10.9652 2.93434 9.50481 3.35677C8.04437 3.77921 6.71475 4.56471 5.64 5.64L1 10M23 14L18.36 18.36C17.2853 19.4353 15.9556 20.2208 14.4952 20.6432C13.0348 21.0657 11.4911 21.1112 10.0083 20.7757C8.52547 20.4402 7.1518 19.7346 6.01547 18.7246C4.87913 17.7146 4.01717 16.4332 3.51 15" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                    </svg>
                                    Retry
                                </button>
                            </div>
                        </div>
                    </div>
                `;

                document.body.appendChild(errorModal);

                // Add animation after a small delay to trigger transitions
                setTimeout(() => {
                    errorModal.classList.add('visible');
                }, 10);

                // Add close functionality
                errorModal.querySelector('.close-button').addEventListener('click', () => {
                    // First remove the visible class to trigger the exit animation
                    errorModal.classList.remove('visible');

                    // Then remove the element after the animation completes
                    setTimeout(() => {
                        document.body.removeChild(errorModal);
                    }, 300);
                });

                // Add retry functionality
                errorModal.querySelector('.retry-button').addEventListener('click', () => {
                    errorModal.classList.remove('visible');
                    setTimeout(() => {
                        document.body.removeChild(errorModal);
                        performSearch(method);
                    }, 300);
                });

                // Log error to console
                console.error('Error:', error);
            });
        } else {
            // Create an empty search modal instead of using alert
            const emptySearchModal = document.createElement('div');
            emptySearchModal.className = 'result-modal';

            emptySearchModal.innerHTML = `
                <div class="result-content ${isMobile ? 'mobile-result' : ''}">
                    <div class="result-header">
                        <h3>Empty Search</h3>
                        <button class="close-button" aria-label="Close"></button>
                    </div>
                    <div class="result-body">
                        <div class="markdown-content">
                            <h2>Please Enter a Search Query</h2>
                            <p>You need to enter a search term to use the ${method} function.</p>
                            <p>Try searching for specific terms related to waste, fraud, or compliance issues.</p>
                        </div>
                    </div>
                    <div class="result-footer">
                        <div class="result-actions">
                            <button class="action-button ok-button">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M20 6L9 17L4 12" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                </svg>
                                OK
                            </button>
                        </div>
                    </div>
                </div>
            `;

            document.body.appendChild(emptySearchModal);

            // Add animation after a small delay to trigger transitions
            setTimeout(() => {
                emptySearchModal.classList.add('visible');
            }, 10);

            // Add close functionality
            const closeModal = () => {
                emptySearchModal.classList.remove('visible');
                setTimeout(() => {
                    document.body.removeChild(emptySearchModal);
                    // Focus on the search input
                    searchInput.focus();
                }, 300);
            };

            emptySearchModal.querySelector('.close-button').addEventListener('click', closeModal);
            emptySearchModal.querySelector('.ok-button').addEventListener('click', closeModal);
        }
    }
});
