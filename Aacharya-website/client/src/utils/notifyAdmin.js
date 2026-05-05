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
export async function notifyAdmin({ subject, fields }) {
    if (WEB3FORMS_ACCESS_KEY === 'YOUR_WEB3FORMS_KEY_HERE') {
        console.warn('⚠️ notifyAdmin: Web3Forms key not configured. Skipping email.');
        return;
    }

    // Build a clean HTML table from the fields object
    const rows = Object.entries(fields)
        .filter(([, val]) => val !== undefined && val !== null && val !== '')
        .map(
            ([key, val]) => `
            <tr>
                <td style="padding:8px 12px;font-weight:600;background:#f9f4ec;color:#6b2d0e;white-space:nowrap;border:1px solid #e8d5b0;">
                    ${key}
                </td>
                <td style="padding:8px 12px;border:1px solid #e8d5b0;color:#333;">
                    ${String(val)}
                </td>
            </tr>`
        )
        .join('');

    const html = `
        <div style="font-family:Arial,sans-serif;max-width:600px;margin:auto;border:1px solid #e8d5b0;border-radius:8px;overflow:hidden;">
            <div style="background:linear-gradient(135deg,#6b2d0e,#b5692a);padding:20px 24px;">
                <h2 style="margin:0;color:#ffd700;font-size:20px;">🔔 ${subject}</h2>
                <p style="margin:4px 0 0;color:#ffe08a;font-size:13px;">Astro Dr Kunwar Harshit Rajveer — Admin Notification</p>
            </div>
            <div style="padding:20px 24px;">
                <table style="width:100%;border-collapse:collapse;font-size:14px;">
                    <tbody>${rows}</tbody>
                </table>
            </div>
            <div style="background:#f9f4ec;padding:12px 24px;font-size:12px;color:#888;text-align:center;">
                This notification was automatically generated. Do not reply to this email.
            </div>
        </div>`;

    try {
        const res = await fetch('https://api.web3forms.com/submit', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
            body: JSON.stringify({
                access_key: WEB3FORMS_ACCESS_KEY,
                subject,
                html,
                // Prevent bot submissions showing up as spam
                from_name: 'Astro Harshit Website',
            }),
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
