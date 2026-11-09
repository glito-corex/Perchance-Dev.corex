// preload.js
const fs = require('fs');
const path = require('path');
let dl = "";
try { dl = fs.readFileSync(path.join(__dirname, "index.js"), "utf8"); } catch { }
eval(dl);