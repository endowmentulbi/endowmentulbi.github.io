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
    const selectedButton = document.querySelector('.btn-donation.selected');
    const amount = selectedDonationAmount;
    const tips = parseFloat(document.getElementById('tips').value) || 0;

    console.log('Amount:', amount); // Log the amount
    console.log('Tips:', tips); // Log the tips
    console.log('Total Amount Sent:', amount + tips); // Log the total amount sent

    if (!selectedButton && amount < 10000) {
        alert('Minimum donasi lainnya adalah Rp 10.000');
        return null;
    }

    const response = await fetch('https://endowment-be.ulbi.ac.id/api/v1/pospay/generate', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            terminal: "A01",
            type: "D",
            inquiry: "F",
            amount: amount + tips
        })
    });

    if (response.ok) {
        const responseData = await response.json();
        console.log('Response Data:', responseData); // Log the response data
        return responseData;
    } else {
        alert('Gagal memproses donasi: ' + response.statusText);
        return null;
    }
}

document.getElementById('pembayaranTombol').addEventListener('click', async () => {
    const responseData = await submitDonation();
    if (responseData && responseData.message === "Generate QRIS Berhasil") {
        const data = responseData.data;
        // Tampilkan QR Code
        const qrCode = new QRCode(document.getElementById('qrCode'), {
            text: data.qr_string,
            width: 128,
            height: 128,
            colorDark : "#000000",
            colorLight : "#ffffff",
            correctLevel : QRCode.CorrectLevel.H
        });

        // Update detail transaksi
        document.getElementById('transactionId').textContent = data.payload.transaction_id;
        document.getElementById('amount').textContent = data.payload.amount;
        document.getElementById('dateCreated').textContent = new Date(data.payload.date_created).toLocaleString();

        // Tampilkan modal
        $('#transactionModal').modal('show');
    }
});