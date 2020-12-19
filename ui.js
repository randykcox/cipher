function analyzeText (evt) {
    let text = document.querySelector("#inputText").value
    let outputTable = document.querySelector("#output")
    let fc = frequencyCount(text)
    
    let letterRow = document.createElement("tr")
    let countRow = document.createElement("tr")
    let percentRow = document.createElement("tr")

    for (const letter in fc) {
        let letterCell = document.createElement("td")
        letterCell.append(letter)
        let countCell = document.createElement("td")
        countCell.append(fc[letter].count)
        let percentCell = document.createElement("td")
        percentCell.append(fc[letter].percentage.toFixed(2))

        letterRow.append(letterCell)
        countRow.append(countCell)
        percentRow.append(percentCell)
    }

    outputTable.append(letterRow, countRow, percentRow)
}

document.querySelector("#analyze").addEventListener("click", analyzeText)