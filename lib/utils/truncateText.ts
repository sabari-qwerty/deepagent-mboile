const truncateText = ({
    text,
    maxLength = 20,
  }: {
    text: string;
    maxLength?: number;
  }) => {
    const truncated = String(text).slice(0, maxLength);
    return text.length > maxLength ? truncated + "..." : truncated;
  };
  
  export default truncateText;
  