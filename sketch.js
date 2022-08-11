const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;
var score = 0

function preload(){
  fruitImg = loadImage("images/melon.png")
  bgImg = loadImage("images/background.png")
  bunnyImg = loadImage("images/Rabbit-01.png")
  blink = loadAnimation("images/blink_1.png","images/blink_2.png","images/blink_3.png") 
  eat = loadAnimation("images/eat_0.png", "images/eat_1.png", "images/eat_2.png", "images/eat_3.png", "images/eat_4.png")
  sad = loadAnimation("images/sad_1.png", "images/sad_2.png", "images/sad_3.png")
  bgs = loadSound("images/sound1.mp3")
  es = loadSound("images/eating_sound.mp3")
  ss = loadSound("images/sad.wav")
  cs = loadSound("images/rope_cut.mp3")
  aS = loadSound("images/air.wav")
  starImg = loadImage("images/star.png")
}

function setup() {
  createCanvas(windowWidth,windowHeight);
  engine = Engine.create();
  world = engine.world;
  ground = Bodies.rectangle(250, 650, 500, 20, { isStatic: true });
  World.add(world, ground);

  rope = new Rope(6,{x:250,y:30})
  rope2 = new Rope(4,{x:20,y:50})
  rope3 = new Rope(7,{x:300,y:20})

  fruit = Bodies.circle(250,200,20,{restitution: 0.5})
  World.add(world, fruit);

  link = new Link(rope,fruit)
  link2 = new Link(rope2,fruit)
  link3 = new Link(rope3,fruit)

  s1 = createSprite(200, 50)
  s1.addImage(starImg)
  s1.scale = 0.02

  s2 = createSprite(260, 100)
  s2.addImage(starImg)
  s2.scale = 0.02

  btn = createImg("images/cut_btn.png")
  btn.position(230, 30)
  btn.size(50, 50)
  btn.mouseClicked(function(){
    rope.break()
    link.break()
    cs.play()
  })

  btn2 = createImg("images/cut_btn.png")
  btn2.position(20, 50)
  btn2.size(50, 50)
  btn2.mouseClicked(function(){
    rope2.break()
    link2.break()
    cs.play()
  })

  btn3 = createImg("images/cut_btn.png")
  btn3.position(300, 20)
  btn3.size(50, 50)
  btn3.mouseClicked(function(){
    rope3.break()
    link3.break()
    cs.play()
  })

  blink.frameDelay = 15
  eat.frameDelay = 15
  sad.frameDelay = 15
  sad.looping = false
  eat.looping = false
  bunny = createSprite(250, 550)
  bunny.addAnimation("blinking", blink)
  bunny.addAnimation("eating", eat)
  bunny.addAnimation("sad", sad)
  bunny.scale = 0.2

  balloon = createImg("images/balloon.png")
  balloon.position(20, 200)
  balloon.size(150, 100)
  balloon.mouseClicked(function(){
    aS.play()
    Matter.Body.applyForce(fruit, fruit.position, {x:0.05,y:0})
  })

  balloon2 = createImg("images/baloon2.png")
  balloon2.position(200, 300)
  balloon2.size(100, 150)
  balloon2.mouseClicked(function(){
    aS.play()
    Matter.Body.applyForce(fruit, fruit.position, {x:0,y:-0.05})
  })
  mute = createImg("images/mute.png")
  mute.position(450, 20)   
  mute.size(50, 50)
  mute.mouseClicked(function(){
    if (bgs.isPlaying()){
      bgs.stop()
    } else{
      bgs.play()
    }
  })

  bgs.play() 
  bgs.setVolume(0.2)
  rectMode(CENTER);
  ellipseMode(RADIUS);
  textSize(50)
}

function draw() {
  background(bgImg);
  Engine.update(engine);
  rect(ground.position.x, ground.position.y, 500, 20)
  if (fruit!= null){
  push()
  imageMode(CENTER)
  image(fruitImg, fruit.position.x, fruit.position.y, 70, 70)
  pop()
  d = dist(fruit.position.x, fruit.position.y, bunny.position.x, bunny.position.y)
  if (d<80){
    bunny.changeAnimation("eating", eat)
    World.remove(world, fruit)
      fruit = null;
    es.play()
  }
} 
  rope.display()
  rope2.display()
  rope3.display()

  if (fruit!= null && fruit.position.y>600){
    bunny.changeAnimation("sad", sad)
    World.remove(world, fruit)
    fruit = null;
    ss.play()
  }

  if (fruit!= null && dist(fruit.position.x, fruit.position.y, s1.position.x, s1.position.y)<30){
    s1.position.x = -100 
    s1.position.y = -100
    score = score + 1
  }
  
  if (fruit!= null && dist(fruit.position.x, fruit.position.y, s2.position.x, s2.position.y)<30){
    s2.position.x = -100 
    s2.position.y = -100
    score = score + 1
  }
  
  drawSprites()
  textSize(30)
  text("Score = "+ score, 600, 50)
}




