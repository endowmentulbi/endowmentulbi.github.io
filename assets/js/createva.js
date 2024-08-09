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

document
  .getElementById("donation-10000")
  .addEventListener("click", function () {
    selectDonation(this);
  });

document
  .getElementById("donation-25000")
  .addEventListener("click", function () {
    selectDonation(this);
  });

document
  .getElementById("donation-100000")
  .addEventListener("click", function () {
    selectDonation(this);
  });

document
  .getElementById("donation-500000")
  .addEventListener("click", function () {
    selectDonation(this);
  });

document.getElementById("other-amount").addEventListener("input", function () {
  selectedDonationAmount = parseInt(this.value) || 0;

  const buttons = document.querySelectorAll(".btn-donation");
  buttons.forEach((btn) => btn.classList.remove("selected"));
});
document
  .getElementById("pembayaranTombol")
  .addEventListener("click", function (event) {
    event.preventDefault();

    if (selectedDonationAmount < 10000) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Nominal donasi harus minimal 10.000",
      });
      return;
    }

    Swal.fire({
      title: "Apakah Anda yakin?",
      text: `Anda akan melakukan donasi sebesar IDR ${selectedDonationAmount.toLocaleString(
        "id-ID"
      )}.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Ya, lanjutkan!",
      cancelButtonText: "Batal",
    }).then((result) => {
      if (result.isConfirmed) {
        // Continue with form submission
        const data = {
          customerName: document.getElementById("full-name").value,
          customerEmail: document.getElementById("email").value,
          customerPhone: document.getElementById("phone").value,
          trxAmount: selectedDonationAmount,
          description: document.getElementById("message").value || "Testing",
          status: document.getElementById("status").value,
          alamat: document.getElementById("city").value,
          target_donasi: document.getElementById("target-donation").value,
        };

        fetch("https://endowment-be.ulbi.ac.id/api/v1/bni/create", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        })
          .then((response) => response.json())
          .then((result) => {
            if (result.status === "success") {
              const responseData = JSON.parse(result.data);
              Swal.fire({
                icon: "success",
                title: "Berhasil",
                html: `
                <div style="text-align: left; font-size: 14px; line-height: 1.6; margin-top: 10px;">
                  <strong>Kepada Yth. ${data.customerName},</strong><br>
                  <p>Berikut kami sampaikan tagihan Anda pada <strong>Universitas Logistik dan Bisnis Internasional (ULBI)</strong> dengan rincian sebagai berikut:</p>
                  <div style="border-top: 1px solid #ddd; margin: 10px 0;"></div>
                  <strong>Nomor VA:</strong> ${responseData.virtual_account}<br>
                  <strong>Kode Tagihan:</strong> ${responseData.trx_id}<br>
                  <strong>Email:</strong> ${data.customerEmail}<br>
                  <strong>Nama:</strong> ${data.customerName}<br>
                  <strong>Total Tagihan:</strong> IDR ${data.trxAmount.toLocaleString(
                    "id-ID"
                  )}<br>
                  <strong>Deskripsi:</strong> ${data.description}<br>
                  <strong>Tanggal Jatuh Tempo:</strong> 10 Aug 2024 15:06:31<br>
                  <div style="border-top: 1px solid #ddd; margin: 10px 0;"></div>
                  <p style="text-align: center; font-weight: bold;">Terima kasih atas donasi Anda</p>
                </div>
              `,
                confirmButtonText: "OK",
                confirmButtonColor: "#6c63ff",
                customClass: {
                  popup: "custom-swal-popup",
                  confirmButton: "custom-swal-button",
                },
              }).then(() => {
                // Refresh the page when the user clicks "OK"
                location.reload();
              });
            } else {
              Swal.fire({
                icon: "error",
                title: "Gagal",
                text: "Something went wrong, please try again later.",
              });
            }
          })
          .catch((error) => {
            console.error("Error:", error);
            Swal.fire({
              icon: "error",
              title: "Error",
              text: "Failed to submit the form.",
            });
          });
      }
    });
  });
