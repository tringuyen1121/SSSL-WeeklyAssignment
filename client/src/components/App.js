import React, { Component } from 'react';
import _ from 'underscore';
import axios from 'axios';
import './../style/app.css';

import ImageCard from './ImageCard';
import CardList from './CardList';
import ImageModal from './ImageModal';
import Tab from './Tab';
import Tabs from './Tabs';
import UploadForm from './UploadForm';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      picArray: [],
      showModal: false,
      selectedImage: null
    }
  }

  getCategory(picArr) {
    const categoryList = _.uniq(picArr.map(pic => pic.category));
    const renderList = categoryList.map(category => {
      const picByCategory = this.state.picArray.filter(pic => pic.category === category)
      return (
        <div className="category-item" key={category}>
          <h3><b>{category}</b></h3>
          <CardList
            imageList={picByCategory}
            onShowModal={image => this.toggleModalVisibility(image)} />
        </div>
      );
    })
    return renderList;
  }

  render() {
    return (
      <div className="container">
        <Tabs>
          <Tab linkClassName="View">
            <ul>
              {this.getCategory(this.state.picArray)}
            </ul>
            {this.state.showModal && <ImageModal image={this.state.selectedImage} onRequestClose={() => this.toggleModalVisibility()} />}
          </Tab>
          <Tab linkClassName="Add">
            <UploadForm />
          </Tab>
        </Tabs>
      </div>
    );
  }

  componentWillMount() {
    this.fetchData()
  }

  //To be in a service
  fetchData() {
    const self = this;
    axios.get('/images')
      .then((response) => {
        console.log(response);
        self.setState({ picArray: response.data });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  toggleModalVisibility(image) {
    this.setState({ showModal: !this.state.showModal, selectedImage: image });
  }
}


export default App;
