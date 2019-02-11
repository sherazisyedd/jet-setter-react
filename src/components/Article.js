import React from 'react';

class Article extends React.Component {

    render() {
        const { name, removeItem } = this.props;
        
        return (
            <article className="item">
                <label htmlFor={name} >
                    <input type="checkbox" id={name} value="on" defaultChecked={this.props.checked}
                        onClick={this.props.onClick} />
                    {name}
                </label>
                <button className="item-remove" onClick={removeItem}>Remove</button>
            </article>
        );
    }
}

export default Article;