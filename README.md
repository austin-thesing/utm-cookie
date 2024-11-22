# UTM Parameter Tracking System

## Overview

This JavaScript module handles UTM parameter tracking and cookie management for marketing attribution. It automatically captures UTM parameters from URLs and manages their persistence through cookies, specifically designed for the OnRamp Funds domain.

## Features

### UTM Parameter Tracking

- Captures standard UTM parameters from URLs:
  - utm_source
  - utm_medium
  - utm_campaign
  - utm_term
  - utm_content
- Stores UTM data in cookies for persistent tracking
- Maintains existing UTM data when new parameters aren't present

### Special Parameter Handling

- Manages special tracking parameters:
  - `gsxid` (Google Seller ID)
  - `gspk` (Google Service Provider Key)
- These parameters are handled independently from UTM parameters

### Cookie Management

- Automatically sets cookies for the `.thehappycarclub.com` domain
- Provides functions for:
  - Setting cookies
  - Reading cookies
  - Deleting cookies
- Maintains a primary "PPC Attribution Tracker" cookie for UTM data

## Usage

The system automatically initializes on page load and:

1. Checks for UTM parameters in the current URL
2. Updates or maintains existing UTM parameter cookies
3. Handles special `gsxid` and `gspk` parameters
4. Cleans up expired or unnecessary cookies

## Implementation
