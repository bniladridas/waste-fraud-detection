#!/bin/bash

# This script converts favicon.svg to favicon.ico
# It requires ImageMagick to be installed

# Check if ImageMagick is installed
if command -v convert >/dev/null 2>&1; then
  echo "Converting favicon.svg to favicon.ico..."
  convert -background none -density 256x256 favicon.svg -define icon:auto-resize=16,32,48,64 favicon.ico
  echo "Favicon created successfully!"
else
  echo "ImageMagick is not installed. Please install it to convert SVG to ICO."
  echo "For now, we'll use the SVG version only."
fi
