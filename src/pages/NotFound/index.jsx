import React from 'react';
import { Segment, Image } from 'semantic-ui-react';

export default class NotFound extends React.Component {
	render() {
		return (
			<Segment>
				<Image
					src="https://res.cloudinary.com/dnxlxr3pd/image/upload/c_crop/v1592267746/404_ketyfu.jpg"
					size="medium"
					centered
				/>
			</Segment>
		);
	}
}
