import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../style/SignInUp.css';

function SignIn() {

    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
    
        if (token) {
          navigate('/todo');
          console.log('이미 로그인된 상태')
        }
      }, [navigate]);

    const handleSigninbuttonClick = async () => {
        try {
            const response = await axios.post('https://www.pre-onboarding-selection-task.shop/auth/signin', {
                email: email,
                password: password
            });

            // 로그인 성공여부 확인
            if (response.status === 200) {
                const token = response.data.access_token;
                localStorage.setItem('token', token);
                navigate('/ToDo');
            }
        } catch (error) {
            console.error('Error logging in:', error);
            alert('로그인에 실패하였습니다');
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
            <h1 className='maintext'>로그인 페이지</h1>
            <input className="input_1" data-testid="email-input" placeholder='EMAIL를 입력하세요' value={email} onChange={handleEmailChange} />
            <input className="input_1" data-testid="password-input" type="password" placeholder='PW를 입력하세요' value={password} onChange={handlePasswordChange} />
            <button className="button_1" data-testid="signin-button" disabled={!isFormValid} onClick={handleSigninbuttonClick}>로그인</button>
        </div>
    );
}

export default SignIn;