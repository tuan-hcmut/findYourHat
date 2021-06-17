const prompt = require('prompt-sync')({
  sigint: true
});

const hat = '^';
const hole = 'O';
const fieldCharacter = '░';
const pathCharacter = '*';
const correct = ''
class Field{
  constructor(level, array){
    this.field = array;
    this.level = level;
    this.rowLocation = 0;
    this.collLocation = 0;
    this.trackRowOfChar = 1;
    this.trackCollOfchar = 1;
  }
  levelGame(){
    console.log("                                      #   #  ####  #     #     ####     #### ####   ####                        ");
    console.log("                                      #   #  #     #     #     #  #     #  # #  #   #  #                        ");
    console.log("                                      # # #  ####  #     #     #  #     #### ####   #  #                        ");
    console.log("                                      #   #  #     #     #     #  #     #  # #  #   #  #                        ");
    console.log("                                      #   #  ####  ####  ####  ####     #### #   #  ####                        ");
    while(true){
    this.level = prompt('WHAT LEVEL YOU WANT TO TRY ? EASY OR HARDCORE ? ');
    if(this.level === 'hardcore') {
      console.log("THAT'S COOL ^_^, NOW LET'S STARTED");
      break;
    }else if(this.level === 'easy'){
      console.log("OK, NOW LET'S STARTED");
      break;
    }else {
      console.log('SOMTHING WRONG, PLEASE TRY AGIAN!, REMEMBER THAT TYPING CORRECT KEYWORD.');
    }
  }
  }
   makeBackground(row, collum, hatLocation){
    // make backgound by matrix with n*m element ░
    let matrix = new Array(row);
    for (let i = 0; i < row; i++) {
      matrix[i] = new Array(collum);
    }
    //changes all undefined slots to fieldCharacter
    for (let i = 0; i < row; i++) {
      for (let j = 0; j < collum; j++) {
        matrix[i][j] = fieldCharacter;
      }
    }
  // create random holes
    let numOfHoles = Math.ceil((row*collum)/5);
    while(numOfHoles !== 0 ){
      let randomRow = Math.floor(Math.random()*row);
      let randomCol = Math.floor(Math.random()*collum);
      if(randomCol != 0 && randomRow != 0){
        matrix[randomRow][randomCol] = hole;
        numOfHoles--;
      }
  }
   // add pathCharacter into the matrix
   if(this.level === 'easy'){
     matrix[0][0] = pathCharacter;
    
   }else if(this.level === 'hardcore'){
    let randomRow = Math.floor(Math.random()*row);
    let randomCol = Math.floor(Math.random()*collum);
    matrix[randomRow][randomCol] = pathCharacter;
    this.rowLocation = randomRow;
    this.collLocation = randomCol;
   }
   // add hat into the matrix 
   if(this.level === 'easy'){
    let randomRow = Math.floor(Math.random()*row);
    let randomCol = Math.floor(Math.random()*collum);
    matrix[randomRow][randomCol] = hat;
   }else if(this.level === 'hardcore'){
     let count = 2;
     while(count !== 0){
    let randomRow = Math.floor(Math.random()*row);
    let randomCol = Math.floor(Math.random()*collum);
    if(matrix[randomRow][randomCol] !== hole && matrix[randomRow][randomCol] !== hat){
    matrix[randomRow][randomCol] = hat;
    count --;
    }
     }
   }
   return this.field = matrix;
  }
  // show the field
  print(){
    for(let element of this.field){
      console.log(element.join(''))
    }
  }
  hardMode(matrix){
  const randomRow = Math.floor(Math.random()*matrix.length);
  const randomColl = Math.floor(Math.random()*matrix[0].length)
  while(true){
    if(matrix[randomRow][randomColl] !== hole && matrix[randomRow][randomColl] !== hat){
      matrix[randomRow][randomColl] = hole;
      break;
    }
  }
  return matrix;
  }
  runGame(){
    let check = 1;
    if(this.level === 'easy'){
      while(check !== 0 && check !== 2){ 
    this.print();
    this.question();
    // checking if pathCharacter is out of bound or reach the holes then check return false 
    if(this.rowLocation === -1 || this.collLocation === -1 || this.field[this.rowLocation][this.collLocation] === hole){
    check = 0;
    }else if(this.field[this.rowLocation][this.collLocation] === hat){
    check = 2;
    }
    else{
      if(this.trackCollOfchar === 0){
      this.field[this.rowLocation][this.collLocation + 1] = fieldCharacter;
      this.field[this.rowLocation][this.collLocation] = pathCharacter;
      this.trackCollOfchar = 1;
      }else if(this.trackCollOfchar === 2){
      this.field[this.rowLocation][this.collLocation - 1] = fieldCharacter;
      this.field[this.rowLocation][this.collLocation] = pathCharacter;
      this.trackCollOfchar = 1;
      }else if(this.trackRowOfChar === 0){
      this.field[this.rowLocation + 1][this.collLocation] = fieldCharacter;
      this.field[this.rowLocation][this.collLocation] = pathCharacter;
      this.trackRowOfChar = 1;
      }else if(this.trackRowOfChar === 2){
      this.field[this.rowLocation - 1][this.collLocation] = fieldCharacter;
      this.field[this.rowLocation][this.collLocation] = pathCharacter;
      this.trackRowOfChar = 1;
      }
    }
    console.clear();
      }
    }else if(this.level === 'hardcore'){
      while(check !== 0 && check !== 2){
        this.print();
        this.question();
        if(this.rowLocation === -1 || this.collLocation === -1 || this.field[this.rowLocation][this.collLocation] === hole){
          check = 0;
          }else if(this.field[this.rowLocation][this.collLocation] === hat){
              check = 2;
          }
          else{
            if(this.trackCollOfchar === 0){
            this.field[this.rowLocation][this.collLocation + 1] = hole;
            this.field[this.rowLocation][this.collLocation] = pathCharacter;
            this.trackCollOfchar = 1;
            }else if(this.trackCollOfchar === 2){
            this.field[this.rowLocation][this.collLocation - 1] = hole;
            this.field[this.rowLocation][this.collLocation] = pathCharacter;
            this.trackCollOfchar = 1;
            }else if(this.trackRowOfChar === 0){
            this.field[this.rowLocation + 1][this.collLocation] = hole;
            this.field[this.rowLocation][this.collLocation] = pathCharacter;
            this.trackRowOfChar = 1;
            }else if(this.trackRowOfChar === 2){
            this.field[this.rowLocation - 1][this.collLocation] = hole;
            this.field[this.rowLocation][this.collLocation] = pathCharacter;
            this.trackRowOfChar = 1;
            }
          }
          console.clear();
      }
    }
    if(check === 0){
      console.log("                                      #   #  ####  #  #     #     ####  ####  #####                  ");
      console.log("                                      #   #  #  #  #  #     #     #  #  #     #                      ");
      console.log("                                      # # #  #  #  #  #     #     #  #  ####  #####                  ");
      console.log("                                        #    #  #  #  #     #     #  #     #  #                      ");
      console.log("                                        #    ####  ####     ####  ####  ####  #####                  ");
    }else if(check === 2){
      console.log("                                      #   #  ####  #  #     #     #  ###  #    #                      ");
      console.log("                                      #   #  #  #  #  #     #     #   #   # #  #                      ");
      console.log("                                      # # #  #  #  #  #     #     #   #   #  # #                      ");
      console.log("                                        #    #  #  #  #     #  #  #   #   #   ##                      ");
      console.log("                                        #    ####  ####     ##   #   ###  #    #                      ");
    }
  }
  question(){
    let ans = prompt('WHICH WAY YOU WANT TO MOVE ?');
    switch(ans){
      case 'w':
        this.rowLocation -= 1;
        this.trackRowOfChar --;
        break;
      case 's':
        this.rowLocation += 1;
        this.trackRowOfChar++;
         break;
      case 'a':
        this.collLocation -= 1;
        this.trackCollOfchar--;
         break;
      case 'd':
        this.collLocation += 1;
        this.trackCollOfchar++;
         break;
      default:
        console.log("PLEASE, CHOOSE CORRECT KEYWORDS (w,s,a,d). REMEMBER YOU'VE BEEN TURN OFF CAPSLOCK KEYBOARD");
        this.question();
         break;
    }
  }
}


const field = new Field('',[]);
field.levelGame();
field.makeBackground(30,120,10);
field.runGame();
