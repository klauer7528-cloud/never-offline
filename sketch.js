let popups = [];
let stressLevel = 0;

let messages = [
  "Meeting starts in 5 minutes",
  "Your productivity dropped 3%",
  "Someone is waiting for your reply",
  "You missed a notification",
  "New email received",
  "AI optimized your schedule",
  "Drink water",
  "Screen time increased today",
  "Family message unread",
  "Daily performance report available",
  "You may be falling behind",
  "New task generated",
  "Reminder: unfinished work detected",
  "Your attention is required",
  "Rest time interrupted",
  "Zoom meeting incoming"
];

function setup() {

  createCanvas(windowWidth, windowHeight);

  // 初始窗口
  for(let i = 0; i < 4; i++){
    createPopup();
  }

  // 自动生成
  setInterval(() => {

    createPopup();

  }, 2000);
}

function draw() {

  background(242);

  // 页面轻微抖动
  translate(
    random(-stressLevel * 0.3, stressLevel * 0.3),
    random(-stressLevel * 0.3, stressLevel * 0.3)
  );

  // 绘制所有窗口
  for(let popup of popups){
    popup.display();
  }

  // 顶部系统状态
  fill(0);

  textSize(14);

  textAlign(CENTER);

  text(
    "SYSTEM LOAD : " + stressLevel,
    width / 2,
    30
  );
}

function mousePressed(){

  stressLevel++;

  // 检测关闭按钮
  for(let popup of popups){
    popup.checkClose(mouseX, mouseY);
  }
}

function createPopup(){

  let x = random(50, width - 300);

  let y = random(50, height - 180);

  let w = random(240, 300);

  let h = random(120, 160);

  let msg = random(messages);

  popups.push(
    new Popup(x, y, w, h, msg)
  );
}

class Popup {

  constructor(x, y, w, h, msg){

    this.x = x;
    this.y = y;

    this.w = w;
    this.h = h;

    this.msg = msg;

    this.floatOffset = random(1000);
  }

  display(){

    let floatY =
      sin(frameCount * 0.02 + this.floatOffset) * 3;

    // 阴影
    noStroke();

    fill(0, 30);

    rect(
      this.x + 6,
      this.y + 6 + floatY,
      this.w,
      this.h,
      12
    );

    // 主窗口
    fill(255);

    rect(
      this.x,
      this.y + floatY,
      this.w,
      this.h,
      12
    );

    // 顶栏
    fill(240);

    rect(
      this.x,
      this.y + floatY,
      this.w,
      32,
      12,12,0,0
    );

    // 关闭按钮
    fill(255,80,80);

    ellipse(
      this.x + this.w - 20,
      this.y + 16 + floatY,
      12
    );

    // 内容
    fill(20);

    textSize(14);

    textAlign(LEFT);

    text(
      this.msg,
      this.x + 20,
      this.y + 70 + floatY,
      this.w - 40
    );

    // 底部状态
    fill(120);

    textSize(11);

    text(
      "SYSTEM ACTIVE",
      this.x + 20,
      this.y + this.h - 18 + floatY
    );
  }

  checkClose(mx, my){

    let d = dist(
      mx,
      my,
      this.x + this.w - 20,
      this.y + 16
    );

    if(d < 10){

      // 删除当前窗口
      let index = popups.indexOf(this);

      if(index > -1){
        popups.splice(index,1);
      }

      // 系统反制
      createPopup();
      createPopup();

      stressLevel += 2;
    }
  }
}

function windowResized(){

  resizeCanvas(
    windowWidth,
    windowHeight
  );
}