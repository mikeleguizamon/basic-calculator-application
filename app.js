const botonNumeros = document.getElementsByName('data-number');
const botonOpera = document.getElementsByName('data-opera');
const botonIqual = document.getElementsByName('data-iqual')[0];
const botonDelete = document.getElementsByName('data-delete')[0];
const botonCancel = document.getElementsByName('data-cancel')[0];
const botonDecimal = document.getElementsByName('data-decimal')[0];
const botonPercent = document.getElementsByName('data-percent')[0];
var result = document.getElementById('result');
var opeActual = '';
var opeAnterior = '';
var operacion = undefined;

botonNumeros.forEach(function(boton){
  boton.addEventListener('click', function(){
    agregarNumero(boton.innerText);
  })
});

botonOpera.forEach(function(boton){
  boton.addEventListener('click', function(){
    selectOperacion(boton.innerText);
  })
});

botonDecimal.addEventListener('click', function(){
  decimal();
  actualizarDisplay();
});

botonPercent.addEventListener('click', function(){
  calcularPorcentaje();
  actualizarDisplay();
});

botonIqual.addEventListener('click', function(){
  calcular();
  actualizarDisplay();
});

botonCancel.addEventListener('click', function(){
  clear();
  actualizarDisplay();
});

botonDelete.addEventListener('click', function(){
  borrarUnDigito();
  actualizarDisplay();
});

function selectOperacion(op){
  if (opeActual === '') return;
  if (!opeAnterior.includes(operacion)){
    calcular();
  }
  operacion = op.toString();
  opeAnterior = opeActual;
  opeActual = '';
}

function calcular(){
  var calculo;
  const anterior = parseFloat(opeAnterior);
  const actual = parseFloat(opeActual);
  if (isNaN(anterior) || isNaN(actual)) return;
  switch (operacion) {
    case '+':
      calculo = anterior + actual;
      break;
    case '-':
      calculo = anterior - actual;
      break;
    case 'x':
      calculo = anterior * actual;
      break;
    case '*':
      calculo = anterior * actual;
      break;
    case '/':
      calculo = anterior / actual;
      break;
    default:
      return;
  }
  opeActual = calculo;
  operacion = undefined;
  opeAnterior = '';
}

function agregarNumero(num){
  opeActual = opeActual.toString() + num.toString();
  actualizarDisplay();
}

function decimal(){
  if (!opeActual.includes('.')) {
    opeActual += '.';
  }
}

function calcularPorcentaje(){
  const numero = parseFloat(opeActual);
  if (isNaN(numero)) return;
  opeActual = opeAnterior * numero / 100;
}

function borrarUnDigito(){
  if (opeActual.length > 0) {
    opeActual = opeActual.slice(0, -1);
  }
}

function clear(){
  opeActual = '';
  opAnterior = '';
  operacion = undefined;
}

function actualizarDisplay() {
  // Verificamos si hay un resultado anterior y una operación definida
  if (opeAnterior !== '' && operacion !== undefined && opeActual !== '') {
    // Concatenamos el signo igual al resultado antes de mostrarlo en el elemento HTML
    result.value = opeAnterior + operacion + opeActual;
  } else {
    // Si no hay un resultado anterior o una operación definida, mostramos solo el número actual
    result.value = opeActual;
  }
}

clear();

// Event listener para teclas numéricas
document.addEventListener('keydown', function(event) {
  const teclaPresionada = event.key;
  // Verifica si la tecla presionada es un número del 0 al 9
  if (teclaPresionada >= '0' && teclaPresionada <= '9') {
    agregarNumero(teclaPresionada);
    // actualizarDisplay();
  }
  // Verifica si la tecla presionada es el punto decimal
  else if (teclaPresionada === '.' || teclaPresionada === ',') {
    decimal();
    actualizarDisplay();
  }
  // Verifica si la tecla presionada es una tecla de operación
  else if (teclaPresionada === '+' || teclaPresionada === '-' || teclaPresionada === '*' || teclaPresionada === '/') {
    selectOperacion(teclaPresionada);
  }
  // Verifica si la tecla presionada es la tecla Enter (igual)
  else if (teclaPresionada === 'Enter' || teclaPresionada === 'Intro') {
    calcular();
    actualizarDisplay();
  }
  // Verifica si la tecla presionada es la tecla Escape (borrar todo)
  else if (teclaPresionada === 'Escape') {
    clear();
    actualizarDisplay();
  }
  // Verifica si la tecla presionada es la tecla Backspace (borrar un dígito)
  else if (teclaPresionada === 'Backspace') {
    borrarUnDigito();
    actualizarDisplay();
  }
});
