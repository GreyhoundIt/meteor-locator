import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css'
import { Container} from 'reactstrap';

import P5Wrapper from 'react-p5-wrapper';
import sketch from '../sketches/sketch';
import MeteorsTable from "./MeteorsTable";
import AlertDanger from "./AlertDanger";
import Loading from "./Loading";
import Total from "./Total";


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

        let filteredData = initialData.filter(meteor =>
            meteor.name.toLowerCase().includes(searchTerm.toLowerCase())
        );

        this.setState({
            filteredData
        });
    };

    componentWillMount = () => this.getInitialData();



    render() {
        const { initialData, filteredData, loading, hasError} = this.state;
        let data = filteredData.length ? filteredData : initialData;
        let total = data.length;

        if(loading === true) {
            return (
               <Loading/>
            );
        } else if (hasError === true) {
            return  (
                <AlertDanger/>
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

                    <MeteorsTable data={data} />
                    <Total total={total}/>
                </Container>
            );
        }
    }
}


export default Meteors

