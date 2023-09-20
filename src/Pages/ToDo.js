import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../style/ToDo.css';

function ToDo() {
    const navigate = useNavigate();

    const token = localStorage.getItem('token');

    const [todos, setTodos] = useState([]);

    const [newTodo, setNewTodo] = useState('');

    const handleInputChange = (event) => {
        setNewTodo(event.target.value);
    };

    //로그인안하고왔나 확인 
    useEffect(() => {
        if (!token) {
            navigate('/signin');
            console.log('로그인 안하셨잖아요')
        }
        fetchTodos();
    }, [navigate, token]);

    // 로그아웃 버튼
    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/');
        console.log('로그아웃되어 초기화면으로 이동합니다')
    }
    const today = new Date();

    // 날짜
    const dateString = today.toLocaleString('ko-KR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    // 요일
    const dayName = today.toLocaleString('ko-KR', { weekday: 'long' });

    // To do update
    const fetchTodos = async () => {
        try {
            const response = await axios.get('https://www.pre-onboarding-selection-task.shop/todos', {
                headers: {
                    Authorization: `Bearer ${token}` // 실제 토큰 값으로 대체
                }
            });
            setTodos(response.data);
        } catch (error) {
            console.error('Error', error);
        }
    };

    // 실시간반영
    const renderTodos = () => {
        return todos.map(todo => (
            <li key={todo.id}>
                <label>
                    <input type="checkbox" checked={todo.isComplete} />
                    {todo.isEditing ? (
                        <>
                            <input value={todo.todo} onChange={(e) => handleEditInputChange(e, todo)}
                            />
                            <button onClick={() => handleEditComplete(todo)}>수정 완료</button>
                            <button onClick={() => handleEditCancel(todo)}>취소</button>
                        </>
                    ) : (
                        <>
                            <span>{todo.todo}</span>
                            <button data-testid="modify-button" onClick={() => handleEditButton(todo)}>수정</button>
                            <button data-testid="delete-button" onClick={() => handleDeleteTodo(todo)}>삭제</button>
                        </>
                    )}
                </label >
            </li >
        ));
    };

    // 버튼누르면 새 Todo 추가
    const handleAddTodo = async () => {
        try {
            const token = localStorage.getItem('token');
            const apiUrl = 'https://www.pre-onboarding-selection-task.shop/todos';

            const data = {
                todo: newTodo,
            };

            const headers = {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            };

            const response = await axios.post(apiUrl, data, { headers });

            console.log('추가성공', response.data);
            fetchTodos()
        } catch (error) {
            console.error('추가 실패', error);
        }
    };

    // 수정버튼
    const handleEditButton = (todo) => {
        const updatedTodos = todos.map((t) =>
            t.id === todo.id ? { ...t, isEditing: true } : t
        );
        setTodos(updatedTodos);
    };

    // 입력값
    const handleEditInputChange = (e, todo) => {
        const updatedTodos = todos.map((t) =>
            t.id === todo.id ? { ...t, todo: e.target.value } : t
        );
        setTodos(updatedTodos);
    };

    //   수정완료
    const handleEditComplete = async (editedTodo) => {
        try {
            const token = localStorage.getItem('token');
            const apiUrl = `https://www.pre-onboarding-selection-task.shop/todos/${editedTodo.id}`;

            const data = {
                todo: editedTodo.todo,
                isCompleted: editedTodo.isCompleted,
            };

            const headers = {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            };

            const response = await axios.put(apiUrl, data, { headers });

            console.log('수정 완료', response.data);
            fetchTodos();
        } catch (error) {
            console.error('수정 실패', error);
        }
    };

    // 수정 취소
    const handleEditCancel = (todo) => {
        const updatedTodos = todos.map((t) =>
            t.id === todo.id ? { ...t, isEditing: false } : t
        );
    };

    // 삭제
    const handleDeleteTodo = async (todoId) => {
        try {
            const token = localStorage.getItem('token');
            const apiUrl = `https://www.pre-onboarding-selection-task.shop/todos/${todoId}`;
            const headers = {
                Authorization: `Bearer ${token}`,
            };

            // 보낼 요청
            const response = await axios.delete(apiUrl, { headers });

            if (response.status === 204) {
                // 삭제 성공 시 해당 todo 제외하고 업데이트
                fetchTodos();
            }
        } catch (error) {
            console.error('삭제 실패', error);
        }
    };

    return (
        <div className='container_2'>
            <div className='container_3'>
                <h1>{dateString}</h1>
                <h3 className="day">{dayName}</h3>
            </div>
            <div className='container_4'>
                <input data-testid="new-todo-input" value={newTodo} onChange={handleInputChange} />
                <button data-testid="new-todo-add-button" onClick={handleAddTodo}>추가</button>
            </div>
            <div className='container_5'>
                <ul>
                    {renderTodos()}
                </ul>
            </div>
            <button className="button_1" onClick={handleLogout}>로그아웃</button>
        </div>
    );
}

export default ToDo;