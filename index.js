// 1. Elements ko select karna
const planSelect = document.getElementById('planSelect');
const lockerCheckbox = document.getElementById('lockerCheckbox');
const totalDisplay = document.getElementById('totalDisplay');

// 2. Calculation function banana
function calculateTotal() {
    let total = 0;

    // Plan ki value check karna
    const planValue = planSelect.value;
    if (planValue === "4h") total = 400;
    else if (planValue === "6h") total = 600;
    else if (planValue === "8h") total = 800;

    // Agar locker tick hai toh 100 add karo
    if (lockerCheckbox.checked) {
        total += 100;
    }

    // Screen par update karna
    totalDisplay.innerText = "Total Amount: ₹" + total;
}

// 3. Event Listeners lagana (Jab user kuch change kare toh function chale)
planSelect.addEventListener('change', calculateTotal);
lockerCheckbox.addEventListener('change', calculateTotal);
// Purane variables ke niche ye naye variables add karein
const paymentSection = document.getElementById('paymentSection');
const finalAmountDisplay = document.getElementById('finalAmountDisplay');
const whatsappLink = document.getElementById('whatsappLink');
const admissionForm = document.querySelector('form'); // Aapka form select karne ke liye

// Proceed to Payment button par click event
admissionForm.addEventListener('submit', function (event) {
    event.preventDefault(); // Form ko refresh hone se rokne ke liye

    // 1. Current total calculate karein (aapka purana logic)
    let total = 0;
    const planValue = document.getElementById('planSelect').value;
    if (planValue === "4h") total = 400;
    else if (planValue === "6h") total = 600;
    else if (planValue === "8h") total = 800;

    if (document.getElementById('lockerCheckbox').checked) {
        total += 100;
    }

    // 2. Payment Section dikhayein
    paymentSection.style.display = "block";
    finalAmountDisplay.innerText = "Total Amount: ₹" + total;

    // 3. WhatsApp Message taiyar karein
    const studentName = document.getElementById('fName').value;
    const message = `Hello Gurukulam Library! Mera naam ${studentName} hai. Maine ${planValue} wala plan select kiya hai. Mera total payment ₹${total} hai. Ye raha mera screenshot.`;

    // 4. WhatsApp link update karein (Apna number yahan daalein)
    whatsappLink.href = `https://wa.me/919693851806?text=${encodeURIComponent(message)}`;

    // 5. Page ko payment section tak scroll karein
    paymentSection.scrollIntoView({ behavior: 'smooth' });
});