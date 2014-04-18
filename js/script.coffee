class MySound
    constructor: ->
        createjs.Sound.alternateExtensions = ["mp3"]
        createjs.Sound.addEventListener "fileload", createjs.proxy(@render, (@));

    render: (event)=>
        console.log event
        instance = createjs.Sound.play(event.id)
        instance.volume = 0.5

    addSong: (loc, name)=>
        createjs.Sound.registerSound(loc, name, 1);

sound = "file:///home/sfeonix/Music/%5BSongs.PK%5D%20Suno%20Na%20Sangemarmar%20(Youngistaan)%20-%20320Kbps.mp3"
s = new MySound()
s.addSong(sound, "somesong")