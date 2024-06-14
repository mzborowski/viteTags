import React from "react";
import PropTypes from "prop-types";
import { TagListContainer, TagItem } from "./styled";

const TagList = ({ tags, onTagClick }) => {
	return (
		<TagListContainer>
			{tags.map((tag) => (
				<TagItem key={tag} onClick={() => onTagClick(tag)}>
					{tag}
				</TagItem>
			))}
		</TagListContainer>
	);
};

TagList.propTypes = {
	tags: PropTypes.arrayOf(PropTypes.string).isRequired,
	onTagClick: PropTypes.func.isRequired,
};

export default TagList;
