var steps = {}; //Object storing the steps taken
var possible = []; //Array storing the positions left open
var win; //Variable to hold win condition(Who won)

//Initialize the board array
function MakeBoard(board){
  for(var i = 0; i < 3; i++){
    board.push(["*", "*", "*"]);
  }
  return board
}
//Print the board array in the form of buttons
function PrintBoard(board, location){
  var tilenum = 1;
  location.innerHTML = ""
  for(var i = 0; i < board.length ; i++){
    for(var j = 0; j < board[i].length; j++){
      var each = "<button class = 'tile-default' id='tile" + (tilenum).toString()+ "'> " + board[i][j] + "</button>"
      location.innerHTML += each;
      tilenum += 1;
    }
    location.innerHTML += "<br />"
  }
}
//Check position to see if it is valid or not
function checkpos(position){
  if($(position).text() !== " *"){
    return "INV"
  }
}
//Update the board
function updateboard(char, position){
  $(position).text(char);
}
//get char at a position
function getchar(position){
  return $(position).text();
}
//Get possible free locations
function getfree(){
  possible = []
  var setpnum = Object.keys(steps);
  var zeronine = [1,2,3,4,5,6,7,8,9];
  for(var i = 0; i < zeronine.length; i++){
    var temp = parseInt(zeronine[i]);
    var present = false;
    console.log("present is", present)
    for(var k = 0; k < setpnum.length; k++){
      if(setpnum[k] == temp){

        present = true;
        console.log("present is", present)
        break;
      }
    }
    console.log("temp is ", temp)
    console.log("present is", present)
    if(present == false){
      possible.push(temp);
    }
  }
  return possible;
}
function getbest(){
  var pos_id = []
  for(var p = 0; p< possible.lenght; p++){
    var temp = "#test" + possible[p].toString();
    pos_id.push(temp);

  }
  for(var t = 0 ; t < possible.length; t++){
    var best = possible[t];
    var max_score = 0;
    for(var k = t+1; k < possible.length; k++){
      var temp = possible[k];
      if(Math.abs(temp-best) == 3 || Math.abs(temp-best) == 1 || Math.abs(temp-best) == 4){
        return best;
      }
    }
  }
}
//The game AI
function AI(){

  var pos = Math.random(0, 10) * 10;
  pos = Math.floor(pos);

  console.log("pos is " ,pos)

  console.log("AI PLAYING")
  var changeid = "#tile" + pos.toString();
  console.log("AI changeid ", changeid)

  var check = checkpos(changeid);
  console.log("check is ", check);
  console.log("AI END")

  while(check == "INV"){
    var pos = Math.random(0, 10) * 10;
    pos = Math.floor(pos);

    console.log("pos is " ,pos)

    console.log("AI PLAYING")
    var changeid = "#tile" + pos.toString();
    console.log("AI changeid ", changeid)

    var check = checkpos(changeid);
    console.log("check is ", check);
    console.log("AI END")

  }
  steps[pos] = "0";
  updateboard("0", changeid);
}

//Evaluate
function evaluate(){
  var positions = Object.keys(steps);
  for(var i = 0; i < positions.length; i++){
    var index = parseInt(positions[i]);
    var char = steps[index];

    if(char == steps[index+1] && char == steps[index+2]){
      if(char == "X"){
        return "UWIN"
      }else if(char == "0"){
        return "CWIN"
      }
     }

     if(char == steps[index+3] && char == steps[index+6]){
       if(char == "X"){
         return "UWIN"
       }else if(char == "0"){
         return "CWIN"
       }
      }

      if(char == steps[index+4] && char == steps[index+8]){
        if(char == "X"){
          return "UWIN"
        }else if(char == "0"){
          return "CWIN"
        }
       }

    }
  }
//Get all the user steps
function getusersteps(){
  for(var o = 0; o < steps.length; o++){
    
  }
}

//The actual game
document.addEventListener("DOMContentLoaded", function(event){
  var game = document.querySelector("#game");
  console.log("Begin");
  var board = []
  board = MakeBoard(board);
  console.log("Board : ", board)
  PrintBoard(board, game);
  // var tnum = 1;
  // for(var t = 0; t < 9; t++){
  //   var selector = ".tile" + tnum.toString();
  //   var tile = document.querySelector(selector);
  //   tile.addEventListener("click", evaluate);
  //   tnum += 1;
  // }
  game.addEventListener("click", function(event){
    possible = getfree();
    getbest();
    setInterval(function(){win = evaluate(); console.log("WIN is", win)}, 1000);
    if(win == undefined){
    if(event.target !== event.currentTarget){
      console.log("HERE");
      var clickeditem = event.target.id;
      var clickedid = "#" + clickeditem;
      console.log("click at "  + clickeditem)
      var check = checkpos(clickedid);
      if (check == "INV"){
      	alert("Invalid Position")
      }else{
        steps[clickeditem[4]] = "X";
      	updateboard("X", clickedid);
        $(".loader").removeClass("hidden");

        setTimeout(
          function(){
            if(win == undefined){
              console.log("AI CALLED")
              AI();
            }

          }, 1020);
        setTimeout(
          function(){
            $(".loader").addClass(" hidden");
          }, 1020);
      }
    }
    event.stopPropogation;
  }
 //Force computer to check if win condition is satisfied
setInterval(function(){
    if(win == "UWIN" || win == "CWIN"){
      console.log(win);
      board = MakeBoard(board);
      if(win[0].toLowerCase() == "u"){
        $("#game").html("<h1>User Won</h1>");
      }else{
        $("#game").html("<h1>Computer Won</h1>");
      }
    }
  }, 1000)

  });

});
