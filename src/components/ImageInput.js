/* eslint-disable prettier/prettier */

import React, { useState } from "react";
import { API_KEY } from "@env";
import { StyleSheet } from "react-native";
import * as ImagePicker from "react-native-image-picker";
import colors from "../assets/themes/colors";
import { uploadRequest } from "../configs/axios.config";
import AppButton from "./AppButton";
import { showToast } from '../utils/helper';

 const ImageInput = ({ onChangeImage, btnTitle }) => {
  const [uploading, setUploading] = useState(false);
  
  const upLoad = async (imageUri) => {
   try {
    const data = new FormData();
    data.append("avatar", imageUri);
    setUploading(true);
    const res = await uploadRequest(data);
    
      setUploading(false)
      onChangeImage(res?.data);
   } catch (error) {
    setUploading(false)
      showToast("error", error?.response?.data?.message ?? "Error in Uploading")
   }
   
  };

  const selectImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibrary({
        mediaTypes: "photo",
        quality: 0.5,
        includeBase64: true,
      });
      if (!result.didCancel) {
        upLoad(result.assets[0].base64);
      }
    } catch (error) {
      console.log("Error reading an image", error);
    }
  };

  return (
    <AppButton
      loading={uploading}
      onPress={selectImage}
      icon={{
        name: "camera",
        type: "font-awesome",
        size: 15,
        color: "white",
      }}
      title={btnTitle}
      textStyle={{ marginLeft: 5 }}
      buttonStyle={styles.container}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    
    backgroundColor: colors.primary,
    marginVertical: 10,
  },
  image: {
    height: "100%",
    width: "100%",
  },
});

export default ImageInput;

