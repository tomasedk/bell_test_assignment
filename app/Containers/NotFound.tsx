
import * as React from 'react';
import { Link } from 'react-router-dom';

const NotFound: React.SFC<{}> = () => (
  <div>
    <h4>Page not found: 404</h4>
    <Link to="/">Homepage</Link>
  </div>
);

export default NotFound;
