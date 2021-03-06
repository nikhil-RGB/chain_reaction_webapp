const view = (/Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent) ||
    (/Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.platform))); //If true, user is on a mobile device
const IS_MOBILE = view;
if (view) {
    alert("Looks like you're playing on a mobile device, please keep your device in landscape mode for an optimal expeience\nKeep in mind that the best experience of the web app is on a laptop/tablet");

}
window.orientation = "landscape";


class ChainUnit {
    constructor(x, y, arr, names = ["Players"]) {
        this.tracker = 0;
        this.xcoor = x;
        this.ycoor = y;
        this.cols = arr;
        this.array = [];
        this.shouldListen = true;
        this.main_theme = new Audio('https://www.youtube.com/watch?v=FXm_N-eAaCE&t=475s');
        this.shouldPlay = true;
        this.nns = names;
        this.copy = this.cols.map((ev) => {
            return ev;
        });
    }
    findColRoutine() {
        let col = "rgb(0,0,0)";
        for (let i = 0; i < this.xcoor; ++i) {
            for (let j = 0; j < this.ycoor; ++j) {
                const elem = this.array[i][j];
                const colo = elem.style.background;
                if (colo !== "rgb(0,0,0)") {
                    col = colo;
                    return col;
                }
            }
        }
        return "black";
    }
    winner() {
        const col = this.findColRoutine();
        for (let i = 0; i < this.xcoor; ++i) {
            for (let j = 0; j < this.ycoor; ++j) {
                const elem = this.array[i][j];
                const colo = elem.style.background;
                if (colo !== "rgb(0,0,0)" && colo !== col) {
                    return undefined;
                }
            }
        }
        this.shouldListen = false;
        this.main_theme.pause();
        return col;
    }
    winnerA() {
        if (this.cols.length <= 1) {
            this.shouldListen = false;
            this.main_theme.pause();
            return this.cols[0];
        } else {
            return undefined;
        }
    }
    convertCol(color) {
        let type = '';
        if (color.includes('#')) {
            type = "HEX";
            let result = this.HEXtoRGB(color);
            color = 'rgb(' + result.join(', ') + ')';
        } else if (color.includes('rgb')) {
            type = "RGB";
        } else {
            type = 'standard';
            console.error('Unexpected input parameter : standard');
        }
        return color;
    }
    compareCols(color, col) {
        color = this.convertCol(color);
        col = this.convertCol(col);
        return color == col;
    }
    HEXtoRGB(hex) {
        hex = hex.replace(/#/g, '');
        if (hex.length === 3) {
            hex = hex.split('').map(function(hex) {
                return hex + hex;
            }).join('');
        }
        var result = /^([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})[\da-z]{0,0}$/i.exec(hex);
        if (result) {
            var red = parseInt(result[1], 16);
            var green = parseInt(result[2], 16);
            var blue = parseInt(result[3], 16);

            return [red, green, blue];
        } else {
            return null;
        }
    }
    onClick(e) {
        if (!this.shouldListen) {
            return;
        }
        const elem = e.target;
        if ((!this.compareCols(elem.style.background, this.cols[this.tracker])) && !this.compareCols(elem.style.background, "#000000")) {
            alert("Invalid spot chosen for capture!");
            return;
        }
        if (this.compareCols((elem.style.background), "#000000")) {
            elem.style.background = this.cols[this.tracker];
        }
        let val = elem.textContent;
        if (!this.isCritical(elem)) {
            ++val;
            elem.textContent = val;
        } else {
            elem.textContent = ++val;
            this.explodeAt(elem);
        }
        ++this.tracker;
        if (this.tracker >= this.cols.length) {
            this.tracker = 0;
        }
        if (this.shouldPlay) {
            this.playAudio();
            this.shouldPlay = false;
        }

        //edited code for div
        let divC = document.getElementById("main_holder");
        divC.style.backgroundColor = this.cols[this.tracker];
    }

    eliminationRound() {
        let colors = [];
        for (let i = 0; i < this.xcoor; ++i) {
            for (let j = 0; j < this.ycoor; ++j) {
                let unit = this.array[i][j];
                let color = unit.style.background;
                if (!colors.includes(color) && (color !== "rgb(0,0,0)")) {
                    colors.push(color);
                }
            }
        }
        colors = colors.map((item) => {

            return this.RGBtoHEX(item);
        });
        let meh = [];
        for (let it of this.cols) {
            if (!colors.includes(it)) {
                meh.push(it);
            }
        }
        if (meh.length == 0) {
            return;
        }
        let list = "";
        meh = meh.map((item) => {
            const ind = this.copy.indexOf(item);
            list += this.nns[ind] + "\'s ";
            return item;
        });

        for (let ev of meh) {
            const ii = this.cols.indexOf(ev);
            this.cols.splice(ii, 1);
        }

        alert(list + " color(s) will now be completely eliminated/captured");
        const winner = this.winnerA();
        if (winner !== undefined) {
            const ind = this.copy.indexOf(winner);
            let wii = this.nns[ind];
            window.setTimeout(() => alert(wii + " WON!!!"), 700);
        }
    }
    RGBtoHEX(color) {
        let a = color.split("(")[1].split(")")[0];
        a = a.split(",");
        let b = a.map(function(x) {
            x = parseInt(x).toString(16);
            return (x.length == 1) ? "0" + x : x;
        });
        b = "#" + b.join("");
        return b;
    }


    createBackdrop() {
        const elemT = document.querySelector("BODY");
        const elem = document.createElement("DIV");
        elemT.style.backgroundRepeat = "repeat";
        elem.className = "container";
        elem.id = "top";
        const header = document.createElement("H1");
        header.textContent = "Nikhil's Chain Reaction Game";
        header.style.backgroundImage = "url('https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.QMt_HnRziAh9kyPlxqV0UAHaEK%26pid%3DApi&f=1')";
        const para = document.createElement("P");
        para.id = "description";
        para.style.backgroundImage = "url('https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.QMt_HnRziAh9kyPlxqV0UAHaEK%26pid%3DApi&f=1')";
        para.textContent = "Nikhil's chain reaction is a web version of the popular game chain reaction, chain reaction is a tactical sequence-explosion game";
        elem.appendChild(header);
        elem.appendChild(para);
        const elem2 = document.createElement("DIV");
        elem.className = "container";
        elem.id = "main_holder";
        //const link = document.createElement("LINK");
        //link.rel = "stylesheet";
        //link.href = "styles.css";
        //link.type = "text/css";
        elemT.appendChild(elem);
        elemT.appendChild(elem2);
        //elemT.appendChild(link); commented out since HTML and css is linked here
    }

    initiateSetup(x = this.xcoor, y = this.ycoor) {
        this.createBackdrop();
        const arr = [];
        const parent = document.getElementById("main_holder");
        for (let i = 0; i < x; ++i) {
            let arr1 = [];
            for (let j = 0; j < y; ++j) {
                const butt = document.createElement("BUTTON");
                butt.type = "button"
                butt.className = "button"
                butt.textContent = "0";
                butt.id = i + " " + j;
                butt.style.background = "#000000";
                butt.style.color = "white";
                butt.style.width = "10%";
                if (view) {
                    butt.style.height = "35px";
                } else {
                    butt.style.height = "50px";
                }
                butt.addEventListener("click", e => this.onClick(e));
                arr1.push(butt);
                parent.appendChild(butt);
            }
            arr.push(arr1);
            const divi = document.createElement("BR");
            parent.appendChild(divi);
        }
        this.array = this.array.concat(arr);

        //div coloring:
        const elem = parent;
        elem.style.backgroundColor = this.cols[0];
    }

    isCritical(butt, val = false) {
        const text = butt.textContent;
        const pos = this.calculatePosition(butt);
        let cr = 0;
        switch (pos) {
            case "CORNER":
                cr = 1;
                break;
            case "EDGE":
                cr = 2;
                break;
            case "CENTER":
                cr = 3;
                break;
        }
        if (val) {
            return cr;
        }
        if (text >= cr) {
            return true;
        } else {
            return false;
        }
    }
    calculatePosition(elem) {
        let x = elem.id;
        const arr = x.split(" ");
        const a = arr[0];
        const b = arr[1];
        if ((b == 0 || b == (this.ycoor - 1)) && ((a == 0 || a == (this.xcoor - 1)))) {
            return "CORNER"
        } else if ((a == 0) || (b == 0) || (a == (this.xcoor - 1)) || (b == (this.ycoor - 1))) {
            return "EDGE";
        } else {
            return "CENTER";
        }

    }
    isStable(elem) {
        const cn = this.isCritical(elem, true);
        if (elem.textContent > cn) {
            return false;
        } else {
            return true;
        }
    }
    isAllStable() {
            for (let i = 0; i < this.xcoor; ++i) {
                for (let j = 0; j < this.ycoor; ++j) {
                    const el = array[i][j];
                    if (!this.isStable(elem)) {
                        return false;
                    }
                }
            }

            return true;
        }
        //Under testing--->Testing completed-Issues resolved.
    getAdjacentCells(butt) {
        const poss = butt.id.split(' ');
        const x = parseInt(poss[0]);
        const y = parseInt(poss[1]);
        const xinc = 1 + x;
        const xdec = x - 1;
        const yinc = 1 + y;
        const ydec = y - 1;
        let arr = [];
        if (xinc < this.xcoor) {
            arr.push(this.array[xinc][y]);
        }
        if (xdec >= 0) {
            arr.push(this.array[xdec][y]);
        }
        arr.push(this.array[x][ydec]);
        arr.push(this.array[x][yinc]);
        arr = arr.filter(function(e) {
            return e !== undefined;
        });

        return arr;
    }
    explodeAt(butt) {
        let expList = [butt];
        let colc = this.RGBtoHEX(butt.style.background);
        let then = new Date();
        do {
            let expElem = expList[0];
            let ll = [];
            if (!this.isStable(expElem)) {
                ll = this.getAdjacentCells(expElem);
                ll = ll.filter((e) => {
                    e.textContent = ++e.textContent;
                    e.style.background = expElem.style.background;
                    if (!this.isStable(e)) {
                        return true;
                    } else {
                        return false;
                    }
                });
                expElem.style.background = "#000000";
                expElem.textContent = "0";
            }
            expList = expList.concat(ll);
            expList.splice(0, 1);
            let now = new Date();
            let t_elap = (now - then) / 1000;
            if (t_elap > 5) {
                for (let i = 0; i < this.xcoor; ++i) {
                    for (let j = 0; j < this.ycoor; ++j) {
                        let ele = this.array[i][j];
                        if (!(ele.style.background == "#000000")) {
                            ele.style.background = colc;
                        }
                    }
                }
                break;
            }
        }
        while (expList.length > 0);
        this.eliminationRound();

    }

    playAudio() {
        this.main_theme.play();
    }

    stopAudio() {
        this.main_theme.pause();
    }
}

function generateRandom() {
    let red = Math.floor(Math.random() * 200 + 40);
    let blue = Math.floor(Math.random() * 200 + 40);
    let green = Math.floor(Math.random() * 200 + 40);
    return `rgb(${red},${green},${blue})`;
}

function colourNameToHex(colour) {
    var colours = {
        "aliceblue": "#f0f8ff",
        "antiquewhite": "#faebd7",
        "aqua": "#00ffff",
        "aquamarine": "#7fffd4",
        "azure": "#f0ffff",
        "beige": "#f5f5dc",
        "bisque": "#ffe4c4",
        "black": "#000000",
        "blanchedalmond": "#ffebcd",
        "blue": "#0000ff",
        "blueviolet": "#8a2be2",
        "brown": "#a52a2a",
        "burlywood": "#deb887",
        "cadetblue": "#5f9ea0",
        "chartreuse": "#7fff00",
        "chocolate": "#d2691e",
        "coral": "#ff7f50",
        "cornflowerblue": "#6495ed",
        "cornsilk": "#fff8dc",
        "crimson": "#dc143c",
        "cyan": "#00ffff",
        "darkblue": "#00008b",
        "darkcyan": "#008b8b",
        "darkgoldenrod": "#b8860b",
        "darkgray": "#a9a9a9",
        "darkgreen": "#006400",
        "darkkhaki": "#bdb76b",
        "darkmagenta": "#8b008b",
        "darkolivegreen": "#556b2f",
        "darkorange": "#ff8c00",
        "darkorchid": "#9932cc",
        "darkred": "#8b0000",
        "darksalmon": "#e9967a",
        "darkseagreen": "#8fbc8f",
        "darkslateblue": "#483d8b",
        "darkslategray": "#2f4f4f",
        "darkturquoise": "#00ced1",
        "darkviolet": "#9400d3",
        "deeppink": "#ff1493",
        "deepskyblue": "#00bfff",
        "dimgray": "#696969",
        "dodgerblue": "#1e90ff",
        "firebrick": "#b22222",
        "floralwhite": "#fffaf0",
        "forestgreen": "#228b22",
        "fuchsia": "#ff00ff",
        "gainsboro": "#dcdcdc",
        "ghostwhite": "#f8f8ff",
        "gold": "#ffd700",
        "goldenrod": "#daa520",
        "gray": "#808080",
        "green": "#008000",
        "greenyellow": "#adff2f",
        "honeydew": "#f0fff0",
        "hotpink": "#ff69b4",
        "indianred ": "#cd5c5c",
        "indigo": "#4b0082",
        "ivory": "#fffff0",
        "khaki": "#f0e68c",
        "lavender": "#e6e6fa",
        "lavenderblush": "#fff0f5",
        "lawngreen": "#7cfc00",
        "lemonchiffon": "#fffacd",
        "lightblue": "#add8e6",
        "lightcoral": "#f08080",
        "lightcyan": "#e0ffff",
        "lightgoldenrodyellow": "#fafad2",
        "lightgrey": "#d3d3d3",
        "lightgreen": "#90ee90",
        "lightpink": "#ffb6c1",
        "lightsalmon": "#ffa07a",
        "lightseagreen": "#20b2aa",
        "lightskyblue": "#87cefa",
        "lightslategray": "#778899",
        "lightsteelblue": "#b0c4de",
        "lightyellow": "#ffffe0",
        "lime": "#00ff00",
        "limegreen": "#32cd32",
        "linen": "#faf0e6",
        "magenta": "#ff00ff",
        "maroon": "#800000",
        "mediumaquamarine": "#66cdaa",
        "mediumblue": "#0000cd",
        "mediumorchid": "#ba55d3",
        "mediumpurple": "#9370d8",
        "mediumseagreen": "#3cb371",
        "mediumslateblue": "#7b68ee",
        "mediumspringgreen": "#00fa9a",
        "mediumturquoise": "#48d1cc",
        "mediumvioletred": "#c71585",
        "midnightblue": "#191970",
        "mintcream": "#f5fffa",
        "mistyrose": "#ffe4e1",
        "moccasin": "#ffe4b5",
        "navajowhite": "#ffdead",
        "navy": "#000080",
        "oldlace": "#fdf5e6",
        "olive": "#808000",
        "olivedrab": "#6b8e23",
        "orange": "#ffa500",
        "orangered": "#ff4500",
        "orchid": "#da70d6",
        "palegoldenrod": "#eee8aa",
        "palegreen": "#98fb98",
        "paleturquoise": "#afeeee",
        "palevioletred": "#d87093",
        "papayawhip": "#ffefd5",
        "peachpuff": "#ffdab9",
        "peru": "#cd853f",
        "pink": "#ffc0cb",
        "plum": "#dda0dd",
        "powderblue": "#b0e0e6",
        "purple": "#800080",
        "rebeccapurple": "#663399",
        "red": "#ff0000",
        "rosybrown": "#bc8f8f",
        "royalblue": "#4169e1",
        "saddlebrown": "#8b4513",
        "salmon": "#fa8072",
        "sandybrown": "#f4a460",
        "seagreen": "#2e8b57",
        "seashell": "#fff5ee",
        "sienna": "#a0522d",
        "silver": "#c0c0c0",
        "skyblue": "#87ceeb",
        "slateblue": "#6a5acd",
        "slategray": "#708090",
        "snow": "#fffafa",
        "springgreen": "#00ff7f",
        "steelblue": "#4682b4",
        "tan": "#d2b48c",
        "teal": "#008080",
        "thistle": "#d8bfd8",
        "tomato": "#ff6347",
        "turquoise": "#40e0d0",
        "violet": "#ee82ee",
        "wheat": "#f5deb3",
        "white": "#ffffff",
        "whitesmoke": "#f5f5f5",
        "yellow": "#ffff00",
        "yellowgreen": "#9acd32"
    };

    if (typeof colours[colour.toLowerCase()] != 'undefined')
        return colours[colour.toLowerCase()];

    return false;
}

function purify(input) {
    input = input.map(function(item) {
        return colourNameToHex(item);
    });
    return input;
}
let num = 0;
let flag = false;
do {
    num = parseInt(prompt("Enter total number of players(2-8)"), 10);
    if (typeof num === "number") {
        if (num > 8 || num < 2) {
            flag = true;
        } else {
            flag = false;
        }
    }
    if (typeof num !== "number" || num !== num || flag) {
        alert("Invalid input->There can be between 2-8 players only(Both inclusive)");
    }
}
while (typeof num !== "number" || num !== num || flag);
let names = [];
let colors = ["blue", "yellow", "red", "green", "orange", "purple", "brown", "pink"];
colors = purify(colors);
let BANNED_COLS = ["black", "white"];
BANNED_COLS = purify(BANNED_COLS);

function isValidColor(arg_color) {
    if (BANNED_COLS.includes(arg_color) || colors.includes(arg_color)) {
        return false;
    }
    return true;
}
colors = colors.filter((item) => {
    return colors.indexOf(item) < num;
});
for (let k = 0; k < colors.length; ++k) {
    let cont = document.createElement("DIV");
    cont.style.width = "23%";
    cont.style.border = "4px red solid";
    cont.id = k + " main";
    cont.class = "container";
    let name = document.createElement("input");
    name.id = k + " name";
    name.type = "text";
    name.value = "Player " + (k + 1);
    name.style.margin = "5px";
    name.addEventListener("change", (e) => {
        let text = e.target.value;
        let uid = parseInt(e.target.id);
        if (!names.includes(text) && text !== '') {
            names[uid] = text;
        } else if (text !== '') {
            alert("Repeat names are not allowed as it may cause confusion for the players.");
            e.target.value = ""; //clearing out the text fields with invalid content  
        }
    });
    cont.appendChild(name);
    let breaker = document.createElement("BR");
    cont.appendChild(breaker);
    let lab = document.createElement("LABEL");
    lab.textContent = "SELECT COLOR";
    lab.style.background = colors[k];
    lab.style.margin = "5px";
    cont.appendChild(lab);
    let colsel = document.createElement("input");
    colsel.id = "" + k;
    colsel.style.margin = "5px";
    colsel.type = "color";
    colsel.value = colors[k];
    colsel.addEventListener("change", (e) => {
        let sel = e.target;
        let cl = e.target.value;
        let index = parseInt(sel.id, 10);
        if (isValidColor(cl)) {
            lab.style.background = sel.value;
            colors[index] = sel.value;
        } else {
            alert("Oops! Looks like that color can't be used.\nTry Another one!");
            sel.value = colors[index];
            lab.style.background = colors[index];
        }
    });
    cont.appendChild(colsel);
    let parent = document.getElementById("main_holderA");
    parent.appendChild(cont);
}
let sub = document.createElement("BUTTON");
sub.type = "button";
sub.style.margin = "20px";
sub.id = "ok";
sub.textContent = "Confirm Selection";
let parent = document.getElementById("main_holderA");
parent.appendChild(sub);

function clearOut(event) {
    let k = 0;
    names = [];
    for (; k < colors.length; ++k) {
        let elem = document.getElementById(k + " name");
        elem.value = (elem.value != '') ? elem.value : "Player " + (1 + k);
        names.push(elem.value);
    }
    document.querySelector("body").innerHTML = '';
    //shit goes down from this point
    let game = new ChainUnit(10, 10, colors, names);
    game.initiateSetup();
    //till here, i think
}
sub.addEventListener("click", clearOut);