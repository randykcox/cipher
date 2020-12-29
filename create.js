
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
    let shiftAmount = document.querySelector("#caesarShift").value
    setKeyAlphabet(stringShift(alphabet, shiftAmount))
}

function selectKeyType (evt) {
    let keyType = evt.target.value
    const shiftInput = document.querySelector("#caesarShift") 

    switch (keyType) {
        case 'rot13' :
            shiftInput.disabled = true
            setKeyAlphabet(stringShift(alphabet, 13))
            break
        case 'caesar' :
            shiftInput.disabled = false
            caesarShiftKey()
            break
        default :
            shiftInput.disabled = true
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

document.getElementsByName('keytype').forEach(function(radioInput) {
    radioInput.addEventListener("click", selectKeyType)
});
document.querySelector("#caesarShift").addEventListener("input", caesarShiftKey)