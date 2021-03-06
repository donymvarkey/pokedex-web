/* eslint-disable default-case */
import React, { Component } from 'react';
import axios from 'axios';
import {useHistory} from 'react-router-dom';

const TYPE_COLORS = {
    bug: 'b1c12e',
    dark: '4f3a2d',
    dragon: '755edf',
    electric: 'fcbc17',
    fairy: 'f4b1f4',
    fighting: '823551d',
    fire: 'e73b0c',
    flying: 'a3b3f7',
    ghost: '6060b2',
    grass: '74c236',
    ground: 'd3b357',
    ice: 'a3e7fd',
    normal: 'c8c4bc',
    poison: '934594',
    psychic: 'ed4882',
    rock: 'b9a156',
    steel: 'b5b5c3',
    water: '3295f6'

}

const STAT_COLORS = {
    hp: 'ff0000',
    attack: 'ee7f30',
    defense: 'f2cb2b',
    specialAttack: '668be4',
    specialDefense: '75c950',
    speed: 'f65787'
}

export default class Pokemon extends Component {
    
    state = {
        name: '',
        pokemonIndex: '',
        imageUrl: '',
        types: [],
        description: '',
        stats: {
            hp: '',
            attack: '',
            defense: '',
            speed: '',
            specialAttack: '',
            specialDefense: ''
        },
        height: '',
        weight: '',
        eggGroups: '',
        abilities: '',
        catchRate: '',
        evs: '',
        hatchSteps: ''
    }

    async componentDidMount () {
        const {pokemonIndex} = this.props.match.params;
        
        //URL for pokemon and pokemon-species
        const pokemonUrl = `https://pokeapi.co/api/v2/pokemon/${pokemonIndex}/`;
        const pokemonSpeciesUrl = `https://pokeapi.co/api/v2/pokemon-species/${pokemonIndex}/`;

        //Get Pokemon info
        const pokemonRes = await axios.get(pokemonUrl);
        const name = pokemonRes.data.name;
        const imageUrl = pokemonRes.data.sprites.front_default;

        let {hp, attack, defense, speed, specialAttack, specialDefense} = ''
        
        pokemonRes.data.stats.map(stat => {
            switch(stat.stat.name) {
                case 'hp':
                    hp = stat['base_stat'];
                    break;
                case 'attack':
                    attack = stat['base_stat'];
                    break;
                case 'defense':
                    defense = stat['base_stat'];
                    break;
                case 'speed':
                    speed = stat['base_stat'];
                    break;
                case 'special-attack':
                    specialAttack = stat['base_stat'];
                    break;
                case 'special-defense':
                    specialDefense = stat['base_stat'];
                    break;
            }
        });

        const height = Math.round((pokemonRes.data.height * 0.328084 + 0.0001) * 100) / 100;
        const weight = Math.round((pokemonRes.data.weight * 100 + 0.0001) * 100) / 100;

        const types = pokemonRes.data.types.map(type => type.type.name);
        const abilities = pokemonRes.data.abilities.map(ability => {
            return ability.ability.name
            .toLowerCase()
            .split("-")
            .map(s => s.charAt(0).toUpperCase() + s.substring(1))
            .join(" ");
        }).join(", ");

        const evs = pokemonRes.data.stats.filter(stat => {
            if (stat.effort > 0) {
                return true;
            }
            return false;
        }).map(stat => {
            return `${stat.effort} ${stat.stat.name.toLowerCase()
                .split("-")
                .map(s => s.charAt(0).toUpperCase() + s.substring(1))
                .join(" ")}`
            
        }).join(", ")

        //Get pokemon species info'
        await axios.get(pokemonSpeciesUrl)
        .then(res => {
            let description = "";
            res.data.flavor_text_entries.some(flavor => {
                if (flavor.language.name === 'en') {
                    description = flavor.flavor_text;
                    return;
                }
            });
            const femaleRate = res.data['gender_rate'];
            const genderRatioFemale = 12.5 * femaleRate;
            const genderRatioMale = 12.5 * (8 - femaleRate);

            const catchRate = Math.round((100 / 255) * res.data["capture_rate"]);

            const eggGroups = res.data['egg_groups']
            .map(group => {
                return group.name
                .toLowerCase()
                .split("-")
                .map(s => s.charAt(0).toUpperCase() + s.substring(1))
                .join(" ");
            }).join(", ")

            const hatchSteps = 255 * (res.data['hatch_counter'] + 1);

            this.setState({
                name,
                pokemonIndex,
                imageUrl,
                types,
                description,
                stats: {
                    hp,
                    attack,
                    defense,
                    speed,
                    specialAttack,
                    specialDefense
                },
                height,
                weight,
                eggGroups,
                abilities,
                catchRate,
                genderRatioFemale,
                genderRatioMale,
                evs,
                hatchSteps
            })
        });
    }
    render() {
        return (
            <div className="col mt-3">
                <div>
                    <button className="btn btn-light mb-2" >Back</button>
                </div>
                <div className="card">
                    <div className="card-header">
                        <div className="row">
                            <div className="col-5">
                                <h5><span className="badge badge-dark" >#{this.state.pokemonIndex}</span></h5>
                            </div>
                            <div className="col-7">
                                <div className="float-right">
                                    {
                                        this.state.types.map(type => (
                                            <span key="type" className="badge badge-secondary badge-pill mr-1" style={{backgroundColor: `#${TYPE_COLORS[type]}`, color: 'white'}}>
                                                {
                                                    type.toLowerCase()
                                                    .split("-")
                                                    .map(s => s.charAt(0).toUpperCase() + s.substring(1))
                                                    .join(" ")
                                                }
                                            </span>
                                        ))
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="card-body">
                        <div className="row align-items-center">
                            <div className="col-md-3">
                                <img src={this.state.imageUrl} className="card-img-top rounded mx-auto mt-2" />
                            </div>
                            <div className="col-md-9">
                                <h4 className="mx-auto">{this.state.name.toLowerCase()
                                    .split("-")
                                    .map(s => s.charAt(0).toUpperCase() + s.substring(1))
                                    .join(" ")}
                                </h4>
                                <div className="row align-items-center">
                                    <div className="col-12 col-md-3">HP ❤️</div>
                                    <div className="col-12 col-md-9">
                                        <div className="progress">
                                            <div 
                                                className="progress-bar"
                                                role="progressBar"
                                                style={{width: `${this.state.stats.hp}%`, backgroundColor: `#${STAT_COLORS['hp']}`}}
                                                aria-valuenow="25"
                                                aria-valuemin="0"
                                                aria-valuemax="200"
                                                >
                                                    <small>{this.state.stats.hp}</small>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="row align-items-center">
                                    <div className="col-12 col-md-3">Attack 🗡️</div>
                                    <div className="col-12 col-md-9">
                                        <div className="progress">
                                            <div 
                                                className="progress-bar"
                                                role="progressBar"
                                                style={{width: `${this.state.stats.attack}%`, backgroundColor: `#${STAT_COLORS['attack']}`}}
                                                aria-valuenow="25"
                                                aria-valuemin="0"
                                                aria-valuemax="200"
                                                >
                                                    <small>{this.state.stats.attack}</small>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="row align-items-center">
                                    <div className="col-12 col-md-3">Defense 🛡️</div>
                                    <div className="col-12 col-md-9">
                                        <div className="progress">
                                            <div 
                                                className="progress-bar"
                                                role="progressBar"
                                                style={{width: `${this.state.stats.defense}%`, backgroundColor: `#${STAT_COLORS['defense']}`}}
                                                aria-valuenow="25"
                                                aria-valuemin="0"
                                                aria-valuemax="200"
                                                >
                                                    <small>{this.state.stats.defense}</small>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="row align-items-center">
                                    <div className="col-12 col-md-3">Speed 💨</div>
                                    <div className="col-12 col-md-9">
                                        <div className="progress">
                                            <div 
                                                className="progress-bar"
                                                role="progressBar"
                                                style={{width: `${this.state.stats.speed}%`, backgroundColor: `#${STAT_COLORS['speed']}`}}
                                                aria-valuenow="25"
                                                aria-valuemin="0"
                                                aria-valuemax="200"
                                                >
                                                    <small>{this.state.stats.speed}</small>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="row align-items-center">
                                    <div className="col-12 col-md-3">Special Attack ⚔️</div>
                                    <div className="col-12 col-md-9">
                                        <div className="progress">
                                            <div 
                                                className="progress-bar"
                                                role="progressBar"
                                                style={{width: `${this.state.stats.specialAttack}%`, backgroundColor: `#${STAT_COLORS['specialAttack']}`}}
                                                aria-valuenow="25"
                                                aria-valuemin="0"
                                                aria-valuemax="200"
                                                >
                                                    <small>{this.state.stats.specialAttack}</small>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="row align-items-center">
                                    <div className="col-12 col-md-3">Special Defense 🛡️</div>
                                    <div className="col-12 col-md-9">
                                        <div className="progress">
                                            <div 
                                                className="progress-bar"
                                                role="progressBar"
                                                style={{width: `${this.state.stats.specialDefense}%`, backgroundColor: `#${STAT_COLORS['specialDefense']}`}}
                                                aria-valuenow="25"
                                                aria-valuemin="0"
                                                aria-valuemax="200"
                                                >
                                                    <small>{this.state.stats.specialDefense}</small>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row mt-1">
                                <div className="col">
                                    <p className="p-2">
                                        {this.state.description}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <hr />
                    <div className="card-body">
                        <h5 className="card-title text-center font-weight-bold">
                            Profile
                        </h5>
                        <div className="row">
                            <div className="col-md-6">
                                <div className="row">
                                    <div className="col-md-6">
                                        <h6 className="float-right">Height: </h6>
                                    </div>
                                    <div className="col-md-6">
                                        <h6 className="float-left font-weight-bold">{this.state.height} ft.</h6>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="row">
                                    <div className="col-md-6">
                                        <h6 className="float-right">Weight: </h6>
                                    </div>
                                    <div className="col-md-6">
                                        <h6 className="float-left font-weight-bold">{(this.state.weight) / 1000} kg.</h6>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-6">
                                <div className="row">
                                    <div className="col-md-6">
                                        <h6 className="float-right">Egg Group: </h6>
                                    </div>
                                    <div className="col-md-6">
                                        <h6 className="float-left font-weight-bold">{this.state.eggGroups}</h6>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="row">
                                    <div className="col-md-6">
                                        <h6 className="float-right">Abilities: </h6>
                                    </div>
                                    <div className="col-md-6">
                                        <h6 className="float-left font-weight-bold">{this.state.abilities}</h6>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-6">
                                <div className="row">
                                    <div className="col-md-6">
                                        <h6 className="float-right">EVs: </h6>
                                    </div>
                                    <div className="col-md-6">
                                        <h6 className="float-left font-weight-bold">{this.state.evs}</h6>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="row">
                                    <div className="col-md-6">
                                        <h6 className="float-right">Catch Rate: </h6>
                                    </div>
                                    <div className="col-md-6">
                                    <div className="progress">
                                            <div 
                                                className="progress-bar"
                                                role="progressBar"
                                                style={{width: `${this.state.catchRate}%`}}
                                                aria-valuenow="25"
                                                aria-valuemin="0"
                                                aria-valuemax="200"
                                                >
                                                    <small>{this.state.catchRate}</small>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-6">
                                <div className="row">
                                    <div className="col-md-6">
                                        <h6 className="float-right">Hatch Steps: </h6>
                                    </div>
                                    <div className="col-md-6">
                                        <h6 className="float-left font-weight-bold">{this.state.hatchSteps} steps.</h6>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="row">
                                    <div className="col-md-6">
                                        <h6 className="float-right">Gender Ratio: </h6>
                                    </div>
                                        <div className="col-6">
                                            <div class="progress">
                                            <div
                                                class="progress-bar"
                                                role="progressbar"
                                                style={{
                                                width: `${this.state.genderRatioFemale}%`,
                                                backgroundColor: '#c2185b'
                                                }}
                                                aria-valuenow="15"
                                                aria-valuemin="0"
                                                aria-valuemax="200"
                                            >
                                                <small>{this.state.genderRatioFemale} ♀️</small>
                                            </div>
                                            <div
                                                class="progress-bar"
                                                role="progressbar"
                                                style={{
                                                width: `${this.state.genderRatioMale}%`,
                                                backgroundColor: '#1976d2'
                                                }}
                                                aria-valuenow="30"
                                                aria-valuemin="0"
                                                aria-valuemax="200"
                                            >
                                                <small>{this.state.genderRatioMale} ♂️</small>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="card-footer text-muted">
                        <div className="row text-center">
                            <div className="col-md-4">
                                <h6 className="card-link">Data from <a href="https://pokeapi.co/" target="_blank">PokeAPI.co</a></h6>
                            </div>
                            <div className="col-md-4">
                                <h6 className="card-link">Built using <a href="https://getbootstrap.com/" target="_blank">Bootstrap</a></h6>
                            </div>
                            <div className="col-md-4">
                                <h6 className="card-link">Hosted by <a href="https://github.com/" target="_blank">GitHub</a></h6>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
