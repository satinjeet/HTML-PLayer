class MySound
    songs: []
    volume: 0.5
    indexes: []
    reader: new FileReader
    audioPlayer: new Audio
    isPlaying: false
    constructor: ->
        $("button").on "click", @handle
        $("input#addSong").on "change", @addSong
        $(document).on "click","li.songs", @play
        $("#events").on "render", @render
        @reader.onload = @addToList

    addSong: (e)=>
        files = e.currentTarget.files
        i = 0
        lim = files.length
        $("#events").on "free", =>
            if (i >= lim)
                $("#events").trigger "render"
                return
            @indexes.push files[i].name
            @reader.readAsDataURL files[i]
            
            i++
        $("#events").trigger "free"

    addToList: (reader)=>
        @songs.push @reader.result
        $("#events").trigger "free"

    render: (event)=>
        $("#songsList").html ""
        $("#songsList").append "<li class='songs' id='sng-#{_i}'>#{song}</li>" for song in @indexes

    handle: (e)=>
        id = $(e.currentTarget).attr "id"
        switch id
            when "ff" then @ff()
            when "fb" then @fb()
            when "inputFiles" then $("input#addSong").trigger "click"

    ff: =>
        if @isPlaying is not true
            return
        s.audioPlayer.currentTime = s.audioPlayer.currentTime + 10

    fb: =>
        if @isPlaying is not true
            return
        s.audioPlayer.currentTime = s.audioPlayer.currentTime - 5

    play: (e)=>
        reg = /sng-([0-9]*)/
        id = reg.exec(e.currentTarget.id)[1]
        @audioPlayer.src = @songs[id]
        @audioPlayer.play()
        @isPlaying = true
        
    stop: =>
        @audioPlayer.stop()
        @isPlaying = false

s = new MySound()
