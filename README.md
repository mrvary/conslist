# Writing a tiny Scheme parser in Javascript

If you start your computer science degree at the University of Applied Sciences in Würzburg, one of the first lectures you’ll attend is an algorithms class, which is closely modelled after the infamous [Structure and Interpretation of Computer Programms](https://sarabander.github.io/sicp/). <br>
I already got my feet wet with javascript programming and liked its roots in functional programming. No wonder I felt inclined to learn Scheme, the language it was [heavily inspired by](http://speakingjs.com/es5/ch04.html). <br>
Completing the course was truly a fun and enlightening experience and one year later I applied to be a teaching assistant for this exact lecture. I wanted to share the insights and fun I had and help those who missed their ```Java.wayOfCoding()```.

## ... but why?

One of the basic buildung blocks .. pairs .. datastructures .. 

Things that look like this and that. 

My students had to know how to assemble those complex data structures by using ```cons``` and ```list```. as it is also tested in their computer exams. So e.g if you want to build something like Fig. A, you could do it via ```(cons 1 (cons 2 (cons (cons 3 4) 5)))```. If you then want to evaluate it in the REPL, you only get ```'(1 2 (3 . 4) . 5)``` back. Good look figuring out, if you made any mistakes .. 

To help with that, I built a tiny online tool that parses your code and displays what you’ve tried to build. Everything happens in the Browser, so it’s a frontend only application.

## Parse all the data - part 1

Basically there are only two things to do here: first parse Scheme code into a suitable representation and then put that through some kind of drawing logic. <br>

I decided to directly map Scheme pairs to Javascript arrays, so ```(cons 1 2)``` would becomee ```[1, 2]```, something like ```(cons 1 (cons 2 3))``` turns into ```[1, [2, 3]]``` and ```nil``` is represented by ```[]```. My drawing logic could then recursively traverse the arrays, check the current element and draw a number or pair respectively.

The first approach was pretty much the hackiest solution I could come up with, but it oh well, simply replacing ```(cons``` with ```[```, ```)``` with ```]``` and finally passing the String into Javascripts ```eval()``` function did the trick...

## Draw stuff

Although everything could have been done via the canvas API, I went with [p5js](https://p5js.org/), a port of [Processing](https://processing.org/) to JavaScript. I enjoyed using it before and I wanted to get things done rather quickly.

Most of the drawing logic is rather trivial, so I won't go into any details. In ```pair.js``` I created a pair abstraction that encapsulates the position and content of each pair and provides basic drawing functionality.

## Parse all the data - part 2

Replacing tokens in a string felt pretty hacky, there’s no denying it. Also I was attending a course on (programming theory?) and learning about grammars and state machines. As there is pretty much a Javascript library for everything I started looking if I could pimp my parsing logic and stumbled upon [PEG.js - a Parser Generator for JavaScript](https://pegjs.org/). 

You can try out everything online, so I build a context free grammar for this tiny part of scheme that I needed. It looks like this:

```Javascript
Term
  = _ "(" _ "cons" _ car:Argument _ cdr:Argument _ ")" _
      { return [car, cdr] }
  / "(" _ "list" arguments: ( _ Argument )+ ")"
      {
      let values = [];

      arguments.forEach(function (el) {
          values.push(el[1]);
      });

      let f = function(array) {
          if (array.length === 1) {
              return [array[0],[]];
          } else {
              return [array[0], f(array.slice(1))]
          }
      }

      return f(values);
    }

Argument
  = Term
  / Integer
  / Nil

Nil "nil"
  = "nil" { return [] }
  / "'()" { return [] }

Integer "integer"
  = [0-9]+ { return parseInt(text(), 10); }

_ "whitespace"
  = [ \t\n\r]*
```

The great thing about peg.js is, that you can specify what each token is supposed to return and also it has decent/helpful Error messages.

