/* eslint-disable no-lone-blocks */
import React from 'react';
import { Todo } from '../../types/Todo';
import { User } from '../../types/User';
import { getUser } from '../../api';

type Props = {
  todos: Todo[];
  setUser: (obj: User) => void;
  setModal: (arg: boolean) => void;
  setModalCard: (arg: boolean) => void;
  setButtonMark: (arg: number) => void;
  memoizedButtonMark: number;
};

export const TodoList: React.FC<Props> = ({
  todos,
  setUser,
  setModal,
  setModalCard,
  memoizedButtonMark,
  setButtonMark,
}) => {
  return (
    <table className="table is-narrow is-fullwidth">
      <thead>
        <tr>
          <th>#</th>
          <th>
            <span className="icon">
              <i className="fas fa-check" />
            </span>
          </th>
          <th>Title</th>
          <th> </th>
        </tr>
      </thead>

      <tbody>
        {todos.map(({
          id, title, completed, userId,
        }) => (
          <tr data-cy="todo" className="" key={id}>
            <td className="is-vcentered">{id}</td>
            <td className="is-vcentered">
              {completed && (
                <span className="icon" data-cy="iconCompleted">
                  <i className="fas fa-check" />
                </span>
              )}
            </td>
            <td className="is-vcentered is-expanded">
              <p
                className={`${
                  completed ? 'has-text-success' : 'has-text-danger'
                }`}
              >
                {title}
              </p>
            </td>
            <td className="has-text-right is-vcentered">
              <button
                data-cy="selectButton"
                className="button"
                type="button"
                onClick={() => {
                  setButtonMark(id);
                  getUser(userId).then((userData) => {
                    const mutateUserData = {
                      ...userData,
                      completed,
                      title,
                      todoID: id,
                    };

                    setUser(mutateUserData);
                  }).then(() => {
                    setModal(true);
                    setModalCard(true);
                  });
                }}
              >
                <span className="icon">
                  <i className={`${memoizedButtonMark === id ? 'far fa-eye-slash' : 'far fa-eye'}`} />
                </span>
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

{
  /* <tr data-cy="todo" className="">
<td className="is-vcentered">6</td>
<td className="is-vcentered" />
<td className="is-vcentered is-expanded">
  <p className="has-text-danger">
    qui ullam ratione quibusdam voluptatem quia omnis
  </p>
</td>
<td className="has-text-right is-vcentered">
  <button data-cy="selectButton" className="button" type="button">
    <span className="icon">
      <i className="far fa-eye" />
    </span>
  </button>
</td>
</tr>

<tr data-cy="todo" className="">
<td className="is-vcentered">8</td>
<td className="is-vcentered">
  <span className="icon" data-cy="iconCompleted">
    <i className="fas fa-check" />
  </span>
</td>
<td className="is-vcentered is-expanded">
  <p className="has-text-success">quo adipisci enim quam ut ab</p>
</td>
<td className="has-text-right is-vcentered">
  <button data-cy="selectButton" className="button" type="button">
    <span className="icon">
      <i className="far fa-eye" />
    </span>
  </button>
</td>
</tr> */
}

{
  /* <tr data-cy="todo" className="">
        <td className="is-vcentered">1</td>
        <td className="is-vcentered" />
        <td className="is-vcentered is-expanded">
          <p className="has-text-danger">delectus aut autem</p>
        </td>
        <td className="has-text-right is-vcentered">
          <button data-cy="selectButton" className="button" type="button">
            <span className="icon">
              <i className="far fa-eye" />
            </span>
          </button>
        </td>
      </tr>
      <tr data-cy="todo" className="has-background-info-light">
        <td className="is-vcentered">2</td>
        <td className="is-vcentered" />
        <td className="is-vcentered is-expanded">
          <p className="has-text-danger">quis ut nam facilis et officia qui</p>
        </td>
        <td className="has-text-right is-vcentered">
          <button data-cy="selectButton" className="button" type="button">
            <span className="icon">
              <i className="far fa-eye-slash" />
            </span>
          </button>
        </td>
      </tr>

      <tr data-cy="todo" className="">
        <td className="is-vcentered">1</td>
        <td className="is-vcentered" />
        <td className="is-vcentered is-expanded">
          <p className="has-text-danger">delectus aut autem</p>
        </td>
        <td className="has-text-right is-vcentered">
          <button data-cy="selectButton" className="button" type="button">
            <span className="icon">
              <i className="far fa-eye" />
            </span>
          </button>
        </td>
      </tr> */
}

// function getUser(userId: number) {
//   throw new Error('Function not implemented.');
// }
