// Fungsi ini akan memanggil API untuk mendapatkan total donasi dan menampilkannya di halaman.
function ambilTotalDonasi() {
  fetch('https://endowment-be.ulbi.ac.id/api/v1/pospay/total')  // Sesuaikan dengan URL endpoint API Anda.
    .then(response => {
      if (!response.ok) {
        throw new Error('Gagal memuat data dari server');
      }
      return response.json();
    })
    .then(data => {
      if (data.success) {
        document.getElementById('total-donation-display').textContent = `Rp.${data.data.toLocaleString()}`;
      } else {
        console.error('Gagal mendapatkan total donasi:', data.status);
      }
    })
    .catch(error => {
      console.error('Terjadi kesalahan:', error);
    });
}

// Menambahkan listener untuk memuat total donasi ketika halaman selesai dimuat
document.addEventListener('DOMContentLoaded', function () {
  ambilTotalDonasi();
});

// Listener untuk tombol cara donasi
document
  .getElementById("check-donation-button")
  .addEventListener("click", function () {
    window.location.href = "link-ke-cara-donasi.html";
  });

// Listener untuk tombol donasi
document
  .getElementById("donation-button")
  .addEventListener("click", function () {
    window.location.href = "link-ke-halaman-donasi.html";
  });
