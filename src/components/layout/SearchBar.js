import Axios from 'axios';
import React, { Component } from 'react';
import axios from 'axios';

export default class SearchBar extends Component {
    state = {
        url: null,
        pokemon: null
    }
    handleChange = (e) => {
        const query = e.target.value;
        const searchParam = query.toLowerCase();
        this.setState({
            url: `https://pokeapi.co/api/v2/${searchParam}`
        })
    }

    async fetchPokemon () {
        var res = await axios.get(url);
        this.setState({
            pokemon: res.data['results']
        })
    }
    render() {
        return (
            <div className="float-right">
                <form className="form-inline">
                    <div class="form-group">
                        <input className="form-control mr-sm-2" autoComplete="off" id="search" type="search" placeholder="Search Pokemon" aria-label="Search" onChange={this.handleChange} />
                        <button className="btn btn-outline-light" onClick={this.fetchPokemon} >Search</button>
                    </div>
                </form>
            </div>
        );
    }
}
