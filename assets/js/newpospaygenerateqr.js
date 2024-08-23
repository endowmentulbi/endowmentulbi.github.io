// Fungsi untuk menangani pemilihan donasi
function selectDonation(button) {
    const allButtons = document.querySelectorAll('.btn-donation');
    allButtons.forEach(btn => {
        btn.classList.remove('selected');
    });
    button.classList.add('selected');
    document.getElementById('other-amount').value = '';
}

// Fungsi untuk melakukan POST request ke API
async function submitDonation() {
    const selectedButton = document.querySelector('.btn-donation.selected');
    const amount = selectedButton ? parseFloat(selectedButton.textContent.replace('.', '')) : parseFloat(document.getElementById('other-amount').value);
    const tips = parseFloat(document.getElementById('tips').value) || 0;

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