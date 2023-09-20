import React, {useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../style/SignInUp.css';

function SignUp() {

  const navigate = useNavigate();
  
  useEffect(() => {
    const token = localStorage.getItem('token');

    if (token) {
      navigate('/todo');
      console.log('이미 로그인된 상태')
    }
  }, [navigate]);

  const handleSignUpbuttonClick = async () => {
    try {
      const apiUrl = 'https://www.pre-onboarding-selection-task.shop/auth/signup';

      const data = {
        email,
        password
      };

      const headers = {
        'Content-Type': 'application/json'
      };

      // 회원가입 요청 보내기
      const response = await axios.post(apiUrl, data, { headers });
      console.log('회원가입 성공:', response.data);

      // 회원가입 성공 후 로그인 페이지로 이동
      navigate('/SignIn');
    } catch (error) {
      console.error('회원가입 실패:', error.response ? error.response.data : error.message);
    }
  };

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailChange = (event) => {
    const newEmail = event.target.value;
    setEmail(newEmail);
  };

  const handlePasswordChange = (event) => {
    const newPassword = event.target.value;
    setPassword(newPassword);
  };

  const isEmailValid = email.includes('@');
  const isPasswordValid = password.length >= 8;
  const isFormValid = isEmailValid && isPasswordValid;

  return (
    <div className='container_1'>
      <h1 className='maintext'>회원가입 페이지</h1>
      <input className="input_1" data-testid="email-input" placeholder='EMAIL를 입력하세요' value={email} onChange={handleEmailChange} />
      <input className="input_1" data-testid="password-input" type="password" placeholder='PW를 입력하세요' value={password} onChange={handlePasswordChange} />
      <button className="button_1" data-testid="signup-button" disabled={!isFormValid} onClick={handleSignUpbuttonClick}>로그인</button>
    </div>
  );
}

export default SignUp;