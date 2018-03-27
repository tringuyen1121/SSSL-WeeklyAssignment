import React, { Component } from 'react';
import _ from 'underscore';
import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';

const MAP_API_KEY = 'AIzaSyBtwA50nOzPCi7wgmm4VSPsF0L9BxrTFQ4';

class ImageModal extends Component {

    constructor(props) {
        super(props);
    
        this.handleOutsideClick = this.handleOutsideClick.bind(this);
      }

    componentDidMount() {
        document.addEventListener('click', this.handleOutsideClick, false);
    }

    componentWillUnmount() {
        document.removeEventListener('click', this.handleOutsideClick, false);
    }

    render() {
        const image = this.props.image;
        return (
            <div className="modal-overlay">
                <div className="col-md-8 modal" ref={node => (this.modal = node)}>
                    <div className="modal-content">
                        <div className="modal-header">
                            <span className="close" onClick={() => this.props.onRequestClose()}>&times;</span>
                            <h4>{image.title}</h4>
                        </div>
                        <div className="modal-body">
                            <Map
                                google={this.props.google}
                                zoom={12}
                                center={{
                                    lat: image.coordinates.lat,
                                    lng: image.coordinates.lng
                                }}
                                style={mapStyle}>
                                <Marker position={{ lat: image.coordinates.lat, lng: image.coordinates.lng }} />
                            </Map>
                            <img
                                style={{ width: '100%' }}
                                src={image.image}
                                alt={image.title} />
                            <p>{this.getDate(image.time)}</p>
                        </div>
                        <div className="modal-footer">
                            <button
                                type="button"
                                className="btn btn-default"
                                onClick={() => this.props.onRequestClose()}>Close</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    handleOutsideClick(e) {
        const { onRequestClose } = this.props;

        if (!_.isNull(this.modal)) {
            if (!this.modal.contains(e.target)) {
                onRequestClose();
                document.removeEventListener('click', this.handleOutsideClick, false);
            }
        }
    }

    getDate(dateString) {
        const date = new Date(dateString);
        return date.toDateString();
    }
}

const mapStyle = {
    width: '30%',
    height: '20%',
    position: 'relative',
}

export default GoogleApiWrapper({
    apiKey: MAP_API_KEY,
    libraries: ['places', 'visualization']
})(ImageModal)