import React, { Component } from 'react';
import PropTypes from 'prop-types';

import paginationHelper from '../../utils/paginationHelper';

export const Buttons = (props) => {
  const {
    pages,
    setActive,
    currentPage,
  } = props;
  const range = paginationHelper(pages, currentPage);
  return (
    range.map((num, index) => (
      <li key={String(index)}>
        <button type="button" className={currentPage === num ? 'active' : ''} onClick={setActive} value={num} disabled={num === '...' || currentPage === num ? 'disabled' : ''}>{num}</button>
      </li>
    ))
  );
};

class Pagination extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPage: 1
    };
    this.setActive = this.setActive.bind(this);
    this.incrementPage = this.incrementPage.bind(this);
    this.decrementPage = this.decrementPage.bind(this);
  }

  componentDidUpdate() {
    const { pageNumber } = this.props;
    const { currentPage } = this.state;
    if (pageNumber !== currentPage) {
      return this.setActive({ target: { value: pageNumber } });
    }
  }

  setActive(e) {
    const { custom } = this.props;
    this.setState({ currentPage: Number(e.target.value) });
    return custom(Number(e.target.value));
  }

  incrementPage() {
    const { custom } = this.props;
    const { currentPage } = this.state;
    this.setState(prevState => ({ currentPage: prevState.currentPage + 1 }));
    return custom(currentPage + 1);
  }

  decrementPage() {
    const { custom } = this.props;
    const { currentPage } = this.state;
    this.setState(prevState => ({ currentPage: prevState.currentPage - 1 }));
    return custom(currentPage - 1);
  }

  render() {
    const { pages } = this.props;
    const { currentPage } = this.state;
    return (
      <div className="pag-cont">
        <ul>
          <li>
            <button
              type="button" disabled={(currentPage - 1 === 0) ? 'disabled' : ''}
              className={(currentPage - 1 === 0) ? 'disabled' : ''}
              onClick={this.decrementPage}>
              &lt;
            </button>
          </li>
          <Buttons pages={pages} setActive={this.setActive} currentPage={currentPage} />
          <li>
            <button
              type="button" disabled={(currentPage === pages) ? 'disabled' : ''}
              className={(currentPage === pages) ? 'disabled' : ''}
              onClick={this.incrementPage}>
              &gt;
            </button>
          </li>
        </ul>
      </div>
    );
  }
}

Pagination.propTypes = {
  pages: PropTypes.number.isRequired,
  pageNumber: PropTypes.number.isRequired,
  custom: PropTypes.func.isRequired
};

export default Pagination;
