#!/bin/sh

rm -rf swot.zip
rm -rf swot-unzipped
rm -rf domains

wget https://codeload.github.com/JetBrains/swot/zip/master -O swot.zip
unzip swot.zip -d swot-unzipped
mv swot-unzipped/swot-master/lib/domains domains