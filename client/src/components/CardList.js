import React from 'react';

import ImageCard from './ImageCard';

const CardList = (props) => {
    const imageItems = props.imageList.map(image => {
        return <ImageCard 
            image={image} 
            key={image.id}
            onShowModal = { props.onShowModal }
            />
    })

    return(
        <ul className="image-list mx-auto">
            {imageItems}
        </ul>
    );
}

export default CardList;