#!/bin/bash

mkdir -p build || exit 1
cp src/index.html build/ || exit 1
cp -R src/assets build/assets || exit 1
