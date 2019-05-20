import React from "react";
import {formatDate} from "../helpers/date";
import {Table} from "antd"

const MeteorsTable = ({meteor}) => (
    <tr key={meteor.id}>
        <td>{meteor.id}</td>
        <td>{meteor.name}</td>
        <td>{meteor.nametype}</td>
        <td>{meteor.fall}</td>
        <td>{formatDate(meteor.year)}</td>
        <td>{meteor.mass}</td>
        <td>{meteor.recclass}</td>
        <td>{meteor.reclat}</td>
        <td>{meteor.reclong}</td>
    </tr>
);

export default MeteorsTable