import React from 'react';

function PrivacyPolicy() {
    const containerStyle = {
        padding: '2rem',
        fontFamily: 'Arial, sans-serif',
        color: '#333',
        lineHeight: '1.6',
        maxWidth: '900px',
        margin: 'auto'
    };

    const headingStyle = {
        fontSize: '2rem',
        marginBottom: '1rem',
        textAlign: 'center'
    };

    const sectionTitleStyle = {
        fontSize: '1.25rem',
        fontWeight: 'bold',
        marginTop: '1.5rem'
    };

    return (
        <div style={containerStyle}>
            <h1 style={headingStyle}>Privacy Policy</h1>

            <p>Your privacy is important to us. This policy explains how we collect, use, and protect your personal information when you visit our laptop e-commerce website.</p>

            <p style={sectionTitleStyle}>1. Information We Collect</p>
            <p>We collect information that you provide directly, such as name, email address, shipping details, and payment information. We also collect technical data such as your IP address and browser type.</p>

            <p style={sectionTitleStyle}>2. How We Use Your Information</p>
            <p>We use your data to process orders, deliver products, improve our website, and communicate with you about your account or promotions (only if you opt-in).</p>

            <p style={sectionTitleStyle}>3. Cookies and Tracking Technologies</p>
            <p>We use cookies to enhance your browsing experience, analyze traffic, and provide relevant ads. You can manage cookie preferences through your browser settings.</p>

            <p style={sectionTitleStyle}>4. Sharing Your Information</p>
            <p>We do not sell or rent your personal data. We may share your information with trusted partners for order fulfillment, payment processing, and legal compliance.</p>

            <p style={sectionTitleStyle}>5. Data Security</p>
            <p>We use encryption and secure technologies to protect your data. However, no method of transmission over the internet is 100% secure.</p>

            <p style={sectionTitleStyle}>6. Your Rights</p>
            <p>You have the right to access, correct, or delete your personal information. You may also withdraw consent for marketing communications at any time.</p>

            <p style={sectionTitleStyle}>7. Third-Party Links</p>
            <p>Our website may contain links to external websites. We are not responsible for the privacy practices of these sites.</p>

            <p style={sectionTitleStyle}>8. Changes to This Policy</p>
            <p>We may update this Privacy Policy occasionally. Any changes will be posted here, and the updated date will be reflected at the top.</p>

            <p style={sectionTitleStyle}>9. Contact Us</p>
            <p>If you have any questions or concerns about this policy, please contact our support team at privacy@yourstore.com.</p>
        </div>
    );
}

export default PrivacyPolicy;
