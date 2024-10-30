type Props = {
  error?: string;
};

const Error = (props: Props) => {
  return <div className="mt-20 text-red-700">{props.error || 'Something went wrong!'}</div>;
};

export default Error;
