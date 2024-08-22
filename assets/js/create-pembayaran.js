document.addEventListener("DOMContentLoaded", function () {
  let selectedDonationAmount = 0;

  function selectDonation(button) {
    const amountText = button.textContent
      .trim()
      .replace(".", "")
      .replace(",", "");
    selectedDonationAmount = parseInt(amountText, 10) || 0;

    document.getElementById("other-amount").value = "";
    const buttons = document.querySelectorAll(".btn-donation");
    buttons.forEach((btn) => btn.classList.remove("selected"));
    button.classList.add("selected");
  }

  document.querySelectorAll(".btn-donation").forEach((button) => {
    button.addEventListener("click", function () {
      selectDonation(this);
    });
  });

  document
    .getElementById("other-amount")
    .addEventListener("input", function () {
      selectedDonationAmount = parseInt(this.value) || 0;
      document
        .querySelectorAll(".btn-donation")
        .forEach((btn) => btn.classList.remove("selected"));
    });

  const bankAccounts = {
    BNI: "8510880300012622",
    BCA: "816100300012622",
    Mandiri: "885880300012622",
    BRI: "109530300012622",
    BSI: "0300012622",
    BTN: "0300012622",
  };

  document
    .getElementById("pembayaranTombol")
    .addEventListener("click", function (event) {
      event.preventDefault();

      if (selectedDonationAmount < 10000) {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Nominal donasi harus minimal 10.000",
          customClass: {
            popup: "swal-wide",
          },
        });
        return;
      }

      const paymentMethod = document.getElementById("payment-method").value;
      const accountNumber = bankAccounts[paymentMethod] || "Tidak ditemukan";
      const qrisImage = `assets/images/ulbi/qris-endowmentulbi.jpeg`;

      Swal.fire({
        title: "Detail Pembayaran",
        html: `
          <div style="text-align: center; margin-top: 10px;">
            <img src="${qrisImage}" alt="QRIS" style="width: 100%; max-width: 300px;">
            <div style="margin-top: 20px; font-size: 16px;">
              <strong>Nomor Rekening ${paymentMethod}:</strong>
              <span id="account-number">${accountNumber}</span>
              <button onclick="window.copyToClipboard('${accountNumber}')" class="btn btn-info btn-sm">Salin</button>
            </div>
          </div>`,
        showConfirmButton: false,
        showCancelButton: true,
        cancelButtonColor: "#d33",
        cancelButtonText: "Tutup",
      });
    });

  window.copyToClipboard = function (accountNumber) {
    navigator.clipboard
      .writeText(accountNumber)
      .then(() => {
        Swal.fire({
          icon: "success",
          title: "Tersalin!",
          text: "Nomor rekening berhasil disalin ke clipboard.",
          timer: 1500,
        });
      })
      .catch((err) => {
        Swal.fire({
          icon: "error",
          title: "Gagal!",
          text: "Gagal menyalin nomor rekening.",
          timer: 1500,
        });
      });
  };
});
