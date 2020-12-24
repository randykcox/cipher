function analyzeText (evt) {
    const text = document.querySelector("#inputText").value
    const freqTable = document.querySelector("#freqTable")
    const fc = frequencyCount(text)
    
    let letterRow = document.createElement("tr")
    let countRow = document.createElement("tr")
    let percentRow = document.createElement("tr")
    let guessRow = document.createElement("tr")

    letterRow.innerHTML += `<th></th>`
    countRow.innerHTML += `<th>#</th>`
    percentRow.innerHTML += `<th>%</th>`
    guessRow.innerHTML += `<th>guess</th>`

    for (const letter in fc) {
        letterRow.innerHTML += `<th>${letter}</th>`
        countRow.innerHTML += `<td>${fc[letter].count}</td>`
        percentRow.innerHTML += `<td>${fc[letter].percentage.toFixed(2)}</td>`
        guessRow.innerHTML += `<td><span class="guess_${letter.toUpperCase()}"></span></td>`

    }

    freqTable.innerHTML = ""
    freqTable.append(letterRow, countRow, percentRow, guessRow)
}

function populateWorkArea (evt) {
    const text = document.querySelector("#inputText").value.trim()
    const workArea = document.querySelector("#workArea")
    let workAreaMarkup = ""

    for (let i=0; i<text.length; i++) {
        if (text[i] !== " ") {
            workAreaMarkup +=   `<div class="letterBlock">
                                    <div class="source">${text[i]}</div>
                                    <div class="guess guess_${text[i]}">_</div>
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
        guessEl.innerText = guess
    })
}

document.querySelector("#analyze").addEventListener("click", analyzeText)
document.querySelector("#analyze").addEventListener("click", populateWorkArea)