import * as React from 'react';
import BaseEditor from 'components/BaseEditor/BaseEditor';

export default { title: 'Editor' };

export const defaultRTE = ({
  disabled = false
}) => {
  return (
    <div>
      <BaseEditor />
    </div>
  );
};