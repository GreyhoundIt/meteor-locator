import React from "react";
import { formatDate } from "../helpers/date";
import 'bootstrap/dist/css/bootstrap.min.css'
import { Container, Table, Spinner, Alert } from 'reactstrap';

// import Map from "./Map";
import P5Wrapper from 'react-p5-wrapper';
import sketch from '../sketches/sketch';
import Meteor from "./Meteor";

class Meteors extends React.Component {

    state = {
        initialData: [],
        filteredData: [],
        searchTerm: "",
        loading: true,
        hasError: false
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
                    {/*<P5Wrapper sketch={sketch} data={data}></P5Wrapper>*/}
                        <Table striped dark responsive >
                            <thead>
                            <tr>
                                <td>id</td>
                                <td>Name</td>
                                <td>Name Type</td>
                                <td>Fall</td>
                                <td>Year</td>
                                <td>Mass(g)</td>
                                <td>Rec Class</td>
                                <td>Lat</td>
                                <td>Long</td>
                            </tr>
                            </thead>
                            <tbody>
                            {data.slice(0,100).map((meteor) => (
                                <Meteor key={meteor.id} meteor={meteor}/>
                            ))}
                            </tbody>
                        </Table>
                    <p> Total {data.length}</p>
                </Container>
            );
        }
    }
}


export default Meteors

