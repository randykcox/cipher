const alphabet = "abcdefghijklmnopqrstuvwxyz"

/*
 * Utility Functions
 */

function shuffleString (input) {
    let array = input.split("")

    // Fisher-Yates shuffle implementation from
    // https://medium.com/@nitinpatel_20236/how-to-shuffle-correctly-shuffle-an-array-in-javascript-15ea3f84bfb
    for(let i = array.length-1; i > 0; i--){
        const j = Math.floor(Math.random() * i)
        const temp = array[i]
        array[i] = array[j]
        array[j] = temp
    }

    return array.join("")
}

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

/*
 * Analysis Functions
 */

const englishLetterFrequencies = {
    // From "The Code Book" by Simon Singh, page 19
    A: 8.2,     N: 6.7,
    B: 1.5,     O: 7.5,
    C: 2.8,     P: 1.9,
    D: 4.3,     Q: 0.1,
    E: 12.7,    R: 6.0,
    F: 2.2,     S: 6.3,
    G: 2.0,     T: 9.1,
    H: 6.1,     U: 2.8,
    I: 7.0,     V: 1.0,
    J: 0.2,     W: 2.4,
    K: 0.8,     X: 0.2,
    L: 4.0,     Y: 2.0,
    M: 2.4,     Z: 0.1
}

function singleLetterFrequencies (inputString) {
    const inputLength = inputString.length
    let letters = {}

    // Initialize the count for each letter to 0
    for (let i=0; i<alphabet.length; i++) {
        letters[alphabet[i].toUpperCase()] = 0
    }

    // Counts
    for (i=0; i<inputString.length; i++) {
        let character = inputString[i].toUpperCase()
        if (letters[character]) {
            letters[character] = letters[character] + 1
        } else {
            letters[character] = 1
        }
    }

    // Insert percentages
    for (const letter in letters) {
        letters[letter] = {
            count: letters[letter],
            percentage: (letters[letter]/inputLength)*100
        }
    }

    return letters
}

function sequenceFrequencies (sequenceLength, inputString, freqThresshold=3) {
    let sequences = {}

    const inputLength = inputString.length

    for (i=0; i<inputString.length-(sequenceLength-1); i++) {
        let sequence = inputString.slice(i, i+sequenceLength).toUpperCase()
        if (sequences[sequence]) {
            sequences[sequence] = sequences[sequence] + 1
        } else {
            sequences[sequence] = 1
        }
    }

    // Remove sequences that don't appear frequently enough
    for (let sequence in sequences) {
        if (sequences[sequence] <= freqThresshold) {
            delete sequences[sequence]
        }
    }

    return sequences
}

function frequencyCount (inputString) {
    inputString = stripNonLetters(inputString)
    
    return {
        letters:    singleLetterFrequencies(inputString),
        digraphs:   sequenceFrequencies(2, inputString, 5),
        trigraphs:  sequenceFrequencies(3, inputString, 4),
        quadgraphs: sequenceFrequencies(4, inputString)
    }
 }

/*
 * Encipher/Decipher Functions
 */

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