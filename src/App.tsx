/* eslint-disable no-console */
/* eslint-disable max-len */
import React, { useEffect, useMemo, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { Todo } from './types/Todo';
import { getTodos } from './api';
import { ExtendedUser } from './types/User';

export const App: React.FC = () => {
  const [buttonMark, setButtonMark] = useState(-1);
  const memoizedButtonMark = useMemo(() => buttonMark, [buttonMark]);
  const [loading, setLoading] = useState(true);
  const [isModal, setModal] = useState(true);
  const [modalCard, setModalCard] = useState(false);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [user, setUser] = useState<ExtendedUser>({
    id: 0,
    name: '',
    email: '',
    phone: '',
    completed: false,
    title: '',
    todoID: 0,
  });

  useEffect(() => {
    getTodos().then(todosList => {
      setLoading(false);
      setModal(false);
      setTodos(todosList);
    });
  }, []);

  console.log('!!!', todos.length);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                setTodos={setTodos}
              />
            </div>

            <div className="block">
              {loading && <Loader />}
              <TodoList
                todos={todos}
                setUser={() => setUser}
                setModal={setModal}
                setModalCard={setModalCard}
                memoizedButtonMark={memoizedButtonMark}
                setButtonMark={setButtonMark}
              />
            </div>
          </div>
        </div>
      </div>
      {isModal && (
        <TodoModal
          setModal={setModal}
          setModalCard={setModalCard}
          setButtonMark={setButtonMark}
          modalCard={modalCard}
          user={user}
        />
      )}
    </>
  );
};
