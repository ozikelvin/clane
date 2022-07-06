/* eslint-disable prettier/prettier */

import React from "react";
import { View, StyleSheet,
   ActivityIndicator, Pressable , Text } from "react-native";
import { useActions } from "../hooks";
import { useNavigation } from "@react-navigation/native";
import { Card, Image } from "react-native-elements";
import { DEFAULT_IMAGE , IMAGES_ARR } from "../utils/constants";
import colors from  "../assets/themes/colors";
import AppButton from "./AppButton";
import Icon from 'react-native-vector-icons/FontAwesome';


const deleteIcon = <Icon name="trash" size={30} color={colors.danger} solid />



 const NewsCard = ({ data , index }) => {
 
  const {  deleteNews } = useActions();
  const navigation = useNavigation();
  const navigate = () => {
    navigation.navigate("news", { id: data.id , index:index });
  };

  

  

  return (
    <Pressable onPress={navigate}>
      <Card containerStyle={styles.card}>
        <View style={styles.container}>
          <View style={styles.imageContainer}>
            <Image
              style={styles.image}
              source={{
                uri: IMAGES_ARR[data.id].src ?? DEFAULT_IMAGE,
              }}
              resizeMode="cover"
              PlaceholderContent={<ActivityIndicator />}
            />
          </View>
          <View style={styles.cardPreview}>
            <Text
              numberOfLines={1}
              h4
              h4Style={{ fontSize: 15, color: colors.success }}
            >
              {data.title}
            </Text>
            <View style={styles.authorView}>
              <Text h4 numberOfLines={1} h4Style={{ fontSize: 13 }}>
                Author: <Text> {data.author} </Text>
              </Text>
            </View>
            <View>
              <Text numberOfLines={3}>{data.body}</Text>
            </View>
            <View style={styles.btnView}>
              <AppButton
                title={<Text> {deleteIcon} </Text>}
                buttonStyle={styles.btn}
                textStyle={{ color: colors.red }}
                onPress={() =>deleteNews(data?.id)}
              />
              <AppButton
                title="Edit"
                buttonStyle={styles.btn}
                textStyle={{ color: colors.primary }}
                onPress={() =>
                  navigation.navigate("News", {
                    data,
                    headerTitle: "Edit News",
                  })
                }
              />
            </View>
          </View>
        </View>
      </Card>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  card: {
    marginHorizontal: 0,
  },
  container: {
    flex: 1,
    width: "100%",
    flexDirection: "row",
  },
  imageContainer: {
    width: "40%",
  },
  image: {
    height: 150,
    width: "100%",
  },
  authorView: {
    marginVertical: 4,
  },
  cardPreview: {
    flex: 1,
    marginLeft: 10,
  },
  btnView: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
  btn: {
    flex: 1,
    minWidth: 70,
    backgroundColor: "transparent",
    marginRight: 5,
  },
});


export default NewsCard;
