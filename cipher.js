function monoEncipher (plaintext) {
    const alphabet = "abcdefghijklmnopqrstuvwxyz"
    const cipher = "bcdefghijklmnopqrstuvwxyza"

    let ciphertext = ""
    for (let i=0; i<plaintext.length; i++) {
        let index = alphabet.indexOf(plaintext[i].toLowerCase())
        if (index < 0) {
            // not a letter
            ciphertext += plaintext[i]
        } else {
            ciphertext += cipher[index]
        }
    }

    return ciphertext
}