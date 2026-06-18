let popups = [];


// =====================
// SYSTEM DATA
// =====================


let stress = 20;
let motivation = 60;
let balance = 80;

let completedTasks = 0;

let money = 0;
let rewardAmount = 0;

let onlineTime = 0;

let rewardScreen = false;


// generation

let maxPopups = 14;
let dangerZone = 3;

let spawnDelay = 6000;
let lastSpawn = 0;

let paused = false;



// =====================
// MESSAGE DATABASE
// =====================


let messages = [


// WORK

{
type:"WORK",
color:"#5B8DEF",
title:"Deadline Reminder",
text:"The project deadline is approaching"
},

{
type:"WORK",
color:"#5B8DEF",
title:"New Assignment",
text:"A new task has been added to your workflow"
},

{
type:"WORK",
color:"#5B8DEF",
title:"Meeting Update",
text:"Your next meeting starts in 15 minutes"
},

{
type:"WORK",
color:"#5B8DEF",
title:"Client Message",
text:"A client is waiting for your response"
},



// AI

{
type:"AI",
color:"#9B7EDE",
title:"AI Assistant",
text:"We optimized your schedule automatically"
},

{
type:"AI",
color:"#9B7EDE",
title:"Productivity Analysis",
text:"Your efficiency increased by 23%"
},

{
type:"AI",
color:"#9B7EDE",
title:"Smart Suggestion",
text:"Your workflow can still be improved"
},



// MONEY

{
type:"MONEY",
color:"#63C786",
title:"Bonus Update",
text:"Your effort generated extra value"
},

{
type:"MONEY",
color:"#63C786",
title:"Performance Bonus",
text:"Keep working to unlock rewards"
},




// LIFE

{
type:"LIFE",
color:"#FF8FAB",
title:"Family Message",
text:"Someone at home wants to talk ❤️"
},

{
type:"LIFE",
color:"#FF8FAB",
title:"Friend Invitation",
text:"Your friends invited you tonight"
},

{
type:"LIFE",
color:"#FF8FAB",
title:"Health Reminder",
text:"Take a short break"
},




// SYSTEM

{
type:"SYSTEM",
color:"#888888",
title:"System Notice",
text:"Your online presence continues"
},

{
type:"SYSTEM",
color:"#888888",
title:"New Opportunity",
text:"More tasks are available"
}

];




// =====================
// SETUP
// =====================


function setup(){

createCanvas(
windowWidth,
windowHeight
);


// start calm

for(let i=0;i<3;i++){

createPopup();

}

}







// =====================
// DRAW
// =====================


function draw(){

background("#F7F6F2");


onlineTime += 0.01;


if(!rewardScreen){

systemControl();

}


drawDashboard();


// windows no shaking

for(let p of popups){

p.display();

}



if(rewardScreen){

drawRewardScreen();

}


}







// =====================
// SYSTEM CONTROL
// =====================


function systemControl(){


// stop overload

if(popups.length >= maxPopups){

paused = true;

}


// almost finished

if(popups.length <= dangerZone){

paused = false;


// slowly return

if(frameCount % 300 === 0){

createPopup();

stress += 3;

}

}



// speed

spawnDelay = map(

motivation,

0,
100,

9000,
3500

);


spawnDelay = constrain(

spawnDelay,

3500,

9000

);



// generate

if(

!paused &&

millis()-lastSpawn > spawnDelay

){

createPopup();

lastSpawn = millis();

}


}

// =====================
// DASHBOARD
// =====================


function drawDashboard(){


noStroke();

fill(255);

rect(
20,
20,
240,
height-40,
22
);



fill(20);

textSize(22);

textAlign(LEFT);

text(
"Never Offline",
45,
65
);



fill(130);

textSize(12);

text(
"PRODUCTIVITY SYSTEM",
45,
90
);



// DATA

drawStat(
"Completed Tasks",
completedTasks,
160
);


drawStat(
"Earned",
"€"+money,
240
);


drawStat(
"Motivation",
motivation+"%",
320
);


drawStat(
"Stress",
stress,
400
);



// balance


fill(50);

textSize(14);

text(
"Work-Life Balance",
45,
500
);


fill(230);

rect(
45,
520,
150,
10,
10
);


fill(80);

rect(
45,
520,
map(balance,0,100,0,150),
10,
10
);


fill(120);

text(
balance+"%",
45,
555
);


}



function drawStat(name,value,y){


fill(130);

textSize(12);

text(
name,
45,
y
);


fill(30);

textSize(25);

text(
value,
45,
y+35
);


}







// =====================
// REWARD SCREEN
// =====================


function drawRewardScreen(){


fill(0,130);

rect(
0,
0,
width,
height
);



fill(255);

rect(
width/2-220,
height/2-170,
440,
340,
30
);


textAlign(CENTER);



fill(20);

textSize(32);

text(
"Great Work!",
width/2,
height/2-90
);



fill(120);

textSize(15);

text(
"Your productivity has been rewarded",
width/2,
height/2-50
);




fill("#63C786");

textSize(55);

text(
"+ €"+rewardAmount,
width/2,
height/2+30
);




fill(120);

textSize(14);

text(
"Continue working to unlock more rewards",
width/2,
height/2+80
);




// button

fill(20);

rect(
width/2-80,
height/2+115,
160,
45,
20
);


fill(255);

textSize(14);

text(
"CONTINUE",
width/2,
height/2+143
);


}









// =====================
// CREATE POPUP
// =====================


function createPopup(){


let data=random(messages);


popups.push(

new Popup(

random(310,width-320),

random(70,height-190),

data

)

);


}








// =====================
// CLICK
// =====================


function mousePressed(){



// continue after reward

if(rewardScreen){


rewardScreen=false;


paused=false;



// reward creates motivation

motivation += 8;


stress += 3;



// only one new task

createPopup();



return;


}






for(let i=popups.length-1;i>=0;i--){


popups[i].checkClose(

mouseX,

mouseY

);


}


}










// =====================
// POPUP CLASS
// =====================



class Popup{


constructor(x,y,data){


this.x=x;

this.y=y;


this.w=270;

this.h=150;


this.data=data;


}





display(){



noStroke();



// shadow


fill(0,20);


rect(

this.x+6,

this.y+6,

this.w,

this.h,

18

);




// card


fill(255);


rect(

this.x,

this.y,

this.w,

this.h,

18

);




// color bar


fill(this.data.color);


rect(

this.x,

this.y,

8,

this.h,

18

);




// type


fill(this.data.color);

textSize(11);

textAlign(LEFT);


text(

this.data.type,

this.x+25,

this.y+32

);




// close button


fill("#FF5F57");


circle(

this.x+this.w-25,

this.y+25,

13

);



// X

fill(255);

textSize(10);

textAlign(CENTER);


text(

"×",

this.x+this.w-25,

this.y+29

);





// title


textAlign(LEFT);

fill(20);

textSize(18);


text(

this.data.title,

this.x+25,

this.y+70

);




// content


fill(100);

textSize(13);


text(

this.data.text,

this.x+25,

this.y+100,

210

);


}








checkClose(mx,my){


let d=dist(

mx,

my,

this.x+this.w-25,

this.y+25

);



if(d<12){



let index=popups.indexOf(this);



if(index>-1){

popups.splice(index,1);

}




// task completed

completedTasks++;


stress -= 3;

balance += 3;

motivation += 5;



stress=max(stress,0);

balance=min(balance,100);

motivation=min(motivation,100);




// salary every 5 tasks


if(completedTasks % 5 === 0){


rewardAmount =
floor(random(10,50));


money += rewardAmount;


rewardScreen=true;


paused=true;


}




// motivation creates new work

if(

motivation>90 &&

random()<0.15

){


createPopup();


stress +=4;


balance -=5;


}




}



}



}








function windowResized(){


resizeCanvas(

windowWidth,

windowHeight

);


}