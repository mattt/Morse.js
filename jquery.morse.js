/*
 * Morse.js
 * A jQuery Plugin that annotates text with Morse Code
 * http://github.com/mattt/Morse.js
 *
 * Copyright (c) 2010-2012 Mattt Thompson
 * Licensed under the MIT licenses.
 */

(function($){
  Morse = {
    wpm: 12,
    code: {
      "a": "._",    "b": "_...",  "c": "_._.",  "d": "_..",
      "e": ".",     "f": ".._.",  "g": "__.",   "h": "....",
      "i": "..",    "j": ".___",  "k": "_._",   "l": "._..",
      "m": "__",    "n": "_.",    "o": "___",   "p": ".__.",
      "q": "__._",  "r": "._.",   "s": "...",   "t": "_",
      "u": ".._",   "v": "..._",  "w": ".__",   "x": "_.._",
      "y": "_.__",  "z": "__..",  " ": " ",

      "1": ".____", "2": "..___", "3": "...__", "4": "...._", "5": ".....",
      "6": "_....", "7": "__...", "8": "___..", "9": "____.", "0": "_____",
      
      /*
       * Note: Some operators prefer "!" as "___." and others as "_._.__"
       * ARRL message format has most punctuation spelled out, as many symbols'
       * encodings conflict with procedural signals (e.g. "=" and "BT").
       */
      ".": "._._._", ",": "__..__", "?": "..__..",  "'": ".____.",
      "/": "_.._.",  "(": "_.__.",  ")": "_.__._",  "&": "._...",
      ":": "___...", ";": "_._._.", "=": "_..._",   "+": "._._.",
      "-": "_...._", "_": "..__._", "\"": "._.._.", "$": "..._.._",
      "!": "_._.__", "@": ".__._."
    },
    annotate: function(el) {
      var $el = $(el);
      var tokens = $el.text().split(/\s+/);

      $el.text('');

      for (i in tokens) {
        var token = tokens[i];
        var letters = token.split('');
        var symbols = [];

        for (j in letters) {
          var letter = letters[j];
          var symbol = Morse.code[letter.toLowerCase()];
          if (symbol) {
            symbols.push(symbol);
          }
        }

        $el.append('<ruby class="morse-code"><rb>' + token + '</rb><rt>' + symbols.join(' ') + '&nbsp;' + '</rt></ruby>');
      }

      $el.each(function() {
        if ($("#morse-code-output")[0] === undefined) {
          var audio = $('<audio id="morse-code-output"></audio>').bind("morse.mute", function(){this.pause();})
          $(this).after(audio);
        }

        $(this).bind('morse.emit', Morse.emit).bind('click', function(){ $(this).trigger("morse.emit")});
      });
    },

    emit: function() {
      var symbols = [];
      
      $("#morse-code-output").trigger("morse.mute").attr('src', "");
      
      $(this).find("rt").each(function() {
        symbols.push($(this).text());
      });

      // Javascript WAV generation based on code by sk89q (http://sk89q.therisenrealm.com/)
      var generate = function(symbols, options) {
        var defaults = {
          channels: 1,
          sampleRate: 1012,
          bitDepth: 16,
          unit: 0.100,
          frequency: 440.0,
          volume: 32767
        };

        var options = $.extend(defaults, options);

        var channels      = options.channels;
        var sampleRate    = options.sampleRate;
        var bitsPerSample = options.bitDepth;
        var unit          = options.unit;
        var frequency     = options.frequency;
        var volume        = options.volume;

        var data = [];
        var samples = 0;

        var tone = function(length) {
          for (var i = 0; i < sampleRate * unit * length; i++) {
            for (var c = 0; c < channels; c++) {
                var v = volume * Math.sin((2 * Math.PI) * (i / sampleRate) * frequency);
                data.push(pack("v", v)); samples++;
            }
          }
        }

        var silence = function(length) {
          for (var i = 0; i < sampleRate * unit * length; i++) {
            for (var c = 0; c < channels; c++) {
                data.push(pack("v", 0)); samples++;
            }
          }
        }

        for (var i in symbols) {
          var length;
          var symbol = symbols[i];
          if (symbol == '|') {
            silence(7);
          } else {
            if (symbol == '.') {
              tone(1);
              silence(1);
            } else if (symbol == '_') {
              tone(3);
              silence(1);
            } else {
              silence(3);
            }
          }
        }

        data = data.join('');

        // Format sub-chunk
        var chunk1 = [
            "fmt ", // Sub-chunk identifier
            pack("V", 16), // Chunk length
            pack("v", 1), // Audio format (1 is linear quantization)
            pack("v", channels),
            pack("V", sampleRate),
            pack("V", sampleRate * channels * bitsPerSample / 8), // Byte rate
            pack("v", channels * bitsPerSample / 8),
            pack("v", bitsPerSample)
        ].join('');

        // Data sub-chunk (contains the sound)
        var chunk2 = [
            "data", // Sub-chunk identifier
            pack("V", samples * channels * bitsPerSample / 8), // Chunk length
            data
        ].join('');

        // Header
        var header = [
            "RIFF",
            pack("V", 4 + (8 + chunk1.length) + (8 + chunk2.length)), // Length
            "WAVE"
        ].join('');

        return "data:audio/wav;base64," + escape(btoa([header, chunk1, chunk2].join('')));
      };

      // Base 64 encoding function, for browsers that do not support btoa()
      // by Tyler Akins (http://rumkin.com), available in the public domain
      var btoa=function(b){var c="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",h="",a,d,e,j,i,f,g=0;do{a=b.charCodeAt(g++);d=b.charCodeAt(g++);e=b.charCodeAt(g++);j=a>>2;a=(a&3)<<4|d>>4;i=(d&15)<<2|e>>6;f=e&63;if(isNaN(d))i=f=64;else if(isNaN(e))f=64;h=h+c.charAt(j)+c.charAt(a)+c.charAt(i)+c.charAt(f)}while(g<b.length);return h};


      // pack() emulation (from the PHP version), for binary crunching
      var pack = function(e){for(var b="",c=1,d=0;d<e.length;d++){var f=e.charAt(d),a=arguments[c];c++;switch(f){case "a":b+=a[0]+"\u0000";break;case "A":b+=a[0]+" ";break;case "C":case "c":b+=String.fromCharCode(a);break;case "n":b+=String.fromCharCode(a>>8&255,a&255);break;case "v":b+=String.fromCharCode(a&255,a>>8&255);break;case "N":b+=String.fromCharCode(a>>24&255,a>>16&255,a>>8&255,a&255);break;case "V":b+=String.fromCharCode(a&255,a>>8&255,a>>16&255,a>>24&255);break;case "x":c--;b+="\u0000";break;default:throw new Error("Unknown pack format character '"+
      f+"'");}}return b};

      $("#morse-code-output").attr('src', generate(symbols.join('|'), {unit: 1.200 / Morse.wpm}))[0].play();
    },
  };

  $.fn.extend({
    morseCode: function() {
      return this.each(function(){
        (new Morse.annotate(this));
      });
    }
  });
})(jQuery);
