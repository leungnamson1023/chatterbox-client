// YOUR CODE HERE:
let app = {
  server: 'http://parse.sfs.hackreactor.com/chatterbox/classes/messages',
  data: [],
  myUserName: location.search.slice(10),
  userNames: [],
  chatRooms: {general: 'lobby'} // my user name
};

app.currentRoom = {

};

app.init = function() {
  this.fetch();
};


app.send = function (message) {
  $.ajax({
  // This is the url you should use to communicate with the parse API server.
    url: this.server,
    type: 'POST',
    data: message,
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
    // data: JSON.stringify(message),
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
  var userElement = document.createElement('ul');


  var user = document.createTextNode('test');
  userElement.appendChild(user);

  $('#chats').append(userElement);


  var tag = $('#chats').children().attr('class', 'userName');

  


  var messageElement = document.createElement('li');
  
  var message = document.createTextNode('msg');
  messageElement.appendChild(message);

  console.log(messageElement);

  $('#chats .userName').append(messageElement);

  var messageTag = $('#chats .userName').children().attr('class', 'msg');

};

app.renderRoom = function(roomName) {
  var roomElement = $('<div id="roomSelect"></div');
  var newRoom = $('<button type="button">' + roomName + '</button>');
  newRoom.data('roomName', roomName);

  newRoom.on('click', function(event) {
    app.currentRoom = roomName;
    
  });

  $('#main').append(roomElement);


  $('#roomSelect').append(newRoom);
};


//console.log(location.search.slice(10));









app.addFriend = function() {
  
// testObj.results; // an arrays and loop through and get all usernames
  

  var userNameObj = {};
  var fetchedData = app.fetch();
  testObj.results.forEach(function(value) {
    userNameObj[value.username] = value.username;
  });

  console.log(userNameObj);

};



app.init();







