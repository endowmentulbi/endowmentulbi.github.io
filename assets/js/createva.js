let selectedDonationAmount = 0;

function selectDonation(button) {
  const amountText = button.textContent
    .trim()
    .replace(".", "")
    .replace(",", "");
  selectedDonationAmount = parseInt(amountText, 10);
  document.getElementById("other-amount").value = "";
  const buttons = document.querySelectorAll(".btn-donation");
  buttons.forEach((btn) => btn.classList.remove("selected"));
  button.classList.add("selected");
}

document.getElementById("other-amount").addEventListener("input", function () {
  selectedDonationAmount = parseInt(this.value) || 0;

  const buttons = document.querySelectorAll(".btn-donation");
  buttons.forEach((btn) => btn.classList.remove("selected"));
});

document
  .getElementById("pembayaranTombol")
  .addEventListener("click", function (event) {
    event.preventDefault();

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
            text: `Virtual Account: ${responseData.virtual_account}\nTransaction ID: ${responseData.trx_id}`,
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
  });
