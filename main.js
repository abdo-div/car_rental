// ملف جافا سكريبت الرئيسي
// Main JavaScript File

// وظيفة للانتقال إلى صفحة الحجز مع بيانات السيارة
// Function to redirect to booking page with car details
function rentCar(carName, carPrice, carImage) {
    // تشفير البيانات لتمريرها في الرابط
    // Encode data to pass via URL
    const url = `booking.html?name=${encodeURIComponent(carName)}&price=${encodeURIComponent(carPrice)}&image=${encodeURIComponent(carImage)}`;

    // توجيه المستخدم
    // Redirect user
    window.location.href = url;
}

// ============================================
// نظام التنبيهات المخصص
// Custom Alert System
// ============================================

// إعداد التنبيه عند تحميل الصفحة
// Setup alert on page load
document.addEventListener('DOMContentLoaded', () => {
    setupCustomAlert();
});

// إنشاء عنصر التنبيه في الصفحة
// Create alert element in the page
function setupCustomAlert() {
    const alertHTML = `
        <div id="custom-alert" class="custom-alert-overlay">
            <div class="custom-alert-box">
                <div id="custom-alert-icon" class="custom-alert-icon"></div>
                <h2 id="custom-alert-title" class="custom-alert-title"></h2>
                <p id="custom-alert-message" class="custom-alert-message"></p>
                <button id="custom-alert-btn" class="custom-alert-btn">إغلاق</button>
            </div>
        </div>
    `;
    document.body.insertAdjacentHTML('beforeend', alertHTML);
}

// وظيفة عرض التنبيه (مع إمكانية تغيير نص الزر)
// Function to show alert (with customizable button text)
// type: 'success' | 'error'
// redirectUrl: اختياري - رابط للتوجيه عند الإغلاق
// buttonText: اختياري - نص الزر
function showAlert(type, title, message, redirectUrl = null, buttonText = "إغلاق") {
    const overlay = document.getElementById('custom-alert');
    const iconDiv = document.getElementById('custom-alert-icon');
    const titleElem = document.getElementById('custom-alert-title');
    const msgElem = document.getElementById('custom-alert-message');
    const btnElem = document.getElementById('custom-alert-btn');

    // إعداد الأيقونة واللون
    // Setup icon and color
    iconDiv.className = 'custom-alert-icon ' + type;
    iconDiv.innerHTML = type === 'success' ? '<i class="bx bx-check"></i>' : '<i class="bx bx-x"></i>';

    // إعداد النصوص
    // Setup texts
    titleElem.innerText = title;
    msgElem.innerText = message;
    btnElem.innerText = buttonText; // تحديث نص الزر

    // إظهار التنبيه (إضافة كلاس التنشيط)
    // Show alert (add active class)
    overlay.classList.add('active');

    // عند النقر على الزر
    // On button click
    btnElem.onclick = function () {
        // إخفاء التنبيه
        // Hide alert
        overlay.classList.remove('active');

        // التحقق من وجود رابط للتوجيه
        // Check for redirect URL
        if (redirectUrl) {
            // انتظار انتهاء حركة الاختفاء ثم التوجيه
            // Wait for animation then redirect
            setTimeout(() => {
                window.location.href = redirectUrl;
            }, 300);
        }
    };
}

// ============================================
// نظام المصادقة (تسجيل الدخول وإنشاء الحساب)
// Authentication System (Sign Up & Sign In)
// ============================================

// وظيفة إنشاء حساب جديد
// Function to register a new user
function registerUser(event) {
    event.preventDefault();

    const name = document.getElementById('signup-name').value;
    const email = document.getElementById('signup-email').value;
    const password = document.getElementById('signup-password').value;

    if (name === "" || email === "" || password === "") {
        showAlert('error', 'خطأ', 'الرجاء ملء جميع الحقول');
        return;
    }

    const user = {
        name: name,
        email: email,
        password: password
    };

    localStorage.setItem('user_data', JSON.stringify(user));

    // استخدام التنبيه المخصص مع التوجيه
    // Use custom alert with redirect
    showAlert('success', 'تم بنجاح', 'تم إنشاء الحساب بنجاح! الرجاء تسجيل الدخول.', 'signin.html');
}

// وظيفة تسجيل الدخول
// Function to login user
function loginUser(event) {
    event.preventDefault();

    const email = document.getElementById('signin-email').value;
    const password = document.getElementById('signin-password').value;
    const storedUser = localStorage.getItem('user_data');

    if (!storedUser) {
        showAlert('error', 'خطأ', 'لا يوجد حساب مسجل بهذا البريد الإلكتروني.');
        return;
    }

    const userData = JSON.parse(storedUser);

    if (email === userData.email && password === userData.password) {
        localStorage.setItem('is_logged_in', 'true');
        showAlert('success', 'تم بنجاح', 'تم تسجيل الدخول بنجاح! مرحباً ' + userData.name, 'index.html');
    } else {
        showAlert('error', 'خطأ', 'البريد الإلكتروني أو كلمة المرور غير صحيحة.');
    }
}

// وظيفة تأكيد الحجز (بالنص المطلوب)
// Confirm Booking Function (With requested text)
function confirmBooking() {
    // العنوان والرسالة المطلوبة
    const title = "تم تأكيد الحجز";
    const message = "تم تأكيد حجز السيارة بنجاح.\nسيتم التواصل معك قريبًا لإتمام الإجراءات.";

    // استدعاء التنبيه المخصص مع نص الزر "حسنًا"
    // Call custom alert with button text "Okay"
    showAlert('success', title, message, 'index.html', 'حسنًا');
}
