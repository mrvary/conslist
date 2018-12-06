let input;
let button;
let validationMessage;
let parser;
let textArea;

const BOX_SIZE = 20;

function setup() {
  let canvas = createCanvas(700, 450);
  background(234, 123, 1, 40);

  canvas.parent("right");

  textArea = document.getElementById('code');

  button = document.getElementById('btn')
  button.onclick = parseInput;

  validationMessage = createP('');
  validationMessage.addClass('error');
  validationMessage.parent('left');

  window.onerror = function (error) {
    validationMessage.html(error);
  }

  createRandomBackground(8);
}

function parseInput() {
  validationMessage.html("");
  background(255);
  background(234, 123, 1, 40);

  let text = textArea.value;
  let grammarResult = parseWithGrammar(text);

  const result = new Pair(20, 20, grammarResult);
  result.draw();
}

function parseWithGrammar(text) {
  return SCHEME.parse(text);
}

function createRandomBackground(elements) {
  const symbols = ['∆','†','¥','π','Ω','◊','','‡','λ'];

  for (let i = 0; i < elements; i++) {
    const test3 = new Pair(
      random(width),
      random(height),
      [symbols[floor(random(symbols.length))], symbols[floor(random(symbols.length))]]);
    test3.draw();

    const test4 = new Pair(
      random(width),
      random(height),
      [symbols[floor(random(symbols.length))], []]);
    test4.draw();
  }
}