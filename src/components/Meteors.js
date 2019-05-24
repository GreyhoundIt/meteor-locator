import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Container } from 'reactstrap'
import P5Wrapper from 'react-p5-wrapper'
import sketch from '../sketches/sketch'
import MeteorsTable from './MeteorsTable'
import AlertDanger from './AlertDanger'
import Loading from './Loading'
import Total from './Total'
import fetch from '../helpers/fetchWithTimeout'

class Meteors extends React.Component {
    state = {
        initialData: [],
        filteredData: [],
        searchTerm: '',
        loading: true,
        hasError: false,
        limit: 1000
    };

    getAPICount = () =>
        fetch(
            `https://data.nasa.gov/resource/gh4g-9sfh.json?$query=select%20count(name)`
            , 5000)
            .then(res => res.json())
            .then(res =>
                this.setState({
                    limit: res[0].count_name
                })
            )
            .catch(() =>
                this.setState({
                    hasError: true
                })
            );

    getInitialData = () =>
        fetch(
            `https://data.nasa.gov/resource/gh4g-9sfh.json?$order=name&$limit=${
                this.state.limit
                }`,5000
        )
            .then(res => res.json())
            .then(res =>
                this.setState({
                    initialData: res,
                    loading: false
                })
            )
            .catch(() =>
                this.setState({
                    hasError: true
                })
            );

    handleInput = ev => {
        const searchTerm = ev.target.value;

        this.setState(
            {
                searchTerm
            },
            this.filterByName(searchTerm)
        )
    };

    filterByName = searchTerm => {
        const { initialData } = this.state;

        let filteredData = initialData.filter(meteor =>
            meteor.name.toLowerCase().includes(searchTerm.toLowerCase())
        );

        this.setState({
            filteredData
        })
    };

    getData = async () => {
        await this.getAPICount();
        await this.getInitialData();
    }

    componentWillMount = () => this.getData();

    render() {
        const { initialData, filteredData, loading, hasError, limit } = this.state;
        let data = filteredData.length ? filteredData : initialData;
        let total = data.length;


        if (loading === true) {
            return <Loading />
        } else if (hasError === true || data.length === 0) {
            return <AlertDanger />
        } else {
            return (
                <div className="meteors">
                    <div className="search">
                        <input
                            type="text"
                            placeholder="Search by Name ..."
                            onChange={ev => this.handleInput(ev)}
                        />
                    </div>
                    <P5Wrapper className='map' sketch={sketch} data={data} />
                    <Total total={total} limit={limit} />
                    <MeteorsTable className="meteorsTable" data={data} />
                </div>
            )
        }
    }
}

export default Meteors
