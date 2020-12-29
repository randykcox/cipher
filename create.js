
// Extracts the key alphabet from the letter input fields
function getKeyAlphabet () {
    const alphabet = "abcdefghijklmnopqrstuvwxyz"
    let key = ""

    for (let i=0; i<alphabet.length; i++) {
        const inputClass = "key_" + alphabet[i].toUpperCase()
        key += document.querySelector("input." + inputClass).value
    }

    return key
}

// Given a key alphabet string, set the letter input fields
function setKeyAlphabet (key) {
    const alphabet = "abcdefghijklmnopqrstuvwxyz"
    for (let i=0; i<alphabet.length; i++) {
        const inputClass = "key_" + alphabet[i].toUpperCase()
        document.querySelector("input." + inputClass).value = key[i]
    }
}

function caesarShiftKey () {
    const shiftAmount = document.querySelector("#caesarShift").value
    setKeyAlphabet(shiftString(alphabet, shiftAmount))
}

function keywordKey () {
    const keyword = document.querySelector("#keyword").value
    setKeyAlphabet(generateKeyByKeyword(keyword))
}

function selectKeyType (evt) {
    let keyType = evt.target.value
    const shiftInput = document.querySelector("#caesarShift") 
    const keywordInput = document.querySelector("#keyword") 

    switch (keyType) {
        case 'keyword' :
            shiftInput.disabled = true
            keywordInput.disabled = false
            keywordKey()
            break
        case 'random' :
            shiftInput.disabled = true
            keywordInput.disabled = true
            setKeyAlphabet(shuffleString(alphabet))
            break
        case 'rot13' :
            shiftInput.disabled = true
            keywordInput.disabled = true
            setKeyAlphabet(shiftString(alphabet, 13))
            break
        case 'caesar' :
            shiftInput.disabled = false
            keywordInput.disabled = true
            caesarShiftKey()
            break
        default :
            shiftInput.disabled = true
            keywordInput.disabled = true
    }
}

function encipher () {
    const key = getKeyAlphabet()
    const plaintext = document.querySelector("#plaintext").value
    const ciphertext = monoEncipher( plaintext, key )

    document.querySelector("#ciphertext").value = ciphertext.toUpperCase()
}

function decipher () {
    const key = getKeyAlphabet()
    const ciphertext = document.querySelector("#ciphertext").value
    const plaintext = monoDecipher( ciphertext, key )

    document.querySelector("#plaintext").value = plaintext.toLowerCase()
}



document.querySelector("#encipher").addEventListener("click", encipher)
document.querySelector("#decipher").addEventListener("click", decipher)

document.getElementsByName('keytype')
    .forEach(function(radioInput) {
        radioInput.addEventListener("click", selectKeyType)
});
document.querySelector("#caesarShift")
    .addEventListener("input", caesarShiftKey)
document.querySelector("#keyword")
    .addEventListener("input", keywordKey)