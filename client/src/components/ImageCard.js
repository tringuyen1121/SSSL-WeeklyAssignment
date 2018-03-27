import React from 'react';

const ImageCard = ({ image, onShowModal }) => {
	return (
		<li className="list-group-item card image-item">
			<img
				className="card-img-top"
				src={image.thumbnail}
				style={{ width: '100%' }}
				alt="" />
			<div className="card-body">
				<div style={{ padding: '20px' }}>
					<h4 className="card-title">{image.title}</h4>
					<p className="card-text">{image.details}</p>
				</div>
			</div>
			<div className="card-footer" style={{ backgroundColor: '#eee' }}>
				<button
					type="button"
					className="btn btn-primary"
					onClick={() => onShowModal(image)}>View</button>
			</div>
		</li>
	);
};

export default ImageCard;
