/* eslint-disable prettier/prettier */
import React from "react";
import { View, StyleSheet, Text , Image } from "react-native";
import colors from  "../assets/themes/colors";
import { HEADER_TITLE_SIZE } from  "../utils/constants";

   const Header = ({ title, style, RightIcon }) => {
  return (
    <View style={[styles.container, { ...style }]}>
      <View  >

      <Text style={styles.title}> <Text style={styles.logo} >c</Text> {title}</Text>
      </View>
      <View>{RightIcon ? <RightIcon /> : null}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: colors.bgHome,
    marginBottom: 20,
  },
  title: {
    marginTop:-23,
    color: colors.white,
    fontSize: HEADER_TITLE_SIZE,
  },
  logo:{
    color: colors.white,
    fontSize: 70,
    fontWeight:"600",
    marginTop:10
  }
});

export default Header ;
