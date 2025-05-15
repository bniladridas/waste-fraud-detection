#!/bin/bash

# Check if we should run tests
if [ "$1" == "--test" ]; then
    # Install test dependencies
    pip3 install -r requirements.txt

    # Run tests
    python3 -m pytest

    # Exit with test result code
    exit $?
fi

# Install required dependencies if not already installed
pip3 install -r requirements.txt

# Start the Flask server
python3 gemini_api.py
