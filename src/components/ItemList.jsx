// ItemList.jsx
import React, { useState, useEffect } from 'react';
// useEffectを使用する理由は、外部から情報を持ってくるという理由もある
import firebase from '../firebase/firebase';
import InputForm from './InputForm';
import Item from './Item';

const ItemList = props => {

    const [todoList, setTodoList] = useState(null);
    // todoListの中に情報が入っていく

    // firestoreから全データを取得してstateに格納する関数
    // mapで処理できるのは配列だけ
    const getTodosFromFirestore = async () => {
        const itemListArray = await firebase.firestore().collection('todos')
            // ↓追加
            .orderBy('isDone')
            // ↓以降変更なし
            // .orderBy('limit')
            .get();
        const todoArray = itemListArray.docs.map(x => {
            return {
                id: x.id,
                data: x.data(),
            }
        })
        setTodoList(todoArray);
        return todoArray;
    }

    // useEffectを利用してFirestoreからデータの一覧を取得．
    useEffect(() => {
        const result = getTodosFromFirestore();
    }, [props])

    return (
        <div>
            <InputForm
                getTodosFromFirestore={getTodosFromFirestore}
            />
            <ul>
                {
                    // 「?」 =>情報が存在するときにだけ情報をいい感じに表示してくれる
                    todoList?.map((x, index) =>
                        <Item
                            key={index}
                            todo={x}
                            index={index}
                            getTodosFromFirestore={getTodosFromFirestore}
                        />
                    )
                }
            </ul>
        </div>
    );
}
export default ItemList;