import React from 'react';
import {FlatList} from 'react-native';
import ListItem from './ListItem';
import {useMedia} from '../hooks/ApiHooks';
import PropTypes from 'prop-types';

const List = ({navigation, myFilesOnly = false}) => {
  const {mediaArray, loading} = useMedia(myFilesOnly);
  console.log('List load', loading);
  return (
    <FlatList
      data={mediaArray}
      keyExtractor={(item) => item.file_id.toString()}
      renderItem={({item}) => (
        <ListItem
          navigation={navigation}
          singleMedia={item}
          myFilesOnly={myFilesOnly}
        />
      )}
    />
  );
};

List.propTypes = {
  navigation: PropTypes.object,
  myFilesOnly: PropTypes.bool,
};

export default List;
