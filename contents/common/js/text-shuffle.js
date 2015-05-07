/*
 * 文字列をシャッフルする
 * 参照サイト：http://clockmaker.jp/labs/120203_html5_shuffletext/dom.html
 */

var TextShuffle = function(str, element) {
  this.originalStr = str;
  this.randomIndex = [];
  this.emptyCharacter = '-';
  this.element = element;
  this.duration = 1000;
  this.frameRate = 30;
  this.timeStart = 0;
  this.timeCurrent = 0;
  this.intervalId = 0;
  this.isRunning = false;
  this.init();
};

TextShuffle.prototype = {
  init: function() {
    this.start();
  },

  start: function() {
    this.stop();

    this.randomIndex = [];
    var _str = '';
    for (var i = 0; i < this.originalStr.length; i++) {
      var _rate = i / this.originalStr.length;
      this.randomIndex[i] = Math.random() * (1 - _rate) + _rate;
    }

    this.timeStart = new Date().getTime();
    this.intervalId = setInterval(Delegate.create(this.onInterval, this), 1000/this.frameRate);
    this.isRunning = true;
    this.element.html(_str);
  },

  stop: function() {
    if (this.isRunning) clearInterval(this.intervalId);
    this.isRunning = false;
  },

  onInterval: function() {
    this.timeCurrent = new Date().getTime() - this.timeStart ;
    var _percent = this.timeCurrent / this.duration;
    // console.log(_percent);

    var _str = '';
    for (var i = 0; i < this.originalStr.length; i++) {
      if (_percent >= this.randomIndex[i]) {
        _str += this.originalStr.charAt(i);
      // } else if (_percent < this.randomIndex[i]) {
      //   _str += this.emptyCharacter;
      } else {
        _str += this.getRandomLetter();
      }
    }

    if (_percent > 1) {
      _str = this.originalStr;
      this.stop();
    }

    this.element.html(_str);
  },

  getRandomLetter: function() {
    var _chars = '!"#$%&\'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~';
    // var _chars = [
    //   '!', '"', '#', '$', '%', '&', '\'', '(', ')', '*', '+', ',', '-', '.', '/', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', ':', ';', '<', '=', '>', '?', '@', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', '[', '\\', ']', '^', '_', '`', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', '{', '|', '}', '~'];

    return _chars.charAt(Math.floor(Math.random() * _chars.length));
  }
};