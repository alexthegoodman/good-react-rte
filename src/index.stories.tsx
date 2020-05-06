import * as React from 'react';
import BaseEditor from 'components/BaseEditor/BaseEditor';

import "./index.scss";

export default { title: 'Editor' };

export const defaultRTE = ({
  disabled = false
}) => {
  return (
    <div style={{
      maxWidth: "500px"
    }}>
      <BaseEditor />
    </div>
  );
};