#!/bin/bash
set -e

npm run prettier
npm run tsc

if [[ $CI ]]
then
  npx eslint ./ --max-warnings 0
else
  npx eslint ./
fi
