
////////////////////////
//CSMA101             //
//Intro to Programming//
//Fall 19             //
//Professor Theohar   //
//John Henry Sarancik //
//562-846-2322        //
////////////////////////

var data = [];
var maxData;

var dataSet;
var lifeExp = [];
var countryNames = [];

var inp;

function preload(){
    
    dataSet = loadTable("Assets/LED.csv") 
   
}

function setup() {
    
    createCanvas(3000, 2000);
    
    angleMode(DEGREES);
    
    colorMode(HSB, 360, 100, 100);  
    
    
//gets life expectancy data 
    for(var i = 0; i < dataSet.getRowCount(); i ++){

        if(dataSet.getString(i, 0)){
            
            lifeExp[i] = int(dataSet.getString(i, 0));
            
    }
    }
//gets country name data   
    for(var i = 0; i < dataSet.getRowCount(); i ++){

        if(dataSet.getString(i, 1)){
            
            countryNames[i] = dataSet.getString(i, 1);
            
        }
    }
        

    maxData = max(lifeExp);
    
    
//properties of the input field
 
    inp = createInput();
    inp.position(1850, 150);
    inp.size(300, 50);
    
}


function draw() {
        
    background(0);
  
    noStroke();
    
    push();
    
    fill(255);
    textSize(60);
    
    text("Country Life Expectancies Worldwide (2015)", 100, 75);
    
    textSize(36);
    text("Type a number from 0 - 179", 1800, 100);
    
    text("*Will display country and its life expectancy based on corresponding number inputed*", 100, 150);
    
    text("*See Legend on the right for numbers to countries*", 100, 200)
    
    text("*Make sure to delete your previous number before inputing another*", 100, 250);
    
    text("*Dataset borrowed from the Global Health Observatory, kaggle.com*", 300, 1980);
    
    pop();
    
    var angleSeparation = 360 / lifeExp.length;
    var padding = 200;
    
//for animation, tells when to stop growing
    if (frameCount <= 400) {
      
        maxValue = constrain(frameCount * 2, 0, 400);
        
    } else {
      
        maxValue = 400;
    }
    
//dictates the size of the inner "circle"  
        var innerCircleSize = 500;
    
//dictates the ratio between each other rectangle, makes their difference more apparent
        var dataMultiplier = (height/2-innerCircleSize-padding) / maxData;

//maps the life expectancy of each country to the height of the rectangles
    for (var i = 0; i < lifeExp.length; i++) {
      
        push();
    
        var finalHeight = lifeData * dataMultiplier;
        var animatedHeight = map(maxValue, 0, 400, 0, finalHeight);
        var lifeData = lifeExp[i];
      
        translate(width / 4 + 75, height / 2 + 150);
        fill(angleSeparation * i, 360, 360);
        
//rectangles are rotated based on their index and a fraction of 360 degrees
        rotate(angleSeparation * i);
      
        rect(0, innerCircleSize, 15, animatedHeight);
      
      
        pop();
      
  }
    
//displays the country name below the corresponding rectangles
    for(var i = 0; i < countryNames.length; i++){
        
    push();
    
    
    var nameData = countryNames[i];
      
    translate(width / 4 + 75, height / 2 + 150);
    fill(angleSeparation * i, 360, 360);
    rotate(angleSeparation * i);
      
   
    push();
    rotate(270);
    text((nameData), -innerCircleSize, 20);
    
    
    pop();
    pop();
    }
    
    
    for(var i = 0; i < countryNames.length; i++){
        
        push();
        
        var legendNames = countryNames[i];
        var xPos;
        var yPos;
        
        if(i < countryNames.length/2){
        
            xPos = 1700;
            yPos = 250;
            textSize(19);
            text(i + ": " + (legendNames), xPos, yPos + (i * 19));
            
        }
        
        if(i >= countryNames.length/2){
        
            xPos = 2200;
            yPos = 250;
            textSize(19);
            text(i + ": " + (legendNames), xPos, yPos + (i * 19) - 1700);
            
        }
        
        pop();
    }
    
   displayInfo();

}

//displays country name and life expectancy in the center in white based on the index typed into the search bar

function displayInfo(){
    

    fill(255);
    var lifeExpValue = lifeExp[int(inp.value())];
    var countryNameValue = countryNames[int(inp.value())];
    
    push();
        
    textSize(76);
    textAlign(CENTER);
    fill(255);
    stroke(0);
    strokeWeight(3);
    
    text(`${lifeExpValue}`, width/4 + 75, height/2 + 150);
    text(`${countryNameValue}`, width/4 + 75, height/2 + 250);
    
    pop();
        
}
    
