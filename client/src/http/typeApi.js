import { $host, $authHost } from "./index";

export const createType = async (type) => {
  // try {
  const { data } = await $authHost.post("api/type", type);
  return data;
  // } catch (error) {
  //   console.log("error", error);
  // }
};

export const getAllTypes = async () => {
  // try {
  const { data } = await $host.get("api/type");
  return data;
  // } catch (error) {
  //   console.log("error", error);
  // }
};
