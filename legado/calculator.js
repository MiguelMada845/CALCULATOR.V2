var memoria = 0;
var ultimo_operador = null;
var historial = [];
var buffer = "0";


const MAX_HISTORY_ITEMS = 5;


const OPERATIONS = {
    "+": (a, b) => a + b,
    "-": (a, b) => a - b,
    "*": (a, b) => a * b,
    "/": (a, b) => a / b
};


function logHistory(logEntry) {
    historial.push(logEntry);
    if (historial.length > MAX_HISTORY_ITEMS) {
        historial.shift();
    }
    console.log(historial); 
}


function flushOperation(intBuffer) {
    if (OPERATIONS[ultimo_operador]) {
        memoria = OPERATIONS[ultimo_operador](memoria, intBuffer);
    }
}


function handleNumber(value) {
    if (buffer === "0") {
        buffer = value;
    } else {
        buffer += value;
    }
}


function handleMath(symbol) {
  if (buffer === '0' && memoria === 0) return;

  const intBuffer = parseInt(buffer);

  if (ultimo_operador === null) {
    
    memoria = intBuffer;
  } else {
    
    const memoriaPrevia = memoria;
    const operacionPrevia = ultimo_operador;

    
    flushOperation(intBuffer);

    
    const logEntry = `${memoriaPrevia} ${operacionPrevia} ${intBuffer} = ${memoria}`;
    logHistory(logEntry);
  }

  ultimo_operador = symbol;
  buffer = "0";
}




function handleSymbol(symbol) {
  switch (symbol) {
    case 'C':
      buffer = "0";
      memoria = 0;
      ultimo_operador = null;
      break;

    case '=':
      if (ultimo_operador === null) return;

      const memoriaPrevia = memoria;
      const operacionPrevia = ultimo_operador;
      const intBuffer = parseInt(buffer);

      flushOperation(intBuffer);

      
      const logEntry = `${memoriaPrevia} ${operacionPrevia} ${intBuffer} = ${memoria}`;
      logHistory(logEntry);

      buffer = "" + memoria;
      memoria = 0;
      ultimo_operador = null;
      break;

    case '+':
    case '-':
    case '*':
    case '/':
      handleMath(symbol);
      break;
  }

  updateScreen();
}



function render() {
    const display = document.getElementById("display");
    display.innerText = buffer;
}


function buttonClick(value) {
    if (isNaN(value)) {
        handleSymbol(value);
    } else {
        handleNumber(value);
    }
    render();
}


const buttons = document.querySelectorAll("button");
buttons.forEach(button => {
    button.addEventListener("click", event => {
        buttonClick(event.target.innerText);
    });
});

