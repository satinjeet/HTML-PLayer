// Generated by CoffeeScript 1.7.1
var MySound, s, sound,
  __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

MySound = (function() {
  function MySound() {
    this.addSong = __bind(this.addSong, this);
    this.render = __bind(this.render, this);
    createjs.Sound.alternateExtensions = ["mp3"];
    createjs.Sound.addEventListener("fileload", createjs.proxy(this.render, this));
  }

  MySound.prototype.render = function(event) {
    var instance;
    console.log(event);
    instance = createjs.Sound.play(event.id);
    return instance.volume = 0.5;
  };

  MySound.prototype.addSong = function(loc, name) {
    return createjs.Sound.registerSound(loc, name, 1);
  };

  return MySound;

})();

sound = "file:///home/sfeonix/Music/%5BSongs.PK%5D%20Suno%20Na%20Sangemarmar%20(Youngistaan)%20-%20320Kbps.mp3";

s = new MySound();

s.addSong(sound, "somesong");
