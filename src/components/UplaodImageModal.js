/* eslint-disable prettier/prettier */

import React, { useState } from "react";
import { View, StyleSheet, Modal } from "react-native";
import { Card } from "react-native-elements";
import { uploadNewsImage } from  "../services/news";
import colors from "../assets/themes/colors";
/* eslint-disable prettier/prettier */

import { showToast } from "../utils/helper";
import AppButton from "./AppButton";
import UploadImageForm from "./UploadImageForm";

  const UplaodImageModal = ({ show, closeModal, newsId }) => {
  const [imgUri, setImgUri] = useState("");

  const upload = async (link) => {
    const res = await uploadNewsImage({ newsId, image: link });
    if (res.status === 201) {
      setImgUri(res.data.image);
      showToast("success", "Image uploaded");
      closeModal();
    } else {
      showToast("error", "failed to upload image");
    }
  };

  return (
    <Modal visible={show} transparent={false} style={styles.container}>
      <View style={styles.closeBtnView}>
        <AppButton
          onPress={() => closeModal()}
          title="Close"
          buttonStyle={styles.closeBtn}
          textStyle={{ color: colors.red }}
        />
      </View>
      <Card containerStyle={styles.card}>
        <UploadImageForm
          btnTitle="Add image"
          imageLink={upload}
          imageSrc={imgUri}
        />
      </Card>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  card: {
    marginTop: 50,
  },
  closeBtnView: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
  },
  closeBtn: {
    backgroundColor: "transparent",
    width: 150,
  },
});

export default UplaodImageModal ;
