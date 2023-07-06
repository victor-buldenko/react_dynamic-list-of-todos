/* eslint-disable no-console */
import React, { useState } from 'react';
import { Todo } from '../../types/Todo';
import { getTodos } from '../../api';

type Props = {
  setTodos: (arg: Todo[]) => void;
};

export const TodoFilter: React.FC<Props>
  = React.memo(({ setTodos }) => {
    const [selectValue, setSelectValue] = useState('all');
    const [search, setSearch] = useState('');

    const sortedList = (key: string) => {
      getTodos().then(todos => {
        switch (key) {
          case 'completed':
            return setTodos(todos.filter(el => el.completed));

          case 'active':
            return setTodos(todos.filter(el => !el.completed));

          default:
            return setTodos(todos);
        }
      });
    };

    return (
      <form
        className="field has-addons"
      >
        <p className="control">
          <span className="select">
            <select
              data-cy="statusSelect"
              value={selectValue}
              onChange={(e) => {
                setSelectValue(e.target.value);
                sortedList(e.target.value);
              }}
            >
              <option value="all">All</option>
              <option value="active">Active</option>
              <option value="completed">Completed</option>
            </select>
          </span>
        </p>

        <p className="control is-expanded has-icons-left has-icons-right">
          <input
            data-cy="searchInput"
            type="text"
            className="input"
            placeholder="Search..."
            value={search}
            onChange={e => {
              setSearch(e.target.value);
              getTodos()
                .then(todoList => todoList.filter(
                  el => el.title.includes(e.target.value),
                ))
                .then(list => {
                  setTodos(list);
                });
            }}
          />
          <span className="icon is-left">
            <i className="fas fa-magnifying-glass" />
          </span>

          <span className="icon is-right" style={{ pointerEvents: 'all' }}>
            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={() => {
                setSearch('');
                getTodos().then(data => setTodos(data));
              }}
            />
          </span>
        </p>
      </form>
    );
  });
