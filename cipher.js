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

function monoEncipher (plaintext, cipher = stringShift(alphabet, 1)) {
    return transformText( plaintext, alphabet, cipher )
}

function monoDecipher (ciphertext, cipher = stringShift(alphabet, 1)) {
    return transformText( ciphertext, cipher, alphabet )
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