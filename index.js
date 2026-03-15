// 1. Elements ko select karna
const planSelect = document.getElementById('planSelect');
const lockerCheckbox = document.getElementById('lockerCheckbox');
const totalDisplay = document.getElementById('totalDisplay');
const paymentSection = document.getElementById('paymentSection');
const finalAmountDisplay = document.getElementById('finalAmountDisplay');
const whatsappLink = document.getElementById('whatsappLink');
const admissionForm = document.querySelector('form');

// 2. LIVE Calculation Function (Jo turant ₹0 ko change karega)
function calculateTotal() {
    let total = 0;
    const planValue = planSelect.value;
    
    if (planValue === "4h") total = 400;
    else if (planValue === "6h") total = 600;
    else if (planValue === "8h") total = 800;

    if (lockerCheckbox.checked) {
        total += 100;
    }
    
    // Upar wala display update karein
    totalDisplay.innerText = "Total Amount: ₹" + total;
    return total; // Ye value submit function ko dega
}

// Event Listeners for Live Update
planSelect.addEventListener('change', calculateTotal);
lockerCheckbox.addEventListener('change', calculateTotal);

// 3. SUBMIT Function (Email + QR Display)
admissionForm.addEventListener('submit', function(event) {
    event.preventDefault(); 

    const currentTotal = calculateTotal(); // Final amount nikalna
    const formData = new FormData(this);
    
    // Email bhejna (Background mein)
    fetch(this.action, {
        method: 'POST',
        body: formData,
        headers: { 'Accept': 'application/json' }
    }).then(response => {
        if (response.ok) {
            alert("Registration Successful! Now complete your payment.");
            
            // Payment box dikhana
            paymentSection.style.display = "block";
            finalAmountDisplay.innerText = "Total Amount: ₹" + currentTotal;

            // WhatsApp Message setup
            const sName = document.getElementById('fName').value;
            const msg = `Hello! I am ${sName}. Registered for ${planSelect.value} shift. Total fee: ₹${currentTotal}.`;
            whatsappLink.href = `https://wa.me/91YOUR_NUMBER?text=${encodeURIComponent(msg)}`;

            // Niche scroll karna
            paymentSection.scrollIntoView({ behavior: 'smooth' });
        } else {
            alert("Something went wrong with the form submission.");
        }
    });
});
