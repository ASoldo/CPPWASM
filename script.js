var Module = typeof Module !== 'undefined' ? Module : {};
let wasmExports = null;

let wasmMemory = new WebAssembly.Memory({initial: 256, maximum: 256});

let wasmTable = new WebAssembly.Table({initial: 1, maximum: 1, element: "anyfunc"});

let asmLibraryArg = {
    "memory": wasmMemory,
    "table": wasmTable,
    "__memory_base": 1024,
    "__table_base": 0,
    "__lock": () => {},
    "__unlock": () => {},

    "emscripten_resize_heap": () => {},
    "__handle_stack_overflow": () => {},
    "__cxa_atexit": () => {},
    "abort": () => {},
    "emscripten_memcpy_big": () => {},
    "emscripten_resize_heap": () => {},
    "environ_get": () => {},
    "environ_sizes_get": () => {},
    "fd_close": () => {},
    "fd_read": () => {},
    "fd_seek": () => {},
    "fd_write": () => {},
    "setTempRet0": () => {},
    "strftime_l": () => {},
    "printMeSoldo": printMeSoldo,
    "DrawMe": DrawMe,
    "emscripten_asm_const_int": () => {},
    "_embind_register_void": () => {},
    "_embind_register_bool": () => {},
    "_embind_register_std_string": () => {},
    "_embind_register_std_wstring": () => {},
    "_embind_register_emval": () => {},
    "_embind_register_integer": () => {},
    "_embind_register_float": () => {},
    "_embind_register_memory_view": () => {},
    "_embind_register_bigint": () => {},
    "CallMe": CallMe,
    "Stringolo": Stringolo,
    "callMain": () => {console.log("main");},
}  

function printMeSoldo(msg, name, soldo) {
    console.log(msg + " " + name + " " + soldo);
}

function Loaded() {
    console.log("Me Loaded!");
}

function DrawMe(x,y,p1,p2){
    var canvas = document.getElementById('canvas');
    var ctx = canvas.getContext('2d');
    canvas.setAttribute('íd', "canvas");
    canvas.setAttribute('width', x);
    canvas.setAttribute('height', y);
    ctx.fillStyle = '#FF0000';
    ctx.fillRect(p1,p2, 10, 10);}

function CallMe(boolich){ console.log("boolich: " + boolich); }
function Stringolo(letters){ console.log(String.fromCharCode(letters)); }
function printMeSoldo(a,b,f){ console.log("a: " + a + " b: " + b + " f: " + f); }

var info = {
    'env': asmLibraryArg,
    'wasi_snapshot_preview1': asmLibraryArg,
  };

// async function loadWasm() {
    (async () => {
        const wasm = await fetch("export/main.wasm");
        const buffer = await wasm.arrayBuffer();
        const module = await WebAssembly.compile(buffer);
        const instance = await WebAssembly.instantiate(module, info);
        wasmExports = instance.exports;
    })();
// };

// loadWasm();

