import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import styled from 'styled-components';
import spinner from '../assets/spinner.gif'

const Sprites = styled.img`
    width: 8em;
    height: 8em;
    display: none;
`;
const Card = styled.div`
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
    transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
    &:hover {
        box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
    }
    -moz-user-select: none;
    -website-user-select: none;
    user-select: none;
    -o-user-select: none;
`;
const StyledLink = styled(Link)`
    text-decoration: none;
    color: black;
    &:focus, 
    &:hover, 
    &:visited, 
    &:active,
    &:link {
        text-decoration: none;
        color: black;
    }
`;

export default class PokemonCard extends Component {

    state = {
        name: '',
        imageUrl: '',
        pokemonIndex: '',
        imageLoading: true,
        tooManyReq: false
    }

    componentDidMount () {
        const {name, url} = this.props;
        const pokemonIndex = url.split("/")[url.split("/").length - 2];
        const imageUrl = `https://github.com/PokeAPI/sprites/blob/master/sprites/pokemon/${pokemonIndex}.png?raw=true`;

        this.setState({
            name,
            imageUrl,
            pokemonIndex
        })
    }

    render() {
        
        return (
            <div className="col-md-3 col-sm-6 mb-5" >
                <StyledLink to={`pokemon/${this.state.pokemonIndex}`}>
                    <Card className="card">
                        <h5 className="card-header"><span className="badge badge-dark float-right" >#{this.state.pokemonIndex}</span></h5>
                        {
                            this.state.imageLoading ? (
                                <img alt="spinner" src={spinner} style={{width: "5em", height: "5em"}} className="card-img-top mx-auto rounded mt-2 d-block" />
                            ) : null
                        }
                        <Sprites 
                            className="card-img-top mx-auto rounded mt-2" 
                            src={this.state.imageUrl} 
                            style={
                                this.state.tooManyReq ? ({display: 'none'}) :
                                this.state.imageLoading ? null : ({display: 'block'})
                            }
                            onLoad={() => this.setState({imageLoading: false})} 
                            onError={() => this.setState({tooManyReq: true})} />
                        {
                            this.state.tooManyReq ? (
                                <h6 className="mx-auto">
                                    <span className="badge badge-danger mt-2" >Too many requests</span>
                                </h6>
                            ) : null
                        }
                        <div className="card-body mx-auto">
                            <h6 className="card-title">
                                {
                                    this.state.name
                                    .toLowerCase()
                                    .split(" ")
                                    .map(letter => letter.charAt(0).toUpperCase() + letter.substring(1))
                                    .join(" ")
                                }
                            </h6>
                        </div>
                    </Card>
                </StyledLink>
            </div>
        );
    }
}
