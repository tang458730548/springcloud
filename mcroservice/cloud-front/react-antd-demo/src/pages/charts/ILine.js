import React, { Component } from 'react';
import { Line } from '@antv/g2plot';

const data = [
    { year: '1991', value: 3 },
    { year: '1992', value: 4 },
    { year: '1993', value: 3.5 },
    { year: '1994', value: 5 },
    { year: '1995', value: 4.9 },
    { year: '1996', value: 6 },
    { year: '1997', value: 7 },
    { year: '1998', value: 9 },
    { year: '1999', value: 13 },
  ];


class ILine extends Component {

    constructor(props) {

        super(props);
        this.state = {
            containerId : props.containerId
        }
    }

    componentDidMount() {
        const line = new Line( this.state.containerId , {
            data,
            xField: 'year',
            yField: 'value',
        });
        line.render()
    }


    render() {
        const {containerId , style} = this.props 
        return (
            <div id={containerId} style={style}>
            </div>
        )
    }
}


export default ILine;                                                                                               