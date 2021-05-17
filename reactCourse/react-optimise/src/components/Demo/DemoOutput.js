import React from 'react';
import DemoParagraph from './DemoParagraph';

function DemoOutput(props) {
    console.log('DemoOutput Running');
    return <DemoParagraph>{props.show ? 'This is new!' : ''}</DemoParagraph>
};

export default React.memo(DemoOutput);