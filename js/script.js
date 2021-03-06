// Generated by CoffeeScript 1.7.1
var MySound, s,
  __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

MySound = (function() {
  MySound.prototype.songs = [];

  MySound.prototype.volume = 0.5;

  MySound.prototype.indexes = [];

  MySound.prototype.reader = new FileReader;

  MySound.prototype.audioPlayer = new Audio;

  MySound.prototype.isPlaying = false;

  MySound.prototype.current = null;

  function MySound() {
    this.stop = __bind(this.stop, this);
    this.play = __bind(this.play, this);
    this.fb = __bind(this.fb, this);
    this.ff = __bind(this.ff, this);
    this.handle = __bind(this.handle, this);
    this.render = __bind(this.render, this);
    this.addToList = __bind(this.addToList, this);
    this.addSong = __bind(this.addSong, this);
    this.move = __bind(this.move, this);
    this.setUpProgress = __bind(this.setUpProgress, this);
    $("button").on("click", this.handle);
    $("input#addSong").on("change", this.addSong);
    $(document).on("click", "li.songs", this.play);
    $("#events").on("render", this.render);
    this.reader.onload = this.addToList;
    this.audioPlayer.addEventListener('loadedmetadata', this.setUpProgress);
    this.audioPlayer.addEventListener('timeupdate', this.move);
  }

  MySound.prototype.setUpProgress = function() {
    return $("#pg").attr("max", this.audioPlayer.duration);
  };

  MySound.prototype.move = function() {
    return $("#pg").attr("value", this.audioPlayer.currentTime);
  };

  MySound.prototype.addSong = function(e) {
    var files, i, lim;
    files = e.currentTarget.files;
    i = 0;
    lim = files.length;
    $("#events").on("free", (function(_this) {
      return function() {
        if (i >= lim) {
          $("#events").trigger("render");
          return;
        }
        _this.indexes.push(files[i].name);
        _this.reader.readAsDataURL(files[i]);
        return i++;
      };
    })(this));
    return $("#events").trigger("free");
  };

  MySound.prototype.addToList = function(reader) {
    this.songs.push(this.reader.result);
    return $("#events").trigger("free");
  };

  MySound.prototype.render = function(event) {
    var song, _i, _len, _ref, _results;
    $("#songsList").html("");
    _ref = this.indexes;
    _results = [];
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      song = _ref[_i];
      _results.push($("#songsList").append("<li class='songs' id='sng-" + _i + "'> <marquee scrollamount='3'>" + song + "</marquee> </li>"));
    }
    return _results;
  };

  MySound.prototype.handle = function(e) {
    var id;
    id = $(e.currentTarget).attr("id");
    switch (id) {
      case "ff":
        return this.ff();
      case "fb":
        return this.fb();
      case "play":
        return this.play(e);
      case "pause":
        return this.play(e);
      case "stop":
        return this.stop(e);
      case "inputFiles":
        return $("input#addSong").trigger("click");
    }
  };

  MySound.prototype.ff = function() {
    if (this.isPlaying === !true) {
      return;
    }
    return s.audioPlayer.currentTime = s.audioPlayer.currentTime + 10;
  };

  MySound.prototype.fb = function() {
    if (this.isPlaying === !true) {
      return;
    }
    return s.audioPlayer.currentTime = s.audioPlayer.currentTime - 5;
  };

  MySound.prototype.play = function(e) {
    var id, reg;
    reg = /sng-([0-9]*)/;
    if (this.current === null || e.currentTarget.id === "play") {
      this.current = "sng-0";
    } else {
      this.current = e.currentTarget.id;
    }
    if (reg.test(this.current)) {
      id = reg.exec(this.current)[1];
      this.audioPlayer.src = this.songs[id];
    }
    this.audioPlayer.play();
    return this.isPlaying = true;
  };

  MySound.prototype.stop = function() {
    this.audioPlayer.stop();
    return this.isPlaying = false;
  };

  return MySound;

})();

s = new MySound();
