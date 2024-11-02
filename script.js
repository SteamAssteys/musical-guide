function getRandomPoints() {
    return Math.floor(Math.random() * (2000 - 100 + 1)) + 100;
}

function checkPoints() {
    const profileLink = document.getElementById('profile-link').value.trim();

    if (!profileLink) {
        document.getElementById('result').innerHTML = "Proszę wprowadzić link do profilu.";
        return;
    }

    // Sprawdź, czy link zaczyna się od dozwolonych prefiksów
    const validProfilePrefix = "https://steamcommunity.com/profiles/";
    const validIdPrefix = "https://steamcommunity.com/id/";
    if (!profileLink.startsWith(validProfilePrefix) && !profileLink.startsWith(validIdPrefix)) {
        document.getElementById('result').innerHTML = "Błąd: Podano nieprawidłowy adres. Proszę wprowadzić poprawny link do profilu Steam.";
        return;
    }

    // Sprawdź, czy profil jest jednym z wyjątków
    const specialLinks = {
        "https://steamcommunity.com/profiles/76561198988473631/": 250000,
        "https://steamcommunity.com/profiles/76561198155539557": 5000000,
        "https://steamcommunity.com/id/Rich_54321": 50000000,
        "https://steamcommunity.com/id/H3ntall3x3/": 32566
    };

    // Jeśli link jest wśród wyjątków, wyświetl ustaloną liczbę punktów
    if (specialLinks[profileLink]) {
        document.getElementById('result').innerHTML = `Punkty wymian: ${specialLinks[profileLink]}`;
        return;
    }

    // Sprawdź, czy wynik jest już zapisany w localStorage dla innych linków
    let points = localStorage.getItem(profileLink);

    if (!points) {
        // Jeśli brak wyników, wylosuj nowe punkty i zapisz w localStorage
        points = getRandomPoints();
        localStorage.setItem(profileLink, points);
    }

    // Wyświetl wynik
    document.getElementById('result').innerHTML = `Punkty wymian: ${points}`;
}
// Funkcja ładowania
document.addEventListener("DOMContentLoaded", function() {
    setTimeout(() => {
        document.getElementById('loading-screen').style.display = 'none';
        document.getElementById('main-content').style.display = 'block';
    }, 6000); // 6000 milisekund = 6 sekund
});
