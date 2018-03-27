import React, { Component } from 'react';

class Tabs extends Component {
    constructor(props) {
        super(props);

        this.state = {
            activeTabIndex: 0
        };

        this.handleTabClick = this.handleTabClick.bind(this);
    }

    handleTabClick(tabIndex) {
        console.log(tabIndex);
        this.setState({
            activeTabIndex: tabIndex === this.state.activeTabIndex ? this.props.defaultActiveTabIndex : tabIndex
        });
    }

    renderChildrenWithTabsApiAsProps() {
        return React.Children.map(this.props.children, (child, index) => {
            return React.cloneElement(child, {
                onClick : this.handleTabClick,
                tabIndex: index,
                isActive: index === this.state.activeTabIndex
            });
        });
    }

    renderActiveTabContent() {
        const {children} = this.props;
        const {activeTabIndex} = this.state;
        if(children[activeTabIndex]) {
            return children[activeTabIndex].props.children;
        }
    }

    render() {
        return (
            <div className="nav-bar">
                <ul className="nav nav-tabs">
                    {this.renderChildrenWithTabsApiAsProps()}
                </ul>
                <div className="tabs-active-content">
                    {this.renderActiveTabContent()}
                </div>
            </div>
        );
    }
}

export default Tabs;