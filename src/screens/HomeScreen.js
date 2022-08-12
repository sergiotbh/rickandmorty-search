import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { filterCharacter } from '../api';
import { Feather } from '@expo/vector-icons';
import { APP_WHITE, DARK_GREY, LIGHT_GREY, NEUTRAL_GREY } from '../colors';
import RickAndMortyLogo from '../../assets/Rick_and_Morty.svg'
import ProfileCard from '../components/ProfileCard';
import { FlatList, Keyboard } from 'react-native';

const ScreenContainer = styled.View`
  flex: 1;
  background-color: ${APP_WHITE};
`

const HeaderContainer = styled.View`
  padding: 24px 12px;
`

const Header = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 16px 0;
`

const HeaderTitle = styled.Text`
  font-size: 42px;
  font-weight: 900;
  flex: 1;
`

const SearchButton = styled.TouchableOpacity`
  padding: 10px;
`

const SearchBarWrapper = styled.View`
  display: flex;
  flex-direction: row;
  background-color: ${LIGHT_GREY};
  color: ${DARK_GREY};
  border-radius: 10px;
`

const SearchInput = styled.TextInput`
  flex: 1;
  padding: 10px;
`

const ListContainer = styled.View`
  display: flex;
  flex: 1;
  background-color: ${DARK_GREY};
`

const ResultList = styled.FlatList`
  padding-top: 10px;
`

const ErrorLabel = styled.Text`
  color: ${NEUTRAL_GREY};
  text-align: center;
  margin-top: 16px;
  font-size: 18px;
`

const LoadingIndicator = styled.ActivityIndicator`
  margin: 12px 0;
`

const HomeScreen = () => {

  const [results, setResults] = useState([]);
  const [responseInfo, setResponseInfo] = useState()
  const [errorText, setErrorText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = () => {
    Keyboard.dismiss();
    setErrorText('')
    setResults([])
    setIsLoading(true)
    setCurrentPage(1)
    performSearch(searchTerm)
  }

  const handleLoadMore = () => {
    if(currentPage < responseInfo?.pages){
      const newPage = currentPage + 1;
      setCurrentPage(newPage)
      performSearch(searchTerm, newPage)
    }
  }

  const performSearch = (searchTerm, page) => {
    filterCharacter(searchTerm, page)
    .then(res => {
      setResults(!page ? res.results : results.concat(res.results))
      setResponseInfo(res.info)
    })
    .catch(e => setErrorText(e))
    .finally(() => setIsLoading(page >= responseInfo.pages ? false : true))
  }

  useEffect(() => {
    if(results.length > 0 && currentPage < responseInfo?.pages) {
      console.log("LOADING");
      setIsLoading(true)
    }else{
      console.log("not LOADING");
      setIsLoading(false)
    }
  }, [responseInfo, results, currentPage])

  return(
    <ScreenContainer>
      <HeaderContainer>
        <Header>
          <HeaderTitle>Busca Perfiles de Rick y Morty</HeaderTitle>
          <RickAndMortyLogo height={56} width={56}/>
        </Header>
        <SearchBar
          value={searchTerm}
          onChangeText={(text) => setSearchTerm(text)}
          onSearch={() => handleSearch(searchTerm)}
        />
      </HeaderContainer>
      <ListContainer>
        {errorText ? <ErrorLabel>{errorText}</ErrorLabel> : null}
        <FlatList
          data={results}
          renderItem={({item}) => 
            <ProfileCard
              data={item}
            />
          }
          keyExtractor={(_, index) => index+''}
          onEndReached={handleLoadMore}
          ListFooterComponent={() => isLoading ? <LoadingIndicator/> : null}
        />
      </ListContainer>
    </ScreenContainer>
  )
}

const SearchBar = ({onSearch, value, onChangeText}) => {

  return(
    <SearchBarWrapper>
      <SearchInput
        value={value}
        onChangeText={onChangeText}
        placeholder="Escribe el nombre del personaje..."
        placeholderTextColor={NEUTRAL_GREY}
      />
      <SearchButton
        onPress={onSearch}
      >
        <Feather name='search' size={24} color={DARK_GREY} />
      </SearchButton>
    </SearchBarWrapper>
  )
}

export default HomeScreen;