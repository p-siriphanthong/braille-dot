# Braille Dot

This project use data from [zeroclickinfo-goodies](https://github.com/duckduckgo/zeroclickinfo-goodies/blob/master/share/goodie/cheat_sheets/json/english-braille.json).

## Available Scripts

In the root directory, you can run:

### `npm run dev`

Runs both client and sever side in developer mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view the client side in the browser.<br>
Open [http://localhost:5000](http://localhost:5000) to view the server side in the browser.

### `npm run client`

Runs only client side in developer mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view the client side in the browser.


### `npm run server`

Runs only client side in developer mode.<br>
Open [http://localhost:5000](http://localhost:5000) to view the server side in the browser.

## Braille Dot API

### /api/braille/list

This API to list all braille.

```javascript
[
  { 
    character: "a",
    braille: "100000"   // ⠁
  },
  { 
    character: "b",
    braille: "110000"   // ⠃
  },
  { 
    character: "c",
    braille: "100100"   // ⠉
  },
  ...,
  { 
    character: "z",
    braille: "101011"   // ⠵
  }
]
```

### /api/braille/word/random

This API to random a word in length 1-5 and get its braille.

```javascript
{
  word: "random",
  brailes: [
    "111010",   // r: ⠗
    "100000",   // a: ⠁	
    "101110",   // n: ⠝
    "100110",   // d: ⠙
    "101010",   // o: ⠕
    "101100"    // m: ⠍
  ]
}
```
