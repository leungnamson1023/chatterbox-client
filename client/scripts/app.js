// YOUR CODE HERE:
let app = {
  server: 'http://parse.sfs.hackreactor.com/chatterbox/classes/messages',
  data: [],
  myUserName: location.search.slice(10),
  userNames: [],
  chatRooms: 'lobby' // my user name
};



var message = {
  username: 'shawndrost',
  text: 'trololo',
  roomname: '4chan'
};

app.init = function() {
  this.fetch();
  setTimeout(this.renderRoom.bind(this), 500);
};


app.send = function (message) {
  $.ajax({
  // This is the url you should use to communicate with the parse API server.
    url: this.server,
    type: 'POST',
    data: JSON.stringify(message),
    contentType: 'application/json',
    success: function (data) {
      console.log('chatterbox: Message sent');
    },
    error: function (data) {
      // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
      console.error('chatterbox: Failed to send message', data);
    }
  });
};


app.fetch = function() {
  $.ajax({
  // This is the url you should use to communicate with the parse API server.
    url: this.server,
    type: 'GET',
    data: 'order=-createdAt&limit=500',
    contentType: 'application/json',
    success: function (data) {
      app.data = data.results;
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
    var usernameTag = $('<div class="username">' + app.data[i].username + '</div>');
    var msgTag = $('<div class="messages">' + app.data[i].text + '</div>');

    $('#chats').append(usernameTag);
    $('#chats').append(msgTag);


  }





};

app.renderRoom = function() {
  $("#chats").empty();


  for (var i = 0; i < app.data.length; i++) {
    if (app.data[i].roomname === app.chatRooms) {
      var usernameTag = $('<div class="username">' + app.data[i].username + '</div>');
      var msgTag = $('<div class="messages">' + app.data[i].text + '</div>');

      $('#chats').append(usernameTag);
      $('#chats').append(msgTag);

    }
  }
  

};


//console.log(location.search.slice(10));









app.addFriend = function() {
  
// testObj.results; // an arrays and loop through and get all usernames

};







app.init();







