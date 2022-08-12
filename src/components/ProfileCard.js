import React from 'react';
import styled from 'styled-components';
import { APP_WHITE, LIGHT_GREY, MEDIUM_GREY, NEUTRAL_GREY } from '../colors';
import { Feather } from '@expo/vector-icons';

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
  flex: 1;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0 14px;
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
        <CardTitle ellipsizeMode="tail" numberOfLines={1}>{data.name}</CardTitle>
        <Feather name='chevron-right' color={NEUTRAL_GREY} size={24}/>
      </InfoWrapper>
    </CardContainer>
  )
}

export default ProfileCard;