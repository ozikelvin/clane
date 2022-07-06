/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable prettier/prettier */

import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Text,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { useActions } from "../hooks";
import Feather from "react-native-vector-icons/Feather";
import { HEADER_HEIGHT, DEVICE_HEIGHT } from "../utils/constants";
import colors from  "../assets/themes/colors";
import Header from "../components/Header";
import NewsCard from "../components/NewsCard";
import Pagination from "../components/Pagination";
import AppButton from "../components/AppButton";


const Home = ({ navigation }) => {
  
  const { tryAgain , state , dispatch } = useActions();
  const news = state.news;
  const loadingState = state.loading.effects.news.getAllNewsAsync ;
  const [pageNumber, setPageNumber] = useState(1);
  // console.log(news);

  
  useEffect(() => {
    dispatch.news.getAllNewsAsync(pageNumber);
  }, [pageNumber ]);

  return (
    <View style={styles.container}>
      <Header
        title="News"
        style={{
          height: HEADER_HEIGHT,
        }}
        RightIcon={() => (
          <Feather
            name="plus"
            onPress={() =>
              navigation.navigate("News", {
                data: null
             
              })
            }
            size={24}
            color={colors.white}
          />
        )}
      />
      {loadingState ? (
        <View style={styles.center}>
          <ActivityIndicator animating={true} color={colors.red} />
        </View>
      ) : null}
      {!loadingState && !news.length ? (
        <View style={styles.center}>
          <Text style={styles.errorMsg}>There seems to be an Error</Text>
          <AppButton title="Try Again" onPress={() => tryAgain(pageNumber)} />
        </View>
      ) : (
        <View>
          <FlatList
            contentContainerStyle={styles.flatlist}
            data={news}
            renderItem={({ item , index }) => <NewsCard data={item} index={index} />}
            keyExtractor={(item) => item.id}
          />
        </View>
      )}
      <View style={styles.pagination}>
        <Pagination page={pageNumber} setPage={setPageNumber} dataLength={news.length} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  flatlist: {
    paddingBottom: DEVICE_HEIGHT * 0.28,
    paddingHorizontal: 20,
  },
  pagination: {
    position: "absolute",
    bottom: DEVICE_HEIGHT * 0,
    left: 0,
    right: 0,
  },
  center: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  errorMsg: {
    fontSize: 17,
    marginBottom: 10,
  },
});
export default Home;
