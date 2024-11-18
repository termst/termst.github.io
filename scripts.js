// Open the code prompt
document.getElementById('openPromptButton').addEventListener('click', function () {
    document.getElementById('codePrompt').classList.remove('hidden');
});

// Submit and process the code
document.getElementById('submitCodeButton').addEventListener('click', function () {
    const code = document.getElementById('codeInput').value;
    handleCode(code);
});

// Obfuscated correct code stored in a function
function getCorrectCode() {
    return String.fromCharCode(57, 49, 49); // "911" in ASCII
}

// Code handling logic
function handleCode(code) {
    const correctCode = getCorrectCode(); // Securely fetch correct code

    // Check the entered code
    switch (code) {
        case '1333':
            alert('haha fout je moet weer de github checken loser loser');
            break;
        case '112':
            alert('alarmcentrale moment');
            break;
        case '2008':
            alert('waarom heb je dit gedaan?');
            break;
        case '1306':
            alert('eng');
            break;
        case correctCode:
            alert('Correct code! Access granted.');
            // Redirect or trigger desired action here
            break;
        default:
            alert('Incorrect code. Please try again.');
            break;
    }
}
