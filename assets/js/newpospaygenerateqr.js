let selectedDonationAmount = 0;

function selectDonation(button) {
  const amountText = button.textContent
    .trim()
    .replace(/\./g, "")
    .replace(/,/g, "");
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

document
  .getElementById("donation-1000000")
  .addEventListener("click", function () {
    selectDonation(this);
  });

document
  .getElementById("donation-5000000")
  .addEventListener("click", function () {
    selectDonation(this);
  });

document
  .getElementById("donation-8000000")
  .addEventListener("click", function () {
    selectDonation(this);
  });

document
  .getElementById("donation-10000000")
  .addEventListener("click", function () {
    selectDonation(this);
  });

document.getElementById("other-amount").addEventListener("input", function () {
  selectedDonationAmount = parseInt(this.value) || 0;

  const buttons = document.querySelectorAll(".btn-donation");
  buttons.forEach((btn) => btn.classList.remove("selected"));
});

// Fungsi untuk melakukan POST request ke API
async function submitDonation() {
  const selectedButton = document.querySelector(".btn-donation.selected");
  const amount = selectedDonationAmount;
  // const tips = parseFloat(document.getElementById('tips').value) || 0;

  console.log("Amount:", amount); // Log the amount
  // console.log('Tips:', tips); // Log the tips
  console.log("Total Amount Sent:", amount); // Log the total amount sent

  if (!selectedButton && amount < 10000) {
    alert("Minimum donasi lainnya adalah Rp 10.000");
    return null;
  }

  const response = await fetch(
    "https://endowment-be.ulbi.ac.id/api/v1/pospay/generate",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        terminal: "A01",
        type: "D",
        inquiry: "F",
        amount: amount,
      }),
    }
  );

  if (response.ok) {
    const responseData = await response.json();
    console.log("Response Data:", responseData); // Log the response data
    return responseData;
  } else {
    alert("Gagal memproses donasi: " + response.statusText);
    return null;
  }
}

document
  .getElementById("pembayaranTombol")
  .addEventListener("click", async () => {
    const response = await submitDonation();
    const data = response.data;
    const formattedAmount = new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(data.payload.amount);
    if (response.message === "Generate QRIS Berhasil") {
      // Menggabungkan HTML untuk SweetAlert dengan CSS tambahan untuk perataan tengah
      const transactionDetails = `
            <div style="text-align: center;">
                <div id="qrCodeComplete" style="display: inline-block;"></div>
                <p>No Invoice: ${data.payload.transaction_id}
                  <button type="button" id="copyTrxIdTombol" title="Copy No Invoice" style="border: none; background: none; cursor: pointer; padding: 0 0 0 4px; transition: transform 150ms;">📋</button>
                </p>
                <p>Jumlah: ${formattedAmount}</p>
                <p>Tanggal Dibuat: ${new Date(
                  data.payload.date_created
                ).toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric", timeZone: "Asia/Jakarta" })}</p>
                <a href="cek-status-pembayaran.html?trx=${data.payload.transaction_id}" target="_blank" class="btn btn-primary" style="margin-top: 10px; display: inline-block;" onmouseover="this.style.color='#fff'" onmouseout="this.style.color=''">Cek Status Pembayaran</a>
            </div>
        `;

      // Tampilkan SweetAlert dengan QR Code di tengah
      Swal.fire({
        title: "Detail Transaksi",
        html: transactionDetails,
        confirmButtonText: "Close",
        didOpen: () => {
          // Membuat QR Code setelah modal terbuka
          const qrCodeComplete = new QRCode(
            document.getElementById("qrCodeComplete"),
            {
              text: data.qr_string,
              width: 256,
              height: 256,
              colorDark: "#000000",
              colorLight: "#ffffff",
              correctLevel: QRCode.CorrectLevel.M, // Menggunakan tingkat koreksi yang lebih moderat
            }
          );

          document
            .getElementById("copyTrxIdTombol")
            .addEventListener("click", (e) => {
              navigator.clipboard.writeText(data.payload.transaction_id);

              const btn = e.currentTarget;
              btn.style.transform = "scale(0.85)";
              setTimeout(() => (btn.style.transform = "scale(1)"), 150);

              Swal.fire({
                toast: true,
                position: "top",
                icon: "success",
                title: "No Invoice berhasil disalin",
                showConfirmButton: false,
                timer: 1500,
              });
            });
        },
        customClass: {
          confirmButton: "btn btn-secondary",
        },
        buttonsStyling: false,
      });
    } else {
      // Tampilkan pesan error jika gagal
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Gagal menggenerate QR Code: " + response.message,
      });
    }
  });
