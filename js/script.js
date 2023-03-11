const newGameButton = document.querySelector('.new-game');
const resetButton = document.querySelector('.reset');

const bgColorInput = document.getElementById('bg-color');
const boardColorInput = document.getElementById('board-color');

let mark = 'close';

function insertMarkCallBack (cell) {
	cell.innerHTML = `<span class="material-symbols-outlined">${mark}</span>`;
	mark = mark === 'close' ? 'radio_button_unchecked' : 'close';
}

function turnDisplayCallBack (mark) {
	let turnDisplay = document.querySelector('.turn');

	turnDisplay.classList.remove('hidden');
	turnDisplay.innerHTML = `It's player <span class="material-symbols-outlined">${mark}</span> turn!`;
}

function addCellClickListener () {
	document.querySelectorAll('.cell.available').forEach((cell) => {
		cell.addEventListener('click', handleCellClick, { once: true });
	});
}

function removeCellClickListener () {
	document.querySelectorAll('.cell').forEach((cell) => {
		cell.removeEventListener('click', handleCellClick);
	});
}

function winnerCallBack (mark) {
	document.querySelector('.turn').innerHTML = `Player <span class="material-symbols-outlined">${mark}</span> has won! Want a rematch?`;
	newGameButton.classList.remove('hidden');

	document.querySelectorAll('.available').forEach((cell) => {
		cell.classList.remove('available');
	});
}

function handleDraw () {
	document.querySelector('.turn').innerHTML = 'It\'s a draw! Try again';
	newGameButton.classList.remove('hidden');
}

function verifySectionLineCallBack (section, position) {
	let cells = document.querySelectorAll(`.${section}-${position}`);

	if (cells.length) {
		if (cells[0].innerText === cells[1].innerText
			&& cells[1].innerText === cells[2].innerText
			&& cells[0].innerText !== '')
				return { match: true, mark: cells[0].innerText};
		else return { match: false };
	} else return { match: false };
}

function verifySectionCallBack (section) {
	let check = verifySectionLineCallBack(section, 1);
	if (!check.match) check = verifySectionLineCallBack(section, 2);
	if (!check.match) check = verifySectionLineCallBack(section, 3);

	if (check.match) return check;
	else return { match: false };
}

function verifyBoardCallBack () {
	let check = verifySectionCallBack('row');
	if (!check.match) check = verifySectionCallBack('column');
	if (!check.match) check = verifySectionCallBack('diagonal');

	if (check.match) return check;
	else return { match: false };
}

function verifyFilledBoardCallBack () {
	let cells = document.querySelectorAll('.cell');
	let isThereEmptyCell = false;

	cells.forEach((cell) => {
		if (cell.innerText === '') isThereEmptyCell = true;
	});

	return isThereEmptyCell;
}

function handleCellClick (event) {
	removeCellClickListener();

	let cell = event.target;

	cell.classList.remove('available');
	insertMarkCallBack(cell);
	turnDisplayCallBack(mark);

	let checkResponse = verifyBoardCallBack();
	if (checkResponse.match) winnerCallBack(checkResponse.mark);

	let filledResponse = verifyFilledBoardCallBack();
	if (!filledResponse && !checkResponse.match) handleDraw();

	if (!checkResponse.match && filledResponse) addCellClickListener();
}

function handleNewGame () {
	newGameButton.classList.add('hidden');

	document.querySelectorAll('.cell').forEach((cell) => {
		cell.classList.add('available');
		cell.innerText = '';
	});

	turnDisplayCallBack(mark);
	addCellClickListener();
}

function colorChangeCallBack (property, value) {
	document.querySelector(':root').style.setProperty(
		`--${property}`, value
	);

	localStorage.setItem(property, value);
}

function handleColorsReset () {
	colorChangeCallBack('bg-color', '#292929');
	colorChangeCallBack('board-color', '#969696');

	bgColorInput.value = '#292929';
	boardColorInput.value  ='#969696';
}

function handleStoredColors () {
	let bgColor = localStorage.getItem('bg-color');
	let boardColor = localStorage.getItem('board-color');

	if (bgColor) {
		document.querySelector(':root').style.setProperty('--bg-color', bgColor);
		bgColorInput.value = bgColor;
	}

	if (boardColor) {
		document.querySelector(':root').style.setProperty('--board-color', boardColor);
		boardColorInput.value = boardColor;
	}
}

newGameButton.addEventListener('click', handleNewGame);

[bgColorInput, boardColorInput].forEach((item) => {
	item.addEventListener('input', (event) => {
		colorChangeCallBack(event.target.id, event.target.value);
	});
});

resetButton.addEventListener('click', handleColorsReset);

handleStoredColors();
