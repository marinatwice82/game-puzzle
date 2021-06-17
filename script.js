let str='';
str += '<h2>Puzzle Game</h2>';
str +='<h3>Количество ходов: <span id="numStep"></span></h3>';
str +=' <div id="sample_timer">00:00:00</div>';
str += '<h3>Выберите игровое поле:</h3>';
str += '<select id="select">';
str += '<option></option>';
str += '<option value="3">3x3</option>';
str += '<option value="4">4x4</option>';
str += '<option value="5">5x5</option>';
str += '<option value="6">6x6</option>';
str += '<option value="7">7x7</option>';
str += '<option value="8">8x8</option>';
str += ' </select>';
str += '<div class="field"></div>';
str += '<button id="buttons">Новая игра</button>';
str += '<button id="audio"><img src="sound_icon.jpg" id="img"></button>';

      
document.body.innerHTML = str;

let field = document.querySelector('.field');

let fieldSize;
let cellSize;
let n; //количество ходов
let timeID;


localStorage.getItem('fSize')!=null?fieldSize=localStorage.getItem('fSize'):fieldSize = 4;

localStorage.getItem('cSize')!=null?cellSize=localStorage.getItem('cSize'):cellSize = Math.round(400/fieldSize);

localStorage.getItem('now')!=null? n=localStorage.getItem('now'): n=0;
document.getElementById("numStep").innerText = n;

let cells;

if(localStorage.getItem('cells')!=null){
	cells = JSON.parse(localStorage.getItem('cells'));
	makeSavedField();
}
else {
	cells = [];	
	makeField();
}

document.getElementById("select").addEventListener('change', ()=>{
  field.innerHTML="";
  localStorage.clear();
  clearTimeout(timeID);
  selIndex = document.getElementById("select").options.selectedIndex;
  
  fieldSize = document.getElementById("select").options[selIndex].value;
  
  localStorage.setItem('fSize',fieldSize);

  fieldSize = document.getElementById("select").options[selIndex].value;
  cellSize = Math.round(400/fieldSize);
  n=0;
  document.getElementById("numStep").innerText = n;


  start_timer();
  makeField();
});

 document.getElementById('buttons').addEventListener('click', ()=>{
 	field.innerHTML="";
	cellSize = Math.round(400/fieldSize);
  localStorage.clear();
  clearTimeout(timeID);
 
  localStorage.setItem('fSize',fieldSize);
  localStorage.setItem('cSize',cellSize);

	
  makeField();
	
	
	start_timer();
	n=0;
	document.getElementById("numStep").innerText = n;


 })


    function simple_timer(sec, block, direction) 
    {
        let time    = sec;
        direction   = direction || false;
                 
        let hour    = parseInt(time / 3600);
        if ( hour < 1 ) hour = 0;
        time = parseInt(time - hour * 3600);
        if ( hour < 10 ) hour = '0'+hour;
     
        let minutes = parseInt(time / 60);
        if ( minutes < 1 ) minutes = 0;
        time = parseInt(time - minutes * 60);
        if ( minutes < 10 ) minutes = '0'+minutes;
     
       let seconds = time;
        if ( seconds < 10 ) seconds = '0'+seconds;
     
        block.innerHTML ="Время игры: "+hour+':'+minutes+':'+seconds;

        if ( direction ) {sec++; timeID=setTimeout(function(){ simple_timer(sec, block, direction); }, 1000);
			    localStorage.setItem('time',hour*3600+minutes*60+seconds);
    	  } 
        else {
            sec--;
            if ( sec > 0 ) {timeID=setTimeout(function(){ simple_timer(sec, block, direction); }, 1000);} 
            else {alert('Время вышло!');}
        }
        

    }
    
    function start_timer() 
    {

        var block = document.getElementById('sample_timer');

        localStorage.getItem('time')!=null? simple_timer(localStorage.getItem('time'), block, true) : simple_timer(0, block, true);
    }

		start_timer();


function makeField() {
const empty = {
  value: fieldSize*fieldSize,
  top: fieldSize-1,
  left: fieldSize-1
};

const cells = [];

function move(index) {
  const cell = cells[index];
  const leftDiff = Math.abs(empty.left-cell.left);
  const toptDiff = Math.abs(empty.top-cell.top);

  if ( (leftDiff+toptDiff) > 1) {
    return;
  }

  cell.element.style.left =`${empty.left * cellSize}px`;
  cell.element.style.top = `${empty.top * cellSize}px`;
  
  const emptyLeft = empty.left;
  const emptyTop = empty.top;

  empty.left = cell.left;
  empty.top = cell.top;
 


  cell.left = emptyLeft;
  cell.top = emptyTop;

  localStorage.setItem ("cells", JSON.stringify(cells));


  const isFinished = cells.every(cell =>{
    
    return cell.value===cell.top*fieldSize+cell.left+1;
    });

  if(isFinished) {
  	writeResults();
  	showResults();
    alert('you won');
  }

  n++;
  document.getElementById("numStep").innerText = n;
  localStorage.setItem('now',n);

}






const numbers = [...Array(fieldSize*fieldSize-1).keys()].sort(()=>Math.random()-0.5);


for (let i = 0; i <fieldSize*fieldSize-1; i++){
  const cell = document.createElement('div');
  const value = numbers[i]+1;
  cell.className = 'cell';
  cell.innerHTML = value;
  cell.style.width=cellSize+'px';
  cell.style.height=cellSize+'px';

  const id = i+1;
  cell.id = id;

  const left = i%fieldSize;
  const top = (i - left)/fieldSize;

 


  cells.push ({
    value: value,
    left: left,
    top: top,
    element: cell,

	className: 'cell',
	innerHTML: value,
	width: cellSize+'px',
	height: cellSize+'px',

  	id: id,


  });



  cell.style.left = `${left * cellSize}px`;
  cell.style.top = `${top * cellSize}px`;
  field.append(cell);

  cell.addEventListener('click', () => {
    let DragManager = new function(){

  	let dragObject = {};

  	let self = this;

  	play(autoplay);


  }


  function finishDrag(e) {
    var dropElem = findDroppable(e);

    if (!dropElem) {
      self.onDragCancel(dragObject);
    } else {
      self.onDragEnd(dragObject, dropElem);
    }
  }
    move(i);

  });

}

cells.push(empty);

}

let audio;
let autoplay=false;
 document.getElementById('audio').addEventListener('click', ()=>{
 
 
  autoplay=!autoplay;
  

let playIcon = "sound_icon.jpg";
let pauseIcon = "sound_icon_hover.png";
let icon =document.getElementById("img");
if(autoplay) {
	icon.src =playIcon;
}
else {
	icon.src =pauseIcon;
}


 });

 function play(autoplay){

 	 audio = new Audio(); // Создаём новый элемент Audio
     audio.src = 'music.mp3'; // Указываем путь к звуку "клика"
     audio.autoplay=autoplay;

 }


function makeSavedField() {
  let empty;
 	field.innerHTML="";
	for (let i=0; i<cells.length; i++) {
    if (cells[i].className!=undefined){
      const cell = document.createElement('div');
      cell.className =cells[i].className;
      cell.innerHTML = cells[i].innerHTML;
      cell.style.width=cells[i].width;
      cell.style.height=cells[i].height;
      cell.style.left = `${cells[i].left * cellSize}px`;
      cell.style.top =`${cells[i].top * cellSize}px`;
        
      cells[i]=({
        value: cells[i].innerHTML,
        left: cells[i].left,
        top: cells[i].top,
        element: cell,

        className: cells[i].className,
        innerHTML: cells[i].innerHTML,
        width: cells[i].width,
        height: cells[i].height

        });
          
          field.append(cell);
          cell.addEventListener('click', () => {
          	play(autoplay);
           
            move(i);
          });

    } 
    else {
        empty = {
          value: cells[i].value,
          top: cells[i].top,
          left: cells[i].left
        } 
		cells[i]=empty;
	
};
	}

  function move(index) {
  const cell = cells[index];

  const leftDiff = Math.abs(empty.left-cell.left);
  const toptDiff = Math.abs(empty.top-cell.top);

  if ( (leftDiff+toptDiff) > 1) {
    return;
  }

  cell.element.style.left =`${empty.left * cellSize}px`;
  cell.element.style.top = `${empty.top * cellSize}px`;
  
  const emptyLeft = empty.left;
  const emptyTop = empty.top;

  empty.left = cell.left;
  empty.top = cell.top;
 

  cell.left = emptyLeft;
  cell.top = emptyTop;

  localStorage.setItem ("cells", JSON.stringify(cells));


  const isFinished = cells.every(cell =>{
      return cell.value===cell.top*fieldSize+cell.left+1;
    });

  if(isFinished) {
    alert('you won');
  }

  n++;
  document.getElementById("numStep").innerText = n;
 
  localStorage.setItem('now',n);
 
}

}

