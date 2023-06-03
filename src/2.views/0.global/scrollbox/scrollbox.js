import React from 'react';

export class ScrollBox extends React.Component {
    componentDidMount() {
        let id = this.props.id;
        window.addEventListener("scroll", function () {
            if (window.location.pathname == "/") {
                var element = document.querySelector(`#${id}`);
                var position = element.getBoundingClientRect();

                if (position.y < 800) {
                    element.className = "translate-up";
                } else {
                    element.className = "translate-down";
                }
            }
        });
    }

    render() {
        return <div id={this.props.id}>{this.props.elements}</div>;
    }
}