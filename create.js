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
