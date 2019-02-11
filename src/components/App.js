import React from 'react';
import { connect } from 'react-redux';
import {
    addPackItem, addUnPackItem, removePackItem, removeUnPackItem,
    searchPacked, searchUnPacked
} from '../actions';

import SearchBar from './SearchBar';
import Items from './Items';


class App extends React.Component {

    state = {
        newId: 7 // JUST TO GET A RANDOM ID FOR NEW ITEM
    }

    getItems = (itemType) => {
        var filteredItems = [];
        let searchTerm = itemType === 'packed' ? 'searchTermPacked' : 'searchTermUnPacked';
        filteredItems = this.props[itemType].filter(function (el) {
            return el.title.toLowerCase().includes(this.props[searchTerm])
        }, this);

        return filteredItems;
    }

    packItem = (item) => {
        this.props.addPackItem(item);
        this.props.removeUnPackItem(item);
    }

    unPackItem = (item) => {
        this.props.addUnPackItem(item);
        this.props.removePackItem(item);
    }

    onSearchSubmit = (term) => {
        let newId = this.state.newId;
        newId += 1;
        this.props.addUnPackItem({ title: term, id: newId });
        this.setState({ newId: newId });
    }

    render() {
        let unPackedItems = this.getItems('unPacked');
        let packedItems = this.getItems('packed');
        const { searchTermUnPacked, searchTermPacked } = this.state;

        return (
            <div className="application">
                <SearchBar onSubmit={this.onSearchSubmit}></SearchBar>
                <Items heading='Unpacked Items' term={searchTermUnPacked} count={this.props.unPacked.length}
                    items={unPackedItems}
                    onClick={(item) => this.packItem(item)}
                    removeItem={(item) => this.props.removeUnPackItem(item)}
                    filterItems={(event) => this.props.searchUnPacked(event.target.value.toLowerCase())}></Items>
                <Items heading='Packed Items' term={searchTermPacked} packed={true} count={this.props.packed.length}
                    items={packedItems}
                    onClick={(item) => this.unPackItem(item)}
                    removeItem={(item) => this.props.removePackItem(item)}
                    filterItems={(event) => this.props.searchPacked(event.target.value.toLowerCase())}></Items>
            </div>
        );
    };
};

const mapStateToProps = (state) => {
    return {
        packed: state.packed, unPacked: state.unPacked,
        searchTermPacked: state.searchTermPacked, searchTermUnPacked: state.searchTermUnPacked
    };
}

export default connect(mapStateToProps,
    {
        addPackItem, addUnPackItem, removePackItem, removeUnPackItem,
        searchPacked, searchUnPacked
    }
)(App);
