function getMainContent() {
    let idsToExtract = [
        'productTitle',
        'size_name_0',
        'size_name_1',
        'size_name_2',
        'feature-bullets',
        'whatsInTheBoxDeck'
    ];

    let extractedText = '';

    idsToExtract.forEach(id => {
        let elem = document.getElementById(id);
        if (elem) {
            let text = elem.textContent.replaceAll("\n", " ")
                                       .replaceAll("\t", " ")
                                       .replace(/\s+/g, ' ')
                                       .trim();
            extractedText += text + ' ';
        }
    });

    extractedText = extractedText.trim();
    return extractedText;
}

async function sendScrapedContentToBackend() {
    const mainContent = getMainContent();
    try {
        await fetch('http://127.0.0.1:5000/process_content', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ document: mainContent }),
        });
    } catch (error) {
        console.error('Error sending scraped content:', error);
    }
}

// Call this function when the page loads or content changes
sendScrapedContentToBackend();
