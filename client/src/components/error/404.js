import React, { Component } from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

const row = 10
const col = 27
const size = 10
const sizeresponsive = 3
const gap = 10
const hightlight = [
  '04',
  '14',
  '24',
  '34',
  '44',
  '54',
  '55',
  '56',
  '57',
  '58',
  '08',
  '18',
  '28',
  '38',
  '48',
  '58',
  '68',
  '78',
  '88',
  '98',
  '011',
  '111',
  '211',
  '311',
  '411',
  '511',
  '611',
  '711',
  '811',
  '911',
  '012',
  '013',
  '014',
  '015',
  '912',
  '913',
  '914',
  '915',
  '015',
  '115',
  '215',
  '315',
  '415',
  '515',
  '615',
  '715',
  '815',
  '915',
  '018',
  '118',
  '218',
  '318',
  '418',
  '518',
  '519',
  '520',
  '521',
  '522',
  '022',
  '122',
  '222',
  '322',
  '422',
  '522',
  '622',
  '722',
  '822',
  '922'
]

const WrapperPage = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`

const Wrapper = styled.div`
  text-align: center;
  margin-bottom: 100px;
`

const DotWrapper = styled.div.attrs({
  width: props => props.size * props.col + (props.col - 1) * props.gap,
  height: props => props.size * props.row + (props.row - 1) * props.gap,
  widthresponsive: props =>
    props.sizeresponsive * props.col + (props.col - 1) * props.gap,
  heightresponsive: props =>
    props.sizeresponsive * props.row + (props.row - 1) * props.gap
})`
  width: ${props => props.width}px;
  height: ${props => props.height}px;
  display: grid;
  grid-gap: ${props => props.gap}px;
  grid-template-rows: repeat(${props => props.row}, ${props => props.size}px);
  grid-template-columns: repeat(
    ${props => props.col},
    ${props => props.size}px
  );

  @media (max-width: 768px) {
    width: ${props => props.widthresponsive}px;
    height: ${props => props.heightresponsive}px;
    grid-template-rows: repeat(
      ${props => props.row},
      ${props => props.sizeresponsive}px
    );
    grid-template-columns: repeat(
      ${props => props.col},
      ${props => props.sizeresponsive}px
    );
  }
`

const Dot = styled.div.attrs({
  background: props =>
    props.fill ? props.theme.primary : props.theme.defaultColor.default
})`
  background: ${props => props.background};
  border-radius: 50%;
`

const Message = styled.p`
  letter-spacing: 10px;
  margin-bottom: 30px;
`

const BackButton = styled(Link)`
  color: ${props => props.theme.background};
  font-weight: bold;
  background: ${props => props.theme.primary};
  border-radius: 5px;
  padding: 5px 20px;
`

class NotFoundPage extends Component {
  render() {
    return (
      <WrapperPage>
        <Wrapper>
          <DotWrapper
            row={row}
            col={col}
            size={size}
            sizeresponsive={sizeresponsive}
            gap={gap}
          >
            {Array.apply(0, Array(row)).map((_, i) =>
              Array.apply(0, Array(col)).map((_, j) =>
                hightlight.includes(String(i) + String(j)) ? (
                  <Dot key={String(i) + String(j)} fill={'true'} />
                ) : (
                  <Dot key={String(i) + String(j)} />
                )
              )
            )}
          </DotWrapper>
          <Message>PAGE NOT FOUND</Message>
          <BackButton to={'/'}>H o m e</BackButton>
        </Wrapper>
      </WrapperPage>
    )
  }
}

export default NotFoundPage
