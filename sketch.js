let input; 
let button;
let validationMessage;
let parser;
let textArea;

const BOX_SIZE = 25;

function setup() {
  createCanvas(1000, 700);

  textArea = createElement("textarea", "");
  textArea.position(20, 65);
  textArea.size(400, 200);
  textArea.value(`(cons (cons (cons nil
                  (cons 6
                        (cons 1
                              (cons 0
                                    (cons 2 4)))))
            (cons 3 3))
      (cons 10
            (cons 7
                  (cons 8
                        (cons 9
                              (cons 3
                                    nil))))))`);

  button = createButton('submit');
  // button.position(input.x + input.width, 65);
  button.position(textArea.x + textArea.width, 65);
  button.mousePressed(parseInput);

  validationMessage = createP('');
  validationMessage.position(textArea.x, textArea.y + 40);

  // (cons (cons 9 (cons (cons (cons 7 (cons 5 (cons 1 nil))) 5) (cons 3 7))) (cons 8 (cons 1 (cons 4 (cons 2 nil)))))
  createRandomBackground(6);
}

function parseInput() {
  background(255);

  // let text = input.value();
  let text = textArea.value();
  let grammarResult = parseWithGrammar(text);
  
  const result = new Pair(button.x + 100, button.y, grammarResult);
  result.draw();
}

function parseWithGrammar(text) {
  return SCHEME.parse(text);
}

function validateInput(t) {
  // in case of no matches, return an empty array
  const openParens = t.match(/\(/g) || [];
  const closedParens = t.match(/\)/g) || [];

  push();
  fill(255,0,0);
  validationMessage.style("font-family", "courier");
  validationMessage.style("color", "red");
  
  if (openParens.length > closedParens.length) {
    validationMessage.html("missing closing parenthesis!");
    textArea.style("background", "pink");
  } else if (closedParens.length > openParens.length) {
    validationMessage.html("missing opening parenthesis!");
    textArea.style("background", "pink");
  } else {
    validationMessage.html("");
    textArea.style("background", "white");
  }
  pop();
}

function createRandomBackground(elements) {
    for (let i = 0; i < elements; i++) {
      const test3 = new Pair(
        random(width), 
        random(height), 
        [floor(random(100)), floor(random(10))]);
      test3.draw();

      const test4 = new Pair(
        random(width), 
        random(height), 
        [floor(random(100)), []]);
      test4.draw();
    }
}

