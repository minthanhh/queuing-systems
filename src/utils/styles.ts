const onActive = 'bg-primaryColor text-white px-3 group/item'
const noActive = 'text-textGray px-3 hover:bg-[#FFF2E7] hover:text-primaryColor transition-all ease-linear duration-200'

export { onActive, noActive}

export const imageDisplaySize = { width: 200, height: 200 };
export const styles = {
  inputFile: {
    display: "none"
  },
  textField: {
    marginRight: "0.5rem"
  },
  imageContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: imageDisplaySize.width,
    height: imageDisplaySize.height,
    marginTop: 10,
    border: "1px solid lightgray"
  }
};
