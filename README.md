# UTM Parameter Tracking System

## Overview

This JavaScript module handles UTM parameter tracking and cookie management for marketing attribution on The Happy Car Club website. It automatically captures UTM parameters from URLs, manages their persistence through cookies, and integrates with Webflow native forms to pass UTM data to Vonigo.

## Features

### UTM Parameter Tracking

- Captures standard UTM parameters from URLs:
  - utm_source_platform
  - utm_id
  - utm_source
  - utm_medium
  - utm_campaign
  - utm_term
  - utm_content
- Also tracks:
  - gclid (Google Click ID)
  - fbclid (Facebook Click ID)
- Stores UTM data in cookies for persistent tracking
- Maintains existing UTM data when new parameters aren't present

### Cookie Management

- Automatically sets cookies for the `.thehappycarclub.com` domain
- Provides functions for:
  - Setting cookies
  - Reading cookies
  - Managing UTM parameter persistence

### Webflow Form Integration

- Automatically detects Webflow forms with Vonigo endpoint
- Appends UTM parameters to form submissions
- Works with native Webflow form handling
- No custom form building required

## Usage

### Installation

Add the script to your Webflow site's custom code section:

```html
<script src="params.js"></script>
```

### Testing

To test UTM parameter tracking:

1. Clear existing UTM cookie:

```javascript
document.cookie = "PPC Attribution Tracker=; path=/; domain=.thehappycarclub.com; expires=Thu, 01 Jan 1970 00:00:01 GMT;";
```

2. Visit page with test UTM parameters:

```
https://yourpage.thehappycarclub.com?utm_source=test&utm_medium=test&utm_campaign=test
```

3. Verify cookie data:

```javascript
console.log(getCookie("PPC Attribution Tracker"));
```

### Implementation

The system automatically:

1. Checks for UTM parameters in the current URL
2. Updates or maintains existing UTM parameter cookies
3. Integrates with Webflow forms pointing to Vonigo
4. Appends UTM data to form submissions

## Notes

- UTM parameters are only updated when new parameters are present in the URL
- Existing UTM data is preserved when no new parameters are detected
- Forms must have action URL containing "vonigo.com" to be detected

## Implementation
