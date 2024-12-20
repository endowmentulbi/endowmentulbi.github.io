// donor.js

// Function to fetch donor data from the API
async function fetchDonorData() {
    try {
        const response = await fetch('https://endowment-be.ulbi.ac.id/api/v1/pospay/donatur');
        const data = await response.json();

        if (data.success) {
            displayDonorData(data.data);
        } else {
            console.error('Failed to fetch data:', data.status);
        }
    } catch (error) {
        console.error('Error fetching donor data:', error);
    }
}

// Function to display donor data in the table
function displayDonorData(donors) {
    const donorList = document.getElementById('donor-list');
    donorList.innerHTML = ''; // Clear existing data

    // Limit to 10 donors
    const limitedDonors = donors.slice(0, 10);

    limitedDonors.forEach(donor => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${donor.customer_name.toUpperCase() }</td>
            <td>Rp ${donor.amount.toLocaleString('id-ID')}</td>
        `;
        donorList.appendChild(row);
    });
}

// Fetch donor data when the page loads
window.onload = fetchDonorData;
