// InputForm.jsx
import React, { useState } from 'react';
import firebase from '../firebase/firebase';

const InputForm = ({ getTodosFromFirestore }) => {
    const [todo, setTodo] = useState('');
    const [limit, setLimit] = useState('');

    // Firestoreにデータを送信する関数
    const postDataToFirestore = async (collectionName, postData) => {
        const addedData = await firebase.firestore().collection(collectionName).add(postData);
        return addedData;
    }

    // submitボタンクリック時の処理
    const submitData = async () => {
        if (todo === '' || limit === '') { return false };
        const postData = {
            todo: todo,
            limit: new Date(limit),
            isDone: false,
        }
        const addedData = await postDataToFirestore('todos', postData);
        setTodo('');
        setLimit('');
        getTodosFromFirestore();
    }

    return (
        <form action="">
            <ul>
                <li>
                    <label htmlFor="todo">やること：</label>
                    <input
                        type="text"
                        id="todo"
                        value={todo}
                        onChange={e => setTodo(e.target.value)}
                    />
                </li>
                <li>
                    <label htmlFor="limit">締め切り：</label>
                    <input
                        type="datetime-local"
                        id="limit"
                        value={limit}
                        onChange={e => setLimit(e.target.value)}
                    />
                </li>
                <li>
                    <button
                        type="button"
                        onClick={submitData}
                    >submit</button>
                </li>
            </ul>
        </form>
    )
}

export default InputForm;