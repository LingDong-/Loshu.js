# STEP 0: change EMPATH below
# STEP 1: cd ./wasm/dist
# STEP 2: sh ../compile.sh

EMPATH=../../../emsdk
echo "generating glue..."
python $EMPATH/fastcomp/emscripten/tools/webidl_binder.py ../loshuwasm.idl glue
echo "compiling..."
$EMPATH/fastcomp/emscripten/emcc ../glue_wrapper.cpp --post-js glue.js  -std=c++11 -s EXPORT_NAME="_LOSHUWASM" --closure 1 -s MODULARIZE=1 -s ALLOW_MEMORY_GROWTH=1 -s WASM=1 -O3 -o loshuwasm.js
echo "converting to static module..."
sed -i '' 's/var _LOSHUWASM = (function() {/var _LOSHUWASM = (new function() {/' loshuwasm.js
echo "concating custom wrapper..."
cat ../wrapper.js >> loshuwasm.js