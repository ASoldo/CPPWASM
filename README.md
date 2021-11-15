Compile with ./em++:
  -from emscripten project: .../ emscripten/emsdk/upstream/emscripten
  ./em++ /Users/SoldoA/Projects/CPPWASM/main.cpp -s WASM=1 -o /Users/SoldoA/Projects/CPPWASM/export/main.html --bind
  ./em++ /Users/SoldoA/Projects/CPPWASM/main.cpp -s WASM=1 -o /Users/SoldoA/Projects/CPPWASM/export/main.html -s NO_EXIT_RUNTIME=1 -std=c++1z --bind