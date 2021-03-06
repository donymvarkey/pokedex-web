import React from 'react'

export default function SearchBar(props) {
    function handleChange(e) {
        props.getQueryFromInput(e.target.value);
    }
    function handleSubmit(e) {
        props.searchPokemon(e)
    }
    return (
        <div>
            <div className="float-right">
                <form name="search-form" className="form-inline" onSubmit={handleSubmit}>
                    <input className="form-control mr-sm-2" name="pokemon-input" id="pokemon-input"  type="text" placeholder="Search Pokemon" onChange={handleChange}  />
                    <button className="btn btn-light" name="search-pokemon" type="submit">Search</button>
                </form>
            </div>
        </div>
    )
}
