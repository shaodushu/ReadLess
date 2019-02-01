#初始化安装启动
STRING="HELLO ReadLess"
echo $STRING
 npm install --global --production windows-build-tools

 npm install -g @tarojs/cli

 cd $TRAVIS_BUILD_DIR/client

 npm install

 npm run dev:weapp