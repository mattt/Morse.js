# Morse.js
## A jQuery Plugin that annotates text with Morse Code

Samuel F. B. Morse created a code for the electric telegraph in the early 1840s that allowed alphanumeric characters to be encoded into a sequence of short and long tones. It is still widely used among radio operators as a means of identifying themselves, as well as communicating messages over a channel too narrow or noisy for speech transmission.[<sup>1</sup>](http://en.wikipedia.org/wiki/Morse_code)

This plugin will transcribe the morse code for text in the selected elements. In browsers that support the [`<ruby>` HTML element](http://www.w3.org/TR/1998/WD-ruby-19981221/), the transcription will appear above the text. By default, clicking on these elements will play the corresponding audio for the transcription.

## Demo

Bleeps and bloops speak louder than words:

Try it out at: [http://mattt.github.com/Morse.js/](http://mattt.github.com/Morse.js/ "Try out Morse.js!")  
*Note:* Requires browser with support for HTML5 `<audio>`, such as [Safari 4](http://www.apple.com/safari/download/), [Firefox 3.5](http://www.mozilla.com/firefox/), or [Chrome](http://www.google.com/chrome/)

## Usage

    $("p").morseCode({bpm:12});

- `bpm` rate at which the message is played (default: 12, or 1 unit = 100ms)

In addition, there are two namespaced events that you can `trigger` and `bind` to:

- `morse.emit` will generate and play the tones for morse code elements
- `morse.mute` will stop morse code tone sounds from `<audio>` elements

## Requirements

- jQuery 1.4+

## License

Morse.js is licensed under the MIT License:

  Copyright (c) 2010 Mattt Thompson (http://mattt.me/)

  Permission is hereby granted, free of charge, to any person obtaining a copy
  of this software and associated documentation files (the "Software"), to deal
  in the Software without restriction, including without limitation the rights
  to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
  copies of the Software, and to permit persons to whom the Software is
  furnished to do so, subject to the following conditions:

  The above copyright notice and this permission notice shall be included in
  all copies or substantial portions of the Software.

  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
  AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
  OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
  THE SOFTWARE.

## Credit

Javascript client-side WAV generation based on code by sk89q
See [http://sk89q.therisenrealm.com/](http://sk89q.therisenrealm.com/) for more info