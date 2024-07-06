document.getElementById('openPromptButton').addEventListener('click', function() {
    document.getElementById('codePrompt').classList.remove('hidden');
});

document.getElementById('submitCodeButton').addEventListener('click', function() {
    const code = document.getElementById('codeInput').value;
    if (code === '1333') {
        window.location.href = 'discordding.html';
    } else {
        alert('Incorrect code. Please try again.');
    }
});
