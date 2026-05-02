import React from 'react';

export const AutoResponseEmail = ({ userName, subject, date }: { userName: string, subject: string, date: string }) => {
  return (
    <div style={{
      fontFamily: "'Inter', 'Helvetica Neue', Helvetica, Arial, sans-serif",
      backgroundColor: "#000000",
      color: "#FFFFFF",
      padding: "0",
      margin: "0",
      width: "100%",
    }}>
      <table width="100%" border={0} cellSpacing={0} cellPadding={0} style={{ backgroundColor: "#000000" }}>
        <tr>
          <td align="center">
            <div style={{ maxWidth: "600px", textAlign: "left" }}>
              {/* Header with Gradient */}
              <div style={{ 
                background: "linear-gradient(135deg, #7F00FF 0%, #E100FF 100%)",
                padding: "60px 40px",
                textAlign: "center",
                borderRadius: "0 0 40px 40px",
                marginBottom: "40px"
              }}>
                <h1 style={{ 
                  margin: "0", 
                  fontSize: "36px", 
                  fontWeight: "900", 
                  color: "#FFFFFF",
                  letterSpacing: "-1px"
                }}>
                  Adsgrind
                </h1>
                <p style={{ 
                  margin: "10px 0 0 0", 
                  fontSize: "18px", 
                  color: "rgba(255, 255, 255, 0.8)",
                  fontWeight: "500"
                }}>
                  Connect Now
                </p>
              </div>

              {/* Body Content */}
              <div style={{ padding: "0 40px 40px 40px" }}>
                <h2 style={{ 
                  fontSize: "28px", 
                  fontWeight: "800", 
                  marginBottom: "24px", 
                  color: "#FFFFFF",
                  textTransform: "uppercase"
                }}>
                  Hi {userName.toUpperCase()}!
                </h2>
                
                <p style={{ 
                  fontSize: "18px", 
                  lineHeight: "1.6", 
                  color: "rgba(255, 255, 255, 0.7)", 
                  marginBottom: "32px" 
                }}>
                  Thank you for reaching out to <span style={{ color: "#E100FF", fontWeight: "bold" }}>Adsgrind The App Growth</span>. 
                  We have received your message and will get back to you within <span style={{ color: "#FFFFFF", fontWeight: "bold" }}>24 hours</span>.
                </p>

                {/* Submission Summary Box */}
                <div style={{
                  backgroundColor: "rgba(255, 255, 255, 0.05)",
                  border: "1px solid rgba(255, 255, 255, 0.1)",
                  borderRadius: "24px",
                  padding: "32px",
                  marginBottom: "40px",
                }}>
                  <div style={{ 
                    fontSize: "14px", 
                    fontWeight: "bold", 
                    color: "#4ADE80", 
                    marginBottom: "20px",
                    textTransform: "uppercase",
                    letterSpacing: "1px"
                  }}>
                    Your Submission Summary
                  </div>
                  
                  <div style={{ marginBottom: "12px", fontSize: "16px" }}>
                    <span style={{ color: "rgba(255, 255, 255, 0.5)" }}>Subject:</span>
                    <span style={{ color: "#FFFFFF", marginLeft: "8px", fontWeight: "500" }}>{subject}</span>
                  </div>
                  
                  <div style={{ fontSize: "16px" }}>
                    <span style={{ color: "rgba(255, 255, 255, 0.5)" }}>Sent on:</span>
                    <span style={{ color: "#FFFFFF", marginLeft: "8px", fontWeight: "500" }}>{date}</span>
                  </div>
                </div>

                <p style={{ 
                  fontSize: "16px", 
                  color: "rgba(255, 255, 255, 0.6)",
                  marginBottom: "16px"
                }}>
                  Meanwhile, you can also reach us via:
                </p>
                
                <div style={{ display: "flex", gap: "12px" }}>
                  <a href="https://adsgrind.com" style={{ color: "#E100FF", textDecoration: "none", fontSize: "14px", fontWeight: "bold" }}>Website</a>
                  <span style={{ color: "rgba(255,255,255,0.2)" }}>•</span>
                  <a href="https://linkedin.com" style={{ color: "#E100FF", textDecoration: "none", fontSize: "14px", fontWeight: "bold" }}>LinkedIn</a>
                  <span style={{ color: "rgba(255,255,255,0.2)" }}>•</span>
                  <a href="mailto:business@adsgrind.com" style={{ color: "#E100FF", textDecoration: "none", fontSize: "14px", fontWeight: "bold" }}>Email</a>
                </div>
              </div>

              {/* Footer */}
              <div style={{ 
                padding: "40px",
                borderTop: "1px solid rgba(255, 255, 255, 0.05)",
                textAlign: "center"
              }}>
                <p style={{ color: "rgba(255, 255, 255, 0.3)", fontSize: "12px", margin: 0 }}>
                  © 2026 ADSGRIND THE APP GROWTH. All rights reserved.
                </p>
              </div>
            </div>
          </td>
        </tr>
      </table>
    </div>
  );
};
