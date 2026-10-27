/**
 * DocBook - Main Frontend Utility Script
 * Integrates with DocBookDB client-side data engine.
 */

document.addEventListener("DOMContentLoaded", function () {
    // If there is any element with id "doctorList" or "doctors", populate it automatically
    const doctorContainer = document.getElementById("doctorList") || document.getElementById("doctors");

    if (doctorContainer && typeof DocBookDB !== "undefined") {
        const doctors = DocBookDB.getDoctors();
        if (doctors && doctors.length > 0) {
            doctorContainer.innerHTML = doctors.map(d => `
                <div class="doctor-card">
                    <div class="doctor-card-header">
                        <div class="doctor-avatar-wrap">
                            <img src="${d.photo}" alt="${d.name}" onerror="this.src='https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=300&q=80'">
                        </div>
                        <div class="doctor-meta">
                            <h3>${d.name}</h3>
                            <span class="doctor-specialty-badge">${d.specialist}</span>
                        </div>
                    </div>
                    <div class="doctor-body">
                        <div class="doctor-info-row">
                            <span class="doctor-info-label">Experience:</span>
                            <span class="doctor-info-val">${d.experience} years</span>
                        </div>
                        <div class="doctor-info-row">
                            <span class="doctor-info-label">Fee:</span>
                            <span class="doctor-fee">₹${d.fee || 600}</span>
                        </div>
                    </div>
                    <div class="doctor-actions">
                        <a href="appointment.html?doc=${d.id}" class="btn btn-primary btn-sm">
                            Book Appointment
                        </a>
                    </div>
                </div>
            `).join("");
        }
    }
});