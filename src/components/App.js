import React from 'react';
import _ from 'lodash';
import axios from 'axios';
import SearchBar from './SearchBar';
import Items from './Items';


class App extends React.Component {

    state = {
        unPacked: [],
        packed: [],
        searchTermUnPack: '',
        searchTermPack: '',
        newId: 7 // JUST TO GET A RANDOM ID FOR NEW ITEM
    }

    componentDidMount() {
        axios.get(`itemsData.json`)
          .then(res => {
           this.setState({
               packed: res.data.packed,
               unPacked: res.data.unPacked
           })
          }).catch(error => { // your error handling goes here}
            console.log('Some error occured',error)
        }) 
      }

    filterItems = (event, itemType) => {
        if (itemType === 'packed') {
            this.setState({
                searchTermPack: event.target.value.toLowerCase()
            })
        } else {
            this.setState({
                searchTermUnPack: event.target.value.toLowerCase()
            })
        }
    }


    getItems = (itemType) => {
        var filteredItems = [];
        let searchTerm = itemType === 'packed' ? 'searchTermPack' : 'searchTermUnPack';
        filteredItems = this.state[itemType].filter(function (el) {
            return el.title.toLowerCase().includes(this.state[searchTerm].toLowerCase())
        }, this);

        return filteredItems;
    }

    removeItem = (id, itemType) => {

        let setTerm = itemType === 'packed' ? 'packed' : 'unPacked';
        let items = this.state[itemType];

        _.remove(items, o => o.id === id);

        let setObject = {};
        setObject[setTerm] = items;

        this.setState(setObject);
    }

    handleItems = (id, spliceItems, pushItems) => {
        let items = _.remove(spliceItems, o => o.id === id);
        pushItems.push(_.first(items));
        return { spliceItems: spliceItems, pushItems: pushItems };
    }

    packItem = (id) => {
        var items = this.handleItems(id, this.state.unPacked, this.state.packed);
        this.setState(
            {
                unPacked: items.spliceItems,
                packed: items.pushItems
            }
        );
    }

    unPackItem = (id) => {
        var items = this.handleItems(id, this.state.packed, this.state.unPacked);
        this.setState(
            {
                unPacked: items.pushItems,
                packed: items.spliceItems
            }
        );
    }

    onSearchSubmit = (term) => {
        let items = this.state.unPacked;
        let newId = this.state.newId;
        newId += 1;
        items.unshift({ title: term, id: newId });
        this.setState({
            unPacked: items,
            newId: newId
        });
    }

    render() {
        return (
            <div className="application">
                <SearchBar onSubmit={this.onSearchSubmit}></SearchBar>
                <Items heading='Unpacked Items' term={this.state.searchTermUnPack} count={this.state.unPacked.length}
                    items={this.getItems('unPacked')}
                    onClick={(id) => this.packItem(id)}
                    removeItem={(id) => this.removeItem(id, 'unPacked')}
                    filterItems={(event) => this.filterItems(event, 'unPacked')}></Items>
                <Items heading='Packed Items' term={this.state.searchTermPack} packed={true} count={this.state.packed.length}
                    items={this.getItems('packed')}
                    onClick={(id) => this.unPackItem(id)}
                    removeItem={(id) => this.removeItem(id, 'packed')}
                    filterItems={(event) => this.filterItems(event, 'packed')}></Items>
            </div>
        );
    };
};

export default App;
