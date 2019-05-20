import React from "react"
import {Spinner} from "reactstrap";

const Loading = () => (
    <div>
        Loading data....
        <Spinner color="light" />
    </div>
);

export default Loading;