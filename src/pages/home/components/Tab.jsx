function Tab(props) {
  if (props.selectedCategory === props.category._id) {
    return (
      <button
        className="border px-2 py-1 rounded-md bg-[#edeef1] "
        onClick={() => props.onClick(props.category._id)}
      >
        {props.category.name}
      </button>
    );
  }

  return (
    <button
      className="border border-[#edeef1] px-2 py-1 rounded-md"
      onClick={() => props.onClick(props.category._id)}
    >
      {props.category.name}
    </button>
  );
}

export default Tab;
