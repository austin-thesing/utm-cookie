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

// Function to handle Webflow form submission
function handleWebflowForm() {
  // Wait for Webflow to be ready
  window.Webflow = window.Webflow || [];
  window.Webflow.push(function () {
    // Get UTM data from cookie
    const utmData = getCookie("PPC Attribution Tracker");
    if (!utmData) return;

    // Find all forms on the page
    const forms = document.querySelectorAll('form[action*="vonigo.com"]');

    forms.forEach((form) => {
      // Store the original action URL
      const originalAction = form.getAttribute("action");

      form.addEventListener("submit", function (e) {
        e.preventDefault();

        // Create URL object from the original action
        const url = new URL(originalAction);

        // Add UTM parameters to the URL
        Object.entries(utmData).forEach(([key, value]) => {
          if (value) {
            url.searchParams.set(key, value);
          }
        });

        // Update form action with new URL
        form.setAttribute("action", url.toString());

        // Submit the form
        form.submit();
      });
    });
  });
}

// On page load, handle UTM cookie persistence
window.onload = function () {
  updateOrPersistUTMCookie("PPC Attribution Tracker");
};

// Initialize form handling when DOM is loaded
document.addEventListener("DOMContentLoaded", handleWebflowForm);
