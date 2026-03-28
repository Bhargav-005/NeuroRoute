import re

# Simple regex for email and common phone number formats
EMAIL_REGEX = r'[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}'
PHONE_REGEX = r'(\+\d{1,3}\s?)?((\(\d{3}\))|\d{3})[\s.-]?\d{3}[\s.-]?\d{4}'

def scan_pii(prompt: str) -> dict:
    """
    Detects basic PII (email, phone) in a given prompt.
    """
    detected_types = []
    
    if re.search(EMAIL_REGEX, prompt):
        detected_types.append("email")
        
    if re.search(PHONE_REGEX, prompt):
        detected_types.append("phone")
        
    return {
        "pii_detected": len(detected_types) > 0,
        "types": detected_types
    }
