(function() {
  // Prevent Firefox from closing the websocket connection if the ESC key is pressed
  $(document).keydown(function(e) {
    if (e.keyCode === 27) {
      e.preventDefault();
    }
  });
  $.get('/artworks', function(data) {
    $('.thumbnail').each(function() {
      var urls = data[$(this).attr('href')];
      for (var i = 0; i < urls.length; i++) {
        $('<img src="'+urls[i]+'" />').appendTo($(this));
      }
    });
  });
  var uri = window.location.protocol+'//'+window.location.host;
  var primus = Primus.connect(uri, {'strategy': 'none'});
  primus.on('open', function() {
    primus.send('getoverview', function(data) {
      for (var prop in data) {
        $('#'+prop).text(data[prop]);
      }
    });
    primus.on('updateoverview', function(room, players) {
      $('#'+room).text(players);
    });
  });
})();
