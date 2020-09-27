import myData from "./Social.json";

const ReadSocialJSON = (chemicalName) => {
  for (let index = 0; index < myData.Sheet1.length; index++) {
    const element = myData.Sheet1[index];

    if (element["Cathode Product (p)"] === chemicalName) {
      return { value: element };
    }
  }

  return false;
};

export default ReadSocialJSON;
