import React from 'react';

class Article extends React.Component {

    render() {
        return (
            <article className="item">
                <label htmlFor={this.props.name} >
                    <input type="checkbox" id={this.props.name} value="on" defaultChecked={this.props.checked}
                        onClick={this.props.onClick} />
                    {this.props.name}
                </label>
                <button className="item-remove" onClick={this.props.removeItem}>Remove</button>
            </article>
        );
    }
}

export default Article;