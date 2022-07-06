/* eslint-disable prettier/prettier */
import React, { useEffect } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { SliderBox } from "react-native-image-slider-box";
import { Text, Image } from "react-native-elements";
import { getById } from "../utils/helper";
import { useActions } from "../hooks";
import { DEFAULT_IMAGE, DEVICE_HEIGHT , IMAGES_ARR } from "../utils/constants";
import colors from  "../assets/themes/colors";
import Icon from 'react-native-vector-icons/FontAwesome';
import Comment from "../components/Comment";
import AppButton from "../components/AppButton";

const News = ({ route, navigation }) => {

  const { state , dispatch } = useActions();
  const { id , index } = route.params;
  const news = state.news
  const commentsState = state.comments.comments
  const comments = commentsState[id] || [];
  const item = getById(id, news);

  useEffect(() => {
    dispatch.comments.getAllcommentAsync(id);
  }, [id]);

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ paddingBottom: 30 }}
    >
      <Text h4 h4Style={styles.title}>
        {item.title}
      </Text>
      
      <View style={styles.imagesView}>
        {item?.images ? (
          <SliderBox sliderBoxHeight={"100%"} images={item.images} />
        ) : (
          <Image style={{ height: "100%" }} source={{ uri: IMAGES_ARR[id ?? 0 ].src }} />
        )}
      </View>
      <View style={styles.body}>
        <View style={styles.authorView}>
          <Text style={styles.author}>Author:</Text>
          <Text>{item.author}</Text>
        </View>
        <View>
          <Text
            style={{
              textAlign: "justify",
            }}
          >
            {item.body}
          </Text>
        </View>
        <View>
          <View style={styles.addCommentView}>
            <Text
              h4
              h4Style={{
                fontSize: 13,
                marginVertical: 10,
              }}
            >
              Comments..
            </Text>

            <AppButton
              buttonStyle={{ backgroundColor: "#575798" }}
              textStyle={{ color: colors.white }}
              title="Add comment"
              onPress={() =>
                navigation.navigate("newComment", { newsId: item.id })
              }
            />
          </View>
          {!comments.length ? (
            <View>
              <Text>No comments</Text>
            </View>
          ) : (
            <View>
              {comments.map((com) => <Comment data={com} />).reverse()}
            </View>
          )}
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  title: {
    textAlign: "center",
    marginVertical: 5,
  },
  imagesView: {
    height: DEVICE_HEIGHT * 0.3,
  },
  body: {
    paddingHorizontal: 20,
  },
  authorView: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
  },
  author: {
    fontSize: 16,
    fontWeight: "bold",
    marginRight: 5,
  },

  addCommentView: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: 10,
  },
});
export default News;
