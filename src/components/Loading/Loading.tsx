const Loading = () => {
  return (
    <div className="flex justify-center items-center">
      <div
        className="loader border-t-2 border-b-2 border-lime-600
          border-solid rounded-full w-16 h-16 animate-spin mt-20"
      ></div>
    </div>
  );
};

export default Loading;
