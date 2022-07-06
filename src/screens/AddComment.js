/* eslint-disable react-native/no-inline-styles */
/* eslint-disable quotes */
/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from "react";

import { View, StyleSheet, Text, KeyboardAvoidingView } from "react-native";
import { Card } from "react-native-elements";
import { useActions } from "../hooks";
import { DEVICE_WIDTH } from "../utils/constants";
import colors from  "../assets/themes/colors";
import AppButton from "../components/AppButton";
import TextInput from "../components/TextInput";

import Icon from 'react-native-vector-icons/FontAwesome';

const commentIcon = <Icon name="comments" size={50} color="#ababab" solid />

const AddComment = ({ route }) => {
  const routeObj = route.params;
  const { state , dispatch } = useActions();
  const loadingState = state.loading.models.comments ;
  const [error, setError] = useState("");
  const [name, setName] = useState("");
  const [comment, setComment] = useState("");
  const [imageUri, setImageUri] = useState("https://images.unsplash.com/photo-1495020689067-958852a7765e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8bmV3c3BhcGVyfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=400&q=60");

  // const onUpload = (uri) => {
  //   console.log(uri)
  //   setImageUri(uri);
  // };

  const submit = async () => {
    const data = {
      name,
      comment,
      avatar: imageUri,
    };

    if (!data.name || !data.comment)
      return setError("Please leave no field empty");

    if (!routeObj.commentValues) {
      await dispatch.comments.addCommentAsync({
        newsId: routeObj?.newsId,
        body: data,
      });
      setImageUri("");
      setName("");
      setComment("");
      return;
    } else {
      await dispatch.comments.editCommentAsync({
        newsId: routeObj?.commentValues?.newsId,
        commentId: routeObj?.commentValues?.id,
        body: data,
      });

      setImageUri("");
      setName("");
      setComment("");
    }
  };

  useEffect(() => {
    setTimeout(() => setError(""), 1500);
  }, [error]);

  useEffect(() => {
    
    if (routeObj?.commentValues) {
      //setImageUri(routeObj.commentValues.avatar);
      setName(routeObj?.commentValues.name);
      setComment(routeObj?.commentValues?.comment);
      return ;
    }
  }, [routeObj?.commentValues]);

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <View style={styles.card}>
        <Card  >
          <Card.Title h3 >
          <Text> {commentIcon} </Text>
            {routeObj?.commentValues ? "Edit Comment" : "Add Comment"}
          </Card.Title>
          <Card.Divider />
          {error ? <Text style={styles.error}>{error}</Text> : null}
          {/* <View>
            <UploadImageForm
              btnTitle="Add Avatar"
              imageLink={onUpload}
              imageSrc={imageUri}
            />
          </View> */}
          <View style={{
              padding:5
          }} >
            <TextInput
              label="Name"
              autoCapitalize="none"
              keyboardAppearance="dark"
              returnKeyType="next"
              returnKeyLabel="next"
              value={name}
              inputStyle={{ paddingHorizontal: 10 , borderColor:colors.grey , borderWidth:2, borderRadius:4 }}
              onChangeText={(text) => {
                setName(text);
              }}
            />
            <TextInput
              label="Comment"
              autoCapitalize="none"
              keyboardAppearance="dark"
              returnKeyType="next"
              inputStyle={{ paddingHorizontal: 10 , borderColor:colors.grey , borderWidth:2, borderRadius:4 }}
              returnKeyLabel="next"
              value={comment}
              onChangeText={(text) => {
                setComment(text);
              }}
            />
            <AppButton title="SUBMIT" loading={loadingState} onPress={submit} />
          </View>
        </Card>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    
  },
  closeBtn: {
    position: "absolute",
    bottom: 10,
    left: DEVICE_WIDTH / 3,
    width: 100,
    flex: 1,
  },
  error: {
    color: colors.red,
    fontSize: 15,
    marginVertical: 15,
  },
  card :{
    flex:1 ,
    display:"flex",
    justifyContent:"center",
 
  }
});
export default AddComment;
