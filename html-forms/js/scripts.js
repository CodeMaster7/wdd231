const urlParams = new URLSearchParams(window.location.search);

const results = document.querySelector("#results");
results.innerHTML = `
    <p>Appointment for ${urlParams.get("first")} ${urlParams.get("last")} has been scheduled.</p>
    <p>Proxy ${urlParams.get("ordinance")} on ${urlParams.get("date")} in the ${urlParams.get("location")} Temple.</p>
    <p>Your phone number is ${urlParams.get("phone")}</p>
    <p>Your email is ${urlParams.get("email")}</p>
`;
