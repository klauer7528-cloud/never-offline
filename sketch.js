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

let maxPopups = 20;
let dangerZone = 3;

let spawnDelay = 2500;
let lastSpawn = 0;

let paused = false;



// =====================
// MESSAGES
// =====================


let messages = [


// =================
// WORK
// =================

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

{
type:"WORK",
color:"#5B8DEF",
title:"Task Completed",
text:"Great progress. Ready for the next goal?"
},



// =================
// AI
// =================


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
text:"Your efficiency increased by 23% today"
},

{
type:"AI",
color:"#9B7EDE",
title:"Smart Suggestion",
text:"Reducing breaks may improve performance"
},

{
type:"AI",
color:"#9B7EDE",
title:"AI Summary",
text:"Your unfinished tasks have been reorganized"
},




// =================
// MONEY
// =================


{
type:"MONEY",
color:"#63C786",
title:"Bonus Received",
text:"Your extra effort has generated a reward"
},

{
type:"MONEY",
color:"#63C786",
title:"Income Update",
text:"Your productivity created more value today"
},

{
type:"MONEY",
color:"#63C786",
title:"Performance Bonus",
text:"Keep this rhythm to unlock more rewards"
},





// =================
// LIFE
// =================


{
type:"LIFE",
color:"#FF8FAB",
title:"Family Message",
text:"Someone at home wants to talk with you ❤️"
},

{
type:"LIFE",
color:"#FF8FAB",
title:"Memory Reminder",
text:"You haven't checked your personal photos today"
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
text:"Take a short break and breathe"
},





// =================
// SYSTEM
// =================


{
type:"SYSTEM",
color:"#888888",
title:"System Notice",
text:"Your online presence has been extended"
},

{
type:"SYSTEM",
color:"#888888",
title:"Daily Report",
text:"You completed more activities than yesterday"
},

{
type:"SYSTEM",
color:"#888888",
title:"New Opportunity",
text:"More tasks are available for you"
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


for(let i=0;i<5;i++){

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




// draw popup windows

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



if(popups.length >= maxPopups){

paused=true;

}



if(popups.length <= dangerZone){


paused=false;



if(frameCount%150===0){


createPopup();
createPopup();


stress+=5;


}



}




spawnDelay = map(

motivation,

0,

100,

4000,

1200

);



spawnDelay = constrain(

spawnDelay,

1200,

4000

);




if(

!paused &&

millis()-lastSpawn>spawnDelay

){


createPopup();


lastSpawn=millis();


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
// CREATE WINDOWS
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


// reward continue button


if(rewardScreen){



rewardScreen=false;


paused=false;



motivation+=15;


stress+=5;



createPopup();
createPopup();
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


this.float=random(1000);


}







display(){


let fy=

sin(frameCount*0.02+this.float)*3;



noStroke();



// shadow


fill(0,20);



rect(

this.x+6,

this.y+6+fy,

this.w,

this.h,

18

);





// card


fill(255);



rect(

this.x,

this.y+fy,

this.w,

this.h,

18

);





// color


fill(this.data.color);



rect(

this.x,

this.y+fy,

8,

this.h,

18

);






fill(this.data.color);



textSize(11);



text(

this.data.type,

this.x+25,

this.y+32+fy

);






fill("#FF5F57");



circle(

this.x+this.w-25,

this.y+25+fy,

13

);







fill(20);


textSize(18);



text(

this.data.title,

this.x+25,

this.y+70+fy

);






fill(100);


textSize(13);



text(

this.data.text,

this.x+25,

this.y+100+fy,

210

);



}










checkClose(mx,my){



let d = dist(

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




completedTasks++;


stress-=3;


balance+=3;


motivation+=5;




stress=max(stress,0);


balance=min(balance,100);


motivation=min(motivation,100);






// salary every 5 tasks


if(

completedTasks % 5 === 0

){



rewardAmount=

floor(random(25,90));



money += rewardAmount;



rewardScreen=true;



paused=true;



}





// system reacts to motivation


if(

motivation>85 &&

random()<0.3

){



createPopup();


createPopup();



stress+=6;


balance-=10;



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