import React from 'react';

export const AdminInquiryEmail = ({ name, email, company, budget, message }: { 
  name: string, 
  email: string, 
  company: string, 
  budget: string, 
  message: string 
}) => {
  return (
    <div style={{
      fontFamily: "'Inter', sans-serif",
      backgroundColor: "#f9f9f9",
      padding: "40px 20px",
      color: "#333",
    }}>
      <div style={{
        maxWidth: "600px",
        margin: "0 auto",
        backgroundColor: "#fff",
        borderRadius: "16px",
        padding: "40px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
      }}>
        <h1 style={{ color: "#EE1D23", fontSize: "24px", marginBottom: "24px" }}>New Inquiry Received</h1>
        <p style={{ fontSize: "16px", marginBottom: "24px" }}>You have a new submission from the Adsgrind contact form.</p>
        
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <tr>
            <td style={{ padding: "12px 0", borderBottom: "1px solid #eee", fontWeight: "bold", width: "150px" }}>Name:</td>
            <td style={{ padding: "12px 0", borderBottom: "1px solid #eee" }}>{name}</td>
          </tr>
          <tr>
            <td style={{ padding: "12px 0", borderBottom: "1px solid #eee", fontWeight: "bold" }}>Email:</td>
            <td style={{ padding: "12px 0", borderBottom: "1px solid #eee" }}>{email}</td>
          </tr>
          <tr>
            <td style={{ padding: "12px 0", borderBottom: "1px solid #eee", fontWeight: "bold" }}>Company:</td>
            <td style={{ padding: "12px 0", borderBottom: "1px solid #eee" }}>{company}</td>
          </tr>
          <tr>
            <td style={{ padding: "12px 0", borderBottom: "1px solid #eee", fontWeight: "bold" }}>Budget:</td>
            <td style={{ padding: "12px 0", borderBottom: "1px solid #eee" }}>{budget}</td>
          </tr>
        </table>
        
        <div style={{ marginTop: "32px" }}>
          <h3 style={{ fontSize: "16px", marginBottom: "12px" }}>Message:</h3>
          <div style={{ 
            backgroundColor: "#f5f5f5", 
            padding: "20px", 
            borderRadius: "8px", 
            lineHeight: "1.6",
            whiteSpace: "pre-wrap"
          }}>
            {message}
          </div>
        </div>
        
        <div style={{ marginTop: "40px", textAlign: "center", fontSize: "12px", color: "#999" }}>
          Sent from Adsgrind.com Contact Form
        </div>
      </div>
    </div>
  );
};
