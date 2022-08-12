import React from 'react';
import styled from 'styled-components';
import { APP_WHITE, MEDIUM_GREY } from '../colors';

const CardContainer = styled.TouchableOpacity`
  display: flex;
  flex-direction: row;
  background: ${MEDIUM_GREY};
  border-radius: 10px;
  margin: 8px 12px;
  overflow: hidden;
  elevation: 5;
`

const CardTitle = styled.Text`
  font-size: 24px;
  font-weight: 800;
  color: ${APP_WHITE};
`

const CardPhoto = styled.Image`
  height: 100px;
  width: 100px;
`

const InfoWrapper = styled.View`
  justify-content: center;
  padding-left: 14px;
`

const ProfileCard = ({data, onPress}) => {
  return(
    <CardContainer
      onPress={onPress}
    >
      <CardPhoto
        source={{
          uri: data.image
        }}
      />
      <InfoWrapper>
        <CardTitle>{data.name}</CardTitle>
      </InfoWrapper>
    </CardContainer>
  )
}

export default ProfileCard;