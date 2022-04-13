var colors=["green","red","yellow","blue"];
var colorSeq=[];
var currentSeq=[];
var started=false;
var level=0;

// animation + sound effect
function playAudio(soundName){
    var audio=new Audio("sounds/"+soundName+".mp3");
    audio.play();
}
function animate(idName){
    $("#"+idName).fadeIn(100).fadeOut(100).fadeIn(100);
}

// generate next pattern
function nextSeq(){
    level++;
    $("#level-title").text("Level "+level);

    currentSeq=[];

    var num=Math.floor(Math.random()*100)%4;
    colorSeq.push(colors[num]);

    playAudio(colors[num]);
    animate(colors[num]);

}

function gameOver(){
    playAudio("wrong");
    $("#level-title").text("Game Over, Press Any Key to Restart");
    $("body").fadeIn(200).fadeOut(200).fadeIn(200).fadeOut(200).fadeIn(200);
   

    level=0;
    colorSeq=[];
    started=false;
}

// for checking answer
function check(idx){
    if(colorSeq[idx]!==currentSeq[idx]){
        gameOver();
    }else{
        if(idx+1===colorSeq.length){
            setTimeout(function(){
                nextSeq();
            },1000);
        }
    }
}

// start the game
$(document).keypress(function(){
    if(!started){
        started=true;
        nextSeq();    
    }
});



$(".btn").click(function(){
    if(!started){ 
        // after screwing around this project for sometime, i found out how setTimeout() really works.
        // if i click multilple times continously then some bug will occur(you can try it);
        // that bug is due to the fact that setTimeout() function doesnt block the excution of other part of the code.
        playAudio("wrong");
        $("#level-title").text("Press some keys");
        setTimeout(function(){
            $("#level-title").text("Press A Key to Start");// previously i used temperorary variable to store value of title.
        },400);
    }else{
        playAudio(this.id);  // this => tells us current context
        animate($(this).attr("id"));
        currentSeq.push($(this).attr("id"));
        check(currentSeq.length-1);
        
    }
});

