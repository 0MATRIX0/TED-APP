import * as React from "react";
import { Image } from "expo-image";
import { StyleSheet, View, Text } from "react-native";

export const FontFamily = {
  mulishSemiBold: "Mulish-SemiBold",
  mulishRegular: "Mulish-Regular",
  mulishBold: "Mulish-Bold",
  mulishMedium: "Mulish-Medium",
  mulishLight: "Mulish-Light",
  mulishExtraBold: "Mulish-ExtraBold",
  aBeeZeeRegular: "ABeeZee-Regular",
  titleH1: "Montserrat-ExtraBold",
  sFProText: "SF Pro Text",
};
/* font sizes */
export const FontSize = {
  size_xl: 20,
  size_4xs: 9,
  size_sm: 14,
  size_smi: 13,
  size_17xl: 36,
  titleH1_size: 28,
  size_mini: 15,
};
/* Colors */
export const Color = {
  darkFontMain: "#fff",
  colorCrimson: "#ff3951",
  colorLightgray: "#cbcbcb",
  colorBlack: "#000",
  colorSilver: "rgba(196, 196, 196, 0.2)",
  colorGray_100: "#252525",
  colorGray_200: "rgba(0, 0, 0, 0.5)",
};
/* border radiuses */
export const Border = {
  br_21xl: 40,
  br_3xs: 10,
  br_10xs: 3,
  br_8xs: 5,
};

const Loading = () => {
  return (
    <View style={styles.onboarding}>
      <View style={styles.frame}>
        <View style={styles.frame1}>
          <View style={styles.frame2}>
            {/* <Image
              style={styles.unsplashlyy3rhiyzdmIcon}
              contentFit="cover"
              source={require("../assets/unsplashlyy3rhiyzdm.png")}
            /> */}
          </View>
          {/* <Image
            style={styles.bgIcon}
            contentFit="cover"
            source={require("../assets/bg.png")}
          /> */}
        </View>
        <View style={styles.frame3}>
          <View style={styles.statusBarsWhite}>
            {/* <Image
              style={styles.batteryIcon}
              contentFit="cover"
              source={require("../assets/battery.png")}
            />
            <Image
              style={styles.wifiIcon}
              contentFit="cover"
              source={require("../assets/wifi.png")}
            />
            <Image
              style={styles.mobileSignalIcon}
              contentFit="cover"
              source={require("../assets/mobile-signal.png")}
            /> */}
            <View style={styles.timeStyle}>
              <Text style={styles.text}>9:41</Text>
            </View>
          </View>
          <View style={styles.backgroundDark}>
            <View style={styles.backgroundDark1} />
          </View>
        </View>
      </View>
      <View style={styles.frame4}>
        {/* <Image
          style={styles.frameIcon}
          contentFit="cover"
          source={require("../assets/frame1.png")}
        /> */}
        <View style={styles.title}>
          <Text style={styles.travelWaka}>Travel Waka</Text>
          <Text style={styles.findOutWhere}>
            find out where you wan waka go
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  unsplashlyy3rhiyzdmIcon: {
    position: "relative",
    width: 1528,
    height: 934,
  },
  frame2: {
    position: "absolute",
    top: 0,
    left: 0,
    width: 2322,
    overflow: "hidden",
    flexDirection: "column",
    alignItems: "flex-end",
    justifyContent: "center",
  },
  bgIcon: {
    position: "absolute",
    top: 8,
    left: 947,
    width: 428,
    height: 926,
  },
  frame1: {
    position: "relative",
    width: 2322,
    height: 934,
    overflow: "hidden",
  },
  batteryIcon: {
    position: "absolute",
    height: "16.59%",
    width: "5.16%",
    top: "43.86%",
    right: "4.7%",
    bottom: "39.55%",
    left: "90.14%",
    maxWidth: "100%",
    overflow: "hidden",
    maxHeight: "100%",
  },
  wifiIcon: {
    position: "relative",
    width: 17,
    height: 11,
  },
  mobileSignalIcon: {
    position: "relative",
    width: 19,
    height: 11,
  },
  text: {
    position: "absolute",
    height: "85.71%",
    width: "100%",
    top: "9.52%",
    left: "0%",
    fontSize: FontSize.size_mini,
    letterSpacing: -0.3,
    fontWeight: "600",
    color: Color.darkFontMain,
    textAlign: "center",
    display: "flex",
    alignItems: "flex-end",
    justifyContent: "center",
  },
  timeStyle: {
    position: "absolute",
    height: "47.73%",
    width: "14.39%",
    top: "27.27%",
    right: "80%",
    bottom: "25%",
    left: "5.61%",
  },
  statusBarsWhite: {
    position: "relative",
    width: 428,
    height: 44,
  },
  backgroundDark1: {
    position: "absolute",
    height: "100%",
    width: "100%",
    top: "0%",
    right: "0%",
    bottom: "0%",
    left: "0%",
    backgroundColor: "#0d8bff",
  },
  backgroundDark: {
    position: "relative",
    width: 428,
    height: 926,
    marginTop: -44,
  },
  frame3: {
    width: 428,
    height: 926,
    overflow: "hidden",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-start",
    marginTop: -926,
  },
  frame: {
    position: "absolute",
    top: -8,
    left: -947,
    width: 2322,
    height: 934,
    overflow: "hidden",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  frameIcon: {
    position: "relative",
    width: 76,
    height: 75,
    overflow: "hidden",
  },
  travelWaka: {
    position: "relative",
    fontSize: FontSize.titleH1_size,
    letterSpacing: -0.6,
    fontWeight: "800",
    color: Color.darkFontMain,
    textAlign: "left",
  },
  findOutWhere: {
    position: "relative",
    fontSize: 16,
    letterSpacing: -0.3,
    color: Color.darkFontMain,
    textAlign: "left",
  },
  title: {
    width: 239,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-start",
    height: 53,
    marginLeft: 1,
    marginTop: 6,
  },
  frame4: {
    position: "absolute",
    top: 396,
    left: 94,
    width: 240,
    height: 134,
    overflow: "hidden",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  onboarding: {
    position: "relative",
    flex: 1,
    width: "100%",
    height: 926,
    overflow: "hidden",
  },
});

export default Loading;
