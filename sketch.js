function setup() {
    // don't setup a canva because we're using AFrame
    noCanvas();

    print('AFrame version');

    // create aframe entity with attributes
    const bubbles = createElement('a-entity').parent('scene').attribute('position', '0 5 0');
    
    //create a ton of this bubbles
    for (let i = 0; i < 50; i++) {
      const x = 15;
      const y = 4;
      createElement('a-sphere').parent(bubbles)
        .attribute('position', `${Math.random() * x - x / 2} ${Math.random() * y - y / 2} ${Math.random() * x - x / 2}`)
        .attribute('radius', Math.random() * 1 + .1)
        .attribute('color', '#dfbe99')
        .attribute('opacity', 0.5);
    }
  
    
    //make an array of the array
    const cones = createElement('a-entity').parent('scene').attribute('position', '0 0 0');
    
    //add cones to the cones array
    for (let i = 0; i < 6; i++) {
      const X = 10;
      const x = Math.random() * X - X / 2;
      const z = Math.random() * X - X / 2;
  
      // create one object for the bigger cones array and attatch it to the array
      const mycone = createElement('a-entity').parent(cones)
        .attribute('position', `${x} 0 ${z}`);
  
      createElement('a-cone').parent(mycone)
        .attribute('position', '0 0 0')
        .attribute('radius-bottom', .85)
        .attribute('radius-top', .1)
        .attribute('height', 2)
        .attribute('color', '#db5375')
        .attribute('shadow');
  
    }
  }