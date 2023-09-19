import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function ToDo() {

    const navigate = useNavigate();

    //로그인안하고왔나 확인 
    useEffect(() => {
        const token = localStorage.getItem('token');

        if (!token) {
            navigate('/signin');
            console.log('로그인 안하셨잖아요')
        }
    }, [navigate]);

    // 로그아웃 버튼
    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/');
        console.log('로그아웃되어 초기화면으로 이동합니다')
    }

    const today = new Date();

    const dateString = today.toLocaleString('ko-KR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    const dayName = today.toLocaleString('ko-KR', { weekday: 'long' });

    return (
        <div className='container_2'>
            <div className='container_3'>
                <h1>{dateString}</h1>
                <div className="day">{dayName}</div>
            </div>
            <button className="button_1" onClick={handleLogout}>로그아웃</button>
        </div>
    );
}

export default ToDo;