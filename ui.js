let currentCipherLetter = ""

function graphBackgroundStyle (percent, max) {
    // background-image: linear-gradient(transparent 50%, var(--graphColor) 50%);
    const colorStop = 100 - ((percent * 100) / max)
    return `background-image: linear-gradient(transparent ${colorStop}%, var(--graphColor) ${colorStop}%);`
}

function analyzeText (evt) {
    const text = document.querySelector("#inputText").value
    const freqTable = document.querySelector("#freqTable")
    const fc = frequencyCount(text)
    
    let letterRow = document.createElement("tr")
    let countRow = document.createElement("tr")
    let percentRow = document.createElement("tr")
    let guessRow = document.createElement("tr")
    guessRow.id = "guessInputs"

    letterRow.innerHTML += `<th></th>`
    countRow.innerHTML += `<th>#</th>`
    percentRow.innerHTML += `<th>%</th>`
    guessRow.innerHTML += `<th>guess</th>`

    for (const letter in fc) {
        const fullScale = 12
        const cellMax = fullScale / 3
        const topCellGraph = (fc[letter].percentage >= fullScale)
            ? "background-image: linear-gradient(var(--graphColor), var(--graphColor))"
            : graphBackgroundStyle(fc[letter].percentage - cellMax*2, fullScale)
        const middleCellGraph = (fc[letter].percentage >= cellMax*2)
            ? "background-image: linear-gradient(var(--graphColor), var(--graphColor))"
            : graphBackgroundStyle(fc[letter].percentage - cellMax, fullScale)
        const bottomCellGraph = (fc[letter].percentage >= cellMax)
            ? "background-image: linear-gradient(var(--graphColor), var(--graphColor))"
            : graphBackgroundStyle(fc[letter].percentage, fullScale)
        
        letterRow.innerHTML += `<th style="${topCellGraph}">${letter}</th>`
        countRow.innerHTML += `<td style="${middleCellGraph}">${fc[letter].count}</td>`
        percentRow.innerHTML += `<td style="${bottomCellGraph}">${fc[letter].percentage.toFixed(2)}</td>`
        guessRow.innerHTML += `<td id="form_${letter.toUpperCase()}">
                                <div class="guess_${letter.toUpperCase()} guessInput"
                                    data-letter="${letter.toUpperCase()}">
                                </div>
                            </td>`
    }

    freqTable.innerHTML = ""
    freqTable.append(letterRow, countRow, percentRow, guessRow)
}

function isPunctuation (character) {
    const marks = ",.?!&-:;’'\"()"
    return marks.includes(character)
}

function populateWorkArea (evt) {
    const text = document.querySelector("#inputText").value.trim()
    const workArea = document.querySelector("#workArea")
    let workAreaMarkup = ""

    for (let i=0; i<text.length; i++) {
        if (text[i] !== " ") {
            let guessCharacter = "_"
            if (isPunctuation(text[i])) {
                guessCharacter = text[i]
            }
            workAreaMarkup +=   `<div class="letterBlock">
                                    <div class="source">${text[i]}</div>
                                    <div class="guess guess_${text[i]}">${guessCharacter}</div>
                                </div>`
        } else {
            workAreaMarkup += `<div class="letterBlock"></div>`
        }
    }

    workArea.innerHTML = workAreaMarkup
}

function markAGuess (letter, guess) {
    let guessElements = document.querySelectorAll(".guess_" + letter)
    guessElements.forEach(function (guessEl) {
        guessEl.innerText = guess.toLowerCase()
    })
}

function highlightAllWithClass (className) {
    let elements = document.querySelectorAll(className)
    elements.forEach(function (el) {
        el.classList.add("highlight")
    })
}

function removeHighlights () {
    let elements = document.querySelectorAll(".highlight")
    elements.forEach(function (el) {
        el.classList.remove("highlight")
    })
}

function cancelSelection () {
    currentCipherLetter = ""
    removeHighlights()
}

function handleKeyup (evt) {
    function getLetterFromKeyCode (code) {
        return (code.slice(0,3) === "Key") ? code.slice(-1) : undefined
    }

    if (evt.code === "Escape") {
        cancelSelection()
    }

    const letter = getLetterFromKeyCode(evt.code)
    if (letter) {
        if (currentCipherLetter === "") {
            // select a letter
            currentCipherLetter = letter
            highlightAllWithClass(".guess_" + letter)
        } else {
            // Mark a guess
            markAGuess(currentCipherLetter, letter)
            cancelSelection()
        }
    }
}

function selectGuessInput (evt) {
    cancelSelection()
    let letter = evt.target.dataset.letter
    currentCipherLetter = letter
    highlightAllWithClass(".guess_" + letter)
}

document.querySelector("#analyze").addEventListener("click", analyzeText)
document.querySelector("#analyze").addEventListener("click", populateWorkArea)
document.querySelector("#analyze").addEventListener("click", function () {
    document.querySelectorAll(".guessInput").forEach(function (element) {
        element.addEventListener("click", selectGuessInput)
    })    
})

document.addEventListener("keyup", handleKeyup)
