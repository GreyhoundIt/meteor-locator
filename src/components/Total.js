import React from "react";
import {Progress} from "reactstrap";

const Total = ({total, limit}) => (
    <div className='totalBar'>
        <div className="text-center">Found {total} of {limit}</div>
        <Progress animated color="info" value={total} max={limit} />
    </div>
);
export default Total;