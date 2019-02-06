import React from 'react';

class SearchBar extends React.Component {

    state = {term:''};

    onFormSubmit = (event) => {
        event.preventDefault(); // PREVENTS VANILLA JS DEFAULT FORM SUBMIT
        this.props.onSubmit(this.state.term);
    }

    render() {
        return (
                <form className="new-item" onSubmit = {this.onFormSubmit}>
                        <input className="new-item-input" type="text" value={this.state.term} onChange = {(e) => this.setState({term:e.target.value})}/>
                        <input type="submit" className="new-item-submit button"></input>
                </form>
        );
    }
}

export default SearchBar;