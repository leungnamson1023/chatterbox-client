// YOUR CODE HERE:
let app = {
  server: 'http://parse.sfs.hackreactor.com/chatterbox/classes/messages',
  data: [],
  myUserName: location.search.slice(10),
  friendName: new Set(),
  chatRooms: 'lobby' // my user name
};



var message = {
  username: 'shawndrost',
  text: 'trololo',
  roomname: '4chan'
};

app.init = function() {
  setInterval(this.fetch.bind(this), 2000);
  setInterval(this.renderRoom.bind(this), 500);
};

app.friends = function () {
 $('.username').on('click', function(e) {
    app.friendName.add($(this).text());
    $('#friends').empty();
    for (var key of app.friendName) {
    var addedFriend = $("<div>" + key + "</div>");
      $('#friends').append(addedFriend);
    }
  });
};



var crossScript = function(text) {

  var hackCheck = {
    '&': '&amp:',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#x27;',
    '/': '&#x2F;'
  };
};

app.send = function (message) {
  var msg = this.formatMessage();
  $.ajax({
  // This is the url you should use to communicate with the parse API server.
    url: this.server,
    type: 'POST',
    data: JSON.stringify(msg),
    contentType: 'application/json',
    success: function (data) {
      console.log('chatterbox: Message sent');
    },
    error: function (data) {
      // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
      console.error('chatterbox: Failed to send message', data);
    }
  });
  $('.chat').val('');
};


app.fetch = function() {
  $.ajax({
  // This is the url you should use to communicate with the parse API server.
    url: this.server,
    type: 'GET',
    data: 'order=-createdAt&limit=100',
    contentType: 'application/json',
    success: function (data) {
      app.data = data.results;
      app.data.forEach(function(value) {
        _.each(value, function(test, key) {
          value[key] = _.escape(test);
          
        });
      });
      app.getRooms();
    },
    error: function (data) {
      // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
      console.error('chatterbox: Failed to get message', data);
    }
  });
  
};


app.clearMessages = function() {
  var messages = $('#chats');
  messages.children().remove();
};


app.renderMessage = function() {
  // create a div with a class username while looping passing in fetched data username
  
  // create another div with a class message, while looping and passing in fetched data message  
  for (var i = 0; i < app.data.length; i++) {
    if (app.data[i].roomname === app.chatRooms) {
      var usernameTag = $('<div class="username">' + app.data[i].username + '</div>');
      var msgTag = $('<div class="messages">' + app.data[i].text + '</div>');

      $('#chats').append(usernameTag);
      $('#chats').append(msgTag);
    }
  }
};

app.renderRoom = function() {
  $('#chats').empty();
  for (var i = 0; i < app.data.length; i++) {
    if (app.data[i].roomname === app.chatRooms) {
      var usernameTag = $('<div class="username">' + app.data[i].username + '</div>');
      $('#chats').append(usernameTag);
      if (app.friendName.has(app.data[i].username)) {
        var msgTag = $('<div class="messagesBold">' + app.data[i].text + '</div>');
        $('#chats').append(msgTag);
      } else {
        var msgTag = $('<div class="messages">' + app.data[i].text + '</div>');
        $('#chats').append(msgTag);
      }
    }
  }
  this.friends();
};


app.getRooms = function() {
  var newObj = new Set();

  for (var i = 0; i < app.data.length; i++) {
    newObj.add(app.data[i].roomname);
  }

  $('.room').remove();

  for (let key of newObj) {
    
    var text = key;
    var newChat = $('<button class="room">' + text + '</button>');
    $('#main').append(newChat);
    
    $('.room').click(function(e) {
      app.chatRooms = $(this).text();
      $('.currentChat').text(app.chatRooms);
      app.renderRoom();
    });
  }

};

 

// var message = {
//   username: 'shawndrost',
//   text: 'trololo',
//   roomname: '4chan'
// };

app.formatMessage = function() {
  var obj = {};

  obj.username = this.myUserName;
  obj.text = $('.chat').val();
  obj.roomname = this.chatRooms;

  return obj;
};



$(document).ready(function() {

//   $('#roomCreater').on('click', function(e) {
//   e.preventDefault();
//   var text = $('.chatRoom').val();
//   var newChat = $('<button class="room">' + text + '</button>');
//   $('#main').append(newChat);
//   $('.chatRoom').val('');
// });
// $('.room').click(function(e) {
//   console.log('hi');
//   app.chatRooms = $(this).text();
//   $('.currentChat').text(app.chatRooms);
//   app.renderRoom();
// });

  $('.username').click(function(e) {
    console.log('hi');
  });


  $('#send-message').click(function() {
    app.send();
  });


  $('#roomCreater').click(function(e) {
    e.preventDefault();
    var text = $('.chatRoom').val();
    var newChat = $('<button class="room">' + text + '</button>');
    $('#main').append(newChat);
    $('.chatRoom').val('');

    $('.room').click(function(e) {
      app.chatRooms = $(this).text();
      $('.currentChat').text(app.chatRooms);
      app.renderRoom();
    });
  });
});


app.init();







