import { Hero, Logo, Path } from "@/constants/image";
import { FC } from "react";
import { Image, ScrollView, Text, View } from "react-native";
import { LoginButton } from "../button/login.button";
import { CustomSafeAreaView } from "../container/custom.safe.areya";
import { AuthError } from "../error/auth.error";

export const LoginScreen: FC = () => {
  return (
    <CustomSafeAreaView background="blue">
      <ScrollView
        contentContainerStyle={{
          height: "100%",
        }}
      >
        <View className="w-full flex justify-center items-center h-full px-4 ">
          {/*  logo */}
          <Image
            source={Logo}
            className="w-[230px] h-[94px] bg"
            resizeMode="contain"
          />
          {/* Hero Image */}
          <Image
            source={Hero}
            className="max-w-[380px] w-full h-[300px]"
            resizeMode="contain"
          />
          {/*  marketing text */}
          <View className="relative mt-5">
            <Text className="text-2xl font-bold text-center text-black">
              Discover Endless{"\n"}
              Possibilities with{" "}
              <Text className="text-secondary-100">DeepAgent</Text>
            </Text>
            <Image
              source={Path}
              className="w-[156px] h-[15px] absolute -bottom-3 -right-8"
              resizeMode="contain"
            />
          </View>
          <Text className="text-sm font-pregular mt-7 text-center text-[#586474]">
            Where Creativity Meets Innovation: Embark on a Journey of Limitless
            Exploration with DeepAgent
          </Text>

          <LoginButton />
          <AuthError />
        </View>
      </ScrollView>
    </CustomSafeAreaView>
  );
};
