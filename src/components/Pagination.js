/* eslint-disable prettier/prettier */

import React from "react";
import { View, StyleSheet } from "react-native";
import colors from  "../assets/themes/colors";
import AppButton from "./AppButton";

 const Pagination = ({ page, setPage, dataLength }) => {
  const onChnagePage = (type) => {
    if (type === "next") {
      setPage(page + 1);
      return;
    }

    setPage(page - 1);
  };

  return (
    <View style={styles.container}>
      <AppButton
        title="BACK"
        disabled={page === 1}
        onPress={() => onChnagePage("prev")}
        buttonStyle={[styles.buttonStyle , {backgroundColor:colors.grey}]}
      />
      <AppButton
        title="NEXT"
        buttonStyle={styles.buttonStyle}
        onPress={() => onChnagePage("next")}
        disabled={dataLength === 0}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: colors.white,
    paddingHorizontal: 15,
    paddingVertical: 15,
  },
  buttonStyle: {
    backgroundColor: colors.bgHome,
    width: 100,
  },
});

export default Pagination