// Splash Screen Logic
window.addEventListener('load', () => {
    setTimeout(() => {
        const splash = document.getElementById('splash');
        const main = document.querySelector('.main-content');
        
        splash.style.opacity = '0';
        setTimeout(() => {
            splash.style.display = 'none';
            main.classList.add('active');
        }, 800);
    }, 2000);
});

function toggleConfig() {
    const panel = document.getElementById('config-panel');
    panel.classList.toggle('hidden');
}

async function handleTranslation() {
    const apiKey = document.getElementById('api-key').value;
    const location = document.getElementById('location').value;
    const text = document.getElementById('source-text').value;
    const from = document.getElementById('source-lang').value;
    const to = document.getElementById('target-lang').value;
    const outputDiv = document.getElementById('output-text');

    if (!apiKey || !location) {
        alert("Please enter Azure Key and Location in Settings");
        return;
    }

    if (!text) return;

    outputDiv.innerText = "Translating...";
    outputDiv.style.opacity = "0.5";

    try {
        const response = await fetch(`https://api.cognitive.microsofttranslator.com/translate?api-version=3.0&from=${from}&to=${to}`, {
            method: 'POST',
            headers: {
                'Ocp-Apim-Subscription-Key': apiKey,
                'Ocp-Apim-Subscription-Region': location,
                'Content-type': 'application/json'
            },
            body: JSON.stringify([{ 'Text': text }])
        });

        const data = await response.json();
        
        if (response.ok) {
            outputDiv.innerText = data[0].translations[0].text;
            outputDiv.style.opacity = "1";
        } else {
            throw new Error(data.error.message);
        }
    } catch (error) {
        outputDiv.innerText = "Error: " + error.message;
        outputDiv.style.color = "#ff6b6b";
    }
}