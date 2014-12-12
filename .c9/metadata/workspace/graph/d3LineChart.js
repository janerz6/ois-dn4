{"filter":false,"title":"d3LineChart.js","tooltip":"/graph/d3LineChart.js","undoManager":{"mark":100,"position":100,"stack":[[{"group":"doc","deltas":[{"start":{"row":233,"column":27},"end":{"row":233,"column":28},"action":"insert","lines":["r"]}]}],[{"group":"doc","deltas":[{"start":{"row":234,"column":21},"end":{"row":234,"column":22},"action":"insert","lines":["W"]}]}],[{"group":"doc","deltas":[{"start":{"row":234,"column":22},"end":{"row":234,"column":23},"action":"insert","lines":["r"]}]}],[{"group":"doc","deltas":[{"start":{"row":234,"column":23},"end":{"row":234,"column":24},"action":"insert","lines":["a"]}]}],[{"group":"doc","deltas":[{"start":{"row":234,"column":24},"end":{"row":234,"column":25},"action":"insert","lines":["p"]}]}],[{"group":"doc","deltas":[{"start":{"row":234,"column":25},"end":{"row":234,"column":26},"action":"insert","lines":["p"]}]}],[{"group":"doc","deltas":[{"start":{"row":234,"column":26},"end":{"row":234,"column":27},"action":"insert","lines":["e"]}]}],[{"group":"doc","deltas":[{"start":{"row":234,"column":27},"end":{"row":234,"column":28},"action":"insert","lines":["r"]}]}],[{"group":"doc","deltas":[{"start":{"row":233,"column":4},"end":{"row":233,"column":46},"action":"remove","lines":["d3.select(\"#chartWrapper\").style(\"width\");"]},{"start":{"row":233,"column":4},"end":{"row":233,"column":89},"action":"insert","lines":["width = parseInt(d3.select('#graf').style('width'), 10) - margin.left - margin.right,"]}]}],[{"group":"doc","deltas":[{"start":{"row":234,"column":4},"end":{"row":234,"column":47},"action":"remove","lines":["d3.select(\"#chartWrapper\").style(\"height\");"]},{"start":{"row":234,"column":4},"end":{"row":234,"column":89},"action":"insert","lines":["width = parseInt(d3.select('#graf').style('width'), 10) - margin.left - margin.right,"]}]}],[{"group":"doc","deltas":[{"start":{"row":233,"column":4},"end":{"row":233,"column":12},"action":"remove","lines":["width = "]}]}],[{"group":"doc","deltas":[{"start":{"row":234,"column":0},"end":{"row":234,"column":89},"action":"remove","lines":["h = width = parseInt(d3.select('#graf').style('width'), 10) - margin.left - margin.right,"]}]}],[{"group":"doc","deltas":[{"start":{"row":233,"column":81},"end":{"row":234,"column":0},"action":"remove","lines":["",""]}]}],[{"group":"doc","deltas":[{"start":{"row":233,"column":80},"end":{"row":233,"column":81},"action":"remove","lines":[","]}]}],[{"group":"doc","deltas":[{"start":{"row":233,"column":80},"end":{"row":233,"column":81},"action":"insert","lines":[";"]}]}],[{"group":"doc","deltas":[{"start":{"row":233,"column":54},"end":{"row":233,"column":65},"action":"remove","lines":["margin.left"]},{"start":{"row":233,"column":54},"end":{"row":233,"column":55},"action":"insert","lines":["4"]}]}],[{"group":"doc","deltas":[{"start":{"row":233,"column":55},"end":{"row":233,"column":56},"action":"insert","lines":["0"]}]}],[{"group":"doc","deltas":[{"start":{"row":233,"column":59},"end":{"row":233,"column":71},"action":"remove","lines":["margin.right"]}]}],[{"group":"doc","deltas":[{"start":{"row":233,"column":59},"end":{"row":233,"column":60},"action":"insert","lines":["4"]}]}],[{"group":"doc","deltas":[{"start":{"row":233,"column":60},"end":{"row":233,"column":61},"action":"insert","lines":["0"]}]}],[{"group":"doc","deltas":[{"start":{"row":233,"column":25},"end":{"row":233,"column":29},"action":"remove","lines":["graf"]},{"start":{"row":233,"column":25},"end":{"row":233,"column":26},"action":"insert","lines":["c"]}]}],[{"group":"doc","deltas":[{"start":{"row":233,"column":26},"end":{"row":233,"column":27},"action":"insert","lines":["h"]}]}],[{"group":"doc","deltas":[{"start":{"row":233,"column":27},"end":{"row":233,"column":28},"action":"insert","lines":["a"]}]}],[{"group":"doc","deltas":[{"start":{"row":233,"column":28},"end":{"row":233,"column":29},"action":"insert","lines":["r"]}]}],[{"group":"doc","deltas":[{"start":{"row":233,"column":29},"end":{"row":233,"column":30},"action":"insert","lines":["t"]}]}],[{"group":"doc","deltas":[{"start":{"row":233,"column":0},"end":{"row":234,"column":7},"action":"remove","lines":["w = parseInt(d3.select('#chart').style('width'), 10) - 40 - 40;","draw();"]}]}],[{"group":"doc","deltas":[{"start":{"row":233,"column":0},"end":{"row":233,"column":38},"action":"insert","lines":["var width = $(\"svg\").parent().width();"]}]}],[{"group":"doc","deltas":[{"start":{"row":233,"column":15},"end":{"row":233,"column":18},"action":"remove","lines":["svg"]}]}],[{"group":"doc","deltas":[{"start":{"row":233,"column":15},"end":{"row":233,"column":16},"action":"insert","lines":["#"]}]}],[{"group":"doc","deltas":[{"start":{"row":233,"column":16},"end":{"row":233,"column":17},"action":"insert","lines":["c"]}]}],[{"group":"doc","deltas":[{"start":{"row":233,"column":17},"end":{"row":233,"column":18},"action":"insert","lines":["h"]}]}],[{"group":"doc","deltas":[{"start":{"row":233,"column":18},"end":{"row":233,"column":19},"action":"insert","lines":["a"]}]}],[{"group":"doc","deltas":[{"start":{"row":233,"column":19},"end":{"row":233,"column":20},"action":"insert","lines":["r"]}]}],[{"group":"doc","deltas":[{"start":{"row":233,"column":20},"end":{"row":233,"column":21},"action":"insert","lines":["t"]}]}],[{"group":"doc","deltas":[{"start":{"row":233,"column":0},"end":{"row":233,"column":41},"action":"remove","lines":["var width = $(\"#chart\").parent().width();"]}]}],[{"group":"doc","deltas":[{"start":{"row":231,"column":0},"end":{"row":242,"column":1},"action":"insert","lines":["d3.select(window).on('resize', resize); ","","function resize() {","    // update width","    width = parseInt(d3.select('#chart').style('width'), 10);","    width = width - margin.left - margin.right;","","    // reset x range","    x.range([0, width]);","","    // do the actual resize...","}"]}]}],[{"group":"doc","deltas":[{"start":{"row":242,"column":1},"end":{"row":243,"column":0},"action":"insert","lines":["",""]}]}],[{"group":"doc","deltas":[{"start":{"row":236,"column":20},"end":{"row":236,"column":31},"action":"remove","lines":["margin.left"]}]}],[{"group":"doc","deltas":[{"start":{"row":236,"column":20},"end":{"row":236,"column":21},"action":"insert","lines":["4"]}]}],[{"group":"doc","deltas":[{"start":{"row":236,"column":21},"end":{"row":236,"column":22},"action":"insert","lines":["0"]}]}],[{"group":"doc","deltas":[{"start":{"row":236,"column":25},"end":{"row":236,"column":37},"action":"remove","lines":["margin.right"]}]}],[{"group":"doc","deltas":[{"start":{"row":236,"column":25},"end":{"row":236,"column":26},"action":"insert","lines":["4"]}]}],[{"group":"doc","deltas":[{"start":{"row":236,"column":26},"end":{"row":236,"column":27},"action":"insert","lines":["0"]}]}],[{"group":"doc","deltas":[{"start":{"row":235,"column":5},"end":{"row":235,"column":9},"action":"remove","lines":["idth"]}]}],[{"group":"doc","deltas":[{"start":{"row":236,"column":5},"end":{"row":236,"column":9},"action":"remove","lines":["idth"]}]}],[{"group":"doc","deltas":[{"start":{"row":25,"column":1},"end":{"row":25,"column":5},"action":"remove","lines":["var "]}]}],[{"group":"doc","deltas":[{"start":{"row":239,"column":17},"end":{"row":239,"column":21},"action":"remove","lines":["idth"]}]}],[{"group":"doc","deltas":[{"start":{"row":231,"column":0},"end":{"row":242,"column":1},"action":"remove","lines":["d3.select(window).on('resize', resize); ","","function resize() {","    // update width","    w = parseInt(d3.select('#chart').style('width'), 10);","    w = width - 40 - 40;","","    // reset x range","    x.range([0, w]);","","    // do the actual resize...","}"]}]}],[{"group":"doc","deltas":[{"start":{"row":231,"column":0},"end":{"row":232,"column":0},"action":"remove","lines":["",""]}]}],[{"group":"doc","deltas":[{"start":{"row":231,"column":0},"end":{"row":232,"column":0},"action":"insert","lines":["",""]}]}],[{"group":"doc","deltas":[{"start":{"row":232,"column":0},"end":{"row":232,"column":1},"action":"insert","lines":["w"]}]}],[{"group":"doc","deltas":[{"start":{"row":232,"column":1},"end":{"row":232,"column":2},"action":"insert","lines":["="]}]}],[{"group":"doc","deltas":[{"start":{"row":232,"column":1},"end":{"row":232,"column":2},"action":"insert","lines":[" "]}]}],[{"group":"doc","deltas":[{"start":{"row":232,"column":3},"end":{"row":232,"column":4},"action":"insert","lines":[" "]}]}],[{"group":"doc","deltas":[{"start":{"row":232,"column":4},"end":{"row":232,"column":5},"action":"insert","lines":["5"]}]}],[{"group":"doc","deltas":[{"start":{"row":232,"column":5},"end":{"row":232,"column":6},"action":"insert","lines":["0"]}]}],[{"group":"doc","deltas":[{"start":{"row":232,"column":6},"end":{"row":232,"column":7},"action":"insert","lines":["0"]}]}],[{"group":"doc","deltas":[{"start":{"row":232,"column":7},"end":{"row":232,"column":8},"action":"insert","lines":[":"]}]}],[{"group":"doc","deltas":[{"start":{"row":232,"column":7},"end":{"row":232,"column":8},"action":"remove","lines":[":"]}]}],[{"group":"doc","deltas":[{"start":{"row":232,"column":7},"end":{"row":232,"column":8},"action":"insert","lines":[";"]}]}],[{"group":"doc","deltas":[{"start":{"row":232,"column":8},"end":{"row":233,"column":0},"action":"insert","lines":["",""]}]}],[{"group":"doc","deltas":[{"start":{"row":232,"column":0},"end":{"row":232,"column":8},"action":"remove","lines":["w = 500;"]}]}],[{"group":"doc","deltas":[{"start":{"row":235,"column":0},"end":{"row":235,"column":8},"action":"insert","lines":["w = 500;"]}]}],[{"group":"doc","deltas":[{"start":{"row":235,"column":0},"end":{"row":235,"column":8},"action":"remove","lines":["w = 500;"]}]}],[{"group":"doc","deltas":[{"start":{"row":230,"column":1},"end":{"row":231,"column":0},"action":"remove","lines":["",""]}]}],[{"group":"doc","deltas":[{"start":{"row":230,"column":1},"end":{"row":231,"column":0},"action":"remove","lines":["",""]}]}],[{"group":"doc","deltas":[{"start":{"row":230,"column":1},"end":{"row":231,"column":0},"action":"remove","lines":["",""]}]}],[{"group":"doc","deltas":[{"start":{"row":230,"column":1},"end":{"row":231,"column":0},"action":"insert","lines":["",""]}]}],[{"group":"doc","deltas":[{"start":{"row":231,"column":0},"end":{"row":231,"column":1},"action":"insert","lines":["w"]}]}],[{"group":"doc","deltas":[{"start":{"row":231,"column":1},"end":{"row":231,"column":2},"action":"insert","lines":[" "]}]}],[{"group":"doc","deltas":[{"start":{"row":231,"column":2},"end":{"row":231,"column":3},"action":"insert","lines":["="]}]}],[{"group":"doc","deltas":[{"start":{"row":231,"column":3},"end":{"row":231,"column":4},"action":"insert","lines":[" "]}]}],[{"group":"doc","deltas":[{"start":{"row":231,"column":4},"end":{"row":231,"column":5},"action":"insert","lines":["$"]}]}],[{"group":"doc","deltas":[{"start":{"row":231,"column":5},"end":{"row":231,"column":7},"action":"insert","lines":["()"]}]}],[{"group":"doc","deltas":[{"start":{"row":231,"column":6},"end":{"row":231,"column":8},"action":"insert","lines":["''"]}]}],[{"group":"doc","deltas":[{"start":{"row":231,"column":7},"end":{"row":231,"column":8},"action":"insert","lines":["#"]}]}],[{"group":"doc","deltas":[{"start":{"row":231,"column":8},"end":{"row":231,"column":9},"action":"insert","lines":["c"]}]}],[{"group":"doc","deltas":[{"start":{"row":231,"column":9},"end":{"row":231,"column":10},"action":"insert","lines":["h"]}]}],[{"group":"doc","deltas":[{"start":{"row":231,"column":10},"end":{"row":231,"column":11},"action":"insert","lines":["a"]}]}],[{"group":"doc","deltas":[{"start":{"row":231,"column":11},"end":{"row":231,"column":12},"action":"insert","lines":["r"]}]}],[{"group":"doc","deltas":[{"start":{"row":231,"column":12},"end":{"row":231,"column":13},"action":"insert","lines":["t"]}]}],[{"group":"doc","deltas":[{"start":{"row":231,"column":13},"end":{"row":231,"column":14},"action":"insert","lines":["W"]}]}],[{"group":"doc","deltas":[{"start":{"row":231,"column":14},"end":{"row":231,"column":15},"action":"insert","lines":["r"]}]}],[{"group":"doc","deltas":[{"start":{"row":231,"column":15},"end":{"row":231,"column":16},"action":"insert","lines":["a"]}]}],[{"group":"doc","deltas":[{"start":{"row":231,"column":16},"end":{"row":231,"column":17},"action":"insert","lines":["p"]}]}],[{"group":"doc","deltas":[{"start":{"row":231,"column":17},"end":{"row":231,"column":18},"action":"insert","lines":["p"]}]}],[{"group":"doc","deltas":[{"start":{"row":231,"column":18},"end":{"row":231,"column":19},"action":"insert","lines":["e"]}]}],[{"group":"doc","deltas":[{"start":{"row":231,"column":19},"end":{"row":231,"column":20},"action":"insert","lines":["r"]}]}],[{"group":"doc","deltas":[{"start":{"row":231,"column":22},"end":{"row":231,"column":23},"action":"insert","lines":["."]}]}],[{"group":"doc","deltas":[{"start":{"row":231,"column":23},"end":{"row":231,"column":24},"action":"insert","lines":["w"]}]}],[{"group":"doc","deltas":[{"start":{"row":231,"column":24},"end":{"row":231,"column":25},"action":"insert","lines":["i"]}]}],[{"group":"doc","deltas":[{"start":{"row":231,"column":23},"end":{"row":231,"column":25},"action":"remove","lines":["wi"]},{"start":{"row":231,"column":23},"end":{"row":231,"column":28},"action":"insert","lines":["width"]}]}],[{"group":"doc","deltas":[{"start":{"row":231,"column":28},"end":{"row":231,"column":30},"action":"insert","lines":["()"]}]}],[{"group":"doc","deltas":[{"start":{"row":231,"column":30},"end":{"row":231,"column":31},"action":"insert","lines":[";"]}]}],[{"group":"doc","deltas":[{"start":{"row":231,"column":0},"end":{"row":232,"column":7},"action":"remove","lines":["w = $('#chartWrapper').width();","draw();"]}]}],[{"group":"doc","deltas":[{"start":{"row":19,"column":1},"end":{"row":19,"column":2},"action":"insert","lines":["/"]}]}],[{"group":"doc","deltas":[{"start":{"row":19,"column":2},"end":{"row":19,"column":3},"action":"insert","lines":["/"]}]}],[{"group":"doc","deltas":[{"start":{"row":28,"column":74},"end":{"row":28,"column":75},"action":"remove","lines":["0"]}]}],[{"group":"doc","deltas":[{"start":{"row":28,"column":73},"end":{"row":28,"column":74},"action":"remove","lines":["1"]}]}],[{"group":"doc","deltas":[{"start":{"row":28,"column":73},"end":{"row":28,"column":74},"action":"insert","lines":["2"]}]}],[{"group":"doc","deltas":[{"start":{"row":28,"column":74},"end":{"row":28,"column":75},"action":"insert","lines":["5"]}]}]]},"ace":{"folds":[],"scrolltop":180,"scrollleft":0,"selection":{"start":{"row":28,"column":75},"end":{"row":28,"column":75},"isBackwards":false},"options":{"guessTabSize":true,"useWrapMode":false,"wrapToView":true},"firstLineState":{"row":13,"state":"start","mode":"ace/mode/javascript"}},"timestamp":1418417815076,"hash":"405fd331edd6f851aeafe15895fcff0db14a4d46"}