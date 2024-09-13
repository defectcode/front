// Funcție pentru a detecta dacă suntem în Instagram, TikTok sau alte aplicații
function isInAppBrowser() {
    const userAgent = navigator.userAgent || navigator.vendor;

    // Verificăm dacă userAgent conține cuvinte cheie pentru aplicații interne (Instagram, TikTok, etc.)
    if (/instagram|fbav|fban|tiktok|telegram|line/i.test(userAgent)) {
        return true;
    }
    return false;
}

// Funcția pentru redirecționare către browser extern
function redirectToBrowser() {
    const finalUrl = "https://paradiseproblems.com/"; // URL-ul către care vrei să redirecționezi utilizatorul

    // Dacă suntem în aplicația internă, redirecționăm către browser extern
    if (isInAppBrowser()) {
        window.location.href = finalUrl;
    } else {
        // Nu facem nimic dacă suntem deja în browser
        console.log("Utilizatorul este deja într-un browser extern.");
    }
}

// Apelăm funcția la încărcarea paginii
window.onload = redirectToBrowser;
