STRING="HELLO ReadLess"
echo $STRING
 npm --add-python-to-path='true' --debug install --global windows-build-tools

 npm install -g @tarojs/cli

 cd $TRAVIS_BUILD_DIR/client

 npm install

 npm run dev:weapp