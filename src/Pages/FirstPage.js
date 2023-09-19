import React from 'react';
import { useNavigate } from 'react-router-dom';

function FirstPage() {

  const navigate = useNavigate();

  const handleSignUpClick = () => {
    navigate('/SignUp');
  };

  const handleSignInClick = () => {
    navigate('/SignIn');
  };

  return (
    <div>
      <h1>First Page</h1>
        <button onClick={handleSignUpClick}>회원가입</button>
        <button onClick={handleSignInClick}>로그인</button>
    </div>
  );
}

export default FirstPage;