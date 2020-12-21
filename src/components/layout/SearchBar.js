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
                <form className="form-inline" onSubmit={handleSubmit}>
                    <input className="form-control mr-sm-2" type="text" placeholder="Search Pokemon" onChange={handleChange}  />
                </form>
            </div>
        </div>
    )
}
