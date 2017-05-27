function getFormattedTaskHtml(messagesStr) {
  var html = '';
  var messages = messagesStr.split(',');
  messages.forEach((message) => {
    html += '<span class="current-tasks__task label label-default">' + message +
      '</span>&nbsp;';
  });
  return html;
}

function initWebSocket() {
  var messageContainer = document.getElementById("current_tasks");
  if ("WebSocket" in window) {
    window.ws = new WebSocket("ws://"+window.location.hostname+":8888/socket?Id=42");
    ws.onopen = function() {
      test = 'Connected';
      var message = getFormattedTaskHtml(test);
      messageContainer.innerHTML = message;
      ws.send('{"message": "get_state"}')
    };
    ws.onmessage = function (evt) {
      var received_msg = JSON.parse(evt.data);
      var received_tasks = decodeURI(received_msg.message);
      var message = getFormattedTaskHtml(received_tasks);
      messageContainer.innerHTML = message;
    };
  }
}

function playSound(event){
  sound = event.currentTarget.dataset.sound;
  ws.send('{"message": "play_sound", "sound":"'+sound+'"}')
}

function openDoor(event){
  door = event.currentTarget.dataset.door_id;
  ws.send('{"message": "door", "door_id":"' + door + '", "state": 0}');
}

function closeDoor(event){
  door = event.currentTarget.dataset.door_id;
  ws.send('{"message": "door", "door_id":"' + door + '", "state": 1}');
}

console.log("something", $)
$('#option1').on('click', function () {
  console.log("Somethig");
  $(this).button('toggle');
});

$('#option2').on('click', function () {
  console.log("Somethig");
  debugger;
  $(this).button('toggle');
});

$('#option3').on('click', function () {
  console.log("Somethig");
  $(this).button('toggle');
});

function openBox(event){
  box = event.currentTarget.dataset.box_id;
  ws.send('{"message": "box", "box_id":"' + box + '", "state": 0}');
}

function closeBox(event){
  box = event.currentTarget.dataset.box_id;
  ws.send('{"message": "box", "box_id":"' + box + '", "state": 1}');
}

function toggle_skip_task(event) {
  task_id = document.getElementById("skip_task_input").value;
  ws.send('{"message": "skip_task", "task_id":"' + task_id + '"}');
}

function turnLight(event) {
  light_id = event.currentTarget.dataset.light_id;
  ws.send('{"message": "light", "light_id":"' + light_id + '"}');
}

function setRoomLight(event) {
  let room_led_id = event.currentTarget.dataset.room_led_id;
  let color_value = document.getElementById(room_led_id).value;
  console.log("Color_value for room " + room_led_id + ": " + color_value);
  let message = '{"message": "set_room_light", "room_led_id":"' + room_led_id + '", "color":"' + color_value + '"}';
  <!-- console.log("Send: " + message); -->
    ws.send(message);
}

document.addEventListener("DOMContentLoaded", function(event) {
  initWebSocket();
});

