import styled from "styled-components";

export const SelectedTagsContainer = styled.div`
	display: flex;
	flex-wrap: wrap;
	margin-top: 10px;
`;

export const TagItem = styled.div`
	padding: 5px 10px;
	border: 1px solid #ccc;
	border-radius: 4px;
	margin: 5px;
	display: flex;
	align-items: center;
`;

export const RemoveButton = styled.button`
	margin-left: 5px;
	cursor: pointer;
`;