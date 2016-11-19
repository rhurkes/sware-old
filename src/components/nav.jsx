import React from 'react';
import { moveHomePage, movePrevPage, moveNextPage, getTitleFromPath } from '../helpers/route';
import Button from './button';

export const Nav = (props) => {
  const { pathname } = props.location;
  const title = getTitleFromPath(pathname);

  return (
    <header>
      <div className="nav-left">
        <Button clickHandler={moveHomePage} text="Home" />
        <h1>{title}</h1>
      </div>
      <div className="nav-right">
        <div>
          <Button clickHandler={() => movePrevPage(pathname)} text="Previous" />
        </div>
        <div>
          <Button clickHandler={() => moveNextPage(pathname)} text="Next" />
        </div>
      </div>
    </header>
  );
};

export default Nav;


