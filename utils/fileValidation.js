import { message } from "antd";

/**
 * Validates the file type and size.
 * @param file The file to validate.
 * @returns Boolean indicating whether the file is valid.
 */
export const validateFile = (file: File): boolean => {
  const isValidType =
    file.type === "image/jpeg" ||
    file.type === "image/png" ||
    file.type === "image/jpg",
    maxSizeMBInBytes = 6291456,
    maxSizeMB = 5,
    isValidSize = file.size >= maxSizeMBInBytes;
  if (!isValidType) {
    message.error("Only JPEG, JPG and PNG formats are allowed!");
    return false;
  }

  if (isValidSize) {
    message.error(`Maximum file size is ${maxSizeMB} MB!`);
    return false;
  }

  return true;
};
