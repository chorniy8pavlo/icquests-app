import IconSvgTime from "../../assets/svgs/time.svg";
import IconSvgQuests from "../../assets/svgs/quests.svg";
import IconSvgReward from "../../assets/svgs/reward.svg";

export type ChipIcon = "time" | "quests" | "reward";

export const icons: { [key in ChipIcon]: string } = {
  time: IconSvgTime,
  quests: IconSvgQuests,
  reward: IconSvgReward,
};
