import styled from "styled-components";
import { media } from "./media";

export const Title = styled.h1`
  font-size: 2em;
  text-align: center;
  color: #000;
  padding: ${(props) => props.padding || "0"};

  @media ${media.xs} {
    font-size: 1.5em;
    text-align: left;
  }

  @media ${media.sm} {
    font-size: 1.5em;
  }

  @media ${media.md} {
    font-size: 1.5em;
  }
`;

/* export const H2 = styled.h2`
  font-size: ${(props) => props.size || "18px"};
  font-weight: ${(props) => props.weight || 600};
  color: ${(props) => props.color || "#000"};
  font-weight: 500;
  text-align: ${(props) => props.aling || "center"};
  line-height: 90%;
  padding: ${(props) => props.padding || "0"};

  @media ${media.xs} {
    font-size: 16px;
  }

  @media ${media.sm} {
    font-size: 16px;
  }
`; */

export const BodyText = styled.p`
  font-size: ${(props) => props.size || "18px"};
  font-weight: ${(props) => props.weight || 400};
  color: ${(props) => props.color || "#000"};
  text-align: ${(props) => props.align || "left"};
  line-height: 130%;
  padding: ${(props) => props.padding || "0"};
  overflow-wrap: normal;

  @media ${media.xs} {
    font-size: 16px;
  }

  @media ${media.sm} {
    font-size: 16px;
  }
`;

export const InputText = styled.p`
  font-size: ${(props) => props.size || "16px"};
  font-weight: ${(props) => props.weight || 400};
  color: ${(props) => props.color || "#000"};
  text-align: ${(props) => props.align || "left"};
  line-height: 130%;
  padding: ${(props) => props.padding || "0"};
  overflow-wrap: normal;
`;

export const CountText = styled.p`
  font-size: ${(props) => props.size || "14px"};
  font-weight: ${(props) => props.weight || 400};
  color: ${(props) => props.color || "#C3C3C3"};
  text-align: ${(props) => props.align || "left"};
  line-height: 130%;
  padding: ${(props) => props.padding || "0"};
  overflow-wrap: normal;
`;
