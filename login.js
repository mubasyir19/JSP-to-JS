document.addEventListener =
  ('DOMContentLoaded',
  () => {
    const loginForm = document.getElementById('loginForm');
    const errorMessage = document.getElementById('errorMessage');

    loginForm.addEventListener('submit', async (event) => {
      event.preventDefault(); // cegah reload

      const username = document.getElementById('username').value.trim();
      const password = document.getElementById('password').value.trim();

      //   Jika username atau password tidak terisi
      if (!username || !password) {
        errorMessage.textContent = 'username dan password harus diisi.';
        return;
      }

      try {
        // Hit API backend
        const response = await fetch('/api/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ username, password }),
        });

        const result = await response.json();

        if (!response.ok) {
          throw new Error(result.message || 'Gagal login');
        }

        // direct ke halaman lain karena sukses login
        window.location.href = 'dashboard.html'; // contah ketika berhasil login akan mengarah ke dashboard.html
      } catch (error) {
        errorMessage.textContent = error.message;
      }
    });
  });
