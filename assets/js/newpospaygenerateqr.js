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

    if (response.message === "Generate QRIS Berhasil") {
      // Menggabungkan HTML untuk SweetAlert dengan CSS tambahan untuk perataan tengah
      const transactionDetails = `
            <div style="text-align: center;">
                <div id="qrCodeComplete" style="display: inline-block;"></div>
                <p>Transaction ID: ${data.payload.transaction_id}</p>
                <p>Amount: Rp${data.payload.amount}</p>
                <p>Date Created: ${new Date(
                  data.payload.date_created
                ).toLocaleString()}</p>
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
