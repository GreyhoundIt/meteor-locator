import React from "react";
import { formatDate } from "../helpers/date";
import 'bootstrap/dist/css/bootstrap.min.css'
import { Container, Spinner, Alert } from 'reactstrap';

// import Map from "./Map";
import P5Wrapper from 'react-p5-wrapper';
import sketch from '../sketches/sketch';
import Meteor from "./Meteor";
import {Table} from "antd"

class Meteors extends React.Component {

    state = {
        initialData: [],
        filteredData: [],
        searchTerm: "",
        loading: true,
        hasError: false,
    };

    getInitialData = () =>
        fetch("https://data.nasa.gov/resource/gh4g-9sfh.json?$order=name&$limit=45716" )
            .then(res => res.json())
            .then(res =>
                this.setState({
                    initialData: res,
                    loading: false
                })
            )
            .catch( () => this.setState({
                hasError: true
            }));

    handleInput = ev => {
        const searchTerm = ev.target.value;

        this.setState(
            {
                searchTerm
            },
            this.filterByName(searchTerm)
        );
    };


    filterByName = searchTerm => {
        const { initialData } = this.state;

        const filteredData = initialData.filter(meteor =>
            meteor.name.toLowerCase().includes(searchTerm.toLowerCase())
        );

        this.setState({
            filteredData
        });
    };

    componentWillMount = () => this.getInitialData();



    render() {
        const { initialData, filteredData, loading, hasError} = this.state;
        const data = filteredData.length ? filteredData : initialData;

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

        if(loading === true) {
            return (
                <div>
                    Loading data....
                    <Spinner color="light" />
                </div>
            );
        } else if (hasError === true) {
            return  (
                <Alert color="danger">
                    Sorry there was an error loading  API please try again later
                </Alert>
            )
        } else {
            return (
                <Container>
                    <div className="search">
                            <input
                                type="text"
                                placeholder="Search by Name ..."
                                onChange={ev => this.handleInput(ev)}
                            />
                    </div>
                        <P5Wrapper sketch={sketch} data={data}></P5Wrapper>
                    <Table dataSource={data} columns={columns} pagination={{ pageSize: 25 }} total={data.length}
                            />
                    <p> Total Meteors Found {data.length}</p>
                </Container>
            );
        }
    }
}


export default Meteors

