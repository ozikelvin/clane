/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text} from 'react-native';
import { Card } from 'react-native-elements';
import { useActions } from '../hooks';
import colors from  '../assets/themes/colors';
import AppButton from '../components/AppButton';
import TextInput from '../components/TextInput';
import UplaodImageModal from '../components/UplaodImageModal';
import { showToast } from '../utils/helper';
import Icon from 'react-native-vector-icons/FontAwesome';

const newsIcon = <Icon name="news" size={50} color="#ababab" solid />


const NewNews = ({  route , navigation }) => {

  const { state , dispatch } = useActions();
  const [uploadImg, setUploadImg] = useState(false);
  const loadingState = state.loading;
  const [error, setError] = useState('');
  const isLoading = loadingState.models.news;
  const { data } = route.params;
  
  const [author, setAuthor] = useState('');
  const [title, setTitle] = useState('');
  const closeModal = () => setUploadImg(false);
  const submit = async () => {
    const body = {
      author,
      title,
    };

    if (!body.author || !body.title)
      {return setError('Please leave no field empty');}

    if (!data) {
      await dispatch.news.addNewsAsync({ body });
      navigation.navigate('home', {
        data:null,

      });

      showToast('success', 'Successfully added news')
      setAuthor('');
      setTitle('');
      return;
    }

    await dispatch.news.editNewsAsync({ newsId: data.id, body });

    setAuthor('');
    setTitle('');
    setUploadImg(true);
  };

  useEffect(() => {
    setTimeout(() => setError(''), 1500);
  }, [error]);

  useEffect(() => {
    if (data) {
      setAuthor(data.author);
      setTitle(data.title);
    }
  }, []);

  return (
    <View style={styles.card} >
    <Card style={styles.container}>
    <Card.Title h3 >

          <Text> {newsIcon} { data?.author ? 'Edit News' : 'Add News'}  </Text>

          </Card.Title>
      {error ? <Text style={styles.error}>{error}</Text> : null}
      {/* <UplaodImageModal
        show={uploadImg}
        closeModal={closeModal}
        newsId={data?.id}
      /> */}
      <View  >
        <TextInput
          label="Title"
          autoCapitalize="none"
          keyboardAppearance="dark"
          returnKeyType="next"
          returnKeyLabel="next"
          value={title}
          inputStyle={{ paddingHorizontal: 10 , borderColor:colors.grey , borderWidth:2, borderRadius:4 }}
          onChangeText={(text) => {
            setTitle(text);
          }}
        />
        <TextInput
          keyboardType="default"
          label="Author"
          keyboardAppearance="dark"
          returnKeyType="next"
          returnKeyLabel="next"
          multiline
          inputStyle={{ paddingHorizontal: 10 , borderColor:colors.grey , borderWidth:2, borderRadius:4 }}
          value={author}
          onChangeText={(text) => {
            setAuthor(text);
          }}
        />
        <AppButton title="SUBMIT" loading={isLoading} onPress={submit} />
      </View>
    </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  error: {
    color: colors.red,
    fontSize: 15,
    marginVertical: 15,
  },
  card :{
    flex:1 ,
    display:"flex",
    justifyContent:"center",
 
  },
});
export default NewNews;
