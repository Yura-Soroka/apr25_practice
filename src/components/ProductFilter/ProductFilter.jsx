import cn from 'classnames';
import usersFromServer from '../../api/users';
import categoriesFromServer from '../../api/categories';

export const ProductFilter = ({
  selectedPerson,
  setSelectedPerson,
  queary,
  setQueary,
  selectedCategories,
  handleCategoryClick,
  setSelectedCategories,
}) => {
  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs has-text-weight-bold">
        <a
          data-cy="FilterAllUsers"
          href="#/"
          className={cn({
            'is-active': selectedPerson === null,
          })}
          onClick={() => {
            setSelectedPerson(null);
          }}
        >
          All
        </a>
        {usersFromServer.map(user => {
          return (
            <a
              key={user.id}
              data-cy="FilterUser"
              href="#/"
              className={cn({
                'is-active': selectedPerson === user,
              })}
              onClick={() => {
                setSelectedPerson(user);
              }}
            >
              {user.name}
            </a>
          );
        })}
      </p>

      <div className="panel-block">
        <p className="control has-icons-left has-icons-right">
          <input
            data-cy="SearchField"
            type="text"
            className="input"
            placeholder="Search"
            value={queary}
            onChange={event => {
              setQueary(event.target.value.trimStart());
            }}
          />

          <span className="icon is-left">
            <i className="fas fa-search" aria-hidden="true" />
          </span>

          <span className="icon is-right">
            {queary.length > 0 && (
              <button
                data-cy="ClearButton"
                type="button"
                className="delete"
                onClick={() => {
                  setQueary('');
                }}
              />
            )}
          </span>
        </p>
      </div>

      <div className="panel-block is-flex-wrap-wrap">
        <a
          href="#/"
          data-cy="AllCategories"
          className={cn('button is-success mr-6', {
            'is-outlined': selectedCategories.length > 0,
          })}
          onClick={() => {
            selectedCategories([]);
          }}
        >
          All
        </a>
        {categoriesFromServer.map(item => (
          <a
            data-cy="Category"
            className={cn('button mr-2 my-1', {
              'is-info': selectedCategories.includes(item.id),
            })}
            href="#/"
            onClick={() => handleCategoryClick(item.id)}
          >
            {item.title}
          </a>
        ))}
      </div>

      <div className="panel-block">
        <a
          data-cy="ResetAllButton"
          href="#/"
          className="button is-link is-outlined is-fullwidth"
          onClick={() => {
            setSelectedPerson(null);
            setQueary('');
            setSelectedCategories([]);
          }}
        >
          Reset all filters
        </a>
      </div>
    </nav>
  );
};
