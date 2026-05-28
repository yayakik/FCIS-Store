import React from 'react';

function FAQ() {
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

    const questionStyle = {
        fontWeight: 'bold',
        marginTop: '1.5rem',
        fontSize: '1.1rem'
    };

    return (
        <div style={containerStyle}>
            <h1 style={headingStyle}>Frequently Asked Questions (FAQ)</h1>

            <p style={questionStyle}>1. What payment methods do you accept?</p>
            <p>We accept all major credit cards, PayPal, and select digital wallets. All transactions are securely processed.</p>

            <p style={questionStyle}>2. How long does delivery take?</p>
            <p>Standard delivery takes 3–7 business days depending on your location. Express shipping options are available at checkout.</p>

            <p style={questionStyle}>3. Do you offer international shipping?</p>
            <p>Currently, we ship only within [your country]. We are working on expanding our international shipping capabilities.</p>

            <p style={questionStyle}>4. Can I return a laptop after purchase?</p>
            <p>Yes, returns are accepted within 14 days of delivery as long as the product is in its original condition. Please refer to our return policy for full details.</p>

            <p style={questionStyle}>5. Is there a warranty on the laptops?</p>
            <p>All laptops come with a standard manufacturer warranty. Warranty details vary by brand and model. Please check the product page for specifics.</p>

            <p style={questionStyle}>6. How can I track my order?</p>
            <p>Once your order ships, you will receive a tracking number via email. You can also track orders from your account dashboard.</p>

            <p style={questionStyle}>7. What should I do if I receive a defective product?</p>
            <p>Please contact our support team immediately with your order number and a description of the issue. We'll assist with a replacement or refund process.</p>

            <p style={questionStyle}>8. Do you offer student discounts?</p>
            <p>Yes! We offer exclusive discounts for students. Verify your student status during checkout to access discounted pricing.</p>
        </div>
    );
}

export default FAQ;
