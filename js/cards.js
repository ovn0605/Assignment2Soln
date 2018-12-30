

let starRating=3;
let firstClick=1;
let firstClickId="";
let firstClickPosition=-1;
let firstClickElement=null;
let secondClickElement=null;
let pictureup=0; /*counts the number of picture that has been turned up to know when the user has won*/
let countMove=0;
let pictureArray=[];
let Timer=displayTime();
let runTimer=0;
let statusArray=[]; /*Keeps tract of pictures that have been turned up. Further clicks on such pictures have no effect*/
let runtimeMintues=0;
let runTimeSeconds=0;

for (let i=0;i<16;i++){
	statusArray.push("down"); /*All the array positions are initialized to down*/
}

let myframe=document.querySelector("#mycontainer");
for (let i=0; i<4; i++){
    let div=document.createElement('div');
    div.setAttribute("class","row");/* create the row elements for using bootstrap*/

   for (let j=0;j<4;j++){
    	 let div1=document.createElement('div');
    	div1.setAttribute("class","col-xs-3"); /*using the bootstrap col-xs-3 class*/
    	let box=document.createElement('div'); /*creating a box at each grid position to hold a card*/
    	box.setAttribute("class","card");

    	/*setting the id of the box to a number value depending on its position in row and column- 
    	This makes it easy to work with the different arrays*/
    	
        let posn=new Number(i*4+j);
        box.setAttribute("id",posn); 
        box.addEventListener("click",function(event){
            
            

            let position=Number(event.target.id);//The position in the grid is obtainable from the id of the box
            
            if (statusArray[position]=="down"){
                 countMove++;
                 countMoveElement=document.getElementById("mymovecount");//mymovecount is used to display the count for number of moves
                 countMoveElement.innerHTML=countMove;
                if (countMove==1){
                    runTimer=setInterval(Timer,1000);
                 }

                 if (countMove>38)
                    starRating=1
                else if (countMove>32)
                     starRating=2;
                else starRating=3;
                setStars(starRating);

                  if (firstClick==1){  //This is a first clik of a pair
                    let myelement=document.getElementById(event.target.id);
                    firstClickPosition=position; //note the grid position
                    statusArray[position]="up";  //Change the status of the card to up so that further click on it won't have any effect
                    firstClickElement=event.target; 
                    firstClick=0;
                    //The click was on the box- The firstchild is the picture- We need to sore this element in a variable
                    // to compare with the next element clicked
                    let element=event.target.firstChild;
                    firstClickElement=element;
                    element.setAttribute("style","display:block"); //After the click on the block the picture is displayed
                                           }
                 else{ // This is the second click of a pair
                    /*preventing further mouse click until the processing is completed and both cards have been turned down if necessary*/
                    for (let i=0; i<16;i++){
                       element_i=document.getElementById(i);
                        element_i.style.pointerEvents = 'none';
                       }

                    statusArray[position]="up";
                    firstClick=1;
                    let element=event.target.firstChild;
                    element.setAttribute("style","display:block");
                    if (firstClickElement.id!=element.id){ //The two pictures are not the same
                        statusArray[firstClickPosition]="down";
                        statusArray[position]="down";
                        secondClickElement=element;
                        setTimeout(myFunction,500); //This function will turn both picture down then re-enble mouse click.
                       }
                    else { //both pictures are same. Update the number of pictures that are up and re-enable mouse click
                        pictureup +=2;
                        reenableClick();
                    }

                    }

                 }
                 if (pictureup==16){
                    let takentime=document.getElementById("playtime");
                    let totalmove=document.getElementById("totalmove");
                    let starrating=document.getElementById("starrating");
                    takentime.innerHTML=`Time Taken: ${runTimeMinutes} minutes and ${runTimeSeconds} seconds`;
                    totalmove.innerHTML=`No. of Moves: ${countMove}`;
                    starrating.innerHTML=`Star Rating: ${starRating}`;
                    mymodal=document.getElementById("mymodal");
                     mymodal.style.display="block";
                     //If user wins stop the timer
                     clearInterval(runTimer);
                     let span1=document.getElementsByClassName("replay")[0]; //Choosing Any Button from the modal
                    
                      span1.onclick=function(){
                         mymodal.style.display="none";
                       }
                      /*span1.onclick=function(){
                        console.log("Button No has been clicked");
                      mymodal.style.display="none";} */
                }                
                    
                
});
        div1.appendChild(box);
        div.appendChild(div1);
    }
    
     myframe.appendChild(div);
}

 /*courtesy- https://unsplash.com/search/photos/flora-and-fauna*/
function initialiseArray(){
pictureArray=[`<img id=picture1 src="images/picture1.jpg" alt="picture1">`, `<img id=picture2 src="images/picture2.jpg" alt="picture2">`,
                   `<img id=picture3 src="images/picture3.jpg" alt="picture3">`, `<img id=picture4 src="images/picture4.jpg" alt="picture4">`,
                   `<img id=picture5 src="images/picture5.jpg" alt="picture5">`,`<img id=picture6 src="images/picture6.jpg" alt="picture6">`,
                  `<img id=picture7 src="images/picture7.jpg" alt="picture7">`,`<img id=picture8 src="images/picture8.jpg" alt="picture8">`,
                  `<img id=picture1 src="images/picture1.jpg" alt="picture1">`, `<img id=picture2 src="images/picture2.jpg" alt="picture2">`,
                   `<img id=picture3 src="images/picture3.jpg" alt="picture3">`, `<img id=picture4 src="images/picture4.jpg" alt="picture4">`,
                   `<img id=picture5 src="images/picture5.jpg" alt="picture5">`,`<img id=picture6 src="images/picture6.jpg" alt="picture6">`,
                  `<img id=picture7 src="images/picture7.jpg" alt="picture7">`,`<img id=picture8 src="images/picture8.jpg" alt="picture8">`]
                  
}
/*shuffle the array- To randomize */
function reshuffleArray(){

let currentIndex=16;
while (0 != currentIndex) {

    // Pick a remaining element...
   let randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    let temporaryValue = pictureArray[currentIndex];
    pictureArray[currentIndex] = pictureArray[randomIndex];
    pictureArray[randomIndex] = temporaryValue;
  }

let k=0;
let selector=document.getElementsByClassName("card");
for (let i=0; i<selector.length;i++){
	let myelement=selector[i];
	myelement.innerHTML=pictureArray[k];
	myelement.firstChild.setAttribute("style","display:none");
	k++;
	}
}
setStars(starRating);

//This function displays the star rating a
function setStars(starNum){
    let str='<p>Star Rating:';
   //Display number of stars for star rating
    for (let i=0; i<starNum;i++){
        str=str + '<span class="stars glyphicon glyphicon-asterisk"></span>'
    }
   //If there is less than 3 *, put --- in place of *
    for (let i= starNum; i<3;i++){
        str=str+"-";
    }

    str=str+'</p>'
    let starElement=document.getElementById("mystar_rating");
    starElement.innerHTML=str;
}

function reenableClick(){
 for (let i=0; i<16;i++){
          element_i=document.getElementById(i);
           element_i.style.pointerEvents = 'auto';
                   }
}

//This function turns both cards adown if the cards don't match
// It then re-enbles clicks
function myFunction(){
 firstClickElement.setAttribute("style","display:none");
 secondClickElement.setAttribute("style","display:none");
 //re-enabling the mouse-click -after processing  
 reenableClick();           
}

//This function displays a timer that is updated every second.
function displayTime(){
  let seconds=0;
  let minutes=0;
  let stringSecond="";
  let stringMinute="";
  let myTimer=document.getElementById("mytimer");
  myTimer.innerHTML=`Timer: 00:00`;
  return function(){
     seconds=seconds+1;
  
  if (seconds>=60){
    seconds=seconds-60;
    minutes=minutes+1;
    //Time is reset after 1 hr
    if (minutes>60){
        minutes=0
      } }
      if (seconds<10)
          stringSecond="0"+seconds;
      else
         stringSecond=""+seconds;
     if (minutes<10)
        stringMinute="0"+minutes;
      else
        stringMinute=""+minutes;
      myTimer.innerHTML=`Timer: ${stringMinute}:${stringSecond}`;
      runTimeMinutes=minutes;
      runTimeSeconds=seconds;
    
}

}

function Reset(){
        starRating=3;
        firstClick=1;
        firstClickId="";
        firstClickPosition=-1;
        firstClickElement=null;
        secondClickElement=null;
        pictureup=0; /*counts the number of picture that has been turned up to know when the user has won*/
        countMove=0;
        countMoveElement=document.getElementById("mymovecount");
         countMoveElement.innerHTML=countMove;
        for (let i=0;i<16;i++){
             statusArray[i]="down"; /*All the array positions are initialized to down*/
        }
        reshuffleArray();
        setStars(starRating);
        clearInterval(runTimer);
        let mymodal=document.getElementById("mymodal");
         mymodal.style.display="none";
        Timer=displayTime();
}

//resetting the game when user presses the Reset Button
let resetButton=document.getElementById("mybutton");
resetButton.addEventListener('click',function(event){
           Reset();
            });


initialiseArray();
reshuffleArray();
Timer=displayTime();





