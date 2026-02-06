import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FaEnvelope, FaArrowLeft } from "react-icons/fa";
import Input from "../../components/Input/Input";
import Button from "../../components/Button/Button";
import { useToast } from "../../context/ToastContext";
import "./Auth.css";

const ForgotPassword: React.FC = () => {
  //   const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { success, error } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email.trim()) {
      error("Email is required");
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      error("Please enter a valid email address");
      return;
    }

    setIsLoading(true);

    // // Simulate API delay
    // setTimeout(() => {
    //     success('Password reset link sent! Please check your email.');
    //     console.log('Reset link sent to:', email);
    //     setIsLoading(false);

    //     // Redirect to reset password after successful send (for demo flow)
    //     setTimeout(() => {
    //         navigate('/reset-password');
    //     }, 2000);
    // }, 1500);

    try {
      const response = await fetch(
        "http://localhost:5000/api/v1/auth/forgot-password",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        },
      );

      const data = await response.json();

      if (response.ok) {
        success(
          data.message ||
            "If an account with that email exists, a password reset link has been sent.",
        );

        setEmail("");
      } else {
        error(data.message || "Failed to send reset email.");
      }
    } catch (err) {
      error("Server error. Please check your connection or try again later.");
      console.error("Forgot Password Error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-form-wrapper">
      <div className="auth-title-section">
        <h1>Forgot Password</h1>
        <p>Enter your email to receive a password reset link</p>
      </div>

      <form className="auth-form" onSubmit={handleSubmit}>
        <Input
          type="email"
          name="email"
          label="Email Address"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          icon={<FaEnvelope />}
          required
          fullWidth
        />

        <Button
          type="submit"
          className="btn-primary full-width"
          disabled={isLoading}
          style={{ marginTop: "1rem" }}
        >
          {isLoading ? "Sending Link..." : "Send Reset Link"}
        </Button>
      </form>

      <div className="auth-footer-text">
        <Link to="/login" className="back-to-login">
          <FaArrowLeft size={12} style={{ marginRight: "0.5rem" }} />
          Back to Log In
        </Link>
      </div>
    </div>
  );
};

export default ForgotPassword;
