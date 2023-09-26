import { imageDisplaySize } from '@/utils/styles';
import {
    ChangeEventHandler,
    DragEventHandler,
    MouseEventHandler,
    useRef,
    useState
  } from "react";
  
  const fileImage = new Image();
  export const useHooks = () => {
    const imageContainerRef = useRef<HTMLDivElement>(null);
    const inputFileRef = useRef<HTMLInputElement>(null);
    const [objectURL, setObjectURL] = useState("");
    const [selectedFile, setSelectedFile] = useState<string | null>(null);
    const manipulateImageSize = (url: string) => {
      fileImage.src = url;
      fileImage.onload = () => {
        const width = fileImage.naturalWidth;
        const height = fileImage.naturalHeight;
        const ratioWidth = width / imageDisplaySize.width;
        const ratioHeight = height / imageDisplaySize.height;
        if (ratioWidth > ratioHeight) {
          fileImage.width = imageDisplaySize.width;
          fileImage.height = height / ratioWidth;
        } else {
          fileImage.width = width / ratioHeight;
          fileImage.height = imageDisplaySize.height;
        }
      };
    };
    const resetSelection = () => {
      fileImage.src = "";
      setSelectedFile(null);
      const imageContainer = imageContainerRef.current;
      if (imageContainer && fileImage.parentNode === imageContainer) {
        imageContainer.removeChild(fileImage);
      }
      if (objectURL) {
        window.URL.revokeObjectURL(objectURL);
        setObjectURL("");
      }
    };
    const handleFiles = (files: FileList | null) => {
      resetSelection();
      if (!files || files?.length === 0) return;
      const file = files[0];
      if (!file.type.includes("image/")) {
        if (inputFileRef.current) {
          inputFileRef.current.value = "";
        }
        return;
      }
      setSelectedFile(file.name);
      const imageContainer = imageContainerRef.current;
      if (!imageContainer) return;
      const objectURL = window.URL.createObjectURL(file);
      manipulateImageSize(objectURL);
      imageContainer.appendChild(fileImage);
      setObjectURL(objectURL);
    };
    const openDialog: MouseEventHandler<HTMLButtonElement> = () => {
      const inputFile = inputFileRef.current;
      if (!inputFile) return;
      inputFile.click();
    };
    const stopDragEvent: DragEventHandler<HTMLDivElement> = (event) => {
      event.preventDefault();
      event.stopPropagation();
    };
    const handleFileDialog: ChangeEventHandler<HTMLInputElement> = (event) => {
      const files = event.currentTarget.files;
      handleFiles(files);
    };
    const handleDroppedFile: DragEventHandler<HTMLDivElement> = (event) => {
      stopDragEvent(event);
      const dataTransfer = event.dataTransfer;
      const files = dataTransfer.files;
      if (inputFileRef.current) {
        inputFileRef.current.files = files;
      }
      handleFiles(files);
    };
    return {
      handleDroppedFile,
      handleFileDialog,
      imageContainerRef,
      inputFileRef,
      openDialog,
      selectedFile,
      stopDragEvent
    };
};
  