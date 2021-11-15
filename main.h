extern "C" {
  // Exported as non-mangled symbol "_add", "_sub" and not "_Z3addii"
    int add(int a, int b);
    int sub(int a, int b);
    int mul(int a, int b);
    int divi(int a, int b);
    int mod(int a, int b);

    EM_JS(void, printMeSoldo, (int a, bool b, float f ), {
        console.log("a: " + a + " b: " + b + " f: " + f);
    });

    EM_JS(void, DrawMe, (int x, int y, int p1, int p2), {
        var body = document.getElementsByTagName("body")[0];
        var canvas = document.createElement('canvas');
        body.appendChild(canvas);
        var ctx = canvas.getContext('2d');
        canvas.setAttribute('íd', "canvas");
        canvas.setAttribute('width', x);
        canvas.setAttribute('height', y);
        ctx.fillStyle = '#FF0000';
        ctx.fillRect(p1,p2, 10, 10);
    });
    EM_JS(void, CallMe, (bool boolich), { console.log("boolich: " + boolich); });
    EM_JS(void, Stringolo, (int letters), { console.log(String.fromCharCode(letters)); });
}

// var body = document.getElementsByTagName("body")[0];
//     var canvas = document.createElement('canvas');
//     body.appendChild(canvas);
//     var ctx = canvas.getContext('2d');
//     canvas.setAttribute('íd', "canvas");
//     canvas.setAttribute('width', x);
//     canvas.setAttribute('height', y);
//     ctx.fillStyle = '#FF0000';
//     ctx.fillRect(p1,p2, 10, 10);