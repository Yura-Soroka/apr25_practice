import cn from 'classnames';

export const ProductList = ({ finalFilteredProducts }) => {
  return (
    <div className="box table-container">
      {finalFilteredProducts.length > 0 ? (
        <table
          data-cy="ProductTable"
          className="table is-striped is-narrow is-fullwidth"
        >
          <thead>
            <tr>
              <th>
                <span className="is-flex is-flex-wrap-nowrap">
                  ID
                  <a href="#/">
                    <span className="icon">
                      <i data-cy="SortIcon" className="fas fa-sort" />
                    </span>
                  </a>
                </span>
              </th>

              <th>
                <span className="is-flex is-flex-wrap-nowrap">
                  Product
                  <a href="#/">
                    <span className="icon">
                      <i data-cy="SortIcon" className="fas fa-sort-down" />
                    </span>
                  </a>
                </span>
              </th>

              <th>
                <span className="is-flex is-flex-wrap-nowrap">
                  Category
                  <a href="#/">
                    <span className="icon">
                      <i data-cy="SortIcon" className="fas fa-sort-up" />
                    </span>
                  </a>
                </span>
              </th>

              <th>
                <span className="is-flex is-flex-wrap-nowrap">
                  User
                  <a href="#/">
                    <span className="icon">
                      <i data-cy="SortIcon" className="fas fa-sort" />
                    </span>
                  </a>
                </span>
              </th>
            </tr>
          </thead>

          <tbody>
            {finalFilteredProducts.map(item => (
              <tr data-cy="Product" key={item.id}>
                <td className="has-text-weight-bold" data-cy="ProductId">
                  {item.id}
                </td>

                <td data-cy="ProductName">{item.name}</td>
                <td data-cy="ProductCategory">
                  {item.category.icon} - {item.category.title}
                </td>

                <td
                  data-cy="ProductUser"
                  className={cn({
                    'has-text-link': item.users.sex === 'm',
                    'has-text-danger': item.users.sex === 'f',
                  })}
                >
                  {item.users.name}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p data-cy="NoMatchingMessage">
          No products matching selected criteria
        </p>
      )}
    </div>
  );
};
