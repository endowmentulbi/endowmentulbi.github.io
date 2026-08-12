async function checkStatus(transactionId) {
  const resultBox = document.getElementById("status-result");

  if (!transactionId) {
    alert("Masukkan Transaction ID terlebih dahulu");
    return;
  }

  const response = await fetch(
    `https://endowment-be.ulbi.ac.id/api/v1/pospay/status/${transactionId}`
  );
  const result = await response.json();

  if (!response.ok) {
    document.getElementById("result-status").textContent = result.message;
    document.getElementById("result-trx-id").textContent = transactionId;
    document.getElementById("result-customer").textContent = "-";
    document.getElementById("result-amount").textContent = "-";
    document.getElementById("result-date").textContent = "-";
    resultBox.classList.remove("success", "pending", "failed");
    resultBox.classList.add("failed");
    resultBox.style.display = "block";
    return;
  }

  const data = result.data;

  const formattedAmount = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
  }).format(data.amount);

  const formattedDate = data.transaction_date?.Time
    ? new Date(data.transaction_date.Time).toLocaleDateString("id-ID", {
        day: "numeric",
        month: "long",
        year: "numeric",
        timeZone: "Asia/Jakarta",
      })
    : "-";

  document.getElementById("result-status").textContent = result.status;
  document.getElementById("result-trx-id").textContent = data.transaction_id;
  document.getElementById("result-customer").textContent = data.customer_name || "-";
  document.getElementById("result-amount").textContent = formattedAmount;
  document.getElementById("result-date").textContent = formattedDate;

  resultBox.classList.remove("success", "pending", "failed");
  if (data.payment_state === "00") {
    resultBox.classList.add("success");
  } else if (data.payment_state === "99") {
    resultBox.classList.add("failed");
  } else {
    resultBox.classList.add("pending");
  }
  resultBox.style.display = "block";
}

document.getElementById("cek-status-button").addEventListener("click", () => {
  checkStatus(document.getElementById("transaction-id-input").value.trim());
});

// Auto-cek kalau datang dari link "Cek Status Pembayaran" (?trx=...)
const trxFromUrl = new URLSearchParams(window.location.search).get("trx");
if (trxFromUrl) {
  document.getElementById("transaction-id-input").value = trxFromUrl;
  checkStatus(trxFromUrl);
}
