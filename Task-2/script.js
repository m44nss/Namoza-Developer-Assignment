const form = document.getElementById("consultationForm");

form.addEventListener("submit", function(event) {

    event.preventDefault();

    const name = document.getElementById("name").value.trim();
    const phone = document.getElementById("phone").value.trim();

    if (name === "" || phone === "") {
        alert("Please fill all fields.");
        return;
    }

    // GTM Event
    window.dataLayer = window.dataLayer || [];

    window.dataLayer.push({
        event: "consultation_form_submit",
        user_name: name,
        phone_number: phone
    });
    successMessage.style.display = "flex";

    alert("Thank you! We will contact you soon.");

    form.reset();

});