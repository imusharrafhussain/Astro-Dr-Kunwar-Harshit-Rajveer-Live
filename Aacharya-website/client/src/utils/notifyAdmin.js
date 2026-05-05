/**
 * notifyAdmin.js
 * Sends a notification email to the admin using Web3Forms.
 * This runs entirely in the browser — no backend SMTP required.
 *
 * Setup (one-time):
 *   1. Go to https://web3forms.com
 *   2. Enter admin email and click "Create Access Key"
 *   3. Activate the key via the email they send you
 *   4. Replace WEB3FORMS_ACCESS_KEY below with your key
 */

const WEB3FORMS_ACCESS_KEY = import.meta.env.VITE_WEB3FORMS_KEY || 'd6c27f3a-c8c4-4ca7-8c84-e7975d4d76f3';

/**
 * Sends a formatted email to the admin.
 * @param {Object} options
 * @param {string} options.subject - Email subject line
 * @param {Object} options.fields  - Key/value pairs to render as a table
 */
export async function notifyAdmin({ subject, fields, hcaptchaResponse, botcheck }) {
    if (WEB3FORMS_ACCESS_KEY === 'YOUR_WEB3FORMS_KEY_HERE') {
        console.warn('⚠️ notifyAdmin: Web3Forms key not configured. Skipping email.');
        return;
    }
    
    // Advanced Spam Protection (Honeypot) - If botcheck is filled, silently ignore
    if (botcheck) {
        console.warn('notifyAdmin: Botcheck triggered. Silently rejecting.');
        return;
    }

    try {
        const payload = {
            access_key: WEB3FORMS_ACCESS_KEY,
            subject,
            from_name: 'Astro Harshit Website',
            ...fields // Web3Forms automatically formats these into a clean email table!
        };
        
        // Include hCaptcha verification token if provided
        if (hcaptchaResponse) {
            payload['h-captcha-response'] = hcaptchaResponse;
        }

        const res = await fetch('https://api.web3forms.com/submit', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
            body: JSON.stringify(payload),
        });

        const data = await res.json();
        if (!data.success) {
            console.error('notifyAdmin: Web3Forms error:', data.message);
        }
    } catch (err) {
        // Silent fail — form was already saved to DB, email is best-effort
        console.error('notifyAdmin: network error:', err.message);
    }
}
