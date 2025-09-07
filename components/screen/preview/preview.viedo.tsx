import { FC, useRef } from "react";

import { useLocalSearchParams } from "expo-router";
import { useVideoPlayer, VideoSource, VideoView } from "expo-video";
import { StyleSheet, View } from "react-native";

export const PreivewViedo: FC = () => {
  const { url } = useLocalSearchParams();
  const videoViewRef = useRef<VideoView>(null);
  const player = useVideoPlayer(url as VideoSource, (player) => {
    player.loop = true;
    player.play();
  });

  return (
    <View style={styles.contentContainer}>
      <VideoView
        ref={videoViewRef}
        player={player}
        style={{ width: "100%", height: "100%" }}
        allowsFullscreen
        allowsPictureInPicture
      />
    </View>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  video: {
    width: "100%",
    height: "100%",
    aspectRatio: "",
  },
  controlsContainer: {
    padding: 10,
  },
});
