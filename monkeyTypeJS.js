const wordArr = 'in one good real one not school set they state high life consider on and not come what also for set point can want as while with of order child about school thing never hold find order each too between program work end you home place around while place problem end begin interest while public or where see time those increase interest be give end think seem small as both another a child same eye you between way do who into again good fact than under very head become real possible some write know however late each that with because that place nation only for each change form consider we would interest with world so order or run more open that large write turn never over open each over change still old take hold need give by consider line only leave while what set up number part form want against great problem can because head so first this here would course become help year first end want both fact public long word down also long for without new turn against the because write seem line interest call not if line thing what work people way may old consider leave hold want life between most place may if go who need fact such program where which end off child down change to from people high during people find to however into small new general it do that could old for last get another hand much eye great no work and with but good there last think can around use like number never since world need what we around part show new come seem while some and since still small these you general which seem will place come order form how about just also they with state late use both early too lead general seem there point take general seem few out like might under if ask while such interest feel word right again how about system such between late want fact up problem stand new say move a lead small however large public out by eye here over so be way use like say people work for since interest so face order school good not most run problem group run she late other problem real form what just high no man do under would to each too end point give number child through so this large see get form also all those course to work during about he plan still so like down he look down where course at who plan way so since come against he all who at world because while so few last these mean take house who old way large no first too now off would in this course present order home public school back own little about he develop of do over help day house stand present another by few come that down last or use say take would each even govern play around back under some line think she even when from do real problem between long as there school do as mean to all on other good may from might call world thing life turn of he look last problem after get show want need thing old other during be again develop come from consider the now number say life interest to system only group world same state school one problem between for turn run at very against eye must go both still all a as so after play eye little be those should out after which these both much house become both school this he real and may mean time by real number other as feel at end ask plan come turn by all head increase he present increase use stand after see order lead than system here ask in of look point little too without each for both but right we come world much own set we right off long those stand go both but under now must real general then before with much those at no of we only back these person plan from run new as own take early just increase only look open follow get that on system the mean plan man over it possible if most late line would first without real hand say turn point small set at in system however to be home show new again come under because about show face child know person large program how over could thing from out world while nation stand part run have look what many system order some one program you great could write day do he any also where child late face eye run still again on by as call high the must by late little mean never another seem to leave because for day against public long number word about after much need open change also'.split(' ');
const SETTINGS_BUTTON = document.querySelector('.settings-container');
const MODE_BUTTON = document.querySelector('.modes');
const SETTINGS_TIME = document.querySelector('.setting-time');
const SETTINGS_WORDS = document.querySelector('.setting-words');
const SETTINGS_QUOTE = document.querySelector('.setting-quote');
const NUMBER_OPTIONS = document.querySelector('.number-options');
const OPTION_1 = document.querySelector('.option-1');
const OPTION_2 = document.querySelector('.option-2');
const OPTION_3 = document.querySelector('.option-3');
const OPTION_4 = document.querySelector('.option-4');

const LANGUAGE_BUTTON = document.querySelector('.language-container');
const TEXT_PASSAGE = document.querySelector('.text-passage');
const WORDS = document.querySelector('.words');
const RESTART_BUTTON = document.querySelector('.restart-button');
const CURSOR = document.querySelector('.cursor');
const TEXT_TITLE_TOP = document.querySelector('.top');
const TEXT_TITLE_BOTTOM = document.querySelector('.bottom');
const LOGO_SVG = document.querySelector('.logo');

const END_TEST = document.querySelector('.endTest');
let numWords = 200;
function addClass(element, className) {
    element.classList.add(className);
}

function removeClass(element, className) {
    element.classList.remove(className);
}

//page style when typing
function newStyle() {
    LOGO_SVG.classList.add('logo-style');
    addClass(TEXT_TITLE_TOP, 'top-style');
    addClass(TEXT_TITLE_BOTTOM, 'bottom-style');
    addClass(SETTINGS_BUTTON, 'settings-style');
}

//page style when first loaded or restarted
function restingStyle() {
    LOGO_SVG.classList.remove('logo-style');
    removeClass(TEXT_TITLE_TOP, 'top-style');
    removeClass(TEXT_TITLE_BOTTOM, 'bottom-style');
    removeClass(SETTINGS_BUTTON, 'settings-style');
}

function newTest(newNum) {
    //creates an array of n words
    let passage = [];
    for (let i = 0; i < 25; i++) {
        passage.push(wordArr[Math.floor(Math.random() * wordArr.length)]);
    }
    
    //creates a div element for each word
    passage.forEach((word, wordIndex) => {
        const wordDiv = document.createElement('div');
        wordDiv.classList.add('word');
        wordDiv.setAttribute('data-key', (wordIndex+1));
        //creates a span element for each letter
        word.split('').forEach((letter, index) => {
            const letterSpan = document.createElement('span');
            letterSpan.innerText = letter;
            letterSpan.classList.add('letter');
            letterSpan.setAttribute('data-key', (index));   //adds a data-key attribute set equal to its index in the word
            wordDiv.appendChild(letterSpan);
        })

        WORDS.appendChild(wordDiv);
    })

    //sets the first word and first letter of passage as current
    addClass(document.querySelector('.word'), 'current');
    addClass(document.querySelector('.letter'), 'current');

    //relocates the cursor to the first letter
    const firstLetter = document.querySelector('.letter.current');
    CURSOR.style.top = firstLetter.getBoundingClientRect().top + 1 + "px";
    CURSOR.style.left = firstLetter.getBoundingClientRect().left - 2 + "px";
    CURSOR.style.transform = `translateX(0px)`;

    //adds cursor-blink so cursor blinks when restart is pressed
    if (!CURSOR.classList.contains('cursor-blink')) {
        addClass(CURSOR, 'cursor-blink');
    }
}

newTest();

//makes a new text passage, restarts the game
function restart() {
    WORDS.style.marginTop = '0px';
    const words = WORDS.querySelectorAll('div');
    const firstLetter = document.querySelector('.letter');

    CURSOR.style.top = firstLetter.getBoundingClientRect().top + 1 + "px";
    CURSOR.style.left = firstLetter.getBoundingClientRect().left - 2 + "px";
    words.forEach(word => { //removes every word div inside text-passage div
        word.remove();
    })

    addClass(TEXT_PASSAGE, 'blink');
    addClass(LANGUAGE_BUTTON, 'blink');
    addClass(RESTART_BUTTON, 'blink');

    const animationDuration = 300;
    setTimeout(newTest, animationDuration/2);

    const onAnimationEnd = () => {
        removeClass(TEXT_PASSAGE, 'blink');
        removeClass(LANGUAGE_BUTTON, 'blink');
        removeClass(RESTART_BUTTON, 'blink');
        removeClass(CURSOR, 'disappear');
    };

    const removeBlinkClass = (element, className) => {
        element.addEventListener('animationend', onAnimationEnd);
    };
    
    removeBlinkClass(TEXT_PASSAGE, 'blink');
    removeBlinkClass(LANGUAGE_BUTTON, 'blink');
    removeBlinkClass(RESTART_BUTTON, 'blink');

    restingStyle();
    addClass(END_TEST, 'hide');
}
RESTART_BUTTON.addEventListener('mousedown', () => {
    addClass(CURSOR, 'disappear');
});
RESTART_BUTTON.addEventListener('mouseup', () => {
    restart();
});

const shiftHeight = document.querySelector('.words').firstElementChild.getBoundingClientRect().top;

//handling typing events
document.addEventListener('keydown', event => {
    if (!TEXT_TITLE_TOP.classList.contains('top-style') || !TEXT_TITLE_BOTTOM.classList.contains('bottom-style') || !SETTINGS_BUTTON.classList.contains('settings-style')) {
        newStyle();
    }
    if (CURSOR.classList.contains('cursor-blink')) {
        removeClass(CURSOR, 'cursor-blink');
    }
    const currentWord = document.querySelector('.word.current');
    const currentLetter = document.querySelector('.letter.current');
    const firstLetter = document.querySelector('.word.current').firstElementChild;
    const lastWord = document.querySelector('.words').lastElementChild;

    const keyPressed = event.key;
    const expectedKey = currentLetter?.innerHTML || ' ';

    //regular alpha-key is pressed
    if (keyPressed.length === 1 && keyPressed !== ' ') {
        //if currentLetter != null
        if (currentLetter) {
            //if keyPressed is equal to the key inside the letter div, add correct to .letter
            if (keyPressed === expectedKey) { addClass(currentLetter, 'correct'); }

            //else, add incorrect to .letter
            else { addClass(currentLetter, 'incorrect'); }

            //remove current from .letter
            removeClass(currentLetter, 'current');

            //add current to the next .letter div if there is one
            if (currentLetter.nextElementSibling) { addClass(currentLetter.nextElementSibling, 'current'); }
        }
        else {
            const incorrectLetter = document.createElement('span');
            incorrectLetter.innerText = keyPressed;
            incorrectLetter.className = 'letter incorrect extra';
            currentWord.appendChild(incorrectLetter);
        }
    }

    //if space key is pressed
    else if (keyPressed === ' ') {
        if (expectedKey !== ' ') {
            const lettersToInvalidate = document.querySelectorAll('.word.current .letter:not(.correct');
            lettersToInvalidate.forEach(letter => {
                addClass(letter, 'incorrect-underline');
            });
        }

        //selects all spans inside the currentWord div
        const letterSpans = currentWord.querySelectorAll('span');
        letterSpans.forEach(innerSpan => {
            //if any of the spans has the class incorrect
            if (innerSpan.classList.contains('incorrect')) {
                //add the red underline to the entire word
                letterSpans.forEach (span => {
                    if (!span.classList.contains('incorrect-underline')) {
                        addClass(span, 'incorrect-underline');
                    }
                })
            }
        });

        //removes the current class from the word div
        removeClass(currentWord, 'current');

        //adds the current class to the next word div if there is one
        if (currentWord.nextElementSibling) { addClass(currentWord.nextElementSibling, 'current'); }

        //removes the current class from the letter div if current letter != null
        if (currentLetter) { removeClass(currentLetter, 'current'); }

        //adds the current class to the first letter div of the word
        addClass(currentWord.nextElementSibling.firstElementChild, 'current');
    }

    //if backspace key is pressed
    else if (keyPressed === 'Backspace') {
        // if going back at the start of a word
        const prevWord = currentWord.previousElementSibling;
        if (prevWord && (currentLetter && currentLetter === firstLetter)) { //if there is a previous word, and a current letter, and current letter is equal to firstLetter
            const prevLetters = [...prevWord.querySelectorAll('.letter')];

            //if any of the previous letters have the 'incorrect-underline' class
            if (prevLetters.some(letter => letter.classList.contains('incorrect-underline'))) {
                removeClass(currentWord, 'current');
                removeClass(currentLetter, 'current');
                addClass(prevWord, 'current');

                //finds the most recent correct and incorrect letter 
                const letters = prevWord.querySelectorAll('.letter');
                const correctLetters = prevWord.querySelectorAll('.correct');
                const incorrectLetters = prevWord.querySelectorAll('.incorrect');
                let mostRecentCorrectLetter, mostRecentIncorrectLetter, option = "";

                //if there are any correct or incorrect letters in the word
                if (correctLetters.length > 0 || incorrectLetters.length > 0) {
                    //if the correctLetter NodeList is not empty but incorrectLetter NodeList is empty
                    if (correctLetters.length > 0 && incorrectLetters.length <= 0) {
                        mostRecentCorrectLetter = correctLetters[correctLetters.length - 1];
                        if (mostRecentCorrectLetter.nextElementSibling) {
                            addClass(mostRecentCorrectLetter.nextElementSibling, 'current');
                            removeClass(mostRecentCorrectLetter.nextElementSibling, 'correct');
                            removeClass(mostRecentCorrectLetter.nextElementSibling, 'incorrect');
                        }
                    }

                    //if the incorrectLetter NodeList is not empty but the correctLetter NodeList is empty
                    else if (incorrectLetters.length > 0 && correctLetters.length <= 0) {
                        mostRecentIncorrectLetter = incorrectLetters[incorrectLetters.length - 1];
                        if (mostRecentIncorrectLetter.nextElementSibling) {
                            addClass(mostRecentIncorrectLetter.nextElementSibling, 'current');
                            removeClass(mostRecentIncorrectLetter.nextElementSibling, 'correct');
                            removeClass(mostRecentIncorrectLetter.nextElementSibling, 'incorrect');
                        }
                    }

                    //if both NodeLists are non-empty
                    else {
                        //chooses the letter with the greatest index
                        if (correctLetters[correctLetters.length - 1].dataset.key > incorrectLetters[incorrectLetters.length - 1].dataset.key) { 
                            mostRecentCorrectLetter = correctLetters[correctLetters.length - 1]; option = "correct"; 
                        }
                        else if (incorrectLetters[incorrectLetters.length - 1].dataset.key > correctLetters[correctLetters.length - 1].dataset.key) { 
                            mostRecentIncorrectLetter = incorrectLetters[incorrectLetters.length - 1]; option = "incorrect"; 
                        }
                        if (option === "correct") {  //if most recent letter is correct
                            if (mostRecentCorrectLetter.nextElementSibling) {
                                addClass(mostRecentCorrectLetter.nextElementSibling, 'current');
                                removeClass(mostRecentCorrectLetter.nextElementSibling, 'correct');
                                removeClass(mostRecentCorrectLetter.nextElementSibling, 'incorrect');
                            }
                        }
                        else if (option === "incorrect") { //if most recent letter is incorrectL
                            if (mostRecentIncorrectLetter.nextElementSibling) {
                                addClass(mostRecentIncorrectLetter.nextElementSibling, 'current');
                                removeClass(mostRecentIncorrectLetter.nextElementSibling, 'correct');
                                removeClass(mostRecentIncorrectLetter.nextElementSibling, 'incorrect');
                            }
                        }
                    }

                }
                
                //backspace on skipped words with no letters typed
                else {
                    mostRecentCorrectLetter = prevWord.firstElementChild;
                    addClass(mostRecentCorrectLetter, 'current');
                }

                //removes 'incorrect-underline' class from every letter
                prevLetters.forEach(letter => {
                    if (letter.classList.contains('incorrect-underline')) {
                        removeClass(letter, 'incorrect-underline');
                    }
                })
            }
        }
        //if going back in the middle of a word
        else if (currentLetter && currentLetter !== firstLetter) { 
            removeClass(currentLetter, 'current');
            addClass(currentLetter.previousElementSibling, 'current');
            removeClass(currentLetter.previousElementSibling, 'correct');
            removeClass(currentLetter.previousElementSibling, 'incorrect');
        }

        //if going back at the end of the first word
        else {
            //deletes any extra characters
            if (currentWord.lastElementChild.classList.contains('extra')) {currentWord.lastElementChild.remove(); }

            else {
                removeClass(currentWord.lastElementChild, 'correct');
                removeClass(currentWord.lastElementChild, 'incorrect');
                addClass(currentWord.lastElementChild, 'current');
            }
            
        }
    }
    
    //moveCursor
    const moveCursor = () => {
        const nextLetter = document.querySelector('.letter.current');
        const nextWord = document.querySelector('.word.current');
        const cursor = document.querySelector('.cursor');

        let translationVal = '0px';
        if (nextLetter) {
            cursor.style.top = nextLetter.getBoundingClientRect().top + "px";
            translationVal = nextLetter.getBoundingClientRect().left - 130 + "px";
            cursor.style.transform = `translateX(${translationVal})`;
            addClass(cursor, 'slide');
        }
        else if (!nextLetter) { //moves cursor to the end of the word when you reach the last letter
            cursor.style.top = nextWord.getBoundingClientRect().top + 1 + "px";
            translationVal = nextWord.getBoundingClientRect().right - 130 + "px";
            cursor.style.transform = `translateX(${translationVal})`;
            addClass(cursor, 'slide');
        }
    };
    moveCursor();

    //scroll page
    if(currentWord.nextElementSibling) {
        if(currentWord.nextElementSibling.getBoundingClientRect().top > (shiftHeight+40) && keyPressed === ' ') {
            const margin = parseInt(WORDS.style.marginTop || '0px');
            WORDS.style.marginTop = (margin - 40) + 'px';
            moveCursor();
        };
    };

    //END TEST
    if (lastWord.classList.contains('current')) {
        const letters = [...lastWord.querySelectorAll('.letter')];
        const endGame = letters.every(letter => letter.classList.contains('correct'));
        if (endGame === true) { removeClass(END_TEST, 'hide'); restingStyle(); }
    }
})


//HANDLES MODE SELECTION
MODE_BUTTON.addEventListener('click', (event) => {
    //if mode is already selected
    if(event.target && !event.target.classList.contains('currPick')) {
        optionBlink();
        restart();
        if (event.target.dataset.key === 'setting-time') {
            timeOptions();
            SETTINGS_BUTTON.className = "settings-container";
            addClass(SETTINGS_BUTTON, 'sTime');

        }
        else if (event.target.dataset.key === 'setting-words') {
            wordOptions();
            SETTINGS_BUTTON.className = "settings-container";
            addClass(SETTINGS_BUTTON, 'sWords');
        }
        else if (event.target.dataset.key === 'setting-quote') {
            quoteOptions();
            SETTINGS_BUTTON.className = "settings-container";
            addClass(SETTINGS_BUTTON, 'sQuote');
        }
    }

    //remove currPick from all modes
    const modes = MODE_BUTTON.querySelectorAll('div');
    modes.forEach(mode => {
        if (mode.classList.contains('currPick')) {
            removeClass(mode, 'currPick');
        }
    })

    //add currPick to the clicked mode
    if (event.target) {
        addClass(event.target, 'currPick');
    }
})

//HANDLES OPTION SELECTION
NUMBER_OPTIONS.addEventListener('click', (event) => {
    const options = NUMBER_OPTIONS.querySelectorAll('div');
    restart();
    options.forEach(option => {
        if (option.classList.contains('currPick')) {
            removeClass(option, 'currPick');
        }
    })
    if(event.target) {
        addClass(event.target, 'currPick');
    }
})

function timeOptions() {
    OPTION_1.innerText = "15";
    OPTION_2.innerText = "30";
    OPTION_3.innerText = "60";
    OPTION_4.innerText = "120";
}

function wordOptions() {
    OPTION_1.innerText = "10";
    OPTION_2.innerText = "25";
    OPTION_3.innerText = "50";
    OPTION_4.innerText = "100";
}

function quoteOptions() {
    OPTION_1.innerText = "short";
    OPTION_2.innerText = "medium";
    OPTION_3.innerText = "long";
    OPTION_4.innerText = "thicc";
}

function optionBlink() {
    addClass(OPTION_1, 'blink');
    addClass(OPTION_2, 'blink');
    addClass(OPTION_3, 'blink');
    addClass(OPTION_4, 'blink');

    const onAnimationEnd = () => {
        removeClass(OPTION_1, 'blink');
        removeClass(OPTION_2, 'blink'); 
        removeClass(OPTION_3, 'blink');
        removeClass(OPTION_4, 'blink');
    };

    const removeBlinkClass = (element, className) => {
        element.addEventListener('animationend', onAnimationEnd);
    };
    
    removeBlinkClass(OPTION_1, 'blink');
    removeBlinkClass(OPTION_2, 'blink');
    removeBlinkClass(OPTION_3, 'blink');
    removeBlinkClass(OPTION_4, 'blink');
}
