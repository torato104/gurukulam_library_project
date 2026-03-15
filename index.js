const admissionForm = document.querySelector('form');
const paymentSection = document.getElementById('paymentSection');
const finalAmountDisplay = document.getElementById('finalAmountDisplay');
const whatsappLink = document.getElementById('whatsappLink');

admissionForm.addEventListener('submit', function(event) {
    event.preventDefault(); // Browser ko reload hone se rokne ke liye

    // 1. Pehle Total Calculate karein
    let total = 0;
    const planValue = document.getElementById('planSelect').value;
    if (planValue === "4h") total = 400;
    else if (planValue === "6h") total = 600;
    else if (planValue === "8h") total = 800;

    if (document.getElementById('lockerCheckbox').checked) {
        total += 100;
    }

    // 2. Data ko Email (Formspree) par bhejien background mein
    const formData = new FormData(this);
    
    fetch(this.action, {
        method: 'POST',
        body: formData,
        headers: { 'Accept': 'application/json' }
    }).then(response => {
        if (response.ok) {
            // Agar email chali gayi, toh ye karein:
            alert("Success! Details saved. Please complete payment below.");
            
            // 3. QR Section dikhayein
            paymentSection.style.display = "block";
            finalAmountDisplay.innerText = "Total Amount: ₹" + total;

            // 4. WhatsApp Link update karein
            const sName = document.getElementById('fName').value;
            const msg = `Hello! I am ${sName}. My total fee is ₹${total}. Here is my screenshot.`;
            whatsappLink.href = `https://wa.me/91YOUR_NUMBER?text=${encodeURIComponent(msg)}`;

            // 5. Niche scroll karein
            paymentSection.scrollIntoView({ behavior: 'smooth' });
        } else {
            alert("Oops! Email sending failed. Try again.");
        }
    });
});
