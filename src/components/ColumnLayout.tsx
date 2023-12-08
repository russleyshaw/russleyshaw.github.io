import styled from "styled-components";

const Root = styled.div`
    display: grid;
    grid-template: "left right" auto / 1fr 1fr;
    gap: 2em;
`;

const Left = styled.div`
    grid-area: left;
`;

const Right = styled.div`
    grid-area: right;
`;

export default { Root, Left, Right };
