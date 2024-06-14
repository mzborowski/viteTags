import React from "react";
import PropTypes from "prop-types";
import { SelectedTagsContainer, TagItem, RemoveButton } from "./styled";

const SelectedTags = ({ tags, onTagRemove }) => {
	return (
		<SelectedTagsContainer>
			{tags.map((tag) => (
				<TagItem key={tag}>
					{tag}
					<RemoveButton onClick={() => onTagRemove(tag)}>x</RemoveButton>
				</TagItem>
			))}
		</SelectedTagsContainer>
	);
};

SelectedTags.propTypes = {
	tags: PropTypes.arrayOf(PropTypes.string).isRequired,
	onTagRemove: PropTypes.func.isRequired,
};

export default SelectedTags;
