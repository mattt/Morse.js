# Morse.js
## A jQuery Plugin that annotates text with Morse Code

Samuel F. B. Morse created a code for the electric telegraph in the early 1840s that allowed alphanumeric characters to be encoded into a sequence of short and long tones. It is still widely used among radio operators as a means of identifying themselves, as well as communicating messages over a channel too narrow or noisy for speech transmission.[<sup>1</sup>](http://en.wikipedia.org/wiki/Morse_code)

This plugin will transcribe the morse code for text in the selected elements. In browsers that support the [`<ruby>` HTML element](http://www.w3.org/TR/1998/WD-ruby-19981221/), the transcription will appear above the text. By default, clicking on these elements will play the corresponding audio for the transcription.

## Demo

Bleeps and bloops speak louder than words:

Try it out at: [http://mattt.github.com/Morse.js/](http://mattt.github.com/Morse.js/ "Try out Morse.js!")

*Note:* Requires browser with support for HTML5 `<audio>`, such as [Safari 4](http://www.apple.com/safari/download/), [Firefox 3.5](http://www.mozilla.com/firefox/), or [Chrome](http://www.google.com/chrome/)

## Usage

``` javascript
$("p").morseCode({bpm:12});
```

- `bpm` rate at which the message is played (default: 12, or 1 unit = 100ms)

In addition, there are two namespaced events that you can `trigger` and `bind` to:

- `morse.emit` will generate and play the tones for morse code elements
- `morse.mute` will stop morse code tone sounds from `<audio>` elements

## Requirements

- jQuery 1.4+

## Credit

Javascript client-side WAV generation based on code by sk89q
See [http://sk89q.therisenrealm.com/](http://sk89q.therisenrealm.com/) for more info.

Thanks to [Justin Slepak](https://github.com/jrslepak) for adding support for punctuation characters.

## Contact

Mattt Thompson

- http://github.com/mattt
- http://twitter.com/mattt
- m@mattt.me

## License

Morse.js is available under the MIT license. See the LICENSE file for more info.
