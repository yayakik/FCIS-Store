import React, { useState } from 'react';
import { FaCreditCard, FaLock, FaCheckCircle } from 'react-icons/fa';
import '../assets/styles/Payment.css';

const PaymentForm = () => {
  const [formData, setFormData] = useState({
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    // Format card number with spaces
    if (name === 'cardNumber') {
      const formattedValue = value.replace(/\D/g, '')
        .replace(/(\d{4})(?=\d)/g, '$1 ')
        .trim();
      setFormData({...formData, [name]: formattedValue});
      return;
    }
    if (name === 'cardName') {
      // Allow only letters, spaces, and apostrophes
      const formattedValue = value.replace(/[^a-zA-Z\s']/g, '');
      setFormData({...formData, [name]: formattedValue});
      return;
    }

    // Format expiry date with slash
    if (name === 'expiryDate') {
      const formattedValue = value.replace(/\D/g, '')
        .replace(/(\d{2})(?=\d)/g, '$1/')
        .substring(0, 5);
      setFormData({...formData, [name]: formattedValue});
      return;
    }
    
    // Only allow numbers for CVV
    if (name === 'cvv') {
      const formattedValue = value.replace(/\D/g, '').substring(0, 4);
      setFormData({...formData, [name]: formattedValue});
      return;
    }
    
    setFormData({...formData, [name]: value});
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Basic validation
    const cardNumberValid = formData.cardNumber.replace(/\s/g, '').length === 16;
    const expiryValid = formData.expiryDate.length === 5;
    const cvvValid = formData.cvv.length >= 3;
    const nameValid = formData.cardName.trim().length > 0;
    
    if (!cardNumberValid || !expiryValid || !cvvValid || !nameValid) {
      alert('Please fill in all fields correctly');
      setIsSubmitting(false);
      return;
    }
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      setFormData({
        cardNumber: '',
        cardName: '',
        expiryDate: '',
        cvv: ''
      });
      
      // Reset success message after 3 seconds
      setTimeout(() => setIsSuccess(false), 3000);
    }, 1500);
  };

  return (
    <div className="payment-container">
      <h2>Payment Information</h2>
      
      <div className="payment-header">
        <FaCreditCard className="payment-icon" />
        <h3>Credit Card Payment</h3>
      </div>
      
      

      <form onSubmit={handleSubmit} className="card-form">
        <div className="form-group">
          <label htmlFor="cardNumber">Card Number</label>
          <input
            type="text"
            id="cardNumber"
            name="cardNumber"
            value={formData.cardNumber}
            onChange={handleInputChange}
            placeholder="1234 5678 9012 3456"
            maxLength="19"
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="cardName">Cardholder Name</label>
          <input
            type="text"
            id="cardName"
            name="cardName"
            value={formData.cardName}
            onChange={handleInputChange}
            placeholder="John Doe"
            required
          />
        </div>
        
        <div className="card-details">
          <div className="form-group">
            <label htmlFor="expiryDate">Expiry Date</label>
            <input
              type="text"
              id="expiryDate"
              name="expiryDate"
              value={formData.expiryDate}
              onChange={handleInputChange}
              placeholder="MM/YY"
              maxLength="5"
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="cvv">CVV</label>
            <input
              type="text"
              id="cvv"
              name="cvv"
              value={formData.cvv}
              onChange={handleInputChange}
              placeholder="123"
              maxLength="4"
              required
            />
          </div>
        </div>
        
        <button 
          type="submit" 
          className="pay-button"
          disabled={isSubmitting}
        >
            
           
               Pay Securely
            
          
        </button>
        
        {isSuccess && (
          <div className="success-message">
             Payment successful!
          </div>
        )}
      </form>
      
      <div className="security-info">
        
        <span>Your payment information is processed securely. We do not store your credit card details.</span>
      </div>
    </div>
  );
};

export default PaymentForm;