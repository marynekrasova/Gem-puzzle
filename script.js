'use strict';
const modal = document.createElement("div");
modal.className = 'modal';
const modalR = document.createElement("div");
modalR.className = 'modalR';
modalR.style.display = "none";
const modalWrapper = document.createElement("div");
modalWrapper.className = 'modal-wrapper';
const h1 = document.createElement("h1");
h1.className = 'name';
h1.textContent = 'Gem-puzzle';
const field = document.createElement("div");
field.className = 'field';
const header = document.createElement('header');
header.className = 'header';
const info = document.createElement("div");
info.className = 'info';
const moves = document.createElement("div");
moves.className = 'moves';
const text = document.createElement('span');
text.className = 'description';
const text1 = document.createElement('span');
text1.className = 'description';
const timer = document.createElement('span');
timer.className = 'timer';
const counter = document.createElement('span');
counter.className = 'counter';
const btnPause = document.createElement('button');
btnPause.className = 'pause';
const btnResume = document.createElement('button');
btnResume.className = 'resume';
const btnNewGame = document.createElement('button');
btnNewGame.className = 'newGame';
const btnStart = document.createElement('button');
btnStart.className = 'start';

let value = timer.textContent = ('00:00:00');
counter.textContent = '0';
info.textContent = 'Time:';
moves.textContent = 'Moves:';
btnPause.textContent = 'Pause game';
btnResume.textContent = 'Resume game';
btnStart.textContent = 'Start';
btnNewGame.textContent = 'New game';

btnStart.addEventListener("click", () => {
  modalWrapper.style.display = "none";
  let this_date = new Date();
  let start_time_interval = setInterval(function () {
    let new_date = new Date() - this_date;
    let sec = Math.abs(Math.floor(new_date / 1000) % 60); //sek
    let min = Math.abs(Math.floor(new_date / 1000 / 60) % 60); //min
    let hours = Math.abs(Math.floor(new_date / 1000 / 60 / 60) % 24); //hours
    if (sec.toString().length === 1) sec = '0' + sec;
    if (min.toString().length === 1) min = '0' + min;
    if (hours.toString().length === 1) hours = '0' + hours;
    timer.textContent = (hours + ':' + min + ':' + sec);
  }, 100);
  btnPause.addEventListener("click", () => {
    modalR.style.display = "block";
    btnResume.style.display = "block";
    btnPause.style.display = "none";
    let timers = timer.textContent;
    clearInterval(start_time_interval);
    btnResume.addEventListener("click", () => {
      modalR.style.display = "none";
      timer.textContent = timers;
          let t = timer.textContent.split(':');
          let hour = parseInt(t[0]);
          let mins = parseInt(t[1]);
          let secs = parseInt(t[2]);
          let intervalID = setInterval(function() {
          secs++;
            if (secs.toString().length === 1) secs = '0' + secs;
            if (mins.toString().length === 1) mins = '0' + mins;
            if (hour.toString().length === 1) hour = '0' + hour;
            timer.textContent = hour + ':' + mins + ':' + secs;
          if (secs === 60) {
           mins++;
           secs = '00';
          }
            if (mins === 60) {
              hour++;
              mins = '00';
            }
        }, 1000);

      btnResume.style.display = "none";
      btnPause.style.display = "block";

    });

  });
  btnNewGame.addEventListener("click", () => {
    clearInterval(start_time_interval);
    timer.textContent = '00:00:00';
    let t = timer.textContent.split(':');
    let hour = parseInt(t[0]);
    let mins = parseInt(t[1]);
    let secs = parseInt(t[2]);
    let intervalID = setInterval(function() {
      secs++;
      if (secs.toString().length === 1) secs = '0' + secs;
      if (mins.toString().length === 1) mins = '0' + mins;
      if (hour.toString().length === 1) hour = '0' + hour;
      timer.textContent = hour + ':' + mins + ':' + secs;
      if (secs === 60) {
        mins++;
        secs = '00';
      }
      if (mins === 60) {
        hour++;
        mins = '00';
      }
    }, 1000);
    const numbers = [...Array(15).keys()].sort(() => Math.random() - 0.5);
    const elts = document.querySelectorAll(".cell");
    for (let i = 0, lth= numbers.length; i < lth; i++) {
      const currentNumber = numbers[i];
      const currentElt = elts[i];
     currentElt.innerHTML = currentNumber;
      console.log(currentElt.innerHTML);
    }
  });
});

  const cellSize = 100;
  const empty = {
    value: 0,
    top: 0,
    left: 0
  };

  const cells = [];
  cells.push(empty);
  let i = 0;

  function move(index) {
    const cell = cells[index];
    const leftDift = Math.abs(empty.left - cell.left);
    const topDift = Math.abs(empty.top - cell.top);
    if (leftDift + topDift > 1) {
      return;
    }

    cell.element.style.left = `${empty.left * cellSize}px`;
    cell.element.style.top = `${empty.top * cellSize}px`;
    const emptyLeft = empty.left;
    const emptyTop = empty.top;
    empty.left = cell.left;
    empty.top = cell.top;
    cell.left = emptyLeft;
    cell.top = emptyTop;
    i++;
    counter.textContent = i;
    const isFinished = cells.every(cell => {
      return cell.value === cell.top * 4 + cell.left
    });
    if (isFinished) {
      alert('Ура! Вы решили головоломку за ' + timer.textContent + ' и ' + i + ' ходов.');
    }
  }
function mas() {
  let numbers = [...Array(15).keys()].sort(() => Math.random() - 0.5);
  console.log(numbers);
  for (let i = 1; i <= 15; i++) {
    const cell = document.createElement('div');
    const value = numbers[i - 1] + 1;
    cell.className = 'cell';
    cell.innerHTML = value;

    const left = i % 4;
    const top = (i - left) / 4;

    cells.push({
      value: value,
      left: left,
      top: top,
      element: cell
    });
    cell.style.left = `${left * cellSize}px`;
    cell.style.top = `${top * cellSize}px`;

    field.append(cell);
    cell.addEventListener('click', () => {
      move(i);
    });
  }
}
mas();
document.body.appendChild(modalWrapper);
modalWrapper.appendChild(modal);
document.body.appendChild(h1);
modal.appendChild(btnStart);
document.body.appendChild(header);
header.appendChild(info);
info.appendChild(text);
info.appendChild(timer);
header.appendChild(moves);
moves.appendChild(text1);
moves.appendChild(counter);
header.appendChild(btnPause);
header.appendChild(btnResume);
header.appendChild(btnNewGame);
document.body.appendChild(field);
field.appendChild(modalR);

