#!/bin/bash

set -eux

if [ -z ${bamboo_capability_system_jdk_JDK_1_8_0+x} ]; then
    echo "Not Bamboo Build, won't set variables";
else
    echo "Bamboo Build set JAVA_HOME, maven bin and Java";
    export JAVA_HOME=$bamboo_capability_system_jdk_JDK_1_8_0
    export mvnBin=${bamboo_capability_system_builder_mvn3_Maven_3}/bin
    export javaBin=${bamboo_capability_system_jdk_JDK_1_8_0}/bin
    export PATH=${javaBin}:${mvnBin}:$PATH
fi
#
#echo "checking if anything running on port 9002"
#fuser 9002/tcp && kill -9 $(fuser 9002/tcp)
#
#echo "project dependencies"
#npm install
#
#echo "Run unit test"
#node_modules/.bin/gulp testci
#
#echo "Run end to end test "
#node_modules/.bin/gulp e2e-phantom
#
#echo "Build artefacts"
#node_modules/.bin/gulp build
#
#pushd dist
#tar cvzf ../dist.tar.gz .
#popd

mvn clean package
