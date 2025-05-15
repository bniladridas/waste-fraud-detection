/**
 * Frontend tests for the Waste & Fraud Detection System
 * 
 * Run with: npm test
 * Requires: jest, jest-environment-jsdom
 */

// Mock DOM elements
document.body.innerHTML = `
<div class="search-container">
  <div class="search-input-wrapper">
    <input type="text" class="search-input" placeholder="Search for waste, fraud, or compliance issues...">
    <button class="search-button">Search</button>
  </div>
</div>
`;

// Import the script (in a real setup, you would use a module system)
// For this example, we'll mock the functions
const performSearch = jest.fn();
const createLoadingIndicator = jest.fn();
const createResultModal = jest.fn();

// Mock fetch API
global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({ result: { html: '<p>Test result</p>' } }),
  })
);

describe('Search Functionality', () => {
  beforeEach(() => {
    // Clear all mocks
    jest.clearAllMocks();
    
    // Reset the search input value
    document.querySelector('.search-input').value = '';
  });

  test('performSearch should not call fetch when search input is empty', () => {
    // Set up the search input to be empty
    document.querySelector('.search-input').value = '';
    
    // Call performSearch
    performSearch('Search');
    
    // Expect fetch not to be called
    expect(global.fetch).not.toHaveBeenCalled();
  });

  test('performSearch should call fetch with correct parameters when search input has value', () => {
    // Set up the search input to have a value
    document.querySelector('.search-input').value = 'test query';
    
    // Call performSearch
    performSearch('Search');
    
    // Expect fetch to be called with correct parameters
    expect(global.fetch).toHaveBeenCalledWith(
      expect.any(String),
      expect.objectContaining({
        method: 'POST',
        headers: expect.objectContaining({
          'Content-Type': 'application/json',
        }),
        body: expect.stringContaining('test query'),
      })
    );
  });

  test('search button click should trigger performSearch', () => {
    // Set up the search input to have a value
    document.querySelector('.search-input').value = 'test query';
    
    // Mock the performSearch function
    const originalPerformSearch = performSearch;
    window.performSearch = jest.fn();
    
    // Add event listener to search button
    document.querySelector('.search-button').addEventListener('click', () => {
      performSearch('Search');
    });
    
    // Trigger click event
    document.querySelector('.search-button').click();
    
    // Expect performSearch to be called
    expect(performSearch).toHaveBeenCalledWith('Search');
    
    // Restore original function
    window.performSearch = originalPerformSearch;
  });

  test('loading indicator should be created and removed during search', async () => {
    // Set up the search input to have a value
    document.querySelector('.search-input').value = 'test query';
    
    // Mock document.createElement
    const originalCreateElement = document.createElement;
    document.createElement = jest.fn(() => {
      const element = originalCreateElement.call(document, 'div');
      element.innerHTML = '<div class="loading-spinner"></div>';
      return element;
    });
    
    // Mock document.body.appendChild and removeChild
    const originalAppendChild = document.body.appendChild;
    const originalRemoveChild = document.body.removeChild;
    document.body.appendChild = jest.fn();
    document.body.removeChild = jest.fn();
    
    // Call performSearch
    await performSearch('Search');
    
    // Expect appendChild to be called (for loading indicator)
    expect(document.body.appendChild).toHaveBeenCalled();
    
    // Expect removeChild to be called (to remove loading indicator)
    expect(document.body.removeChild).toHaveBeenCalled();
    
    // Restore original functions
    document.createElement = originalCreateElement;
    document.body.appendChild = originalAppendChild;
    document.body.removeChild = originalRemoveChild;
  });
});

describe('Result Modal', () => {
  test('result modal should display the correct content', () => {
    // Mock document.createElement
    const originalCreateElement = document.createElement;
    document.createElement = jest.fn(() => {
      const element = originalCreateElement.call(document, 'div');
      return element;
    });
    
    // Create a result modal
    const resultModal = createResultModal('Test Results', '<p>Test content</p>');
    
    // Expect the modal to have the correct content
    expect(resultModal.innerHTML).toContain('Test Results');
    expect(resultModal.innerHTML).toContain('<p>Test content</p>');
    
    // Restore original function
    document.createElement = originalCreateElement;
  });
});
