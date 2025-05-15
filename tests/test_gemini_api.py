import unittest
from unittest.mock import patch, MagicMock
import sys
import os
import json

# Add the parent directory to the path so we can import the gemini_api module
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

# Import the module to test
import gemini_api

class TestGeminiAPI(unittest.TestCase):
    """Test cases for the Gemini API integration."""
    
    def setUp(self):
        """Set up test fixtures."""
        self.app = gemini_api.app.test_client()
        self.app.testing = True
    
    def test_api_generate_endpoint_exists(self):
        """Test that the /api/generate endpoint exists."""
        response = self.app.post('/api/generate', 
                                json={'query': 'test', 'method': 'Search'})
        self.assertNotEqual(response.status_code, 404)
    
    @patch('gemini_api.generate')
    def test_api_generate_calls_generate_function(self, mock_generate):
        """Test that the /api/generate endpoint calls the generate function."""
        mock_generate.return_value = {"text": "Test response", "html": "<p>Test response</p>"}
        
        response = self.app.post('/api/generate', 
                                json={'query': 'test query', 'method': 'Search'})
        
        # Check that the generate function was called with the right arguments
        mock_generate.assert_called_once_with('test query', 'Search')
        
        # Check that the response contains the expected data
        self.assertEqual(response.status_code, 200)
        data = json.loads(response.data)
        self.assertIn('result', data)
    
    @patch('gemini_api.genai.Client')
    def test_generate_function_formats_prompt_correctly(self, mock_client):
        """Test that the generate function formats the prompt correctly."""
        # Setup mock
        mock_instance = MagicMock()
        mock_client.return_value = mock_instance
        mock_response = MagicMock()
        mock_response.text = "Test response"
        mock_instance.models.generate_content.return_value = mock_response
        
        # Call the function
        result = gemini_api.generate("test query", "Search")
        
        # Check that the client was initialized
        mock_client.assert_called_once()
        
        # Check that generate_content was called
        mock_instance.models.generate_content.assert_called_once()
        
        # Check the result format
        self.assertIsInstance(result, dict)
        self.assertIn('text', result)
        self.assertIn('html', result)
    
    def test_different_methods_use_different_prompts(self):
        """Test that different methods use different prompt templates."""
        with patch('gemini_api.genai.Client') as mock_client:
            # Setup mock
            mock_instance = MagicMock()
            mock_client.return_value = mock_instance
            mock_response = MagicMock()
            mock_response.text = "Test response"
            mock_instance.models.generate_content.return_value = mock_response
            
            # Call the function with different methods
            gemini_api.generate("test query", "Search")
            search_args = mock_instance.models.generate_content.call_args[1]['contents'][0].parts[0].text
            
            mock_instance.reset_mock()
            
            gemini_api.generate("test query", "Reason")
            reason_args = mock_instance.models.generate_content.call_args[1]['contents'][0].parts[0].text
            
            # Check that different methods use different prompts
            self.assertNotEqual(search_args, reason_args)
    
    def test_markdown_conversion(self):
        """Test that markdown is converted to HTML correctly."""
        with patch('gemini_api.genai.Client') as mock_client:
            # Setup mock
            mock_instance = MagicMock()
            mock_client.return_value = mock_instance
            mock_response = MagicMock()
            mock_response.text = "# Test Heading\n\n- List item 1\n- List item 2"
            mock_instance.models.generate_content.return_value = mock_response
            
            # Call the function
            result = gemini_api.generate("test query", "Search")
            
            # Check that markdown was converted to HTML
            self.assertIn('<h1>Test Heading</h1>', result['html'])
            self.assertIn('<li>List item 1</li>', result['html'])

if __name__ == '__main__':
    unittest.main()
