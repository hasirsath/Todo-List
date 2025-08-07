// src/components/GoogleLoginButton.jsx
import { GoogleLogin } from '@react-oauth/google';
import axios from 'axios';

function GoogleLoginButton({ onSuccess }) {
  const handleSuccess = async (credentialResponse) => {
    const token = credentialResponse.credential;

    try {
      const res = await axios.post('http://localhost:5000/auth/google-login', {
        token: token,
      });

      const jwt = res.data.token;
      localStorage.setItem('token', jwt);  // Save JWT in local storage
      onSuccess(jwt);                      // Notify parent

    } catch (error) {
      console.error('Google login failed:', error);
    }
  };

  return (
    <GoogleLogin
      onSuccess={handleSuccess}
      onError={() => console.log('Google login error')}
    />
  );
}

export default GoogleLoginButton;
