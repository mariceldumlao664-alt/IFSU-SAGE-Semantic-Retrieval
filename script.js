(() => {
    const form = document.getElementById('loginForm');
    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');
    const passwordToggle = document.getElementById('togglePassword');
    const eyeIcon = document.getElementById('eyeIcon');
    const forgotPasswordLink = document.getElementById('forgotPasswordLink');
    const toast = document.getElementById('toastNotification');
    let toastTimeout;

    function showToast(message) {
        toast.textContent = message;
        toast.classList.add('show');
        window.clearTimeout(toastTimeout);
        toastTimeout = window.setTimeout(() => toast.classList.remove('show'), 3500);
    }

    passwordToggle.addEventListener('click', () => {
        const revealPassword = passwordInput.type === 'password';
        passwordInput.type = revealPassword ? 'text' : 'password';
        passwordToggle.setAttribute('aria-pressed', String(revealPassword));
        passwordToggle.setAttribute('aria-label', revealPassword ? 'Hide password' : 'Show password');
        eyeIcon.classList.toggle('fa-eye', revealPassword);
        eyeIcon.classList.toggle('fa-eye-slash', !revealPassword);
    });

    form.addEventListener('submit', (event) => {
        event.preventDefault();

        const username = usernameInput.value.trim();
        const password = passwordInput.value.trim();

        if (!username && !password) {
            showToast('Please enter your username and password.');
            usernameInput.focus();
            return;
        }
        if (!username) {
            showToast('Please enter your username.');
            usernameInput.focus();
            return;
        }
        if (!password) {
            showToast('Please enter your password.');
            passwordInput.focus();
            return;
        }

        try {
            window.sessionStorage.setItem('ifsu-sage-demo-username', username);
        } catch (error) {
            console.error('Unable to start the demo session:', error);
            showToast('Unable to start the demo session in this browser.');
            return;
        }

        showToast('Demo login successful. Redirecting to the dashboard...');
        window.setTimeout(() => {
            window.location.assign('./dashboard.html');
        }, 1200);
    });

    forgotPasswordLink.addEventListener('click', (event) => {
        event.preventDefault();
        showToast('Please contact the IFSU system administrator to reset your password.');
    });

    if ('serviceWorker' in navigator && window.isSecureContext) {
        navigator.serviceWorker.register('./service-worker.js')
            .catch((error) => console.error('Service worker registration failed:', error));
    }
})();
