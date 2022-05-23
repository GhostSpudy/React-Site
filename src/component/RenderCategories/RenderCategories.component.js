import React, { PureComponent } from 'react';
import { Nav } from 'react-bootstrap';

import './RenderCategories.scss';

class RenderCategoriesComponent extends PureComponent {
  renderDeleteButton(categoryId) {
    const { admin: { isAdmin, adminEmail }, deleteCategory } = this.props;

    if (isAdmin === true && adminEmail === 'admin@admin.admin') {
      return (
        <p onClick={() => deleteCategory(categoryId)}>Dzest</p>
      )
    }

    return;
  }

  render() {
    const { categories, admin: { isAdmin} } = this.props;

    return (
      <>
        {categories.map(category => (
          <Nav.Item key={category.id}>
            <Nav.Link
              eventKey={category.id}
              className={isAdmin ? 'Admin' : null}
            >
              {category.tittle}
            </Nav.Link>
            { this.renderDeleteButton(category.id) }
          </Nav.Item>
        ))}
      </>
    );
  }
}

export default RenderCategoriesComponent;
