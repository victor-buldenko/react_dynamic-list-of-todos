/* eslint-disable @typescript-eslint/indent */
/* eslint-disable no-console */
import React from 'react';
import { Loader } from '../Loader';
import { ExtendedUser } from '../../types/User';

type Props = {
  setButtonMark: (arg: number) => void;
  setModal: (arg:boolean) => void;
  modalCard: boolean;
  setModalCard: (arg:boolean) => void;
  user: ExtendedUser;
};

export const TodoModal: React.FC<Props> = ({
  user,
  setModal,
  modalCard,
  setModalCard,
  setButtonMark,
}) => {
console.log('render', user.name);

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {!modalCard ? (
        <Loader />
      ) : (
        <div className="modal-card">
          <header className="modal-card-head">
            <div
              className="modal-card-title has-text-weight-medium"
              data-cy="modal-header"
            >
              {user.todoID}
            </div>

            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              type="button"
              className="delete"
              data-cy="modal-close"
              onClick={() => {
                setModal(false);
                setModalCard(false);
                setButtonMark(-1);
              }}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {user.title}
            </p>

            <p className="block" data-cy="modal-user">
              {user.completed
                ? <strong className="has-text-success">Done</strong>
                : <strong className="has-text-danger">Planned</strong>}
              {' by '}
              <a href={`mailto:${user.email}`}>
                {user.name}
              </a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
