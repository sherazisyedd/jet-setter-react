import React from 'react';
import Article from './Article';

class Items extends React.Component {

    constructor(props){
        super(props);
        this.state = { items :  props.items, term: '' };
    }


    getHeading = () => {
        return `${this.props.heading} (${this.props.count})`;
    }

    getItems = () => {
        var items = this.props.items.map((item) => {
            return (
                <Article
                    name={item.title} key = {item.id} checked={this.props.packed ? true : false}
                    onClick={() => this.props.onClick(item)}
                    removeItem={() => this.props.removeItem(item)}>
                </Article>
            );
        });
        return items;
    }

    render() {
        return (
            <section className="items">
                <h2>{this.getHeading()}</h2>
                <input className="items-search-term" value={this.props.term} onChange={this.props.filterItems} />
                {this.getItems()}
            </section>
        );
    }
}

export default Items;