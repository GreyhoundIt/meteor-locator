import React from "react";
import {formatDate} from "../helpers/date";
import {Table, Pagination} from "antd"
import {Container} from "reactstrap";

const columns = [
    {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
        sorter: (a, b) => (a.name > b.name) - (a.name < b.name),
        defaultSortOrder: 'ascend',
    },
    {
        title: 'Id',
        dataIndex: 'id',
        key: 'id',
    },
    {
        title: 'NameType',
        dataIndex: 'nametype',
        key: 'nametype',
    },
    {
        title: 'Recclass',
        dataIndex: 'recclass',
        key: 'recclass',
    },
    {
        title: 'Mass(g)',
        dataIndex: 'mass',
        key: 'mass',
        defaultSortOrder: 'descend',
        sorter: (a, b) => a.mass - b.mass,
    },
    {
        title: 'Fall',
        dataIndex: 'fall',
        key: 'fall',
    },
    {
        title: 'Year',
        dataIndex: 'year',
        key: 'year',
        render: (year) => formatDate(year),
    },
    {
        title: 'Latitude',
        dataIndex: 'reclat',
        key: 'reclat',
    },
    {
        title: 'Longitude',
        dataIndex: 'reclong',
        key: 'reclong',
    }
];
const MeteorsTable = ({data}) => (
    <Table dataSource={data} columns={columns} pagination={{ pageSize: 25 }} total={data.length}
    />
);

export default MeteorsTable