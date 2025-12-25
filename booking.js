// ملف جافا سكريبت الخاص بصفحة الحجز
// Booking Page JavaScript File

// انتظار تحميل محتوى الصفحة بالكامل
// Wait for DOM content to load
document.addEventListener('DOMContentLoaded', function () {

    // ============================================
    // الجزء الأول: معالجة بيانات السيارة من الرابط
    // Part 1: Handle Car Data from URL
    // ============================================

    // جلب المعلمات من رابط الصفحة (الاسم، السعر، الصورة)
    // Get parameters from URL (name, price, image)
    const urlParams = new URLSearchParams(window.location.search);
    const carName = urlParams.get('name');
    const carPrice = urlParams.get('price');
    const carImage = urlParams.get('image');

    // التحقق مما إذا كانت البيانات موجودة لعرضها
    // Check if data exists to display
    if (carName) {
        // تحديث النصوص والصورة في الصفحة بناءً على البيانات المستلمة
        document.getElementById('car-name').innerText = carName;
        document.getElementById('car-price').innerText = carPrice + "$ / شهر";
        document.getElementById('car-image').src = carImage;
    } else {
        // رسالة في حال عدم اختيار سيارة
        document.getElementById('car-details').innerHTML = "<p>لم يتم اختيار سيارة. الرجاء العودة للصفحة الرئيسية.</p>";
    }

    // ============================================
    // الجزء الثاني: معالجة إرسال نموذج الحجز
    // Part 2: Handle Booking Form Submission
    // ============================================

    // العثور على النموذج في الصفحة
    // Find the form in the page
    const bookingForm = document.querySelector('.booking-form');

    // إضافة مستمع لحدث الإرسال
    // Add event listener for submit
    if (bookingForm) {
        bookingForm.addEventListener('submit', function (event) {
            // منع السلوك الافتراضي للنموذج (إعادة تحميل الصفحة)
            // Prevent default form submission
            event.preventDefault();

            // استدعاء دالة تأكيد الحجز
            // Call confirm booking function
            confirmBookingAction();
        });
    }
});

// دالة تنفيذ إجراء تأكيد الحجز
// Function to execute booking confirmation
function confirmBookingAction() {
    // التحقق مما إذا كانت دالة showAlert (من main.js) متاحة
    // Check if showAlert (from main.js) is available
    if (typeof showAlert === 'function') {
        const title = "تم تأكيد الحجز";
        const message = "تم تأكيد حجز السيارة بنجاح.\nسيتم التواصل معك قريبًا لإتمام الإجراءات.";
        // استدعاء التنبيه المخصص
        showAlert('success', title, message, 'index.html', 'حسنًا');
    } else {
        // استخدام التنبيه العادي في حال عدم وجود ملف main.js
        // Fallback to standard alert
        alert("تم تأكيد الحجز بنجاح! شكراً لك.");
        window.location.href = "index.html";
    }
}
