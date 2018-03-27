import React, { Component } from 'react';

class UploadForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            value: ''
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({ value: event.target.value });
    }

    handleSubmit(event) {
        event.preventDefault();

        const data = new FormData(event.target);
        const image = event.target.querySelector('input[type=file]').files[0];
        data.append('file', image);
    }

    render() {
        return (
            <div className="upload-form">
                <h2 className="upload-form-header">Upload Form</h2>
                <form onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="category"><b>Category</b></label>
                        <input
                            name="category"
                            type="text"
                            placeholder="Enter category"
                            className="form-control" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="title"><b>Title</b></label>
                        <input
                            name="title"
                            type="text"
                            className="form-control" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="description"><b>Description</b></label>
                        <textarea
                            name="description"
                            rows="3"
                            className="form-control" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="image"><b>Image</b></label>
                        <input
                            name="image"
                            type="file"
                            className="form-control" />
                    </div>
                    <button
                        type="submit"
                        className="btn btn-primary">Submit</button>
                </form>
            </div >
        );
    }
}

export default UploadForm;