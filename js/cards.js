
let firstClick=1;
let firstClickId="";
let firstClickPosition=-1;
let firstClickElement=null;
let secondClickElement=null;
let pictureup=0; /*counts the number of picture that has been turned up to know when the user has won*/

let statusArray=[]; /*Keeps tract of pictures that have been turned up. Further clicks on such pictures have no effect*/
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
    	box.addEventListener("click",function(event){
    	let posn=new Number(i*4+j);
    	box.setAttribute("id",posn); 
    		position=Number(event.target.id);/*The position in the grid is obtainable from the id of the box*/
    		if (statusArray[position]=="down"){
    			if (firstClick==1){  /*This is a first clik of a pair*/
    				let myelement=document.getElementById(event.target.id);
    				firstClickPosition=position; /*note the grid position*/
    				statusArray[position]="up";  /*Change the status of the card to up so that further click on it won't have any effect*/
    				firstClickElement=event.target; 
    				firstClick=0;
    				/*The click was on the box- The firstchild is the picture- We need to sore this element in a variable
    				 to compare with the next element clicked*/
    				let element=event.target.firstChild;
    				firstClickElement=element;
    				element.setAttribute("style","display:block"); /*After the click on the block the picture is displayed*/
    				    				   }
    		     else{
    		     	statusArray[position]="up";
    		     	firstClick=1;
    				let element=event.target.firstChild;
    				element.setAttribute("style","display:block");
    				if (firstClickElement.id!=element.id){
    					statusArray[firstClickPosition]="down";
    			    	statusArray[position]="down";
    			    	secondClickElement=element;
    			    	setTimeout(myFunction,800);
    			    }
    			    else {
    			    	pictureup +=2;
    			    }
    				}

    		     }
    		     if (pictureup==16){
    		     	alert("You have won");
    		     }
    		
    	})
    	div1.appendChild(box);
        div.appendChild(div1);
    }
    
     myframe.appendChild(div);
}
 /*courtesy- https://unsplash.com/search/photos/flora-and-fauna*/
let pictureArray=[`<img id=picture1 src="images/picture1.jpg" alt="picture1">`, `<img id=picture2 src="images/picture2.jpg" alt="picture2">`,
                   `<img id=picture3 src="images/picture3.jpg" alt="picture3">`, `<img id=picture4 src="images/picture4.jpg" alt="picture4">`,
                   `<img id=picture5 src="images/picture5.jpg" alt="picture5">`,`<img id=picture6 src="images/picture6.jpg" alt="picture6">`,
                  `<img id=picture7 src="images/picture7.jpg" alt="picture7">`,`<img id=picture8 src="images/picture8.jpg" alt="picture8">`,
                  `<img id=picture1 src="images/picture1.jpg" alt="picture1">`, `<img id=picture2 src="images/picture2.jpg" alt="picture2">`,
                   `<img id=picture3 src="images/picture3.jpg" alt="picture3">`, `<img id=picture4 src="images/picture4.jpg" alt="picture4">`,
                   `<img id=picture5 src="images/picture5.jpg" alt="picture5">`,`<img id=picture6 src="images/picture6.jpg" alt="picture6">`,
                  `<img id=picture7 src="images/picture7.jpg" alt="picture7">`,`<img id=picture8 src="images/picture8.jpg" alt="picture8">`]
                  

/*shuffle the array- To randomize */
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

function myFunction(){
 firstClickElement.setAttribute("style","display:none");
 secondClickElement.setAttribute("style","display:none");
}




