const alphabet = "abcdefghijklmnopqrstuvwxyz"

function transformText (text, textAlphabet, transformAlphabet ) {

    let transformedText = ""
    for (let i=0; i<text.length; i++) {
        let index = textAlphabet.indexOf(text[i].toLowerCase())
        if (index < 0) {
            // not a letter, so pass through unmodified
            transformedText += text[i]
        } else {
            transformedText += transformAlphabet[index]
        }
    }

    return transformedText
}

function stringShift (inputString, shiftAmount) {
    if (shiftAmount < 0) {
        throw new Error("Cannot shift backwards (yet)")
    }
    let outputArr = inputString.split("")
    for (let i=0; i<shiftAmount; i++) {
        let letter = outputArr.shift()
        outputArr.push(letter)
    }
    return outputArr.join("")
}

function stripNonLetters (inputString) {
    let outputString = ""
    const alphabetArray = alphabet.split("")
    for (let i=0; i<inputString.length; i++) {
        if (alphabetArray.includes(inputString[i].toLowerCase())) {
            outputString += inputString[i]
        }
    }
    return outputString
}

function groupBy5 (inputString) {
    if (inputString.length <= 5) {
        return inputString
    }

    let inputArray = inputString.split("")
    let outputString = ""
    const numberOfGroups = Math.ceil(inputString.length/5)
    for (let i=0; i<numberOfGroups-1; i++) {
        outputString += inputArray.splice(0, 5).join("") + " "
    }
    outputString += inputArray.join("")

    return outputString
}

function monoEncipher (plaintext, cipher = stringShift(alphabet, 1)) {
    return transformText( plaintext, alphabet, cipher ).toUpperCase()
}

function monoDecipher (ciphertext, cipher = stringShift(alphabet, 1)) {
    return transformText( ciphertext, cipher, alphabet ).toLowerCase()
}

function caesarEncipher (plaintext, shiftAmount) {
    let cipher = stringShift( alphabet, shiftAmount )
    return monoEncipher( plaintext, cipher )
}

function caesarDecipher (ciphertext, shiftAmount) {
    let cipher = stringShift( alphabet, shiftAmount )
    return monoDecipher( ciphertext, cipher )
}

function rot13 (text) {
    return caesarEncipher(text, 13)
}