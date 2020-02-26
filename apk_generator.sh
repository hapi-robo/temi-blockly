#!/bin/sh
#
# Automatically creates a temi app from a TBO-file.
#
# Usage
#	  ./apk_generator.sh <app-name> <.tbo>
#
# MIT License
#
# Copyright (c) 2020 Raymond Oung
#
# Permission is hereby granted, free of charge, to any person obtaining a copy
# of this software and associated documentation files (the "Software"), to deal
# in the Software without restriction, including without limitation the rights
# to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
# copies of the Software, and to permit persons to whom the Software is
# furnished to do so, subject to the following conditions:
# 
# The above copyright notice and this permission notice shall be included in all
# copies or substantial portions of the Software.
# 
# THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
# IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
# FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
# AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
# LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
# OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
# SOFTWARE.
#

# immediately exit if any command exits with a non-zero status
set -e

# constants
DEFAULT_ANDROID_HOME=~/Android/Sdk # default location on Linux
TEMPLATE_DIR="temi-apk-template"
TMP_DIR="tmp"

# display usage instructions
usage()
{
  echo ""
  echo "usage: apk_generator.sh <tbo-file> <app-name>"
  echo ""
  echo "Creates a temi app from a TBO-file"
  echo ""
  echo "dependencies:"
  echo ""
  echo "  - Android-SDK with the ANDROID_HOME environment variable"
  echo "    set appropriately."
  echo ""
  echo "positional arguments:"
  echo ""
  echo "  tbo-file              TBO file."
  echo "  app-name              App name. Use double-quotes to encapsulate"
  echo "                        a name with whitespace."
  echo ""
  exit 1
}

# attempt to automatically set ANDROID_HOME environment variable
set_android_home()
{
	echo "ANDROID_HOME environment variable not set. Attempting to set automatically..."
	if [ -d "${DEFAULT_ANDROID_HOME}" ]; then
		export ANDROID_HOME=${DEFAULT_ANDROID_HOME}
		echo "export ANDROID_HOME=${ANDROID_HOME}"
	else
		echo "[Error] Android SDK cannot be found. Please set the ANDROID_HOME environment variable to your Android-SDK's (Android/Sdk) path."
	fi
}

# check path to Android SDK
if env | grep -q "^ANDROID_HOME="; then
	if [ -d "${ANDROID_HOME}" ]; then
		echo "ANDROID_HOME environment variable set to ${ANDROID_HOME}."
	else
		set_android_home
	fi
else
	set_android_home
fi

# check for TBO file
if [ -z "$1" ]; then
  echo "Missing TBO file"
  usage
else
  TBO_FILE=${1%/}
fi

# check for app name
if [ -z "$2" ]; then
  echo "Missing app name"
  usage
else
  APP_NAME=${2%/}
fi

# make a copy of the template
cp -avr "${TEMPLATE_DIR}" "${TMP_DIR}"

# rename package
# - lower case letters
# - substitute whitespace ' ' with underscore '_'
APP_NAME_UNDERSCORE="$(echo ${APP_NAME} | tr '[:upper:]' '[:lower:]' | tr ' ' '_')"

# check environment
UNAME_OUT="$(uname -s)"
case "${UNAME_OUT}" in
    Linux*)     MACHINE=Linux;;
    Darwin*)    MACHINE=Mac;;
    CYGWIN*)    MACHINE=Cygwin;;
    MINGW*)     MACHINE=MinGw;;
    *)          MACHINE="UNKNOWN:${UNAME_OUT}"
esac

# renames package
if [ ${MACHINE} = "Linux" ]; then
  # modify files inline (Linux)
  echo "Linux"
  sed -i "s/apk_template/${APP_NAME_UNDERSCORE}/" "${TMP_DIR}/app/build.gradle"
  sed -i "s/apk_template/${APP_NAME_UNDERSCORE}/" "${TMP_DIR}/app/src/main/AndroidManifest.xml"
  sed -i "s/apk_template/${APP_NAME_UNDERSCORE}/" "${TMP_DIR}/app/src/main/java/com/hapirobo/apk_template/MainActivity.java"
  sed -i "s/apk_template/${APP_NAME_UNDERSCORE}/" "${TMP_DIR}/app/src/androidTest/java/com/hapirobo/apk_template/ExampleInstrumentedTest.java"
  sed -i "s/apk_template/${APP_NAME_UNDERSCORE}/" "${TMP_DIR}/app/src/test/java/com/hapirobo/apk_template/ExampleUnitTest.java"
  sed -i "s/apk_name/${APP_NAME}/" "${TMP_DIR}/app/src/main/res/values/strings.xml"
  sed -i "s/com.hapirobo.package_name/com.hapirobo.${PACKAGE_NAME}/" "${TMP_DIR}/app/src/main/res/values/strings.xml"
elif [ ${MACHINE} = "Darwin" ]; then
  # modify files inline
  echo "macOS"
  sed -i .bak "s/apk_template/${APP_NAME_UNDERSCORE}/" "${TMP_DIR}/app/build.gradle"
  sed -i .bak "s/apk_template/${APP_NAME_UNDERSCORE}/" "${TMP_DIR}/app/src/main/AndroidManifest.xml"
  sed -i .bak "s/apk_template/${APP_NAME_UNDERSCORE}/" "${TMP_DIR}/app/src/main/java/com/hapirobo/apk_template/MainActivity.java"
  sed -i .bak "s/apk_template/${APP_NAME_UNDERSCORE}/" "${TMP_DIR}/app/src/androidTest/java/com/hapirobo/apk_template/ExampleInstrumentedTest.java"
  sed -i .bak "s/apk_template/${APP_NAME_UNDERSCORE}/" "${TMP_DIR}/app/src/test/java/com/hapirobo/apk_template/ExampleUnitTest.java"
  sed -i .bak "s/apk_name/${APP_NAME}/" "${TMP_DIR}/app/src/main/res/values/strings.xml"
  sed -i .bak "s/com.hapirobo.package_name/com.hapirobo.${PACKAGE_NAME}/" "${TMP_DIR}/app/src/main/res/values/strings.xml"
else
  echo "[Error] This script only supports Linux and Darwin."
  exit 1
fi

# rename directories
mv -v "${TMP_DIR}/app/src/main/java/com/hapirobo/apk_template" "${TMP_DIR}/app/src/main/java/com/hapirobo/${APP_NAME_UNDERSCORE}"
mv -v "${TMP_DIR}/app/src/androidTest/java/com/hapirobo/apk_template" "${TMP_DIR}/app/src/androidTest/java/com/hapirobo/${APP_NAME_UNDERSCORE}"
mv -v "${TMP_DIR}/app/src/test/java/com/hapirobo/apk_template" "${TMP_DIR}/app/src/test/java/com/hapirobo/${APP_NAME_UNDERSCORE}"

# fill with custom code
# https://stackoverflow.com/questions/22497246/insert-multiple-lines-into-a-file-after-specified-pattern-using-shell-script#22497499
MAIN_ACTIVITY_FILE="${TMP_DIR}/app/src/main/java/com/hapirobo/${APP_NAME_UNDERSCORE}/MainActivity.java"
cp -v "${TBO_FILE}" tbo
sed -i '/\/\/\ insert\ code\ here/r tbo' "${MAIN_ACTIVITY_FILE}"

# build app
cd "${TMP_DIR}"
./gradlew clean
./gradlew build
cd ..

# move app to root directory
cp -v "${TMP_DIR}/app/build/outputs/apk/debug/app-debug.apk" "${APP_NAME_UNDERSCORE}.apk"

# clean up
echo "Cleaning up..."
rm -fr tmp
rm tbo
echo "Done"
echo ""

# print path to APK
readlink -f "${APP_NAME_UNDERSCORE}.apk"
exit 0