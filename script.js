AFRAME.registerComponent('escape-room', {
  init: function () {
    var sceneEl = this.el;
    var doorOpen = false;
    var keyPickedUp = false;

    // Create the escape room environment
    var room = document.createElement('a-entity');
    room.setAttribute('geometry', 'primitive: box; width: 10; height: 5; depth: 10');
    room.setAttribute('material', 'color: #ccc');
    sceneEl.appendChild(room);

    // Add interactive elements
    var door = document.createElement('a-entity');
    door.setAttribute('geometry', 'primitive: box; width: 1; height: 2; depth: 0.1');
    door.setAttribute('material', 'color: brown');
    door.setAttribute('position', '0 0 4');
    door.addEventListener('click', function () {
      if (keyPickedUp && !doorOpen) {
        door.setAttribute('position', '0 -2 4');
        doorOpen = true;
        console.log('Door opened!');
      }
    });
    room.appendChild(door);

    // Add a key as an interactive object
    var key = document.createElement('a-entity');
    key.setAttribute('geometry', 'primitive: box; width: 0.2; height: 0.2; depth: 0.05');
    key.setAttribute('material', 'color: yellow');
    key.setAttribute('position', '-2 1 1');
    key.addEventListener('click', function () {
      if (!keyPickedUp) {
        key.setAttribute('visible', 'false');
        keyPickedUp = true;
        console.log('Key picked up!');
      }
    });
    room.appendChild(key);

    // Add a lock as an interactive object
    var lock = document.createElement('a-entity');
    lock.setAttribute('geometry', 'primitive: box; width: 0.5; height: 0.3; depth: 0.1');
    lock.setAttribute('material', 'color: gray');
    lock.setAttribute('position', '2 1 2');
    lock.addEventListener('click', function () {
      if (doorOpen) {
        console.log('Congratulations! You escaped the room!');
      } else {
        console.log('The door is locked!');
      }
    });
    room.appendChild(lock);
  }
});

// Initialize the VR scene
document.addEventListener('DOMContentLoaded', function () {
  var scene = document.querySelector('a-scene');
  scene.setAttribute('escape-room', '');
});
