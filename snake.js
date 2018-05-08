(function (){    
    "use strict";
	var height = 20;
	var width = 20;
    var grid = 40;
    var speed = 50;
    
	var playArea = [];
	var playerX = Math.floor(width/2);
	var playerY = Math.floor(height/2);    
	var dotX = Math.floor(Math.random() * width);		   
	var dotY = Math.floor(Math.random() * height);
	var player = [];
	var direction = 0;
    var prevDir = 0;
    var speed = 50;
    var myVar;
    var frameTog = true;  
    var paused = false;
    var keybuffer = [];
	function init() {
        document.getElementById("play_area").style.width = (width * grid + 1).toString() + "px";
        document.getElementById("play_area").style.height = (height * grid + 1).toString() + "px";
		for (var i = 0; i < height; i++) {
			var tempArr = []
			for (var j = 0; j < width; j++) {
                var div = document.createElement("div");
                div.className = "block";
                document.getElementById("play_area").appendChild(div);
				tempArr.push(div);
			}
			playArea.push(tempArr);            
		}
		player.unshift([playerY, playerX])
		playArea[playerY][playerX].className = "block head";
	}
	
    function printArea() {
		for (var i = 0; i < height; i++) {
			for (var j = 0; j < width; j++) {
                playArea[i][j].style.cssText = null;
                playArea[i][j].className = "block";
			}         
		}
        
        playArea[playerY][playerX].className = "block head";
        switch (direction) {
		  case 0:
			playArea[playerY][playerX].style.borderBottomLeftRadius = "100%";
            playArea[playerY][playerX].style.borderTopLeftRadius = "100%";
			break;
		  case 1:
			playArea[playerY][playerX].style.borderTopRightRadius = "100%";
            playArea[playerY][playerX].style.borderTopLeftRadius = "100%";
			break;
		  case 2:
            playArea[playerY][playerX].style.borderTopRightRadius = "100%";
			playArea[playerY][playerX].style.borderBottomRightRadius = "100%";
			break;
		  case 3:
			playArea[playerY][playerX].style.borderBottomRightRadius = "100%";
            playArea[playerY][playerX].style.borderBottomLeftRadius = "100%";
			break;
		  default:
	   }
        
        for (var i = 1; i < player.length; i++) {		
            playArea[player[i][0]][player[i][1]].style.backgroundColor = "rgb(" + Math.ceil((160 - (100/player.length * i))).toString() + "," + Math.ceil((255 - (200/player.length * i))).toString() + "," + Math.ceil((150 - (90/player.length * i))).toString() + ")";
            playArea[player[i][0]][player[i][1]].style.opacity = ((0.5 * (i/player.length)) + 0.5).toString();
            if (i == 1) {
                playArea[player[i][0]][player[i][1]].style.transition = "border-radius 0s";
            }
		}
        
       playArea[dotY][dotX].className = "block dot";
	}
    
    function win() {
        alert("You Win!");
        clearInterval(myVar);
    }
    
    function lose() {
        alert("You Lose!");
        clearInterval(myVar);
    }   

    function loseCheck() {
        for (var i = 0; i < player.length; i++) {
			if (player[i][0] == playerY && player[i][1] == playerX) {
                lose();
            }
		}
    }
    
	function moveRight() {
		if (playerX + 1 < width) {            
			playerX++;
            loseCheck();
		} else {
            lose();
        }
	}
	
	function moveLeft() {
		if (playerX - 1 > -1) {
			playerX--;
            loseCheck();
		} else {
            lose();
        }
	}
	
	function moveUp() {
		if (playerY - 1 > -1) {
			playerY--;
            loseCheck();
		} else {
            lose();
        }
	}
	
	function moveDown() {		
		if (playerY + 1 < height) {
			playerY++;
            loseCheck();
		} else {
            lose();
        }
	}
	
	function move() {
		 switch (keybuffer.pop()) {
          case 37:
            if (prevDir != 2) {
                direction = 0;
            }
            break;
          case 38:
            if (prevDir != 3) {
                direction = 1;
            }
            break;
          case 39:
            if (prevDir != 0) {
                direction = 2;
            }
            break;
          case 40:
            if (prevDir != 1) {
                direction = 3;
            }
            break;
          default:
        }      
        var end = player.pop();
        switch (direction) {
		  case 0:
			moveLeft();
			break;
		  case 1:
			moveUp();
			break;
		  case 2:
			moveRight();
			break;
		  case 3:
			moveDown();
			break;
		  default:
	   }
	   player.unshift([playerY, playerX])
	   if (playerX == dotX && playerY == dotY) {		
           if (player.length == width * height) {
               win();
           } else {
               player.push(end);
               var flag = true;
               while (flag) {
                    flag = false;
                    dotX = Math.floor(Math.random() * width);
                    dotY = Math.floor(Math.random() * height);
                    for (var i = 0; i < player.length; i++) {		
                        if (player[i][0] == dotY && player[i][1] == dotX) {
                            flag = true;
                        }
                    }
                }
           }
	   }	   
	}
	
    function restart() {
        document.getElementById("play_area").innerHTML = "";
        playArea = [];
        playerX = Math.floor(width/2);
        playerY = Math.floor(height/2);
        var flag = true;
        while (flag) {
            flag = false;
            dotX = Math.floor(Math.random() * width);
            dotY = Math.floor(Math.random() * height);
            for (var i = 0; i < player.length; i++) {		
                if (player[i][0] == dotY && player[i][1] == dotX) {
                    flag = true;
                }
            }
        }        
        player = []
        direction = 0;
        prevDir = 0;
        frameTog = true;
        paused = false;
        clearInterval(myVar);
        init();
        printArea();
        setTimeout(function () {        
            myVar = setInterval(function(){
                 if (frameTog && !paused) {
                    move();            
                    printArea();
                    prevDir = direction;
                }
                frameTog = !frameTog;
            }, speed);
        }, 1000);
    }
    
	window.onload = function() {
        init();
        var flag = true;
        while (flag) {
            flag = false;
            dotX = Math.floor(Math.random() * width);
            dotY = Math.floor(Math.random() * height);
            for (var i = 0; i < player.length; i++) {		
                if (player[i][0] == dotY && player[i][1] == dotX) {
                    flag = true;
                }
            }
        } 
        printArea();        
        setTimeout(function () {        
            myVar = setInterval(function(){
                if (frameTog && !paused) {
                    move();            
                    printArea();
                    prevDir = direction;
                }
                frameTog = !frameTog;
            }, speed);
        }, 1000);
        
        
        document.getElementById("restart").onclick = function() {
            restart();
        }
        
        document.getElementById("pause").onclick = function() {            
            paused = !paused;
            if (paused) {
                document.getElementById("pause").innerHTML = "UNPAUSED";
            } else {
                document.getElementById("pause").innerHTML = "PAUSED";
            }
        }
        
        document.getElementById("new_game").onclick = function() {
            var newWidth = Math.floor(document.getElementById("width").value);
            var newHeight = Math.floor(document.getElementById("height").value);
            
            if (newWidth >= 4 && newWidth <= 20 && newHeight >= 4 && newHeight <= 20) {            
                width = newWidth;
                height = newHeight;
                speed = 225 - document.getElementById("speed").value; 
                restart();
            } else {
                alert ("Invalid Width or Height Value");
            }
        }
        
        var fields = document.getElementsByClassName("tfield");
        for (var i = 0; i < fields.length; i++) {
            fields[i].onchange = function() {
                var val = this.value;
                this.value = Math.floor(val);
            }
        }
	};
	
	window.onkeydown = function(event) {
        switch (event.keyCode) {
          case 37:
            if (prevDir != 2) {
                keybuffer.unshift(event.keyCode);
            }
            break;
          case 38:
            if (prevDir != 3) {
                keybuffer.unshift(event.keyCode);
            }
            break;
          case 39:
            if (prevDir != 0) {
                keybuffer.unshift(event.keyCode);
            }
            break;
          case 40:
            if (prevDir != 1) {
                keybuffer.unshift(event.keyCode);
            }
            break;
          default:
        }
	} 

}());