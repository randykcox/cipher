function transformText (text, textAlphabet, transformAlphabet ) {

    let transformedText = ""
    for (let i=0; i<text.length; i++) {
        let index = textAlphabet.indexOf(text[i].toLowerCase())
        if (index < 0) {
            // not a letter
            transformedText += text[i]
        } else {
            transformedText += transformAlphabet[index]
        }
    }

    return transformedText
}

function monoEncipher (plaintext) {

    const alphabet = "abcdefghijklmnopqrstuvwxyz"
    const cipher = "bcdefghijklmnopqrstuvwxyza"
    return transformText( plaintext, alphabet, cipher )
}

function monoDecipher (ciphertext) {
    const alphabet = "abcdefghijklmnopqrstuvwxyz"
    const cipher = "bcdefghijklmnopqrstuvwxyza"
    return transformText( ciphertext, cipher, alphabet )
}