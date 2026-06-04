let popups=[];


// SYSTEM STATE

let stress=0;

let balance=85;

let onlineTime=0;



// generation control

let maxPopups=22;

let dangerZone=4;


let spawnDelay=2200;

let lastSpawn=0;


let paused=false;



let messages=[

{
type:"WORK",
title:"Meeting Reminder",
text:"Team sync starts in 10 minutes"
},


{
type:"WORK",
title:"New Task",
text:"3 tasks have been assigned"
},


{
type:"AI",
title:"AI Assistant",
text:"Your schedule has been optimized"
},


{
type:"AI",
title:"Performance Update",
text:"Focus efficiency increased +12%"
},


{
type:"LIFE",
title:"Personal",
text:"Family message waiting"
},


{
type:"LIFE",
title:"Health",
text:"Your rest time was interrupted"
},


{
type:"SYSTEM",
title:"System Notice",
text:"Unused time detected"
}


];




// -----------------

function setup(){

createCanvas(
windowWidth,
windowHeight
);


for(let i=0;i<5;i++){

createPopup();

}

}





function draw(){


background("#F7F6F2");



onlineTime+=0.01;



systemControl();



drawDashboard();



push();

translate(
random(-stress*0.15,stress*0.15),
random(-stress*0.15,stress*0.15)
);



for(let p of popups){

p.display();

}

pop();


}






// SYSTEM LOGIC

function systemControl(){


// too much information

if(popups.length>=maxPopups){

paused=true;

}


// user almost escaped

if(popups.length<=dangerZone){


paused=false;


if(frameCount%120===0){

stress+=5;

createPopup();
createPopup();
createPopup();

}

}



// speed changes

spawnDelay=map(
stress,
0,
60,
3000,
900
);


spawnDelay=constrain(
spawnDelay,
900,
3000
);




// generate

if(
!paused &&
millis()-lastSpawn>spawnDelay
){

createPopup();

lastSpawn=millis();

}



}







// DASHBOARD UI

function drawDashboard(){



noStroke();



fill(255);

rect(
20,
20,
230,
height-40,
20
);



fill(20);

textSize(22);

textAlign(LEFT);

text(
"Never Offline",
45,
65
);



textSize(12);

fill(120);

text(
"PRODUCTIVITY SYSTEM",
45,
88
);





// online

fill(30);

textSize(14);

text(
"ONLINE ●",
45,
140
);


fill(120);

text(
floor(onlineTime)+" minutes connected",
45,
165
);





// stats


drawStat(
"Productivity",
"94%",
220
);


drawStat(
"Messages",
popups.length,
280
);



drawStat(
"System Load",
stress,
340
);





// balance


fill(40);

textSize(14);

text(
"Work-Life Balance",
45,
430
);



fill(230);

rect(
45,
450,
150,
10,
10
);


fill(80);

rect(
45,
450,
map(balance,0,100,0,150),
10,
10
);



fill(120);

text(
floor(balance)+"%",
45,
485
);





fill(140);

textSize(11);

text(
"AI Assistant Active",
45,
height-70
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

textSize(24);

text(
value,
45,
y+30
);


}








// interaction


function mousePressed(){


for(let p of popups){

p.closeCheck(
mouseX,
mouseY
);

}

}









function createPopup(){


let data=random(messages);


popups.push(

new Popup(

random(300,width-300),

random(80,height-200),

data

)

);


}










class Popup{


constructor(x,y,data){


this.x=x;

this.y=y;


this.w=260;

this.h=145;


this.data=data;


this.float=random(1000);


}







display(){


let fy=
sin(
frameCount*0.02+
this.float
)*3;



// shadow


noStroke();


fill(0,25);


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




// type


fill(120);


textSize(11);


text(
this.data.type,
this.x+22,
this.y+30+fy
);




// close


fill("#FFB020");


circle(

this.x+this.w-25,

this.y+25+fy,

12

);




// title


fill(20);


textSize(18);


text(

this.data.title,

this.x+22,

this.y+65+fy

);





// content


fill(100);


textSize(13);


text(

this.data.text,

this.x+22,

this.y+95+fy,

210

);






fill(160);

textSize(10);

text(

"SYSTEM ACTIVE",

this.x+22,

this.y+125+fy

);



}









closeCheck(mx,my){


let d=dist(

mx,

my,

this.x+this.w-25,

this.y+25

);



if(d<12){



let index=
popups.indexOf(this);


if(index>-1){

popups.splice(index,1);

}




// user feels progress

balance+=5;


stress-=2;



stress=max(
0,
stress
);




// system sometimes reacts

if(random()<0.25){


createPopup();

createPopup();


stress+=4;


balance-=12;


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