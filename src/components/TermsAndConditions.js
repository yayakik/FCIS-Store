import React from 'react';

function TermsAndConditions() {
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
            <h1 style={headingStyle}>Terms and Conditions</h1>

            <p>Welcome to our website. These terms and conditions outline the rules and regulations for the use of our laptop e-commerce platform.</p>

            <p style={sectionTitleStyle}>1. Acceptance of Terms</p>
            <p>By accessing this website, you agree to be bound by these terms and conditions. If you disagree with any part, please do not use our services.</p>

            <p style={sectionTitleStyle}>2. Products and Descriptions</p>
            <p>We strive to provide accurate product descriptions. However, we do not warrant that product specifications, pricing, or other content is accurate, complete, or current.</p>

            <p style={sectionTitleStyle}>3. Orders and Payments</p>
            <p>All orders are subject to acceptance and availability. We reserve the right to cancel any order for any reason. Payments must be made through the approved payment gateways.</p>

            <p style={sectionTitleStyle}>4. Shipping and Delivery</p>
            <p>We aim to ship orders promptly. Delivery times are estimates and not guarantees. We are not responsible for delays caused by courier services or unforeseen circumstances.</p>

            <p style={sectionTitleStyle}>5. Returns and Refunds</p>
            <p>Customers may return products within 14 days of delivery, subject to our return policy. Refunds are issued once the product is inspected and approved.</p>

            <p style={sectionTitleStyle}>6. Warranty</p>
            <p>Most laptops come with a manufacturer�s warranty. We do not provide separate warranties unless explicitly stated. Please refer to the product details for warranty information.</p>

            <p style={sectionTitleStyle}>7. User Conduct</p>
            <p>You agree not to use the website for any unlawful purpose or to solicit others to perform illegal acts. Abuse, fraud, or violations may result in termination of your account.</p>

            <p style={sectionTitleStyle}>8. Modifications</p>
            <p>We may update these terms from time to time. Continued use of the website implies acceptance of any changes.</p>

            <p style={sectionTitleStyle}>9. Contact Information</p>
            <p>If you have any questions about these Terms and Conditions, please contact our support team.</p>
        </div>
    );
}

export default TermsAndConditions;
    