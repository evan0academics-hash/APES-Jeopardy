let score1=0,score2=0,currentValue=0,currentTile=null;

const board=document.getElementById('board');

Object.keys(gameData).forEach(cat=>{
 const h=document.createElement('div');
 h.className='category';
 h.textContent=cat;
 board.appendChild(h);
});

for(let row=0;row<5;row++){
 Object.keys(gameData).forEach(cat=>{
  const q=gameData[cat][row];
  const tile=document.createElement('div');
  tile.className='tile';
  tile.textContent=q.value;
  tile.onclick=()=>openQuestion(q,tile);
  board.appendChild(tile);
 });
}

function openQuestion(q,tile){
 currentValue=q.value;
 currentTile=tile;
 document.getElementById('questionValue').textContent=q.value;
 document.getElementById('questionText').textContent=q.question;
 document.getElementById('answerText').textContent=q.answer;
 document.getElementById('answerText').classList.add('hidden');
 document.getElementById('scoreButtons').classList.add('hidden');
 document.getElementById('modal').classList.remove('hidden');
}
function revealAnswer(){
 document.getElementById('answerText').classList.remove('hidden');
 document.getElementById('scoreButtons').classList.remove('hidden');
}
function closeModal(){
 document.getElementById('modal').classList.add('hidden');
 if(currentTile) currentTile.classList.add('used');
}
function adjustScore(team,val){
 if(team===1){score1+=val;document.getElementById('score1').textContent=score1;}
 else{score2+=val;document.getElementById('score2').textContent=score2;}
}
function resetGame(){location.reload();}
function showFinalJeopardy(){
 openQuestion({value:'Final Jeopardy',question:finalJeopardy.question,answer:finalJeopardy.answer},null);
}
