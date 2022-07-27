import "./tag.scss";

const Tag = (props) => {
  const { label, selected, ...rest } = props;
  const selectedClass = selected ? "selected" : "";
  return <button className={`tag ${selectedClass}`} {...rest}>{label}</button>;
};

export default Tag;
