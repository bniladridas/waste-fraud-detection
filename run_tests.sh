#!/bin/bash

# Install test dependencies if needed
pip3 install -r requirements.txt

# Run Python tests
echo "Running Python tests..."
python3 -m pytest

# Report test results
if [ $? -eq 0 ]; then
    echo "All tests passed!"
else
    echo "Some tests failed. Please check the output above."
fi
