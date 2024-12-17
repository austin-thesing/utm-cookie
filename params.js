// Function to get cookie
function getCookie(name) {
  var nameEQ = name + "=";
  var ca = document.cookie.split(";");
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == " ") c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) == 0) return JSON.parse(c.substring(nameEQ.length, c.length));
  }
  return null;
}

// Function to get UTM parameters from the URL
function getUTMParameters() {
  var params = {};
  var tracking_keys = ["gclid", "fbclid", "utm_source_platform", "utm_id", "utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content"];
  var url = window.location.href;
  url.replace(/[?&]+([^=&]+)=([^&]*)/gi, function (m, key, value) {
    if (tracking_keys.includes(key)) {
      params[key] = value;
    }
  });
  return params;
}

// Function to set cookie
function setCookie(name, value) {
  document.cookie = name + "=" + JSON.stringify(value) + "; path=/; domain=.thehappycarclub.com";
}

// Function to check and update or persist UTM parameters in cookie
function updateOrPersistUTMCookie(cookieName) {
  var existingUTMs = getCookie(cookieName);
  var currentUTMs = getUTMParameters();

  // Only update or set the cookie if there are UTM parameters in the URL or the cookie does not already exist
  if (Object.keys(currentUTMs).length !== 0 || !existingUTMs) {
    // If there are no UTMs in the URL but the cookie exists, do nothing (persist the cookie)
    if (Object.keys(currentUTMs).length === 0 && existingUTMs) {
      return;
    }
    // Update or set the cookie with new UTM parameters
    setCookie(cookieName, currentUTMs);
  }
}

// Function to add UTM data to form action URL
function addUTMDataToForm() {
  // Get the booking lead form
  const form = document.getElementById("Booking-Lead-Form");
  if (!form) return;

  // Add submit event listener
  form.addEventListener("submit", function (e) {
    // Get UTM data from cookie
    const utmData = getCookie("PPC Attribution Tracker");
    if (!utmData) return;

    // Get current action URL
    let actionUrl = form.action;

    // Create URL object to handle parameters properly
    const url = new URL(actionUrl);

    // Add each UTM parameter to the URL
    Object.entries(utmData).forEach(([key, value]) => {
      if (value) {
        // Only add if value exists
        url.searchParams.set(key, value);
      }
    });

    // Update form action with new URL
    form.action = url.toString();
  });
}

// On page load, handle UTM cookie persistence or update and initialize form handling
window.onload = function () {
  updateOrPersistUTMCookie("PPC Attribution Tracker");

  // Function to delete a cookie (kept for potential future use)
  function deleteCookie(name) {
    document.cookie = name + "=; path=/; domain=.thehappycarclub.com; expires=Thu, 01 Jan 1970 00:00:01 GMT;";
  }
};

// Initialize form handling when DOM is loaded
document.addEventListener("DOMContentLoaded", addUTMDataToForm);
