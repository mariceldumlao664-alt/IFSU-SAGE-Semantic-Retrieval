(() => {
    let username;

    try {
        username = window.sessionStorage.getItem('ifsu-sage-demo-username');
    } catch (error) {
        console.error('Unable to read the demo session:', error);
        window.location.replace('./index.html');
        return;
    }

    if (!username) {
        window.location.replace('./index.html');
        return;
    }

    document.getElementById('dashboard-username').textContent = username;
    document.getElementById('logoutButton').addEventListener('click', () => {
        try {
            window.sessionStorage.removeItem('ifsu-sage-demo-username');
        } catch (error) {
            console.error('Unable to clear the demo session:', error);
        }
        window.location.assign('./index.html');
    });

    if ('serviceWorker' in navigator && window.isSecureContext) {
        navigator.serviceWorker.register('./service-worker.js')
            .catch((error) => console.error('Service worker registration failed:', error));
    }
})();
