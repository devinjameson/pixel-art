#!/bin/bash

validenvs=(dev prod)

if [ ! $1 ]; then
  echo "Error: No environment provided"
  echo "Valid environments: ${validenvs[@]}"
  echo "Usage: bin/build.sh dev"
  exit 1
fi

case "${validenvs[@]}" in
  *$1*) ;;
  *)
    echo "Error: Invalid environment - '$1'"
    echo "Valid environments: ${validenvs[@]}"
    echo "Usage: bin/build.sh dev"
    exit 1
    ;;
esac

# Setup
echo "💻 Starting $1 build 💻"
rm -rf build
mkdir build
mkdir -p build/static/css
cp -r public/* build

# Build
echo "🔧 Creating build 🔧"
case $1 in
  dev)
    npx tailwindcss -i ./src/tailwind.css -o ./build/static/css/tailwind.css
    node ./bin/esbuild.mjs --sourcemap
    ;;
  prod)
    npx tailwindcss -i ./src/tailwind.css -o ./build/static/css/tailwind.css --minify
    node ./bin/esbuild.mjs --minify
    ;;
esac

echo "🚀 Finished build 🚀"
