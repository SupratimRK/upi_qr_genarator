function generateQRCode() {
    const toggleSwitch = document.getElementById('toggleSwitch');
    const upiId = document.getElementById('upiId').value.trim();
    const amount = document.getElementById('amount').value.trim();
    const acNumber = document.getElementById('acNumber').value.trim();
    const ifsc = document.getElementById('ifsc').value.trim();
    const acAmount = document.getElementById('acAmount').value.trim();

    if (toggleSwitch.checked) {
        // AC mode selected
        if (!acNumber || !ifsc) {
            alert('Please enter AC number and IFSC code.');
            return;
        }

        const acId = `${acNumber}@${ifsc}.ifsc.npci`;
        const qrText = generateUPIQRText(acId, acAmount);
        displayQRCode(qrText);
    } else {
        // VPA mode selected
        if (!upiId) {
            alert('Please enter a valid UPI ID.');
            return;
        }

        const qrText = generateUPIQRText(upiId, amount);
        displayQRCode(qrText);
    }
}

function toggleInputsVisibility() {
    const toggleSwitch = document.getElementById('toggleSwitch');
    const upiInputs = document.getElementById('upiInputs');
    const acInputs = document.getElementById('acInputs');

    if (toggleSwitch.checked) {
        // AC mode selected, hide UPI inputs and show AC inputs
        upiInputs.style.display = 'none';
        acInputs.style.display = 'block';
    } else {
        // VPA mode selected, hide AC inputs and show UPI inputs
        upiInputs.style.display = 'block';
        acInputs.style.display = 'none';
    }
}

function generateUPIQRText(upiId, amount) {
    let qrText = 'upi://pay?pa=' + encodeURIComponent(upiId);

    if (amount) {
        qrText += '&mc=yourMerchantCode'; // Replace with your merchant code
        qrText += '&tid=yourTransactionId'; // Replace with your transaction ID
        qrText += '&tr=yourTransactionRefId'; // Replace with your transaction reference ID
        qrText += '&tn=Payment Description';
        qrText += '&am=' + encodeURIComponent(amount);
    }

    return qrText;
}

function displayQRCode(qrText) {
    const resultContainer = document.getElementById('qrcode');
    resultContainer.innerHTML = ''; // Clear previous QR code

    const qrcode = new QRCode(resultContainer, {
        text: qrText,
        width: 440,
        height: 440,
        colorDark: "#b1f202", // Set the dark color to #b1f202
        colorLight: "#fff",   // Set the light color to #fff
    });

    resultContainer.style.display = 'block';
}

// Event listener for toggle switch change
document.getElementById('toggleSwitch').addEventListener('change', toggleInputsVisibility);

// Call toggleInputsVisibility on page load to set initial state
toggleInputsVisibility();
