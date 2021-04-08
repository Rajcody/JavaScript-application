  function catGen(){
     var image= document.createElement('img');
     var div=document.getElementById('cat-gen');
     image.src="http://thecatapi.com/api/images/get?format=src&type=gif";
     div.appendChild(image);

}

function getDays(){
    var age = prompt('What is your birth year?');
    var days = (2021- age)*365;
    var h1 = document.createElement('h1');
    var text=document.createTextNode('You are'+" " + days +' days old');
    h1.appendChild(text);
    var div = document.getElementById('yo');
    div.appendChild(h1);
}
function reset(){
    document.getElementById('yo').remove();
}
function play(yourChoice){
    console.log(yourChoice);
    var humanChoice, botChoice;
    humanChoice= yourChoice.id;
    botChoice= choose(intValue());// we recieve a number from here 
    console.log('computer choice', botChoice);
     
  // time to decide winner
  var  results= decidewinner(humanChoice, botChoice);

  console.log(results);
  message= finalmessage(results);
  console.log(message);
  front(yourChoice.id, message , botChoice);



}    
function intValue(){
        return Math.floor(Math.random()*3); // gives value  {0,1,2}
}

function choose(number){
    return ['rock', 'paper', 'scissors'][number]; // property of arrays->> gives a value 

}

function decidewinner(yourChoice, computerChoice){
    var db={
        'rock':{ 'scissors': 1, 'rock':0.5 ,'paper':0},
        'scissors':{ 'scissors': 0.5, 'rock':0 ,'paper':1},
        'paper':{ 'scissors': 0, 'rock':1,'paper':0.5}
    };
    var yourscore = db[yourChoice][computerChoice];
    var compscore =db[computerChoice][yourChoice];
    return [yourscore,compscore];

}
function finalmessage([yourscore, compscore]){
    if(yourscore===0){
        return {'message': 'You Lost!', 'color':'red'};
    }else if(yourscore===0.5){
        return {'message': 'You Drew!', 'color':'yellow'};
    }else{
        return {'message': 'You WON!', 'color':'green'};
    }
    

}
function front(humanImage, finalmessage, botImage){
    var imgdb={
        'rock': document.getElementById("rock").src ,
        'scissors': document.getElementById("scissors").src,
        'paper': document.getElementById("paper").src
    };
// lets remove them
            document.getElementById('rock').remove();
             document.getElementById('scissors').remove();
            document.getElementById('paper').remove();


            var humandiv= document.createElement('div');
            var botdiv =document.createElement('div');
            var messgdiv= document.createElement('div');


            humandiv.innerHTML= "<img src='" + imgdb[humanImage] + "' height =150 width=150 style='box-shadow: 0px 10px 50px rgba(37,50,233,1)'>"
            messgdiv.innerHTML= "<h1 style =' color: " + finalmessage['color'] + "; font-size:60px ; padding: 30px;'>" +finalmessage['message'] + "</h1>"
            botdiv.innerHTML= "<img src='" +imgdb[botImage]+ "' height =150 width=150 style='box-shadow: 0px 10px 50px rgba(37,50,233,1)'>"

            document.getElementById('game').appendChild(humandiv);
            document.getElementById('game').appendChild(messgdiv);
            document.getElementById('game').appendChild(botdiv);

}
// change -color

// first let us get all the buttons
var all_butt= document.getElementsByTagName('Button');
console.log(all_butt);
 var copybutt= [];

 for(let i=0;i<all_butt.length;i++){
     copybutt.push(all_butt[i].classList[1]);
 }
 console.log(copybutt);
function yoo(buttonThingy){
    console.log(buttonThingy.value);

    if(buttonThingy.value==='Red'){
        buttonRed();
    }
    if(buttonThingy.value==='Blue'){
        buttonBlue();
    }
    if(buttonThingy.value==='Green'){
        buttonGreen();
    }
    if(buttonThingy.value==='Yellow'){
        buttonYellow();
    }
    if(buttonThingy.value==='Reset'){
        buttonReset();
    }
    if(buttonThingy.value==='Random'){
        buttonRandom();
    }


}


function buttonRed(){
    for(let i=0;i<all_butt.length;i++){
        all_butt[i].classList.remove(all_butt[i].classList[1]);
        all_butt[i].classList.add('btn-danger');
    }

}
function buttonBlue(){
    for(let i=0;i<all_butt.length;i++){
        all_butt[i].classList.remove(all_butt[i].classList[1]);
        all_butt[i].classList.add('btn-primary');
    }

}
function buttonGreen(){
    for(let i=0;i<all_butt.length;i++){
        all_butt[i].classList.remove(all_butt[i].classList[1]);
        all_butt[i].classList.add('btn-success');
    }

}
function buttonYellow(){
    for(let i=0;i<all_butt.length;i++){
        all_butt[i].classList.remove(all_butt[i].classList[1]);
        all_butt[i].classList.add('btn-warning');
    }

}
function buttonReset(){
    for(let i=0;i<all_butt.length;i++){
       
        all_butt[i].classList.remove(all_butt[i].classList[1]);
        all_butt[i].classList.add(copybutt[i]);
    }

}

function buttonRandom(){

    let  choicee=['btn-primary', 'btn-danger', 'btn-success', 'btn-warning'];


    for(let i=0;i<all_butt.length;i++){

        let ran= Math.floor(Math.random()*4);


       
        all_butt[i].classList.remove(all_butt[i].classList[1]);
        all_butt[i].classList.add(choicee[ran]);
    }

}
//black-jack

let blackjackgame={
    'You':{'scoreSpan':'#your-score', 'div':'#your-box','score':0},
    'Dealer':{'scoreSpan':'#bot-score','div':'#bot-box', 'score':0},
    'cards':['2','3','4','5','6','7','8','9','10','K','Q','A','J'],
    'cardmap':{'2':2,'3':3,'4':4,'5':5,'6':6,'7':7,'8':8,'9':9,'10':10,'K':10,'Q':10,'J':10,'A':[1,11]},
    'wins':0,
    'loss':0,
     'draw':0,
     'istand': false,
     'turnover': false,
};

const YOU= blackjackgame['You']
const DEALER= blackjackgame['Dealer']
//sounds

const hitsound= new Audio('sounds/swish.m4a');
const winsound =new Audio('sounds/cash.mp3');
const lossound= new Audio('sounds/aww.mp3');

document.querySelector('#blu').addEventListener('click',blacjackHit);
function blacjackHit(){
      if(blackjackgame['istand']=== false){
        let hee= pickcard();
        console.log(hee);
         showcard(hee,YOU);
         updateScore(hee,YOU);
         console.log(YOU['score']);
         showscore(YOU);

      }
      

// now to show a pic of card randomly -->>> use string templates inside haptics`` and instead of Q use a variable ${card}
// this {card } is nothing but the randow value of the url.
}
function pickcard(){
    let index= Math.floor(Math.random()*13);
    return blackjackgame['cards'][index];


}


function showcard(hee, activep){
    if(activep['score']<=21){
        var imgcard= document.createElement('img');
        imgcard.src= `images/${hee}.png` ;
        document.querySelector(activep['div']).appendChild(imgcard);
        hitsound.play();
        
    }
    
    
}
document.querySelector('#rd').addEventListener('click',blackjackDeal);
document.querySelector('#ylw').addEventListener('click',dealerLogic);

function blackjackDeal(){
    if (blackjackgame['turnover']=== true){
            
            blackjackgame['istand']= false;
        
            let yourimg =document.querySelector('#your-box').querySelectorAll('img');
            let botimg =document.querySelector('#bot-box').querySelectorAll('img');

            for (let i=0;i<yourimg.length;i++){
            
            
                yourimg[i].remove();
            

            }
        
        for(i=0;i<botimg.length;i++){
            botimg[i].remove();
        }

        YOU['score']=0;
        DEALER['score']=0;
        document.querySelector('#your-score').textContent=0; 
        document.querySelector('#bot-score').textContent=0; 
        document.querySelector('#your-score').style.color='white';
        document.querySelector('#bot-score').style.color='white';
        document.querySelector('#ya').textContent="Let's Playy";
        document.querySelector('#ya').style.color="black";

        blackjackgame['turnover']= true;

    }
   
    

}
function updateScore(hee,activep){
    //if adding 11  makes me stay below 21 add, else add 1.
    if(hee=='A'){
        if(activep['score'] +blackjackgame['cardmap'][hee][1]<=21){
            activep['score']+= blackjackgame['cardmap'][hee][1];
        }
    else {
        activep['score']+= blackjackgame['cardmap'][hee][0];
    }
}
    else
    {
        activep['score']+= blackjackgame['cardmap'][hee];
    }
    

}
function showscore(activep){
    if(activep['score']>21){
        document.querySelector(activep['scoreSpan']).textContent='Bust';
        document.querySelector(activep['scoreSpan']).style.color='red';
    }else{
        
        document.querySelector(activep['scoreSpan']).textContent=activep['score'];
        

    }
        
    }
    // now comes the bot
    function sleep(ms){
        return new Promise(resolve => setTimeout (resolve,ms));
    }
     async function dealerLogic(){
        blackjackgame['istand']= true;

        while(DEALER['score']<16 && blackjackgame['istand']===true){
            let hee= pickcard();
        
         showcard(hee,DEALER);
         updateScore(hee,DEALER);
         console.log(DEALER['score']);
         showscore(DEALER);
         await sleep(1000); 
        }
         

         
             blackjackgame['turnover']= true;
            let winnerr= computewinner();
             showresult(winnerr);

         
          

        
        
         
        

    }
    function computewinner(){
        let winnerr;


        // if your score is < =21 but dealer busts 

        if (YOU['score'] <=21){
            if(YOU['score']>DEALER['score'] || (DEALER['score']>21)){
                blackjackgame['wins']++;
                winnerr=YOU;
            }
            else if(YOU['score']< DEALER['score']){
               blackjackgame['loss']++;
                winnerr=DEALER;
                
            }else if(YOU['score']===DEALER['score']){
               blackjackgame['draw']++;
    
            }

        } else if(YOU['score']>21 &&  DEALER['score']<=21){
            blackjackgame['loss']++;
            winnerr=DEALER;
        }  
          
        
        else if (YOU['score']>21 && DEALER['score']>21){
            blackjackgame['draw']++;

        }
        
       
        console.log('winner is ', winnerr);
        console.log(blackjackgame);
        return winnerr;

    }

    function showresult(winnerr){
        let mesg, mesgcolor;

      if (blackjackgame['turnover']===true) {
        if(winnerr===YOU){
            document.querySelector('#win').textContent= blackjackgame['wins'];
            mesg='YOU WON ';
            mesgcolor='green';
            winsound.play();
        }else if (winnerr===DEALER){
            document.querySelector('#lose').textContent=blackjackgame['loss'];
            mesg='YOU LOST, DEALER WON ';
            mesgcolor='red';
            lossound.play();
        } else{
            document.querySelector('#draw').textContent=blackjackgame['draw'];
            mesg='You drew';
            mesgcolor='black';

        }

        document.querySelector('#ya').textContent= mesg;
        document.querySelector('#ya').style.color= mesgcolor;

      }  
        

    }
   


