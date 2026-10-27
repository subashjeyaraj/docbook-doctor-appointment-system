/**
 * DocBook - Client-side Storage & State Engine
 * Replaces the Node/Express backend with pure localStorage persistence.
 * Allows running completely offline and on static hosts like GitHub Pages.
 */

const DocBookDB = (function () {
    const STORAGE_KEYS = {
        DOCTORS: "docbook_doctors",
        USERS: "docbook_users",
        APPOINTMENTS: "docbook_appointments",
        CURRENT_USER: "docbook_current_user",
        CART: "docbook_cart",
        ORDERS: "docbook_orders"
    };

    // Initial Seed Data
    const INITIAL_DOCTORS = [
        {
            id: 1,
            name: "Dr. Sarah Jenkins",
            email: "sarah.jenkins@docbook.com",
            specialist: "Cardiologist",
            experience: 14,
            fee: 800,
            hospital: "Apollo Heart Care Center",
            rating: 4.9,
            reviewsCount: 128,
            about: "Senior Interventional Cardiologist specializing in cardiovascular health, hypertension management, and preventive heart care.",
            photo: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=400&q=80",
            availableDays: "Mon - Sat",
            timing: "09:00 AM - 02:00 PM"
        },
        {
            id: 2,
            name: "Dr. Rajesh Kumar",
            email: "rajesh.kumar@docbook.com",
            specialist: "General Physician",
            experience: 16,
            fee: 500,
            hospital: "City Health Hospital",
            rating: 4.8,
            reviewsCount: 215,
            about: "Expert in internal medicine, chronic disease management, fever diagnosis, seasonal viral infections, and family wellness.",
            photo: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=400&q=80",
            availableDays: "Mon - Sun",
            timing: "08:30 AM - 04:30 PM"
        },
        {
            id: 3,
            name: "Dr. Emily Chen",
            email: "emily.chen@docbook.com",
            specialist: "Dermatologist",
            experience: 10,
            fee: 700,
            hospital: "Skin & Aesthetic Care Clinic",
            rating: 4.9,
            reviewsCount: 164,
            about: "Board-certified dermatologist specializing in acne, eczema, laser therapies, skin allergies, and advanced cosmetic dermatology.",
            photo: "https://images.unsplash.com/photo-1594824813571-638f02638520?auto=format&fit=crop&w=400&q=80",
            availableDays: "Tue - Sat",
            timing: "10:00 AM - 05:00 PM"
        },
        {
            id: 4,
            name: "Dr. Marcus Vance",
            email: "marcus.vance@docbook.com",
            specialist: "Neurologist",
            experience: 18,
            fee: 950,
            hospital: "NeuroLife Super Speciality Hospital",
            rating: 4.9,
            reviewsCount: 96,
            about: "Lead Neurologist with deep expertise in migraine management, stroke recovery, neuropathy, sleep disorders, and memory care.",
            photo: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&w=400&q=80",
            availableDays: "Mon - Fri",
            timing: "11:00 AM - 06:00 PM"
        },
        {
            id: 5,
            name: "Dr. Priya Sharma",
            email: "priya.sharma@docbook.com",
            specialist: "Pediatrician",
            experience: 12,
            fee: 600,
            hospital: "Rainbow Children Clinic",
            rating: 5.0,
            reviewsCount: 182,
            about: "Compassionate child healthcare specialist focusing on infant nutrition, immunization, growth milestones, and pediatric care.",
            photo: "https://images.unsplash.com/photo-1651008376811-b90baee60c1f?auto=format&fit=crop&w=400&q=80",
            availableDays: "Mon - Sat",
            timing: "09:00 AM - 01:00 PM"
        },
        {
            id: 6,
            name: "Dr. David Miller",
            email: "david.miller@docbook.com",
            specialist: "Orthopedic",
            experience: 15,
            fee: 850,
            hospital: "Metro Joint & Spine Hospital",
            rating: 4.8,
            reviewsCount: 140,
            about: "Orthopedic surgeon specializing in knee and hip arthritis, sports injuries, fracture management, and joint mobility rehabilitation.",
            photo: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=400&q=80",
            availableDays: "Mon - Fri",
            timing: "10:00 AM - 04:00 PM"
        }
    ];

    const INITIAL_USERS = [
        {
            id: 1,
            name: "Alex Johnson",
            email: "patient@docbook.com",
            password: "patient123",
            role: "user",
            mobile: "+91 98765 43210"
        },
        {
            id: 101,
            name: "Dr. Sarah Jenkins",
            email: "doctor@docbook.com",
            password: "doctor123",
            role: "doctor",
            doctorId: 1,
            specialist: "Cardiologist",
            mobile: "+91 91234 56789"
        }
    ];

    const INITIAL_APPOINTMENTS = [
        {
            id: 1001,
            doctor_id: 1,
            doctor_name: "Dr. Sarah Jenkins",
            patient_name: "Alex Johnson",
            patient_email: "patient@docbook.com",
            patient_mobile: "+91 98765 43210",
            appt_date: "2026-11-02",
            appt_time: "10:30 AM",
            reason: "Routine cardiovascular checkup and ECG review",
            status: "Confirmed",
            created_at: "2026-10-25T10:15:00Z"
        },
        {
            id: 1002,
            doctor_id: 2,
            doctor_name: "Dr. Rajesh Kumar",
            patient_name: "Alex Johnson",
            patient_email: "patient@docbook.com",
            patient_mobile: "+91 98765 43210",
            appt_date: "2026-11-05",
            appt_time: "02:00 PM",
            reason: "Seasonal allergy symptoms & blood pressure evaluation",
            status: "Pending",
            created_at: "2026-10-26T14:30:00Z"
        }
    ];

    // Safe JSON Helpers
    function readStorage(key, defaultVal) {
        try {
            const data = localStorage.getItem(key);
            return data ? JSON.parse(data) : defaultVal;
        } catch (e) {
            console.error("DocBookDB Storage Read Error:", e);
            return defaultVal;
        }
    }

    function writeStorage(key, val) {
        try {
            localStorage.setItem(key, JSON.stringify(val));
        } catch (e) {
            console.error("DocBookDB Storage Write Error:", e);
        }
    }

    // Seed Data if empty
    function seedData() {
        if (!localStorage.getItem(STORAGE_KEYS.DOCTORS)) {
            writeStorage(STORAGE_KEYS.DOCTORS, INITIAL_DOCTORS);
        }
        if (!localStorage.getItem(STORAGE_KEYS.USERS)) {
            writeStorage(STORAGE_KEYS.USERS, INITIAL_USERS);
        }
        if (!localStorage.getItem(STORAGE_KEYS.APPOINTMENTS)) {
            writeStorage(STORAGE_KEYS.APPOINTMENTS, INITIAL_APPOINTMENTS);
        }
    }

    // Initialize on load
    seedData();

    // Public API
    return {
        // --- DOCTORS ---
        getDoctors: function () {
            return readStorage(STORAGE_KEYS.DOCTORS, INITIAL_DOCTORS);
        },

        getDoctorById: function (id) {
            const docs = this.getDoctors();
            return docs.find(d => Number(d.id) === Number(id)) || null;
        },

        registerDoctor: function (doctorData) {
            const doctors = this.getDoctors();
            const users = readStorage(STORAGE_KEYS.USERS, INITIAL_USERS);

            // Check if email already used
            const exists = doctors.find(d => d.email.toLowerCase() === doctorData.email.toLowerCase()) ||
                           users.find(u => u.email.toLowerCase() === doctorData.email.toLowerCase());

            if (exists) {
                return { success: false, message: "This email address is already registered." };
            }

            const newId = Date.now();
            const newDoctor = {
                id: newId,
                name: doctorData.name,
                email: doctorData.email,
                specialist: doctorData.specialist,
                experience: Number(doctorData.experience) || 1,
                fee: Number(doctorData.fee) || 600,
                hospital: doctorData.hospital || "DocBook Affiliated Clinic",
                rating: 5.0,
                reviewsCount: 1,
                about: doctorData.about || `Specialist in ${doctorData.specialist} with ${doctorData.experience} years of clinical expertise.`,
                photo: doctorData.photo || "https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&w=400&q=80",
                availableDays: "Mon - Sat",
                timing: "09:00 AM - 05:00 PM"
            };

            doctors.push(newDoctor);
            writeStorage(STORAGE_KEYS.DOCTORS, doctors);

            // Also register as a doctor user account for login
            const newDocUser = {
                id: newId,
                name: doctorData.name,
                email: doctorData.email,
                password: doctorData.password,
                role: "doctor",
                doctorId: newId,
                specialist: doctorData.specialist
            };
            users.push(newDocUser);
            writeStorage(STORAGE_KEYS.USERS, users);

            return { success: true, message: "Doctor registered successfully!", doctorId: newId };
        },

        // --- USERS & AUTH ---
        getUsers: function () {
            return readStorage(STORAGE_KEYS.USERS, INITIAL_USERS);
        },

        registerUser: function (userData) {
            const users = this.getUsers();
            const exists = users.find(u => u.email.toLowerCase() === userData.email.toLowerCase());

            if (exists) {
                return { success: false, message: "An account with this email already exists." };
            }

            const newId = Date.now();
            const newUser = {
                id: newId,
                name: userData.name,
                email: userData.email,
                password: userData.password,
                role: "user",
                mobile: userData.mobile || ""
            };

            users.push(newUser);
            writeStorage(STORAGE_KEYS.USERS, users);

            return { success: true, message: "User registered successfully!", user: newUser };
        },

        login: function (email, password) {
            const users = this.getUsers();
            const normalizedEmail = email.trim().toLowerCase();

            const user = users.find(u => u.email.toLowerCase() === normalizedEmail && u.password === password);

            if (!user) {
                return { success: false, message: "Invalid email or password. Please verify and try again." };
            }

            const sessionUser = {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role,
                doctorId: user.doctorId || null,
                specialist: user.specialist || null
            };

            this.setCurrentUser(sessionUser);
            return { success: true, message: "Login successful!", user: sessionUser };
        },

        getCurrentUser: function () {
            // First check sessionStorage, then localStorage
            try {
                const s = sessionStorage.getItem(STORAGE_KEYS.CURRENT_USER);
                if (s) return JSON.parse(s);
            } catch (e) {}

            return readStorage(STORAGE_KEYS.CURRENT_USER, null);
        },

        setCurrentUser: function (user) {
            if (user) {
                sessionStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(user));
                writeStorage(STORAGE_KEYS.CURRENT_USER, user);
            } else {
                sessionStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
                localStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
            }
        },

        logout: function () {
            this.setCurrentUser(null);
            window.location.href = "login.html";
        },

        // --- APPOINTMENTS ---
        getAppointments: function () {
            return readStorage(STORAGE_KEYS.APPOINTMENTS, INITIAL_APPOINTMENTS);
        },

        getAppointmentsByEmail: function (email) {
            const appts = this.getAppointments();
            if (!email) return [];
            return appts.filter(a => a.patient_email.toLowerCase() === email.toLowerCase());
        },

        getAppointmentsByDoctor: function (doctorId) {
            const appts = this.getAppointments();
            return appts.filter(a => Number(a.doctor_id) === Number(doctorId));
        },

        createAppointment: function (data) {
            if (!data.doctor_id || !data.patient_name || !data.patient_email || !data.appt_date) {
                return { success: false, message: "Please fill in all mandatory appointment fields." };
            }

            const appts = this.getAppointments();
            const newId = Date.now();
            const newAppt = {
                id: newId,
                doctor_id: Number(data.doctor_id),
                doctor_name: data.doctor_name || "Doctor",
                patient_name: data.patient_name,
                patient_email: data.patient_email,
                patient_mobile: data.patient_mobile || "Not specified",
                appt_date: data.appt_date,
                appt_time: data.appt_time || "10:00 AM",
                reason: data.reason || "General Consultation",
                status: "Pending",
                created_at: new Date().toISOString()
            };

            appts.unshift(newAppt);
            writeStorage(STORAGE_KEYS.APPOINTMENTS, appts);

            return { success: true, message: "Appointment request submitted successfully!", appointment: newAppt };
        },

        updateAppointmentStatus: function (id, status) {
            const valid = ["Pending", "Confirmed", "Cancelled"];
            if (!valid.includes(status)) {
                return { success: false, message: "Invalid status value." };
            }

            const appts = this.getAppointments();
            const idx = appts.findIndex(a => Number(a.id) === Number(id));

            if (idx === -1) {
                return { success: false, message: "Appointment not found." };
            }

            appts[idx].status = status;
            writeStorage(STORAGE_KEYS.APPOINTMENTS, appts);
            return { success: true, message: `Appointment status updated to ${status}.`, appointment: appts[idx] };
        },

        deleteAppointment: function (id) {
            let appts = this.getAppointments();
            const initialLen = appts.length;
            appts = appts.filter(a => Number(a.id) !== Number(id));

            if (appts.length === initialLen) {
                return { success: false, message: "Appointment not found." };
            }

            writeStorage(STORAGE_KEYS.APPOINTMENTS, appts);
            return { success: true, message: "Appointment deleted successfully." };
        },

        // --- CART & PHARMACY ---
        getCart: function () {
            return readStorage(STORAGE_KEYS.CART, []);
        },

        saveCart: function (cart) {
            writeStorage(STORAGE_KEYS.CART, cart);
        },

        clearCart: function () {
            localStorage.removeItem(STORAGE_KEYS.CART);
        },

        getOrders: function () {
            return readStorage(STORAGE_KEYS.ORDERS, []);
        },

        saveOrder: function (order) {
            const orders = this.getOrders();
            const newOrder = {
                id: "ORD-" + Math.floor(100000 + Math.random() * 900000),
                ...order,
                placedAt: new Date().toISOString(),
                status: "Processing"
            };
            orders.unshift(newOrder);
            writeStorage(STORAGE_KEYS.ORDERS, orders);
            this.clearCart();
            return newOrder;
        },

        // Reset demo data
        resetDemoData: function () {
            localStorage.removeItem(STORAGE_KEYS.DOCTORS);
            localStorage.removeItem(STORAGE_KEYS.USERS);
            localStorage.removeItem(STORAGE_KEYS.APPOINTMENTS);
            seedData();
            return { success: true, message: "Demo data reset successfully." };
        }
    };
})();

// Helper to update cart badge in header if present
function updateNavbarAuth() {
    const user = DocBookDB.getCurrentUser();
    const authContainer = document.getElementById("navAuthContainer");
    const cartCountEl = document.getElementById("navCartCount");

    if (cartCountEl) {
        const cart = DocBookDB.getCart();
        const totalItems = cart.reduce((sum, item) => sum + (item.quantity || 1), 0);
        cartCountEl.textContent = totalItems;
        cartCountEl.style.display = totalItems > 0 ? "inline-flex" : "none";
    }

    if (authContainer) {
        if (user) {
            const dashboardLink = user.role === "doctor" ? "doctor-dashboard.html" : "user-dashboard.html";
            const roleBadge = user.role === "doctor" ? "🩺 Dr." : "👤";
            authContainer.innerHTML = `
                <div class="user-pill">
                    <a href="${dashboardLink}" class="nav-user-name" title="Go to Dashboard">
                        <span>${roleBadge} ${user.name.split(" ")[0]}</span>
                    </a>
                    <button class="nav-logout-btn" onclick="DocBookDB.logout()" title="Sign Out">
                        <i class="ri-logout-box-r-line"></i>
                    </button>
                </div>
            `;
        } else {
            authContainer.innerHTML = `
                <a href="login.html" class="nav-btn nav-btn-outline">Sign In</a>
                <a href="register.html" class="nav-btn nav-btn-solid">Register</a>
            `;
        }
    }
}

// Global hook on page load
document.addEventListener("DOMContentLoaded", function () {
    updateNavbarAuth();
});
